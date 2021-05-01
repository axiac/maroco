# Jest Matchers for Routing Controllers

Jest **MA**tchers for **RO**uting **CO**ntrollers is the testing companion of the [Routing Controllers](https://www.npmjs.com/package/routing-controllers) package using [Jest](https://jestjs.io/). It allows the developer to write semantic expectations for code that handles the routes of a web application.


---

<a name="install"></a>

## Installing

Install the package as usual, using your favorite Npm package manager, as a developer dependency (`devDependency`).


<a name="howto-use"></a>

## How to use Maroco

Using Maroco is as simple as _"one, two, three"_:

1. Create in the tests directory a file that imports all the controller modules. It is named `all-controllers.ts` in the example below. Import this file into all use cases of the routes.
2. Use the [function `$route()`](#route) in use cases to identify the action that handles the described route.
3. Use the [Jest matchers](#jest-matchers) described below on the value returned by `$route()`.

**The file `all-controllers.ts`:**

```typescript
import 'controllers/Hello';
import 'controllers/Foo';
// etc
```

**A use case:**

```typescript
// Load the $route() function; it is needed to identify the action that handles a route
import { $route } from '@axiac.ro/maroco';

// Load all controllers
import './all-controllers';

// Describe the expected behaviour of the code that handles a certain route
describe('GET /hello/world?foo=bar', () => {
  it('is handled', () => {
    expect($route('get', '/hello/world')).toBeHandled();
  });

  it('returns JSON', () => {
    expect($route('get', '/hello/world')).toReturnJSON();
  });

  it('uses the `foo` query parameter', () => {
    expect($route('get', '/hello/world')).toUseQueryParameter('foo')
  })
});
```

---

<a name="route"></a>

## The `$route()` function

Identifies the controller action that handles the provided verb and path. The object it returns can be passed to [`expect()`](https://jestjs.io/docs/expect)

```typescript
function $route(verb: string, route: string)
```

### Arguments

* `verb` - a HTTP verb (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` etc); the value is case-insensitive;
* `route` - the path fragment of the URL.

---

<a name="jest-matchers"></a>

## The Jest matchers

```typescript
// General
expect($route('get', '/foo/bar')).toBeHandled();

// Controller
expect($route('post', '/foo/bar')).toAcceptJSON();
expect($route('post', '/foo/bar')).toReturnJSON();

// Parameters
expect($route('get', '/foo/bar')).toUseRouteParameter(paramName);
expect($route('get', '/foo/bar')).toUseAllRouteParameters();
expect($route('get', '/foo/bar')).toUseQueryParameter(paramName);
expect($route('get', '/foo/bar')).toUseAllQueryParameters();
expect($route('get', '/foo/bar')).toUseBodyParameter(paramName);
expect($route('post', '/foo/bar')).toUseRequestBody();
expect($route('get', '/foo/bar')).toUseRequestHeader(headerName);
expect($route('get', '/foo/bar')).toUseAllRequestHeaders();
expect($route('get', '/foo/bar')).toUseRequestCookie(cookieName);
expect($route('get', '/foo/bar')).toUseAllRequestCookies();
expect($route('get', '/foo/bar')).toUseSessionProperty(propertyName);
expect($route('get', '/foo/bar')).toUseSession();
expect($route('get', '/foo/bar')).toUseContext();
expect($route('get', '/foo/bar')).toUseCurrentUser();
expect($route('get', '/foo/bar')).toUseUploadedFile(fileName);
expect($route('get', '/foo/bar')).toUseAllUploadedFiles();

// Response headers
expect($route('get', '/foo/bar')).toRequireAuthorization();
expect($route('post', '/foo/bar')).toAnswerWith200OK();
expect($route('post', '/foo/bar')).toAnswerWith201Created();
expect($route('post', '/foo/bar')).toAnswerWith202Accepted();
expect($route('post', '/foo/bar')).toAnswerWith204NoContent();
expect($route('post', '/foo/bar')).toAnswerWith301MovedPermanently();
expect($route('post', '/foo/bar')).toAnswerWith302Found()
expect($route('post', '/foo/bar')).toAnswerWith(statusCode)
expect($route('post', '/foo/bar')).toReturnContentType(contentType);
expect($route('post', '/foo/bar')).toSetLocation(location);
expect($route('post', '/foo/bar')).toRedirect(url);
expect($route('post', '/foo/bar')).toSetHeader(header, value);
```
