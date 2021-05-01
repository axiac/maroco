import { CookieParams } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseAllRequestCookies()
       */
      toUseAllRequestCookies(): R;
    }
  }
}

// expect($route(verb, path)).toUseAllRequestCookies()
expect.extend({
  toUseAllRequestCookies: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseAllRequestCookies', CookieParams.name, 'cookies')
    ).match(route);
  },
});
