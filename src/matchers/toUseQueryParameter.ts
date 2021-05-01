import { QueryParam } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseQueryParameter(paramName)
       */
      toUseQueryParameter(paramName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseQueryParameter(expParamName)
expect.extend({
  toUseQueryParameter: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expParamName: string      // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseQueryParameter', QueryParam.name, 'query')
    ).match(route, expParamName);
  },
});
