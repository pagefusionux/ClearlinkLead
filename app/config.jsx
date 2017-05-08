const config = () => {
  return {
    apiUrl: process.env.API_URL, // API URL for receiving new token
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
};

export default new config;
