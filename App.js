import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import BackgroundFetch from "react-native-background-fetch";

import UserList from "./src/components/userList";

import {store, persistor} from './src/store';

export default class App extends Component {
  componentDidMount() {
      BackgroundFetch.configure({
        minimumFetchInterval: 15,     // <-- minutes (15 is minimum allowed)
        // Android options
        forceAlarmManager: false,     // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false,      // Default
        requiresDeviceIdle: false,    // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false,  // Default
        enableHeadless: true
      }, async (taskId) => {
        console.log("[js] Received background-fetch event: ", taskId);
        // Required: Signal completion of your task to native code
        // If you fail to do this, the OS can terminate your app
        // or assign battery-blame for consuming too much background-time
        BackgroundFetch.finish(taskId);
      }, (error) => {
        console.log("[js] RNBackgroundFetch failed to start");
      });

      // Optional: Query the authorization status.
      BackgroundFetch.status((status) => {
        switch(status) {
          case BackgroundFetch.STATUS_RESTRICTED:
            console.log("BackgroundFetch restricted");
            break;
          case BackgroundFetch.STATUS_DENIED:
            console.log("BackgroundFetch denied");
            break;
          case BackgroundFetch.STATUS_AVAILABLE:
            console.log("BackgroundFetch is enabled");
            break;
        }
      });
    }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <UserList/>
        </PersistGate>
      </Provider>
    );
  }
}
