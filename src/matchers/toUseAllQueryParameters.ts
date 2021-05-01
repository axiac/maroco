import { QueryParams } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseAllQueryParameters()
       */
      toUseAllQueryParameters(): R;
    }
  }
}

// expect($route(verb, path)).toUseAllQueryParameters()
expect.extend({
  toUseAllQueryParameters: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseAllQueryParameters', QueryParams.name, 'queries')
    ).match(route);
  },
});
