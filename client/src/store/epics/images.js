import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import {server as serverConfig} from '../../../config';

export const getImages = action$ => action$
    .ofType(ActionTypes.GET_IMAGES)
    .switchMap(({headers, payload}) => Observable
      .ajax.get(`http://${serverConfig.host}:${serverConfig.port}/api/images/${payload.folder}`, headers)
      .map(res => res.response)
      .map(images => ({
        type: ActionTypes.GET_IMAGES_SUCCESS,
        payload: images,
      }))
      .catch(error => Observable.of(
        {
          type: ActionTypes.GET_EXERCISES_ERROR,
          payload: {error},
        },
      )),
    );
