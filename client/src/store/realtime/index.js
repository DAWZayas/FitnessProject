import {Observable} from 'rxjs/Observable';

import {connPromise, r} from '../../util';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';

export const registerSessionsObservable = () =>
  Observable.fromPromise(connPromise)
  .concatMap(conn => Observable.fromPromise(r.table('SportSession').changes().run(conn)))
  .switchMap(cursor => Observable.create((observer) => {
    cursor.each((err, row) => {
      if (err) throw err;
      observer.next(row);
    });
    return function() {
      cursor.close();
    };
  }))
  .map(row => row.new_val)
  .filter(session => !!session)
  .map(session => ({
    type: ActionTypes.UPDATE_ATLETE_POSITION_SUCCESS,
    payload: session,
    hola: console.log(session),
  }))
  .catch(error => Observable.of(
    Actions.addNotificationAction({text: error.toString(), alertType: 'danger'}),
  ));
