// Helpers
import { DEFAULT_PARAMS, buildAxiosActions, mockAxios } from '__tests__/helpers/mockApiRequests';
import buildMockStore from '__tests__/helpers/buildMockStore';

// Redux
import { flickr } from 'src/redux/actions';

describe('redux/actions/searchPhotos', () => {
  const store = buildMockStore({ authorized: true });

  const keyword = 'random keyword';
  const mockSuccess = require('__tests__/fixtures/searchPhotos/success.json');
  const mockError = require('__tests__/fixtures/searchPhotos/error.json');

  const requestAction = {
    type: 'flickr/SEARCH_PHOTOS',
    payload: {
      request: {
        params: {
          ...DEFAULT_PARAMS,
          method: 'flickr.photos.search',
          page: 1,
          text: keyword,
        },
      },
    },
  };

  const { photos } = mockSuccess;
  const { errorAction, successAction } = buildAxiosActions(requestAction, { photos }, mockError);

  /* eslint-disable newline-per-chained-call */
  mockAxios
    .onGet('').replyOnce(200, mockSuccess)
    .onGet('').replyOnce(200, mockError);
  /* eslint-enable newline-per-chained-call */

  beforeEach(() => store.clearActions());

  test('success', async () => {
    await store.dispatch(flickr.searchPhotos({ keyword, reloading: true }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, successAction]);
    expect(actions).toMatchSnapshot();
  });
  
  test('error', async () => {
    await store.dispatch(flickr.searchPhotos({ keyword, reloading: true }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, errorAction]);
    expect(actions).toMatchSnapshot();
  });
});
