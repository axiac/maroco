import { $route } from '_route';
import '../fixtures';

import 'matchers/toSetLocation';

describe('toSetLocation()', () => {
  it("matches when the 'Location' header is set with the provided value", () => {
    expect($route('post', '/foo/bar')).toSetLocation('http://local-host');
  });

  it("does not match when the 'Location' header is set with a different value", () => {
    expect($route('post', '/foo/bar')).not.toSetLocation('http://localhost');
  });

  it("does not match when the 'Location' header is not set", () => {
    expect($route('put', '/foo/bar')).not.toSetLocation();
  });
});
