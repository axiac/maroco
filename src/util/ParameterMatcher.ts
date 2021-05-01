import { ParamMetadataArgs } from '../metadata/metadataArgs';
import { Route } from '../metadata/Route';
import { ensureExpectedIsString } from './ensureExpectedIsString';

type ParamType = ParamMetadataArgs['type'];

export class ParameterMatcher {
  private readonly options: {} = {};

  public constructor(
    private readonly matcherContext: Pick<jest.MatcherContext, 'isNot' | 'utils'>,
    private readonly matcherName: string,
    private readonly decoratorName: string,
    private readonly parameterType: ParamType              // the internal type used by the decorator to register the parameter
  ) {
    this.options = { isNot: this.matcherContext.isNot };
  }

  public match(actual: Route, expParamName?: string): jest.CustomMatcherResult {
    // Validate the matcher usage
    if (expParamName !== undefined) {
      ensureExpectedIsString.bind(this, this.matcherName, this.options)(expParamName);
    }

    // Prepare the messages
    let expected: string = '';
    if (expParamName !== undefined) {
      expected = `'${expParamName}'`;
    }
    const messagePrefix: string = this.matcherContext.utils.matcherHint(this.matcherName, actual.getSignature(), expected, this.options);
    const expectedDesc: string = this.matcherContext.utils.EXPECTED_COLOR(`@${this.decoratorName}(${expected})`);

    let pass: boolean;
    let hint: string;

    // There is nothing to check for unhandled routes
    if (actual.isHandled()) {
      const methodName: string = this.matcherContext.utils.RECEIVED_COLOR(actual.getFirstMethodName());

      // Check if the route has the desired parameter
      pass = actual.hasParameter(this.parameterType, expParamName);
      hint = pass ?
        `Hint: do not decorate any argument of method ${methodName} with ${expectedDesc}` :
        `Hint: decorate one argument of method ${methodName} with ${expectedDesc}.`;
    } else {
      // Never matches
      pass = false;
      hint = this.matcherContext.utils.BOLD_WEIGHT('Attention: ') + this.matcherContext.utils.RECEIVED_COLOR('This route is not handled by any controller!');
    }

    return {
      message: () => messagePrefix + '\n\n' + hint + '\n',
      pass,
    };
  }
}
