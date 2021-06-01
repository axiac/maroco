# Jest Matchers for Routing Controllers

Jest **MA**tchers for **RO**uting **CO**ntrollers is the testing companion of the [Routing Controllers](https://www.npmjs.com/package/routing-controllers) package using [Jest](https://jestjs.io/). It allows the developer to write semantic expectations for code that handles the routes of a web application.


---

<a name="install"></a>

## Installing

Install the package using your favorite package manager, as a developer dependency (`devDependency`).


<a name="howto-use"></a>

## How to use Maroco

Using Maroco is as simple as _"one, two, three"_:

1. Create in the tests directory a file that imports all the controller modules. Import this file into all use cases of the routes.<br>
The file is named `all-controllers.ts` in the example below; feel free to use whatever name fits your project better.
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

The following pseudo-code describes the Jest matchers provided by `maroco`, and the expected types of their arguments.

```typescript
// General
expect($route('get', '/foo/bar')).toBeHandled();

// Controller
expect($route('post', '/foo/bar')).toAcceptJSON();
expect($route('post', '/foo/bar')).toReturnJSON();

// Parameters
expect($route('get', '/foo/bar')).toUseRouteParameter(paramName);     // string
expect($route('get', '/foo/bar')).toUseAllRouteParameters();
expect($route('get', '/foo/bar')).toUseQueryParameter(paramName);     // string
expect($route('get', '/foo/bar')).toUseAllQueryParameters();
expect($route('get', '/foo/bar')).toUseBodyParameter(paramName);      // string
expect($route('post', '/foo/bar')).toUseRequestBody();
expect($route('get', '/foo/bar')).toUseRequestHeader(headerName);     // string
expect($route('get', '/foo/bar')).toUseAllRequestHeaders();
expect($route('get', '/foo/bar')).toUseRequestCookie(cookieName);     // string
expect($route('get', '/foo/bar')).toUseAllRequestCookies();
expect($route('get', '/foo/bar')).toUseSessionProperty(propertyName); // string
expect($route('get', '/foo/bar')).toUseSession();
expect($route('get', '/foo/bar')).toUseContext();
expect($route('get', '/foo/bar')).toUseCurrentUser();
expect($route('get', '/foo/bar')).toUseUploadedFile(fileName);        // string
expect($route('get', '/foo/bar')).toUseAllUploadedFiles();

// Response headers
expect($route('get', '/foo/bar')).toRequireAuthorization();
expect($route('post', '/foo/bar')).toAnswerWith200OK();
expect($route('post', '/foo/bar')).toAnswerWith201Created();
expect($route('post', '/foo/bar')).toAnswerWith202Accepted();
expect($route('post', '/foo/bar')).toAnswerWith204NoContent();
expect($route('post', '/foo/bar')).toAnswerWith301MovedPermanently();
expect($route('post', '/foo/bar')).toAnswerWith302Found()
expect($route('post', '/foo/bar')).toAnswerWith(statusCode)           // number
expect($route('post', '/foo/bar')).toReturnContentType(contentType);  // string
expect($route('post', '/foo/bar')).toSetLocation(location);           // string
expect($route('post', '/foo/bar')).toRedirect(url);                   // string
expect($route('post', '/foo/bar')).toSetHeader(header, value?);       // string, string (optional)
```
