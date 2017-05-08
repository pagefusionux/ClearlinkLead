const config = () => {
  return {
    apiUrl: 'http://localhost.lumenoauth/oauth/access_token', // API URL for receiving new token
    clientId: 'id0',
    clientSecret: 'secret0'
  }
};

export default new config;
