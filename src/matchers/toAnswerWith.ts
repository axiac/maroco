import { HttpCode } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ensureExpectedIsNonNegativeInteger } from '../util/ensureExpectedIsNonNegativeInteger';
import { ResponseHandlerMatcher } from '../util/ResponseHandlerMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, route)).toAnswerWith200OK()
       */
      toAnswerWith200OK(): R;

      /**
       * expect($route(verb, route)).toAnswerWith201Created()
       */
      toAnswerWith201Created(): R;

      /**
       * expect($route(verb, route)).toAnswerWith202Accepted()
       */
      toAnswerWith202Accepted(): R;

      /**
       * expect($route(verb, route)).toAnswerWith204NoContent()
       */
      toAnswerWith204NoContent(): R;

      /**
       * expect($route(verb, route)).toAnswerWith301MovedPermanently()
       */
      toAnswerWith301MovedPermanently(): R;

      /**
       * expect($route(verb, route)).toAnswerWith302Found()
       */
      toAnswerWith302Found(): R;

      /**
       * expect($route(verb, route)).toAnswerWith(statusCode)
       */
      toAnswerWith(statusCode: number): R;
    }
  }
}

expect.extend({
  // 2xx
  toAnswerWith200OK: function(
    this: jest.MatcherContext, route: Route
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith200OK')(route, 200);
  },

  toAnswerWith201Created: function(
    this: jest.MatcherContext, route: Route
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith201Created')(route, 201);
  },

  toAnswerWith202Accepted: function(
    this: jest.MatcherContext, route: Route
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith202Accepted')(route, 202);
  },

  toAnswerWith204NoContent: function(
    this: jest.MatcherContext, route: Route
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith204NoContent')(route, 204);
  },

  // 3xx
  toAnswerWith301MovedPermanently: function(
    this: jest.MatcherContext, route: Route
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith301MovedPermanently')(route, 301);
  },

  toAnswerWith302Found: function(
    this: jest.MatcherContext, route: Route
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith302Found')(route, 302);
  },

  // Generic
  toAnswerWith: function(
    this: jest.MatcherContext, route: Route, expStatusCode: number
  ): jest.CustomMatcherResult {
    return toAnswerWith.bind(this, 'toAnswerWith')(route, expStatusCode);
  },
});

// expect($route(verb, route)).toAnswerWith(expStatusCode)
function toAnswerWith(
  this: jest.MatcherContext,
  matcherName: string,
  route: Route,             // actual
  expStatusCode: number     // expected
): jest.CustomMatcherResult {
  const options: jest.MatcherHintOptions = { isNot: this.isNot };

  // Validate the matcher usage
  ensureExpectedIsNonNegativeInteger.bind(this, matcherName, options)(expStatusCode);

  return (
    new ResponseHandlerMatcher(this, matcherName, HttpCode.name, 'success-code')
  ).matchNumber(route, expStatusCode);
}
