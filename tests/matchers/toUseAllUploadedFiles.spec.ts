import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseAllUploadedFiles';

describe('toUseAllUploadedFiles()', () => {
  it('matches when the action receives all uploaded files as argument', () => {
    expect($route('put', '/foo/bar')).toUseAllUploadedFiles('file2');
  });

  it('does not match when the action does not receive the uploaded files as argument', () => {
    expect($route('post', '/hello-world/:name')).not.toUseAllUploadedFiles('file2');
  });
});
