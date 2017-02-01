import {Observable} from 'rxjs/Observable';
import Rx from 'rxjs/Rx';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {loginErrorToMessage, registerErrorToMessage} from '../../util';
import {signRequest} from '../../util/signRequest';
import hello from 'hellojs';
import {server as serverConfig} from '../../../config';

// ASCII diagram for Rx Streams (see: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)

// Success login:
// --(DO_LOGIN|)
//       switchMap(credentials => ajax)
// -------------(token|)
//       mergeMap
// -------------(LOGIN_SUCCESS with token|)
// -------------(ADD_NOTIFICATION with login success|)

// Failed login:
// --(DO_LOGIN|)
//       switchMap(credentials => ajax)
// -------------(X|)
//       catch
// -------------(LOGIN_ERROR, ADD_NOTIFICATION with login error|)
export const login = action$ => action$
  .ofType(ActionTypes.DO_LOGIN)
  .switchMap(({payload}) => Observable
    .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/login`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: response,
      },
      Actions.addNotificationAction(
        {text: 'Login success', alertType: 'info'}),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.LOGIN_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: loginErrorToMessage(error), alertType: 'danger'}),
    )),
  );

export const oauthLogin = action$ => action$
    .ofType(ActionTypes.DO_OAUTH_LOGIN)
    .mergeMap(({payload}) => Rx.Observable.create(subscriber =>
      hello(payload.provider).login(token => subscriber.next({payload: {token: token.authResponse.access_token, provider: payload.provider}}))
    ))
    .switchMap(({payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/oauth/login`, payload)
      .map(res => res.response)
      .mergeMap(response => Observable.of(
        {
          type: ActionTypes.LOGIN_OAUTH_SUCCESS,
          payload: response,
        },
        Actions.addNotificationAction(
          {text: 'Login success', alertType: 'info'}),
      ))
      .catch(error => Observable.of(
        {
          type: ActionTypes.LOGIN_ERROR,
          payload: {
            error,
          },
        },
        Actions.addNotificationAction({text: loginErrorToMessage(error), alertType: 'danger'}),
      )),
    );

// Similar to login
export const register = action$ => action$
  .ofType(ActionTypes.DO_REGISTER)
  .switchMap(({payload}) => Observable
    .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/register`, payload)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.REGISTER_SUCCESS,
        payload: response,
      },
      Actions.addNotificationAction(
        {text: 'Register success', alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.REGISTER_ERROR,
        payload: {
          error,
        },
      },
      Actions.addNotificationAction({text: registerErrorToMessage(error), alertType: 'danger'}),
    )),
  );

export const logout = action$ => action$
  .ofType(ActionTypes.DO_LOGOUT)
  .switchMap(() => Observable.of(
    {
      type: ActionTypes.DO_LOGOUT_SUCCESS,
    },
    Actions.addNotificationAction(
      {text: 'Logout success', alertType: 'info'},
    ),
  ));

export const updateUser = action$ => action$
  .ofType(ActionTypes.DO_UPDATE_USER)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/user/${payload.id}`, payload, headers)
    .map(res => res.response)
    .mergeMap(response => Observable.of(
      {
        type: ActionTypes.DO_UPDATE_USER_SUCCESS,
        payload: response,
    },
    Actions.addNotificationAction(
      {text: 'Update success', alertType: 'info'},
    ),
  ))
    .catch(err => Observable.of({
      type: ActionTypes.DO_UPDATE_USER_ERROR,
      payload: {
        error: err,
      },
    })),
  );

  export const updateProfile = action$ => action$
    .ofType(ActionTypes.DO_UPDATE_PROFILE)
    .map(signRequest)
    .switchMap(({headers, payload}) => Observable
      .ajax.post(`${serverConfig.protocol}://${serverConfig.host}:${serverConfig.port}/api/user/profile/${payload.id}`, payload, headers)
      .map(res => res.response)
      .mergeMap(response => Observable.of(
        {
          type: ActionTypes.DO_UPDATE_PROFILE_SUCCESS,
          payload: response,
      },
      Actions.addNotificationAction(
        {text: 'Update success', alertType: 'info'},
      ),
    ))
      .catch(err => Observable.of({
        type: ActionTypes.DO_UPDATE_PROFILE_ERROR,
        payload: {
          error: err,
        },
      })),
    );
