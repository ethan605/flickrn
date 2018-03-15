import { photoInfo, photos } from 'src/redux/reducers';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';

describe('redux/reducers/initial', () => {
  const mockState = buildMockState();

  test('photoInfo', () => {
    const { photoInfo: expectedState } = mockState;

    expect(photoInfo(undefined, { type: 'DUMMY_TYPE' })).toEqual(expectedState);
    expect(photoInfo(undefined, { type: 'DUMMY_TYPE' })).toMatchSnapshot();
  });

  test('photos', () => {
    const { photos: expectedState } = mockState;

    expect(photos(undefined, { type: 'DUMMY_TYPE' })).toEqual(expectedState);
    expect(photos(undefined, { type: 'DUMMY_TYPE' })).toMatchSnapshot();
  });
});
