import _ from 'lodash';
import { FLICKR } from 'src/redux/types';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

// Models
import PhotoInfo from 'src/models/PhotoInfo';

const INITIAL_STATE = {
  data: undefined,
  errorMessage: undefined,
  loading: false,
};

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function photoInfoReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  if (type === FLICKR.CLEAR_PHOTO_INFO)
    return INITIAL_STATE;

  if (type === FLICKR.GET_PHOTO_INFO + ERROR) {
    const { error: { message: errorMessage } } = action;
    return { ...state, errorMessage, loading: false };
  }

  if (type === FLICKR.GET_PHOTO_INFO + SUCCESS) {
    const { payload: { photo } } = action;
    if (_.isEmpty(photo)) return state;

    return { ...state, data: PhotoInfo.build(photo), loading: false };
  }

  if (type === FLICKR.GET_PHOTO_INFO)
    return { ...state, data: undefined, errorMessage: undefined, loading: true };

  return state;
}
