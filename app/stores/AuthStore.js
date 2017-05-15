import axios from 'axios';
import Uri from 'jsuri';

import alt from 'app/alt';
import AuthActions from 'app/actions/AuthActions';
import InterceptorUtil from 'app/utils/InterceptorUtil';
import Config from 'app/config';
import history from 'app/history';

class AuthStore {
  constructor() {
    this.bindActions(AuthActions);

    // state
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    this.error = null;
  }

  // handle login
  onLogin(credentials) {
    axios
      .post(Config.tokenUrl, this.getAuthEndpoint('password', credentials)).then(response => {
        this.saveTokens(response.data);

        //console.log("API Auth Response:", response.data);

        return axios.get(Config.tokenUrl + '/me');
      }).then(response => {

        //console.log("/me response: ", response.data.data);

        this.loginSuccess(response.data.data);
      }).catch(response => {
        this.loginError(response);
      });
  }

  // handle login success
  loginSuccess(user) {

    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ user: user });

    console.log("User authenticated: ", user);

    history.replaceState(null, '/');
  }


  // handle login error
  loginError(response) {
    console.log("API error:", response);
    this.setState({ accessToken: null, refreshToken: null, error: 'Login failed!', user: null});
  }


  // try to connect to user from local storage
  onLocalLogin() {
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (accessToken && refreshToken && user) {
      this.saveTokens({access_token: accessToken, refresh_token: refreshToken});
      this.loginSuccess(user);
    }
  }


  // try to refresh user access token
  onRefreshToken(params) {
    let refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      axios.interceptors.request.eject(InterceptorUtil.getInterceptor());
      axios
        .get(this.getAuthEndpoint('refresh_token') + '&refresh_token=' + refreshToken)
        .then(response => {
          this.saveTokens(response.data);

          // Replay request
          axios(params.initialRequest).then(response => {
            params.resolve(response);
          }).catch(response => {
            params.reject(response);
          });
        })
        .catch(() => {
          this.onLogout();
        });
    }
  }

  // handle user logout
  onLogout() {
    localStorage.clear();

    this.setState({ accessToken: null, refreshToken: null, error: null});

    axios.interceptors.request.eject(InterceptorUtil.getInterceptor());

    console.log('User is logged out.');

    history.replaceState(null, '/login');
  }


  // save tokens in local storage and automatically add token within request (via interceptor util)
  saveTokens(params) {
    const {access_token, refresh_token} = params;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.setState({ accessToken: access_token, refreshToken: refresh_token, error: null});

    // automatically add access token
    const interceptor = axios.interceptors.request.use((config) => {
      config.url = new Uri(config.url).addQueryParam('access_token', access_token);
      return config;
    });

    InterceptorUtil.setInterceptor(interceptor);
  }


  // return API endpoint with given grant type
  getAuthEndpoint(grantType='password', credentials) {
    return {
      client_id: Config.clientId,
      client_secret: Config.clientSecret,
      grant_type: grantType,
      username: credentials.username,
      password: credentials.password
    }
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
