import { StackNavigator } from 'react-navigation';

// Components
import PhotoDetail from 'src/components/PhotoDetail';
import PhotosListing from 'src/components/PhotosListing';

// Constants
import { MAIN_ROUTES } from 'src/constants/RouteNames';

const { PHOTO_DETAIL, PHOTOS_LISTING } = MAIN_ROUTES;

export default StackNavigator({
  [PHOTOS_LISTING]: {
    screen: PhotosListing,
  },
  [PHOTO_DETAIL]: {
    screen: PhotoDetail,
  },
});
