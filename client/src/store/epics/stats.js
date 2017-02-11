import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {server as serverConfig} from '../../../config';

export const getStats = action$ => action$
    .ofType(ActionTypes.RETRIEVE_STATS_DATA)
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/stats/${payload.sport}`, payload)
      .map(res => res.response)
      .map(stats => ({
        type: ActionTypes.RETRIEVE_STATS_DATA_SUCCESS,
        payload: {stats},
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.RETRIEVE_STATS_DATA_ERROR,
          payload: {error},
        },
      )),
    );
