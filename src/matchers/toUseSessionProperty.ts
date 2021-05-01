import { SessionParam } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseSessionProperty(expPropertyName)
       */
      toUseSessionProperty(expPropertyName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseSessionProperty(expPropertyName)
expect.extend({
  toUseSessionProperty: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expPropertyName: string   // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseSessionProperty', SessionParam.name, 'session-param')
    ).match(route, expPropertyName);
  },
});
