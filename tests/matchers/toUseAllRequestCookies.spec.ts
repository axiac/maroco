import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseAllRequestCookies';

describe('toUseAllRequestCookies()', () => {
  it('matches when the action receives all request cookies as argument', () => {
    expect($route('put', '/hello-world/:lastname/:firstname')).toUseAllRequestCookies();
  });

  it('does not match when the action does not receive all request cookies as argument', () => {
    expect($route('post', '/hello-world/:name')).not.toUseAllRequestCookies();
  });
});
