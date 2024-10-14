export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'defaultSecret', // Fallback for local development
};
