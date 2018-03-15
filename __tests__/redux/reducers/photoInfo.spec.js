import { photoInfo as photoInfoReducer } from 'src/redux/reducers';
import { FLICKR } from 'src/redux/types';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';
import { buildAxiosActions } from '__tests__/helpers/mockApiRequests';

// Models
import PhotoInfo from 'src/models/PhotoInfo';

describe('redux/reducers/photoInfo', () => {
  const { photoInfo: mockState } = buildMockState();
  const mockSuccess = require('__tests__/fixtures/getPhotoInfo/success.json');
  const mockError = require('__tests__/fixtures/getPhotoInfo/error.json');

  const requestAction = { type: FLICKR.GET_PHOTO_INFO };

  const { photo } = mockSuccess;
  const { errorAction, successAction } = buildAxiosActions(requestAction, { photo }, mockError);

  test('start', () => {
    const currentState = {
      ...mockState,
      data: { title: 'some random data' },
      errorMessage: 'some random error',
    };

    const expectedState = {
      ...mockState,
      loading: true,
    };

    const reduced = photoInfoReducer(currentState, requestAction);
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
      data: PhotoInfo.build(mockSuccess.photo),
    };

    const reduced = photoInfoReducer(currentState, successAction);
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
      errorMessage: 'Random flickr.photos.getInfo error',
    };

    const reduced = photoInfoReducer(currentState, errorAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('refresh', () => {
    const data = PhotoInfo.build(mockSuccess.photo);
    
    const currentState = { ...mockState, data };
    const expectedState = { ...mockState, loading: true };

    const reduced = photoInfoReducer(currentState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });
});
