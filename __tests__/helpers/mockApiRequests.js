import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Constants
import { API_CONFIGS, AXIOS_REQUEST_SUFFIXES } from 'src/constants';

const { flickr: { apiKey } } = require('src/data/configs.json');
const { PAGINATION } = API_CONFIGS;
const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export const DEFAULT_PARAMS = {
  api_key: apiKey,
  format: 'json',
  nojsoncallback: 1,
  per_page: PAGINATION,
};

export const mockAxios = new MockAdapter(axios);

export function buildAxiosActions(requestAction, successData, mockError) {
  const { type } = requestAction;
  const { message } = mockError;

  const successAction = {
    meta: { previousAction: requestAction },
    payload: successData,
    type: type + SUCCESS,
  };

  const errorAction = {
    error: {
      message,
      response: { data: mockError },
    },
    meta: { previousAction: requestAction },
    type: type + ERROR,
  };

  return { errorAction, successAction };
}
