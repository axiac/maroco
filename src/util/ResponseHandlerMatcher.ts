import { AssertionError } from 'assert';
import { ResponseHandlerMetadata } from 'routing-controllers';
import { Route } from '../metadata/Route';

type ResponseHandlerType = ResponseHandlerMetadata['type'];

export class ResponseHandlerMatcher {
  private readonly options: jest.MatcherHintOptions = {};

  public constructor(
    private readonly matcherContext: Pick<jest.MatcherContext, 'isNot' | 'utils'>,
    private readonly matcherName: string,
    private readonly decoratorName: string,
    private readonly handlerType: ResponseHandlerType         // the internal type used by the decorator to register the response handler
  ) {
    this.options = { isNot: this.matcherContext.isNot };
  }

  public matchString(actual: Route, expValue?: string): jest.CustomMatcherResult {
    let pass: boolean;
    if (actual.isHandled()) {
      // Does it match?
      pass = actual.putsStringInResponseHeader(this.handlerType, expValue);
    } else {
      // There is nothing to check for unhandled routes
      // It never matches
      pass = false;
    }

    return this.formatMatcherResult(actual, pass, `'${expValue}'`);
  }

  public matchKeyValue(actual: Route, expValue: string, expExtra?: string): jest.CustomMatcherResult {
    assertHandlerTypeIs('header', this.handlerType);

    let pass: boolean;
    if (actual.isHandled()) {
      // Does it match?
      pass = actual.putsHeaderInResponse(this.handlerType, expValue, expExtra);
    } else {
      // There is nothing to check for unhandled routes
      // It never matches
      pass = false;
    }

    let expected: string;
    expected = `'${expValue}'`;
    if (expExtra !== undefined) {
      expected = `${expected}, '${expExtra}'`;
    }

    return this.formatMatcherResult(actual, pass, expected);
  }

  public matchNumber(actual: Route, expValue?: number): jest.CustomMatcherResult {
    assertHandlerTypeIs('success-code', this.handlerType);

    let pass: boolean;
    if (actual.isHandled()) {
      // Does it match?
      pass = actual.setsStatusCode(this.handlerType, expValue);
    } else {
      // There is nothing to check for unhandled routes
      // It never matches
      pass = false;
    }

    return this.formatMatcherResult(actual, pass, `${expValue}`);
  }

  // tslint:disable-next-line: no-any
  public matchArray(actual: Route, expValue?: any | any[]): jest.CustomMatcherResult {
    assertHandlerTypeIs('authorized', this.handlerType);

    let pass: boolean;
    if (actual.isHandled()) {
      // Does it match?
      pass = actual.handlesAuthorized(this.handlerType, expValue);
    } else {
      // There is nothing to check for unhandled routes
      // It never matches
      pass = false;
    }

    return this.formatMatcherResult(actual, pass, JSON.stringify(expValue));
  }

  protected formatMatcherResult(actual: Route, pass: boolean, expected: string): jest.CustomMatcherResult {
    // Format the expectation
    const messagePrefix: string = this.matcherContext.utils.matcherHint(this.matcherName, actual.getSignature(), expected, this.options);

    // Prepare the hint
    let hint: string;
    if (actual.isHandled()) {
      const methodName: string = this.matcherContext.utils.RECEIVED_COLOR(actual.getFirstMethodName());
      const expectedDesc: string = this.matcherContext.utils.EXPECTED_COLOR(`@${this.decoratorName}(${expected})`);

      hint = pass ?
        `Hint: do not decorate the method ${methodName} with ${expectedDesc}` :
        `Hint: decorate the method ${methodName} with ${expectedDesc}`;
    } else {
      hint = this.matcherContext.utils.BOLD_WEIGHT('Attention: ') +
        this.matcherContext.utils.RECEIVED_COLOR('This route is not handled by any controller!');
    }

    return {
      message: () => messagePrefix + '\n\n' + hint + '\n',
      pass,
    };
  }
}

// Guard against incorrect usage of some methods
function assertHandlerTypeIs<T extends ResponseHandlerType>(expected: T, handlerType: ResponseHandlerType): asserts handlerType is T {
  if (handlerType !== expected) {
    throw new AssertionError({
      actual: handlerType,
      expected: expected,
      message: `The value of this.handlerType is not '${expected}'`,
    });
  }
}
