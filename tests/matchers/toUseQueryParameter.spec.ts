import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseQueryParameter';

describe('toUseQueryParameter()', () => {
  it('matches when the action receives a query parameter as argument', () => {
    expect($route('get', '/hello-world/:name')).toUseQueryParameter('title');
  });

  it('does not match when the action does not receive the provided query parameter as argument', () => {
    expect($route('get', '/hello-world/:name')).not.toUseQueryParameter('name');
  });
});
