import _ from 'lodash';
import { createAction } from 'redux-actions';
import { FLICKR } from 'src/redux/types';

// Constants
import { API_CONFIGS } from 'src/constants';

const { flickr: { apiKey } } = require('src/data/configs.json');
const { PAGINATION } = API_CONFIGS;

const DEFAULT_PARAMS = {
  api_key: apiKey,
  format: 'json',
  nojsoncallback: 1,
  per_page: PAGINATION,
};

export const clearPhotoInfo = createAction(FLICKR.CLEAR_PHOTO_INFO);

export function getPhotoInfo({ id, secret }) {
  const action = createAction(FLICKR.GET_PHOTO_INFO);

  return dispatch => {
    const request = {
      params: {
        ...DEFAULT_PARAMS,
        secret,
        method: 'flickr.photos.getInfo',
        photo_id: id,
      },
    };

    return dispatch(action({ request }));
  };
}

export function searchPhotos({ keyword, reloading }) {
  const action = createAction(FLICKR.SEARCH_PHOTOS);

  return (dispatch, getState) => {
    const { photos: { currentPage } } = getState();

    const method = _.isEmpty(keyword) ? 'getRecent' : 'search';
    
    const request = {
      params: {
        ...DEFAULT_PARAMS,
        method: `flickr.photos.${method}`,
        page: reloading ? 1 : currentPage + 1,
        text: keyword,
      },
    };

    return dispatch(action({ request }));
  };
}
