import { connect } from 'react-redux';
import { flickr } from 'src/redux/actions';

function mapStateToProps(state) {
  const { data, errorMessage, loading } = state.photoInfo;
  return { data, errorMessage, loading };
}

function mapDispatchToProps(dispatch) {
  return {
    getPhotoInfo: config => dispatch(flickr.getPhotoInfo(config)),
  };
}

export default function withConnect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
