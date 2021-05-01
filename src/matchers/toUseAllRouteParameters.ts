import { Params } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseAllRouteParameters()
       */
      toUseAllRouteParameters(): R;
    }
  }
}

// expect($route(verb, path)).toUseAllRouteParameters()
expect.extend({
  toUseAllRouteParameters: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseAllRouteParameters', Params.name, 'params')
    ).match(route);
  },
});
