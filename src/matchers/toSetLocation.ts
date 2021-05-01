import { Location } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ensureExpectedIsString } from '../util/ensureExpectedIsString';
import { ResponseHandlerMatcher } from '../util/ResponseHandlerMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, route)).toSetLocation(location)
       */
      toSetLocation(location?: string): R;
    }
  }
}

// expect($route(verb, route)).toSetLocation(expLocation)
expect.extend({
  toSetLocation: function toAnswerWith(
    this: jest.MatcherContext,
    route: Route,             // actual
    expLocation?: string      // expected
  ): jest.CustomMatcherResult {
    const options: jest.MatcherHintOptions = { isNot: this.isNot };

    // Validate the matcher usage
    if (expLocation !== undefined) {
      ensureExpectedIsString.bind(this, 'toSetLocation', options)(expLocation);
    }

    return (
      new ResponseHandlerMatcher(this, 'toSetLocation', Location.name, 'location')
    ).matchString(route, expLocation);
  },
});
