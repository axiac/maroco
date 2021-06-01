import { $route } from '_route';
import '../fixtures';

import 'matchers/toAnswerWith';

describe('toAnswerWith200OK()', () => {
  it("matches when the returned status code is '200 OK'", () => {
    expect($route('delete', '/foo/bar')).toAnswerWith200OK();
  });
});

describe('toAnswerWith201Created()', () => {
  it("matches when the returned status code is '201 Created'", () => {
    expect($route('post', '/foo/bar')).toAnswerWith201Created();
  });
});

describe('toAnswerWith202Accepted()', () => {
  it("matches when the returned status code is '202 Accepted'", () => {
    expect($route('post', '/foo/bar')).not.toAnswerWith202Accepted();
  });
});

describe('toAnswerWith204NoContent()', () => {
  it("matches when the returned status code is '204 No Content'", () => {
    expect($route('get', '/foo/bar/something')).toAnswerWith204NoContent();
  });
});

describe('toAnswerWith301MovedPermanently()', () => {
  it("does not match when the returned status code is not '301 Moved Permanently'", () => {
    expect($route('post', '/foo/bar')).not.toAnswerWith301MovedPermanently();
  });
});

describe('toAnswerWith302Found()', () => {
  it("does not match when the returned status code is not '302 Found'", () => {
    expect($route('post', '/foo/bar')).not.toAnswerWith302Found();
  });
});

describe('toAnswerWith()', () => {
  it('matches when the returned status code is the value provided as argument', () => {
    expect($route('post', '/hello-world/:name')).toAnswerWith(204);
  });

  it('does not match when the action is not decorated to produce a certain status code', () => {
    expect($route('get', '/hello-world/:name')).not.toAnswerWith(200);
  });
});
