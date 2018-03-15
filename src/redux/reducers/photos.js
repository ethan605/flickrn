import _ from 'lodash';
import { FLICKR } from 'src/redux/types';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

// Models
import Photo from 'src/models/Photo';

const INITIAL_STATE = {
  currentPage: 1,
  data: [],
  errorMessage: undefined,
  hasMore: true,
  loading: false,
};

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function photosReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  if (type === FLICKR.SEARCH_PHOTOS + ERROR) {
    const { error: { message: errorMessage } } = action;
    return { ...state, errorMessage, hasMore: false, loading: false };
  }

  if (type === FLICKR.SEARCH_PHOTOS + SUCCESS) {
    const { payload: { photos } } = action;
    if (_.isEmpty(photos)) return state;

    const { page, pages, photo } = photos;
    const hasMore = page < pages;

    const { data: currentPhotos } = state;
    const newPhotos = Photo.buildArray(photo);

    const data = page === 1 ? newPhotos : [...currentPhotos, ...newPhotos];
    return { ...state, hasMore, data, currentPage: page, loading: false };
  }

  if (type === FLICKR.SEARCH_PHOTOS)
    return { ...state, errorMessage: undefined, loading: true };

  return state;
}
