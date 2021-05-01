import { UploadedFile } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseUploadedFile(fileName)
       */
      toUseUploadedFile(fileName: string): R;
    }
  }
}

// expect($route(verb, path)).toUseUploadedFile(expFileName)
expect.extend({
  toUseUploadedFile: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    expFileName: string       // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseUploadedFile', UploadedFile.name, 'file')
    ).match(route, expFileName);
  },
});
