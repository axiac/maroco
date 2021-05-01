import { Redirect } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ensureExpectedIsString } from '../util/ensureExpectedIsString';
import { ResponseHandlerMatcher } from '../util/ResponseHandlerMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, route)).toRedirect(url)
       */
      toRedirect(url?: string): R;
    }
  }
}

// expect($route(verb, route)).toRedirect(expUrl)
expect.extend({
  toRedirect: function toAnswerWith(
    this: jest.MatcherContext,
    route: Route,             // actual
    expUrl?: string           // expected
  ): jest.CustomMatcherResult {
    const options: jest.MatcherHintOptions = { isNot: this.isNot };

    // Validate the matcher usage
    if (expUrl !== undefined) {
      ensureExpectedIsString.bind(this, 'toRedirect', options)(expUrl);
    }

    return (
      new ResponseHandlerMatcher(this, 'toRedirect', Redirect.name, 'redirect')
    ).matchString(route, expUrl);
  },
});
