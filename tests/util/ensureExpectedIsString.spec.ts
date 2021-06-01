import { ensureExpectedIsString } from 'util/ensureExpectedIsString';

describe('ensureExpectedIsString()', () => {
  let context: Pick<jest.MatcherContext, 'utils'>;
  let ensureExpectedIsStringBound: (expected: string) => void;

  beforeAll(() => {
    context = {
      utils: require('jest-matcher-utils'),
    };
    ensureExpectedIsStringBound = ensureExpectedIsString.bind(context, 'some-matcher', { isNot: false });
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['boolean', true],
    ['number', 3],
    ['array', ['one', 'two']],
    ['object', { foo: 'bar' }],
    // tslint:disable: no-any
  ])('throws if the type of the provided argument is `%s`', (_: string, arg: any) => {
    expect(() => ensureExpectedIsStringBound(arg)).toThrow();
  });

  it('returns (does not throw) if the type of the provided argument is `string', () => {
    expect(() => ensureExpectedIsStringBound('abc')).not.toThrow();
  });
});
