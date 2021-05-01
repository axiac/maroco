import { UploadedFiles } from 'routing-controllers';
import { Route } from '../metadata/Route';
import { ParameterMatcher } from '../util/ParameterMatcher';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * expect($route(verb, path)).toUseAllUploadedFiles(name)
       */
      toUseAllUploadedFiles(name: string): R;
    }
  }
}

// expect($route(verb, path)).toUseAllUploadedFiles(name)
expect.extend({
  toUseAllUploadedFiles: function(
    this: jest.MatcherContext,
    route: Route,             // actual
    name: string              // expected
  ): jest.CustomMatcherResult {
    return (
      new ParameterMatcher(this, 'toUseAllUploadedFiles', UploadedFiles.name, 'files')
    ).match(route, name);
  },
});
