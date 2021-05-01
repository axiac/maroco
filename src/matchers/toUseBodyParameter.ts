import { BodyParam } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseBodyParameter(paramName)
       */
      toUseBodyParameter(paramName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseBodyParameter(expParamName)
expect.extend({
  toUseBodyParameter: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expParamName: string      // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseBodyParameter', BodyParam.name, 'body-param')
    ).match(route, expParamName);
  },
});
