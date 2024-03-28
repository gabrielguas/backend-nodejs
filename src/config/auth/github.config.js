import { configEnv } from "../config.js"

const { GITHUB_CLIENT_ID, GITHUB_SECRET, GITHUB_CALLBACK_URL } = configEnv;
export default {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_SECRET,
  callbackUrl: GITHUB_CALLBACK_URL,
};
