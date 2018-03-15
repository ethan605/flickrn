import React, { Component } from 'react';
import { Provider } from 'react-redux';

// Components
import MainNavigator from 'src/components/MainNavigator';

// Constants
import { IN_DEV_MODE } from 'src/constants';

// Redux
import buildStore from 'src/redux/store/buildStore';

// Expose global modules for testings
if (IN_DEV_MODE)
  Object.assign(global, {
    _: require('lodash'),
    $: require('lodash/fp'),
    moment: require('moment'),
  });

export default class App extends Component {
  constructor(props) {
    super(props);
    this.reduxStore = buildStore();
  }

  render() {
    return (
      <Provider store={this.reduxStore}>
        <MainNavigator />
      </Provider>
    );
  }
}
