import url from 'url';


export default {
  environment: process.env.NODE_ENV || 'development',
  http: {
    host: process.env.HTTP_HOST || '0.0.0.0',
    port: process.env.HTTP_PORT || '3000',
  },
  db: {
    host: url.parse(process.env.DB_PORT).hostname,
    port: parseInt(url.parse(process.env.DB_PORT).port, 10),
    user: process.env.DB_USER || process.env.DB_ENV_POSTGRES_USER,
    password: process.env.DB_PASSWORD || process.env.DB_ENV_POSTGRES_PASSWORD,
    database: process.env.DB_DATABASE || process.env.DB_ENV_POSTGRES_DB,
  },
};
