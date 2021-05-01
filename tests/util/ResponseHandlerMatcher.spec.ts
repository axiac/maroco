import { Authorized, ContentType, Header, HttpCode } from 'routing-controllers';

import { ResponseHandlerMatcher } from 'util/ResponseHandlerMatcher';
import { $route } from '_route';

describe('ResponseHandlerMatcher', () => {
  let context: Pick<jest.MatcherContext, 'isNot' | 'utils'>;
  // An object of the described class
  let matcher: ResponseHandlerMatcher;

  beforeEach(() => {
    // Test the use cases: do not allow empty use cases and use cases without expectations
    expect.hasAssertions();
  });

  test.each([
    ['positive', false],
    ['negative', true],
  ])('%s expectations do not pass when the route is not handled (string)', (_, isNot: boolean) => {
    context = {
      isNot: isNot,
      utils: require('jest-matcher-utils'),
    };

    // Create the described object
    matcher = new ResponseHandlerMatcher(context, 'toReturnContentType', ContentType.name, 'content-type');

    const result: jest.CustomMatcherResult = matcher.matchString($route('options', '/no-such-route'), 'text/plain');

    expect(result.pass).toBe(false);
    expect(result.message()).toContain('route is not handled');
  });

  test.each([
    ['positive', false],
    ['negative', true],
  ])('%s expectations do not pass when the route is not handled (key-value)', (_, isNot: boolean) => {
    context = {
      isNot: isNot,
      utils: require('jest-matcher-utils'),
    };

    // Create the described object
    matcher = new ResponseHandlerMatcher(context, 'toReturnContentType', Header.name, 'header');

    const result: jest.CustomMatcherResult = matcher.matchKeyValue($route('options', '/no-such-route'), 'x-b3-traceid', 'abcd1234');

    expect(result.pass).toBe(false);
    expect(result.message()).toContain('route is not handled');
  });

  test.each([
    ['positive', false],
    ['negative', true],
  ])('%s expectations do not pass when the route is not handled (number)', (_, isNot: boolean) => {
    context = {
      isNot: isNot,
      utils: require('jest-matcher-utils'),
    };

    // Create the described object
    matcher = new ResponseHandlerMatcher(context, 'toAnswerWith', HttpCode.name, 'success-code');

    const result: jest.CustomMatcherResult = matcher.matchNumber($route('options', '/no-such-route'), 201);

    expect(result.pass).toBe(false);
    expect(result.message()).toContain('route is not handled');
  });

  test.each([
    ['positive', false],
    ['negative', true],
  ])('%s expectations do not pass when the route is not handled (array)', (_, isNot: boolean) => {
    context = {
      isNot: isNot,
      utils: require('jest-matcher-utils'),
    };

    // Create the described object
    matcher = new ResponseHandlerMatcher(context, 'toAnswerWith', Authorized.name, 'authorized');

    const result: jest.CustomMatcherResult = matcher.matchArray($route('options', '/no-such-route'), ['admin']);

    expect(result.pass).toBe(false);
    expect(result.message()).toContain('route is not handled');
  });
});
