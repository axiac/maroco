import { $route } from '_route';
import '../fixtures';

import 'matchers/toRedirect';

describe('toRedirect()', () => {
  it("matches when the action sets the 'Redirect' header with the specified value", () => {
    expect($route('put', '/foo/bar')).toRedirect('http://example.org');
  });

  it("does not match when the action does not set the 'Redirect' header with the specified value", () => {
    expect($route('put', '/foo/bar')).not.toRedirect('http://example.com');
  });

  it("does not match when the action does not set the 'Redirect' header", () => {
    expect($route('post', '/foo/bar')).not.toRedirect();
  });
});
