const appName = "committee-tracker";

module.exports = {
  port: 8080, //process.env.PORT || 8080,
  database: `mongodb://localhost:27017/${appName}`,
  jwtSecret: "Add secure secret",
  jwtExpiration: 1000000
};
