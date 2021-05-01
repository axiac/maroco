import { Param } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseRouteParameter(paramName)
       */
      toUseRouteParameter(paramName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseRouteParameter(expParamName)
expect.extend({
  toUseRouteParameter: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expParamName: string      // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseRouteParameter', Param.name, 'param')
    ).match(route, expParamName);
  },
});
