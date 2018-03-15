import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, Keyboard, RefreshControl, StyleSheet, View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import SearchBox from 'react-native-search-box';

// Constants
import { MAIN_ROUTES } from 'src/constants/RouteNames';

// Models
import Photo from 'src/models/Photo';

// Locals
import PhotoItem from './PhotoItem';
import withConnect from './withConnect';

@withConnect
export default class PhotosListing extends React.PureComponent {
  static navigationOptions = {
    title: 'FlickRN',
  };

  static propTypes = {
    clearPhotoInfo: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.instanceOf(Photo)).isRequired,
    errorMessage: PropTypes.string,
    hasMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    searchPhotos: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errorMessage: null,
  };

  constructor(props) {
    super(props);

    this.clearPhotoInfo = props.clearPhotoInfo.bind(this);
    this.searchPhotos = props.searchPhotos.bind(this);
    this.state = { keyword: '', reloading: true };
  }

  componentDidMount() {
    this.requestPhotos();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const { data: prevData } = prevProps;

    if (data !== prevData) this.setState({ reloading: false });
  }

  onCancel = () => {
    const { keyword } = this.state;
    if (_.isEmpty(keyword)) return;
    
    Keyboard.dismiss();
    this.setState({ keyword: '', reloading: true }, this.requestPhotos);
  };

  onSearch = () => this.setState({ reloading: true }, this.requestPhotos);

  onViewDetail = photo => {
    const { navigation: { navigate } } = this.props;
    this.clearPhotoInfo();
    navigate(MAIN_ROUTES.PHOTO_DETAIL, { photo });
  };
  
  requestPhotos = () => {
    if (this.props.loading) return;

    const { keyword: rawKeyword, reloading } = this.state;
    const keyword = _.replace(rawKeyword, /\s/g, '+');
    this.searchPhotos({ keyword, reloading });
  };

  renderItem = ({ item }) => <PhotoItem data={item} onViewDetail={this.onViewDetail} />;

  renderList = () => {
    const { data, loading } = this.props;
    const { reloading } = this.state;

    if (loading && reloading)
      return <MaterialIndicator animationDuration={1500} size={40} />;

    const refreshControl = <RefreshControl onRefresh={this.requestPhotos} refreshing={loading && !reloading} />;

    return (
      <FlatList
        data={reloading ? [] : data}
        keyExtractor={({ id }, index) => `photo_item_${id}_${index}`}
        onEndReached={this.requestPhotos}
        onEndReachedThreshold={0.1}
        refreshControl={refreshControl}
        renderItem={this.renderItem}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <SearchBox
          autoCapitalize="none"
          backgroundColor="transparent"
          onCancel={this.onCancel}
          onChangeText={keyword => this.setState({ keyword })}
          onDelete={this.onCancel}
          onSearch={this.onSearch}
          placeholderCollapsedMargin={10}
          placeholderExpandedMargin={25}
          tintColorSearch="black"
          titleCancelColor="black"
        />
        {this.renderList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
