import 'matchers/toBeHandled';
import { Route } from 'metadata/Route';
import './fixtures';

import { $route } from '_route';

describe('$route()', () => {
  it('identifies a route based on the HTTP method and path', () => {
    expect($route('get', '/hello-world/:name')).toBeInstanceOf(Route);
  });

  // Exceptional situations
  describe('partially described routes', () => {
    it('works when the controller decorator does not specify a path fragment', () => {
      const route: Route = $route('get', '/baz');
      expect(route).toBeInstanceOf(Route);
      expect(route).toBeHandled();
    });

    it('works when the action decorator does not specify a path fragment', () => {
      expect($route('patch', '/hello-world')).toBeInstanceOf(Route);
    });
  });

  describe('not-handled routes', () => {
    let route: Route = $route('get', '/some/not-handled/path');

    it('always returns a Route object, even for unhandled paths', () => {
      expect(route).toBeInstanceOf(Route);
    });

    test('the returned Route object knows that it is not handled', () => {
      expect(route.isHandled()).toBe(false);
    });

    it('returns a Route object for unknown HTTP methods too', () => {
      route = $route('foo', '/hello-world/:name');

      expect(route).toBeInstanceOf(Route);
      expect(route.isHandled()).toBe(false);
    });
  });
});
