import { $route } from '_route';
import '../fixtures';

import 'matchers/toSetHeader';

describe('toSetHeader()', () => {
  it('matches when the header is set with the provided value', () => {
    expect($route('put', '/foo/bar')).toSetHeader('x-b3-traceid', 'abcd1234');
  });

  it('does not match when the header is set with a different value', () => {
    expect($route('put', '/foo/bar')).not.toSetHeader('x-b3-traceid', 'xyz');
  });

  it('does not match when the header is not set', () => {
    expect($route('post', '/foo/bar')).not.toSetHeader('x-b3-traceid');
  });
});
