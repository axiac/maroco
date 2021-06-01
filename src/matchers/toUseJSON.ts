import { Controller } from '../metadata/Controller';
import { Route } from '../metadata/Route';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toAcceptJSON()
       */
      toAcceptJSON(): R;

      /**
       * expect($route(verb, path)).toReturnJSON()
       */
      toReturnJSON(): R;
    }
  }
}

expect.extend({
  toAcceptJSON: function(this: jest.MatcherContext, route: Route): jest.CustomMatcherResult {
    return toUseJSON.bind(this, 'toAcceptJSON')(route);
  },
  toReturnJSON: function(this: jest.MatcherContext, route: Route): jest.CustomMatcherResult {
    return toUseJSON.bind(this, 'toReturnJSON')(route);
  },
});

// expect($route(verb, path)).toAcceptJSON()
// expect($route(verb, path)).toReturnJSON()
function toUseJSON(
  this: jest.MatcherContext,
  matcherName: string,
  route: Route              // actual
): jest.CustomMatcherResult {
  const options: jest.MatcherHintOptions = { isNot: this.isNot };

  // Prepare the messages
  const matchMessagePrefix: string = this.utils.matcherHint(matcherName, route.getSignature(), '', options);
  const expectedDesc: string = this.utils.EXPECTED_COLOR('@JsonController()');
  const alternative: string = this.utils.EXPECTED_COLOR('@Controller()');

  let pass: boolean;
  let hint: string;

  // There is nothing to check for unhandled routes
  if (route.isHandled()) {
    const controller: Controller = route.getFirstController();
    const className: string = this.utils.RECEIVED_COLOR(controller.getName());

    // Does it match?
    pass = controller.getType() === 'json';
    hint = pass ?
      `Hint: do not decorate the class ${className} with ${expectedDesc}. Use ${alternative} instead.` :
      `Hint: decorate the class ${className} with ${expectedDesc}.`;
  } else {
    // Never matches
    pass = false;
    hint = this.utils.BOLD_WEIGHT('Attention: ') + this.utils.RECEIVED_COLOR('This route is not handled by any controller!');
  }

  return {
    message: () => matchMessagePrefix + '\n\n' + hint + '\n',
    pass,
  };
}
