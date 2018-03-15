# How to build this project?

This project uses [`yarn`](https://yarnpkg.com) to manage node packages, so if you don't have it yet, install first.

From the project's root directory, bundling the packages with `yarn`:

```shell
$ yarn
```

After bundling done, run tests with:

```shell
$ yarn test
```

When all the tests passed, install & run on iOS simulator with:

```shell
$ react-native run-ios
```

or connected Android device with:

```shell
$ react-native run-android
```

# What 3rd-party libraries used in this project?

  * [`axios`](): to make network requests
  * [`lodash`](): to manipulate data in functional way (immutable, chaining,...)
  * [`react-native-button`](): to render more customizable buttons (instead of RN's builtin buttons)
  * [`react-native-indicators`](): to show loading indicators
  * [`react-native-joi`](): to validate data received from REST APIs
  * [`react-native-search-box`](): to render fully customizable search boxes
  * [`react-navigation`](): to build navigator skeleton for the whole app
  * To use Redux & middlewares:
    - [`redux`](): Redux core
    - [`react-redux`](): official Redux bindings for React
    - [`redux-actions`](): to create [Flux standard actions](https://github.com/redux-utilities/flux-standard-action) for Redux
    - [`redux-axios-middleware`](): to use Axios requests in Redux system
    - [`redux-thunk`](): thunk middleware for Redux
  * For development & testings:
    - [`axios-mock-adapter`](): mock adapter for axios
    - [`eslint`](): to enforce coding styles (lint) for JX & JSX
    - [`jest`](): unit tests & snapshot tests
