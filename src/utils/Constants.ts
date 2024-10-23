import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

const userid = process.env.SMSG_USERID;
const userpwd = process.env.SMSG_PASSWORD;

export const credentials = {
  url: `https://media.smsgupshup.com/GatewayAPI/rest?userid=${userid}&password=${userpwd}&send_to=`,
};
