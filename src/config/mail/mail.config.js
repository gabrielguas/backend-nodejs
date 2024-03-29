import { configEnv } from "../config.js"

const mailConfig = {
    service: 'gmail',
    port: 587,
    auth: {
      user: configEnv.USER_MAILER,
      pass: configEnv.PASS_MAILER,
    },
  };
  
  export default mailConfig;