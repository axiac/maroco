import { Ctx } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseContext()
       */
      toUseContext(): R;
    }
  }
}

// expect($route(verb, path)).toUseContext()
expect.extend({
  toUseContext: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseContext', Ctx.name, 'context')
    ).match(route);
  },
});
