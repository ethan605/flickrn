import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

// Models
import Photo from 'src/models/Photo';
import PhotoInfo from 'src/models/PhotoInfo';

// Locals
import withConnect from './withConnect';

@withConnect
export default class PhotoDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { photo: { title } } = navigation.state.params;
    return { title };
  };

  static propTypes = {
    data: PropTypes.instanceOf(PhotoInfo),
    errorMessage: PropTypes.string,
    getPhotoInfo: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          photo: PropTypes.instanceOf(Photo),
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    data: null,
    errorMessage: null,
  };

  constructor(props) {
    super(props);
    this.getPhotoInfo = props.getPhotoInfo.bind(this);
    this.state = { imageLoading: true };
  }

  componentDidMount() {
    const { photo } = this.navigationParams;
    const { id, secret } = photo;
    this.getPhotoInfo({ id, secret });
  }

  get navigationParams() {
    const { photo } = this.props.navigation.state.params;
    return { photo };
  }

  render() {
    const { data, loading } = this.props;

    const indicator = <MaterialIndicator animationDuration={1500} size={40} style={styles.indicator} />;

    if (loading || data == null)
      return (
        <ScrollView>
          {indicator}
        </ScrollView>
      );

    const { imageLoading } = this.state;
    const { descriptionContent, originalImage } = data || {};

    return (
      <ScrollView>
        {imageLoading && indicator}
        <Image
          onLoadEnd={() => this.setState({ imageLoading: false })}
          resizeMode="cover"
          source={{ uri: originalImage }}
          style={styles.image}
        />
        <Text style={styles.description}>
          {_.isEmpty(descriptionContent) ? '<No description>' : descriptionContent}
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    marginTop: 20,
  },
  image: {
    alignSelf: 'stretch',
    height: 500,
  },
  description: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
