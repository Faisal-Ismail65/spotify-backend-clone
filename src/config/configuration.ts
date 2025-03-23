export default () => ({
  port: parseInt(process.env.PORT),
  secret: process.env.SECRET,
  dbType: process.env.DB_TYPE,
  dbHost: process.env.DB_HOST,
  dbPort: parseInt(process.env.DB_PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  dbName: process.env.DB_NAME,
});
