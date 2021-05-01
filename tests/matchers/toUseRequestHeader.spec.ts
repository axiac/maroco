import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseRequestHeader';

describe('toUseRequestHeader()', () => {
  it('matches when the action receives a request header as argument', () => {
    expect($route('post', '/hello-world/:name')).toUseRequestHeader('accept');
  });

  it('does not match when the action does not receive the specified request header as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseRequestHeader('name');
  });
});
