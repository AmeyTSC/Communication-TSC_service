import axios from "axios";

export const smsSent = async (templateInfo:any) => {
  let config = templateInfo;
  try {
    const response = await axios.post(config.url, null, config);
    return response.data;
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    throw new Error(`Failed to send sms: ${error.message}`);
  }
};