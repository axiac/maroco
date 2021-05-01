import { Body } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseRequestBody()
       */
      toUseRequestBody(): R;
    }
  }
}

// expect($route(verb, path)).toUseRequestBody()
expect.extend({
  toUseRequestBody: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseRequestBody', Body.name, 'body')
    ).match(route);
  },
});
