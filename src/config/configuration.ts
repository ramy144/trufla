export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10),
  },
  database: {
    url: process.env.DATABASE_URL,
    name: process.env.DATABASE_NAME,
    logging: process.env.DATABASE_LOGGING,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
  }
})
