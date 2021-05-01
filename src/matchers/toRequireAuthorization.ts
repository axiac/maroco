import { Authorized } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ResponseHandlerMatcher } from '../util/ResponseHandlerMatcher';

// tslint:disable-next-line: no-any
type Role = any;

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, route)).toRequireAuthorization(role)
       */
      toRequireAuthorization(role?: Role | Role[]): R;
    }
  }
}

// expect($route(verb, route)).toRequireAuthorization(role)
expect.extend({
  toRequireAuthorization: function toAnswerWith(
    this: jest.MatcherContext,
    route: Route,             // actual
    role?: Role | Role[]      // expected
  ): jest.CustomMatcherResult {
    return (
      new ResponseHandlerMatcher(this, 'toRequireAuthorization', Authorized.name, 'authorized')
    ).matchArray(route, role);
  },
});
