import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseRequestBody';

describe('toUseRequestBody()', () => {
  it('matches when the action receives the request body as argument', () => {
    expect($route('post', '/hello-world/:name')).toUseRequestBody();
  });

  it('does not match when the action does not receive the request body as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseRequestBody();
  });
});
