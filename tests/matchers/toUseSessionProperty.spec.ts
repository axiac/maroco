import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseSessionProperty';

describe('toUseSessionProperty()', () => {
  it('matches when the action receives a session property as argument', () => {
    expect($route('delete', '/foo/bar')).toUseSessionProperty('username');
  });

  it('does not match when the action does not receive the specified session property as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseSessionProperty('name');
  });
});
