import { $route } from '_route';
import '../fixtures';

import 'matchers/toReturnContentType';

describe('toReturnContentType()', () => {
  it('matches when the action returns a certain content type', () => {
    expect($route('put', '/foo/bar')).toReturnContentType('text/html');
  });

  it('does not match when the action does not return the specified content type', () => {
    expect($route('post', '/foo/bar')).not.toReturnContentType('text/html');
  });
});
