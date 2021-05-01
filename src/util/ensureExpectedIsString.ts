export function ensureExpectedIsString(
  this: jest.MatcherContext,
  matcherName: string,
  options: jest.MatcherHintOptions,
  expected: string
): void {
  if (typeof expected !== 'string') {
    const matcherString: string = (options ? '' : '[.not]') + matcherName;
    throw new Error(
      this.utils.matcherErrorMessage(
        this.utils.matcherHint(matcherString, undefined, undefined, options),
        `${this.utils.EXPECTED_COLOR('expected')} must be a string`,
        this.utils.printWithType('Expected', expected, this.utils.printExpected)
      )
    );
  }
}
