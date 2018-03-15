import { connect } from 'react-redux';
import { flickr } from 'src/redux/actions';

function mapStateToProps(state) {
  const { data, errorMessage, hasMore, loading } = state.photos;
  return { data, errorMessage, hasMore, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    clearPhotoInfo: () => dispatch(flickr.clearPhotoInfo()),
    searchPhotos: config => dispatch(flickr.searchPhotos(config)),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
