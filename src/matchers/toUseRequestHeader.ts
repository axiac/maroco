import { HeaderParam } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseRequestHeader(paramName)
       */
      toUseRequestHeader(paramName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseRequestHeader(expParamName)
expect.extend({
  toUseRequestHeader: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expParamName: string      // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseRequestHeader', HeaderParam.name, 'header')
    ).match(route, expParamName);
  },
});
