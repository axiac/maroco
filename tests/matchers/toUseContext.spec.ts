import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseContext';

describe('toUseContext()', () => {
  it('matches when the action receives the context object as argument', () => {
    expect($route('get', '/foo/bar/baz')).toUseContext();
  });

  it('does not match when the action does not receive the context object as argument', () => {
    expect($route('post', '/foo/bar')).not.toUseContext();
  });
});
