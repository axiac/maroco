import { Header } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ensureExpectedIsString } from '../util/ensureExpectedIsString';
import { ResponseHandlerMatcher } from '../util/ResponseHandlerMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, route)).toSetHeader(header, value)
       */
      toSetHeader(header: string, value?: string): R;
    }
  }
}

// expect($route(verb, route)).toSetHeader(header, value)
expect.extend({
  toSetHeader: function toAnswerWith(
    this: jest.MatcherContext,
    route: Route,             // actual
    header: string,           // expected
    value?: string
  ): jest.CustomMatcherResult {
    const options: jest.MatcherHintOptions = { isNot: this.isNot };

    // Validate the matcher usage
    ensureExpectedIsString.bind(this, 'toSetHeader', options)(header);
    if (value !== undefined) {
      ensureExpectedIsString.bind(this, 'toSetHeader', options)(value);
    }

    return (
      new ResponseHandlerMatcher(this, 'toSetHeader', Header.name, 'header')
    ).matchKeyValue(route, header, value);
  },
});
