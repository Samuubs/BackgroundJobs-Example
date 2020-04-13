/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';
import BackgroundFetch from "react-native-background-fetch";

let MyHeadlessTask = async (event) => {

    //adb shell cmd jobscheduler run -f com.reduxpersistexample 999
    //adb shell dumpsys jobscheduler

    // Get task id from event {}:
    let taskId = event.taskId;
    console.log("terminate task", taskId)
    BackgroundFetch.finish(taskId);
}

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

AppRegistry.registerComponent(appName, () => App);
