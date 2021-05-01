import { CookieParam } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseRequestCookie(cookieName)
       */
      toUseRequestCookie(cookieName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseRequestCookie(expCookieName)
expect.extend({
  toUseRequestCookie: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expCookieName: string     // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseRequestCookie', CookieParam.name, 'cookie')
    ).match(route, expCookieName);
  },
});
