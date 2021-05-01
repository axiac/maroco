import { Session } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseSession()
       */
      toUseSession(): R;
    }
  }
}

// expect($route(verb, path)).toUseSession()
expect.extend({
  toUseSession: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseSession', Session.name, 'session')
    ).match(route);
  },
});
