import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseRouteParameter';

describe('toUseRouteParameter()', () => {
  it('matches when the action receives a route parameter as argument', () => {
    expect($route('get', '/hello-world/:name')).toUseRouteParameter('name');
  });

  it('does not match when the action does not receive the specified route parameter as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseRouteParameter('body');
  });
});
