import { $route } from '_route';
import '../fixtures';

import 'matchers/toRequireAuthorization';

describe('toRequireAuthorization()', () => {
  it('matches when the action requires authorization - one authorized role, one checked role', () => {
    expect($route('put', '/foo/bar')).toRequireAuthorization('admin');
  });

  it('matches when the action requires authorization - one authorized role, no checked role', () => {
    expect($route('put', '/foo/bar')).toRequireAuthorization();
  });

  it('matches when the action requires authorization - multiple authorized roles, one checked role', () => {
    expect($route('delete', '/foo/bar')).toRequireAuthorization('guest');
  });

  it('matches when the action requires authorization - multiple authorized roles, multiple checked roles', () => {
    expect($route('delete', '/foo/bar')).toRequireAuthorization(['guest']);
  });

  it('matches when the action requires authorization - multiple authorized roles, no checked role', () => {
    expect($route('delete', '/foo/bar')).toRequireAuthorization();
  });

  it('does not match when the action does not require authorization', () => {
    expect($route('post', '/foo/bar')).not.toRequireAuthorization();
  });
});
