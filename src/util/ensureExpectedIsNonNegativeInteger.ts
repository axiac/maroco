export function ensureExpectedIsNonNegativeInteger(
  this: jest.MatcherContext,
  matcherName: string,
  options: jest.MatcherHintOptions,
  expected: number
): void {
  this.utils.ensureExpectedIsNonNegativeInteger.bind(this)(expected, matcherName, options);
}
