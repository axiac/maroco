import { Param } from 'routing-controllers';

import { ParameterMatcher } from 'util/ParameterMatcher';
import { $route } from '_route';

describe('ParameterMatcher', () => {
  let context: Pick<jest.MatcherContext, 'isNot' | 'utils'>;
  // An object of the described class
  let matcher: ParameterMatcher;

  beforeEach(() => {
    // Test the use cases: do not allow empty use cases and use cases without expectations
    expect.hasAssertions();
  });

  test.each([
    ['positive', false],
    ['negative', true],
  ])('%s expectations do not pass when the route is not handled', (_, isNot: boolean) => {
    context = {
      isNot: isNot,
      utils: require('jest-matcher-utils'),
    };

    // Create the described object
    matcher = new ParameterMatcher(context, 'toCheckSomeParameter', Param.name, 'param');

    const result: jest.CustomMatcherResult = matcher.match($route('options', '/no-such-route'), 'something');

    expect(result.pass).toBe(false);
    expect(result.message()).toContain('route is not handled');
  });
});
