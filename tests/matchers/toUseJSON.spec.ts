import { $route } from '_route';
import '../fixtures';

import 'matchers/toUseJSON';

describe('toAcceptJSON()', () => {
  it('matches when the action accepts a JSON body', () => {
    expect($route('post', '/hello-world/:name')).toAcceptJSON();
  });

  it('does not match when the action does not accept JSON body', () => {
    expect($route('post', '/foo/bar')).not.toAcceptJSON();
  });

  it('does not match when the route is not handled', () => {
    expect($route('get', '/foo/bar')).not.toAcceptJSON();
  });
});

describe('toReturnJSON()', () => {
  it('matches when the action returns a JSON body', () => {
    expect($route('post', '/hello-world/:name')).toReturnJSON();
  });

  it('does not match when the action does not return a JSON body', () => {
    expect($route('post', '/foo/bar')).not.toReturnJSON();
  });

  it('does not match when the route is not handled', () => {
    expect($route('get', '/foo/bar')).not.toReturnJSON();
  });
});
