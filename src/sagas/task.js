import { put, take, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import BackgroundTimer from './timer';

export function* TaskTest() {
    const countdown = () => {
        return eventChannel(emitter => {
            const timer = BackgroundTimer.setInterval(() => {
                const date = new Date();
                date.setHours(23);
                date.setMinutes(59);
                
                const dateNow = new Date();
                
                if (dateNow.getTime() === date.getTime()) {
                    clearInterval(call);
                    emitter(true);
                    BackgroundTimer.clearInterval(timer);
                }
            }, 5000);
        
            return () => {
                console.log('canceled')
            }
        })
    }
      
    const chan = yield call(countdown);
    while (true) {
        const action = yield take(chan);
        console.log('take: ', action);
    }    
}