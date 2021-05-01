import { CurrentUser } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseCurrentUser()
       */
      toUseCurrentUser(): R;
    }
  }
}

// expect($route(verb, path)).toUseCurrentUser()
expect.extend({
  toUseCurrentUser: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseCurrentUser', CurrentUser.name, 'current-user')
    ).match(route);
  },
});
