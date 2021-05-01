import { $route } from '_route';
import '../fixtures';

import 'matchers/toBeHandled';

describe('toBeHandled()', () => {
  it('finds the controller that provides an action that handles the route', () => {
    expect($route('get', '/hello-world/:name')).toBeHandled();
  });

  it('treats the HTTP verb case insensitive', () => {
    expect($route('post', '/hello-world/:name')).toBeHandled();
    expect($route('POST', '/hello-world/:name')).toBeHandled();
  });

  it('checks both the HTTP verb and the route', () => {
    expect($route('get', '/hello-world/:name')).toBeHandled();

    expect($route('put', '/hello-world/:name')).not.toBeHandled();
    expect($route('get', '/hello-world')).not.toBeHandled();

    expect($route('delete', '/foo/bar')).toBeHandled();
  });

  it('can handle OPTIONS (OPTIONS is usually not used by itself but for CORS)', () => {
    expect($route('options', '/hello-world/:name')).toBeHandled();
  });

  it('does not do partial matches', () => {
    expect($route('delete', '/foo')).not.toBeHandled();
    expect($route('delete', '/bar')).not.toBeHandled();
  });

  it('works with routes expressed as regexp (in the action decorator)', () => {
    expect($route('get', '/foo/bar/baz')).toBeHandled();
    expect($route('get', '/foo/bar/boo')).toBeHandled();
  });
});
