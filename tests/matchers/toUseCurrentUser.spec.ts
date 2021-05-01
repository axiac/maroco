import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseCurrentUser';

describe('toUseCurrentUser()', () => {
  it('matches when the action receives the current user as argument', () => {
    expect($route('delete', '/foo/bar')).toUseCurrentUser();
  });

  it('does not match when the action does not receive the current user as argument', () => {
    expect($route('post', '/foo/bar')).not.toUseCurrentUser();
  });
});
