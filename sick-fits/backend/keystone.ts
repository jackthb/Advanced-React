import { User } from './schemas/user';
import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb://localhost/-keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // signed in for how many days
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // data seeiding
  },
  lists: createSchema({
    User,
    // enter schema items
  }),
  ui: {
    isAccessAllowed: () => true,
  },
  // session values
});
