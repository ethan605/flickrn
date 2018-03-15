// Helpers
import { DEFAULT_PARAMS, buildAxiosActions, mockAxios } from '__tests__/helpers/mockApiRequests';
import buildMockStore from '__tests__/helpers/buildMockStore';

// Redux
import { flickr } from 'src/redux/actions';

describe('redux/actions/getPhotoInfo', () => {
  const store = buildMockStore({ authorized: true });

  const id = 123;
  const secret = 'random_secret_xxx';
  const mockSuccess = require('__tests__/fixtures/getPhotoInfo/success.json');
  const mockError = require('__tests__/fixtures/getPhotoInfo/error.json');

  const requestAction = {
    type: 'flickr/GET_PHOTO_INFO',
    payload: {
      request: {
        params: {
          ...DEFAULT_PARAMS,
          secret,
          method: 'flickr.photos.getInfo',
          photo_id: id,
        },
      },
    },
  };

  const { photo } = mockSuccess;
  const { errorAction, successAction } = buildAxiosActions(requestAction, { photo }, mockError);

  /* eslint-disable newline-per-chained-call */
  mockAxios
    .onGet('').replyOnce(200, mockSuccess)
    .onGet('').replyOnce(200, mockError);
  /* eslint-enable newline-per-chained-call */

  beforeEach(() => store.clearActions());

  test('success', async () => {
    await store.dispatch(flickr.getPhotoInfo({ id, secret }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, successAction]);
    expect(actions).toMatchSnapshot();
  });

  test('error', async () => {
    await store.dispatch(flickr.getPhotoInfo({ id, secret }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, errorAction]);
    expect(actions).toMatchSnapshot();
  });
});
