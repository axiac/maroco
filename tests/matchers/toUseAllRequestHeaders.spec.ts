import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseAllRequestHeaders';

describe('toUseAllRequestHeaders()', () => {
  it('matches when the action receives all request headers as argument', () => {
    expect($route('post', '/foo/bar')).toUseAllRequestHeaders();
  });

  it('does not match when the action does not receive the request headers as argument', () => {
    expect($route('post', '/hello-world/:name')).not.toUseAllRequestHeaders();
  });
});
