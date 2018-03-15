import { photos as photosReducer } from 'src/redux/reducers';
import { FLICKR } from 'src/redux/types';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';
import { buildAxiosActions } from '__tests__/helpers/mockApiRequests';

// Models
import Photo from 'src/models/Photo';

describe('redux/reducers/photos', () => {
  const { photos: mockState } = buildMockState();
  const mockSuccess = require('__tests__/fixtures/searchPhotos/success.json');
  const mockError = require('__tests__/fixtures/searchPhotos/error.json');

  const requestAction = { type: FLICKR.SEARCH_PHOTOS };
  
  const { photos } = mockSuccess;
  const { errorAction, successAction } = buildAxiosActions(requestAction, { photos }, mockError);

  test('start', () => {
    const currentState = {
      ...mockState,
      errorMessage: 'some random error',
    };

    const expectedState = {
      ...mockState,
      loading: true,
    };

    const reduced = photosReducer(currentState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('success', () => {
    const currentState = {
      ...mockState,
      loading: true,
    };

    const expectedState = {
      ...mockState,
      data: Photo.buildArray(mockSuccess.photos.photo),
    };

    const reduced = photosReducer(currentState, successAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('error', () => {
    const currentState = {
      ...mockState,
      loading: true,
    };

    const expectedState = {
      ...mockState,
      errorMessage: 'Random flickr.photos.search error',
      hasMore: false,
    };

    const reduced = photosReducer(currentState, errorAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('refresh', () => {
    const data = Photo.buildArray(mockSuccess.photos.photo);
    
    const currentState = { ...mockState, data };
    const expectedState = { ...mockState, data, loading: true };

    const reduced = photosReducer(currentState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });
});
