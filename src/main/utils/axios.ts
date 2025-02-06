import axios from 'axios';

export const axiosGet = async (url: string, params: any) => {
  const res = await axios.get(`${url}?${new URLSearchParams(params).toString()}`);
  return res.data;
};

export const axiosPost = async (url: string, params: any) => {
  const res = await axios.put(url, params);
  return res.data;
};
