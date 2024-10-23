import axios from "axios";

export const getorderEdd = async (id:string) => {
  const config = {
    method: "get",
    url: `https://thesleepcompanystore.myshopify.com/admin/api/2024-01/orders/${id}/metafields.json?namespace=clickpost&key=edd`,
    headers: {
      "X-Shopify-Access-Token": "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",
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
