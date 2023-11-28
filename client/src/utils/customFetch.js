import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL
  ? process.env.REACT_APP_API_BASE_URL
  : "http://localhost:5000/api";

// const baseUrl = "http://localhost:5000/api";
// const baseUrl = "https://netflix-clone-server-three.vercel.app/api";

export const customFetch = async (url, method, data, headers = {}) => {
  try {
    if (method === "GET") {
      // const response = await axios.get(`${baseUrl}/${url}`, { params: data });
      const response = await axios.get(`${baseUrl}/${url}`, data, { headers });
      return response.data;
    } else if (method === "POST") {
      const response = await axios.post(`${baseUrl}/${url}`, data, { headers });
      return response.data;
    }
    //   else {
    //   const resp = await axios({
    //     method,
    //     url: `${baseUrl}/${url}`,
    //     data,
    //   });
    //   return resp.data;
    // }
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else if (error.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Error occurred during the request");
    }
  }
};
