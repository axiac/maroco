import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseAllRouteParameters';

describe('toUseAllRouteParameters()', () => {
  it('matches when the action receives all route parameters as argument', () => {
    expect($route('put', '/hello-world/:lastname/:firstname')).toUseAllRouteParameters();
  });

  it('does not match when the action does not receive the route parameters as argument', () => {
    expect($route('post', '/hello-world/:name')).not.toUseAllRouteParameters();
  });
});
