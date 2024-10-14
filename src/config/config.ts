export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  dataBaseURL: {
    url: process.env.DATABASE_URL,
  },
});

console.log('DATABASE_URL:', process.env.DATABASE_URL);
