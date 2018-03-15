import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Button from 'react-native-button';

// Models
import Photo from 'src/models/Photo';

const PhotoItem = ({ data, onViewDetail }) => {
  const { thumbnail, title } = data;

  return (
    <Button onPress={() => onViewDetail(data)}>
      <View style={styles.container}>
        <Image resizeMode="cover" source={{ uri: thumbnail }} style={styles.image} />
        <Text style={styles.title}>{_.isEmpty(title) ? '<No title>' : title}</Text>
      </View>
    </Button>
  );
};

PhotoItem.propTypes = {
  data: PropTypes.instanceOf(Photo).isRequired,
  onViewDetail: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {
    alignSelf: 'stretch',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 5,
  },
});

export default PhotoItem;
