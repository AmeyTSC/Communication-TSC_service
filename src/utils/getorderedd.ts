import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

export const getorderEdd = async (id:string) => {
  const config = {
    method: "get",
    url: `https://thesleepcompanystore.myshopify.com/admin/api/2024-01/orders/${id}/metafields.json?namespace=clickpost&key=edd`,
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error Edd order metafields:", error.message);
    throw new Error(`Error Edd order metafields: ${error.message}`);
  }
};
