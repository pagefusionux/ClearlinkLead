
const config = () => {
  return {
    tokenUrl: process.env.TOKEN_URL, // API URL for receiving access token
    apiUrl: process.env.API_URL, // API URL for all other data requests
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
};

export default new config;
