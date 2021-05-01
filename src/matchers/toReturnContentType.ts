import { ContentType } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ensureExpectedIsString } from '../util/ensureExpectedIsString';
import { ResponseHandlerMatcher } from '../util/ResponseHandlerMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, route)).toReturnContentType(contentType)
       */
      toReturnContentType(contentType: string): R;
    }
  }
}

// expect($route(verb, route)).toReturnContentType(expContentType)
expect.extend({
  toReturnContentType: function toAnswerWith(
    this: jest.MatcherContext,
    route: Route,             // actual
    expContentType: string    // expected
  ): jest.CustomMatcherResult {
    const options: jest.MatcherHintOptions = { isNot: this.isNot };

    // Validate the matcher usage
    ensureExpectedIsString.bind(this, 'toReturnContentType', options)(expContentType);

    return (
      new ResponseHandlerMatcher(this, 'toReturnContentType', ContentType.name, 'content-type')
    ).matchString(route, expContentType);
  },
});
