import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseUploadedFile';

describe('toUseUploadedFile()', () => {
  it('matches when the action receives an uploaded file as argument', () => {
    expect($route('put', '/hello-world/:lastname/:firstname')).toUseUploadedFile('file1');
  });

  it('does not match when the action action does not receive the specified uploaded file as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseUploadedFile('title');
  });
});
