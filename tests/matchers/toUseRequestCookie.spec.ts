import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseRequestCookie';

describe('toUseRequestCookie()', () => {
  it('matches when the the action receives a request cookie as argument', () => {
    expect($route('get', '/hello-world/:name')).toUseRequestCookie('session-token');
  });

  it('does not match when the action does not receive the specified request cookie as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseRequestCookie('name');
  });
});
