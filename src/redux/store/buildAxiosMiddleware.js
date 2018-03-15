import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

const { flickr: { endpoint } } = require('src/data/configs.json');
const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function buildAxiosMiddleware() {
  const axiosClient = axios.create({
    baseURL: endpoint,
    responseType: 'json',
  });

  return axiosMiddleware(axiosClient, {
    errorSuffix: ERROR,
    interceptors: {
      response: [{
        success: (__, { data }) => {
          const { stat, message, ...restData } = data;
          if (stat === 'ok') return restData;

          return Promise.reject({ message, response: { data } });
        },
      }],
    },
    successSuffix: SUCCESS,
  });
}
