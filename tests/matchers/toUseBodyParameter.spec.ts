import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseBodyParameter';

describe('toUseBodyParameter()', () => {
  it('matches when the action receives a certain body parameter as argument', () => {
    expect($route('put', '/hello-world/:lastname/:firstname')).toUseBodyParameter('title');
  });

  it('does not match when the action does not receive the specified body parameter as argument', () => {
    expect($route('post', '/hello-world/:name')).not.toUseBodyParameter('body');
  });
});
