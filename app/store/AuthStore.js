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

    // State
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    this.error = null;
  }

  /**
   * Login handler
   * @param credentials
   */
  onLogin(credentials) {
    axios
      //.get(this.getAuthEndpoint('password') + '&username=' + credentials.username + '&password=' + credentials.password)
    // return Config.apiUrl + '?client_id=' + Config.clientId + '&client_secret=' + Config.clientSecret + '&grant_type=' + grantType;
      .post(Config.apiUrl, {
        client_id: Config.clientId,
        client_secret: Config.clientSecret,
        grant_type: 'password',
        username: credentials.username,
        password: credentials.password
      }).then(response => {
        this.saveTokens(response.data);

        console.log("API Auth Response:", response.data);

        return axios.get(Config.apiUrl + '/me');
      })
      .then(response => {

        console.log("/me response: ", response.data.data);

        this.loginSuccess(response.data.data);
      })
      .catch(response => {
        this.loginError(response);
      });
  }

  /**
   * Process login success
   * @param user
   */
  loginSuccess(user) {

    localStorage.setItem('user', JSON.stringify(user));

    this.setState({ user: user });

    console.log("User authenticated: ", user);

    history.replaceState(null, '/');
    //hashHistory.push('/');
  }

  /**
   * Handle login error
   * @param response
   */
  loginError(response) {
    console.log("There was some sort of login error.");
    this.setState({ accessToken: null, refreshToken: null, error: 'Login Failed', user: null});
  }

  /**
   * Try to connect user from local storage
   */
  onLocalLogin() {
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    let user = JSON.parse(localStorage.getItem('user'));

    if (accessToken && refreshToken && user) {
      this.saveTokens({access_token: accessToken, refresh_token: refreshToken});
      this.loginSuccess(user);
    }
  }

  /**
   * Try to refresh user access token
   */
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

  /**
   * Logout user
   */
  onLogout() {
    localStorage.clear();

    this.setState({ accessToken: null, refreshToken: null, error: null});

    axios.interceptors.request.eject(InterceptorUtil.getInterceptor());

    console.log('User logged out.');

    history.replaceState(null, '/login');
    //hashHistory.push('/login');
  }

  /**
   * Save tokens in local storage and automatically add token within request
   * @param params
   */
  saveTokens(params) {
    const {access_token, refresh_token} = params;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.setState({ accessToken: access_token, refreshToken: refresh_token, error: null});

    // Automatically add access token
    const interceptor = axios.interceptors.request.use((config) => {
      config.url = new Uri(config.url).addQueryParam('access_token', access_token);
      return config;
    });

    InterceptorUtil.setInterceptor(interceptor)
  }

  /**
   * Return API endpoint with given grant type (default password)
   * @param grantType
   * @returns {string}
   */
  getAuthEndpoint(grantType='password') {
    //return Config.apiUrl + '/oauth/v2/token?client_id=' + Config.clientId + '&client_secret=' + Config.clientSecret + '&grant_type=' + grantType;
    return Config.apiUrl + '?client_id=' + Config.clientId + '&client_secret=' + Config.clientSecret + '&grant_type=' + grantType;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');
