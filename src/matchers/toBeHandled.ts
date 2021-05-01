import { Route } from '../metadata/Route';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toBeHandled()
       */
      toBeHandled(): R;
    }
  }
}

// expect($route(verb, path)).toBeHandled()
expect.extend({
  toBeHandled: function(
    this: jest.MatcherContext,
    route: Route              // actual
  ): jest.CustomMatcherResult {
    const matcherName: string = 'toBeHandled';
    const options: jest.MatcherHintOptions = { isNot: this.isNot };

    // It passes if there is at least one action that can handle the route
    const pass: boolean = route.isHandled();

    // Prepare the messages (pass or not pass)
    const matchMessagePrefix: string =
      this.utils.matcherHint(matcherName, route.getSignature(), '', options) +
      '\n\n';
    const expectedDesc: string = this.utils.EXPECTED_COLOR(route.getRouteDecorator());

    const message: () => string =
      pass
        ? () =>
          matchMessagePrefix +
          `Hint: do not decorate any controller method with ${expectedDesc}.\n`
        : () =>
          matchMessagePrefix +
          `Hint: decorate a method of one controller with ${expectedDesc}.\n`
      ;

    return { message, pass };
  },
});
