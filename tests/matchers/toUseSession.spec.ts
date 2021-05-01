import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseSession';

describe('toUseSession()', () => {
  it('matches when the action receives the session object as argument', () => {
    expect($route('post', '/foo/bar')).toUseSession();
  });

  it('does not match when the action does not receive the session object as argument', () => {
    expect($route('get', '/foo/bar/baz')).not.toUseSession();
  });
});
