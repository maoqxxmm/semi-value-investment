import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const axiosGet = async (url: string, params: any) => {
  const res = await axios.get(`${url}?${new URLSearchParams(params).toString()}`);
  return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const axiosPost = async (url: string, params: any) => {
  const res = await axios.put(url, params);
  return res.data;
};
