import { HeaderParams } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseAllRequestHeaders()
       */
      toUseAllRequestHeaders(): R;
    }
  }
}

// expect($route(verb, path)).toUseAllRequestHeaders()
expect.extend({
  toUseAllRequestHeaders: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseAllRequestHeaders', HeaderParams.name, 'headers')
    ).match(route);
  },
});
