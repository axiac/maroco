import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseAllQueryParameters';

describe('toUseAllQueryParameters()', () => {
  it('matches when the request receives all query params as argument', () => {
    expect($route('get', '/foo/bar/baz')).toUseAllQueryParameters();
  });

  it('does not match when the action does not receive all query params as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseAllQueryParameters();
  });
});
