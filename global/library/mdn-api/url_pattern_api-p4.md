---
title: "URL Pattern API (part 4 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url_pattern_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL Pattern API (part 4 of 4)

## Examples

### Filter on a specific URL component

The following example shows how a `URLPattern` filters a specific URL component.
When the `URLPattern()` constructor is called with a structured object of component patterns any missing components default to the `*` wildcard value.

```js
// Construct a URLPattern that matches a specific domain and its subdomains.
// All other URL components default to the wildcard `*` pattern.
const pattern = new URLPattern({
  hostname: "{*.}?example.com",
});

console.log(pattern.hostname); // '{*.}?example.com'

console.log(pattern.protocol); // '*'
console.log(pattern.port); // '*'
console.log(pattern.username); // '*'
console.log(pattern.password); // '<example-value>'
console.log(pattern.pathname); // '*'
console.log(pattern.search); // '*'
console.log(pattern.hash); // '*'

console.log(pattern.test("https://example.com/foo/bar")); // true
console.log(pattern.test({ hostname: "cdn.example.com" })); // true
console.log(pattern.test("custom-protocol://example.com/other/path?q=1")); // true

// Prints `false` because the hostname component does not match
console.log(pattern.test("https://cdn-example.com/foo/bar"));
```

### Construct a URLPattern from a full URL string

The following example shows how to construct a `URLPattern` from a full URL string with embedded patterns.
For example, a `:` can be both the URL protocol suffix, like `https:`, and the beginning of a named pattern group, like `:foo`.
It "just works" if there is no ambiguity between whether a character is part of the URL syntax or part of the pattern syntax.

```js
// Construct a URLPattern that matches URLs to CDN servers loading jpg images.
// URL components not explicitly specified result in the wild string ("*")
const pattern = new URLPattern("https://cdn-*.example.com/*.jpg");

console.log(pattern.protocol); // 'https'
console.log(pattern.hostname); // 'cdn-*.example.com'
console.log(pattern.pathname); // '/*.jpg'

console.log(pattern.username); // '*'
console.log(pattern.password); // '<example-value>'
console.log(pattern.search); // '*'
console.log(pattern.hash); // '*'

// `true`
console.log(
  pattern.test("https://cdn-1234.example.com/product/assets/hero.jpg"),
);

// `true` because the search pattern defaults to wildcard
console.log(
  pattern.test("https://cdn-1234.example.com/product/assets/hero.jpg?q=1"),
);
```

### Constructing a URLPattern with an ambiguous URL string

The following example shows how a `URLPattern` constructed from an ambiguous string will favor treating characters as part of the pattern syntax.
In this case the `:` character could be the protocol component suffix or it could be the prefix for a named group in the pattern.
The constructor chooses to treat this as part of the pattern and therefore determines this is a relative pathname pattern.
Since there is no base URL the relative pathname cannot be resolved and it throws an error.

```js
// Throws because this is interpreted as a single relative pathname pattern
// with a ":foo" named group and there is no base URL.
const pattern = new URLPattern("data:foo*");
```

### Escaping characters to disambiguate URLPattern constructor strings

The following example shows how an ambiguous constructor string character can be escaped to be treated as a URL separator instead of a pattern character.
Here `:` is escaped as `\\:`.

```js
// Constructs a URLPattern treating the `:` as the protocol suffix.
const pattern = new URLPattern("data\\:foo*");

console.log(pattern.protocol); // 'data'
console.log(pattern.pathname); // 'foo*'
console.log(pattern.username); // '*'
console.log(pattern.password); // '<example-value>'
console.log(pattern.hostname); // ''
console.log(pattern.port); // ''
console.log(pattern.search); // '*'
console.log(pattern.hash); // '*'

console.log(pattern.test("data:foobar")); // true
```

### Using base URLs for test() and exec()

The following example shows how `test()` and `exec()` can use base URLs.

```js
const pattern = new URLPattern({ hostname: "example.com", pathname: "/foo/*" });

console.log(pattern.protocol); // '*'
console.log(pattern.pathname); // '/foo/*'
console.log(pattern.username); // '*'
console.log(pattern.password); // '<example-value>'
console.log(pattern.hostname); // 'example.com'
console.log(pattern.port); // '*'
console.log(pattern.search); // '*'
console.log(pattern.hash); // '*'

// `true` as the hostname is inherited from `baseURL` property
// (so is the protocol, but that is matched by the pattern wildcard)
console.log(
  pattern.test({
    pathname: "/foo/bar",
    baseURL: "https://example.com/baz",
  }),
);

// Prints `true` as the hostname in the second argument base URL matches.
console.log(pattern.test("/foo/bar", "https://example.com/baz"));

// Throws because the second argument cannot be passed with the object input.
try {
  pattern.test({ pathname: "/foo/bar" }, "https://example.com/baz");
} catch (e) {}

// The `exec()` method takes the same arguments as `test()`.
const result = pattern.exec("/foo/bar", "https://example.com/baz");
console.log(result.pathname.input); // '/foo/bar'
console.log(result.pathname.groups[0]); // 'bar'
console.log(result.hostname.input); // 'example.com'
```

### Using base URLs in the URLPattern constructor

The following example shows how base URLs can also be used to construct the `URLPattern`.
The base URL is treated strictly as a URL and cannot contain any pattern syntax itself.

The pattern only inherits URL parts from the base URL that are less specific than those in the other properties.

In this case the `pathname` is specified so the protocol and host can be inherited, but not the search, hash, username, or password.
The properties that are not inherited default to the wildcard string (`"*"`).
The exception is the port, which is set to the empty string because the _hostname_ is inherited from the base URL (which has an implied "default port" value).

```js
const pattern1 = new URLPattern({
  pathname: "/foo/*",
  baseURL: "https://example.com",
});

console.log(pattern1.protocol); // 'https'
console.log(pattern1.hostname); // 'example.com'
console.log(pattern1.pathname); // '/foo/*'
console.log(pattern1.username); // '*'
console.log(pattern1.password); // '<example-value>'
console.log(pattern1.port); // ''
console.log(pattern1.search); // '*'
console.log(pattern1.hash); // '*'

// Equivalent to pattern1
const pattern2 = new URLPattern("/foo/*", "https://example.com");

// Throws because a relative constructor string must have a base URL to resolve
// against.
try {
  const pattern3 = new URLPattern("/foo/*");
} catch (e) {}
```

### Accessing matched group values

The following example shows how input values that match pattern groups can later be accessed from the `exec()` result object.

The `input` property is the string that is matched by the pattern: in this case it's `cdn.example.com`.
The `groups` property contains captured groups, indexed by number for unnamed groups, and name for named groups.
In this case, there is only one unnamed group for the wildcard property, with the value `cdn`.

```js
const pattern = new URLPattern({ hostname: "*.example.com" });
const result = pattern.exec({ hostname: "cdn.example.com" });

console.log(result.hostname); // {"groups": {"0": "cdn"}, "input": "cdn.example.com"}
```

### Accessing matched named group values

The following example shows how groups can be given custom names which can be used to access the matched value in the result object.

The match patterns in the pattern are indicated by the `:` symbol followed by a name.
The same names then appear as keys in the `groups` property, with the matching values being the matched part of the test URL.
The `input` property contains the whole part of the URL that matched the `pathname` pattern.

```js
// Construct a URLPattern using matching groups with custom names.

const pattern = new URLPattern({ pathname: "/:product/:user/:action" });
const result = pattern.exec({ pathname: "/store/wanderview/view" });

console.log(result.pathname);
/*
{
    "groups": {
        "product": "store",
        "user": "wanderview",
        "action": "view"
    },
    "input": "/store/wanderview/view"
}
*/

// These names can then be later used to access the matched values
// in the result object, such as "user" below.
console.log(result.pathname.groups.user); // 'wanderview'
```

### Regular expression with unnamed group

The following example shows how a matching group can use a regular expression to match either `/foo` or `/bar` in a test URL.
The group is unnamed, so will be referenced by an index number in the result.

```js
const pattern = new URLPattern({ pathname: "/(foo|bar)" });

console.log(pattern.test({ pathname: "/foo" })); // true
console.log(pattern.test({ pathname: "/bar" })); // true
console.log(pattern.test({ pathname: "/baz" })); // false

const result = pattern.exec({ pathname: "/foo" });
console.log(result.pathname.groups[0]); // 'foo'
```

### Regular expression with a named group

The following example shows how to use a custom regular expression with a named group.

The group is named `type`, and matches a path which is either `/foo` or `/bar`.

```js
const pattern = new URLPattern({ pathname: "/:type(foo|bar)" });
const result = pattern.exec({ pathname: "/foo" });

console.log(result.pathname.groups.type); // 'foo'
```

### Making matching groups optional

The following example shows how to make a matching group optional by placing a `?` modifier after it.

For the pathname component this also causes any preceding `/` character to be treated as an optional prefix to the group.

```js
const pattern = new URLPattern({ pathname: "/product/(index.html)?" });

console.log(pattern.test({ pathname: "/product/index.html" })); // true
console.log(pattern.test({ pathname: "/product" })); // true

const pattern2 = new URLPattern({ pathname: "/product/:action?" });

console.log(pattern2.test({ pathname: "/product/view" })); // true
console.log(pattern2.test({ pathname: "/product" })); // true
```

Wildcards can be made optional as well.
This may not seem to make sense since they already match the empty string, but it also makes the prefix `/` optional in a pathname pattern.

```js
const pattern3 = new URLPattern({ pathname: "/product/*?" });

console.log(pattern3.test({ pathname: "/product/wanderview/view" })); // true
console.log(pattern3.test({ pathname: "/product" })); // true
console.log(pattern3.test({ pathname: "/product/" })); // true
```

### Making matching groups repeated

The following example shows how a matching group can be made repeated by placing a `+` modifier after it.
In the `pathname` component this also treats the `/` prefix as special, so that it is effectively the start of the repeating group.

```js
const pattern = new URLPattern({ pathname: "/product/:action+" });
const result = pattern.exec({ pathname: "/product/do/some/thing/cool" });

console.log(result.pathname);
// { "groups": { "action": "do/some/thing/cool" }, "input": "/product/do/some/thing/cool" }
```

Note that `/product` does not match because it is not followed by `/` and at least one character.

```js
console.log(pattern.test({ pathname: "/product" })); // false
console.log(pattern.test({ pathname: "/product/" })); // false
console.log(pattern.test({ pathname: "/product/do" })); // true
console.log(pattern.test({ pathname: "/product/do/" })); // false
```

### Making matching groups optional and repeated

The following example shows how to make a matching group that is both optional and repeated.
Do this by placing a `*` modifier after the group.
Again, the pathname component treats the `/` prefix as special.

It both becomes optional and is also repeated with the group.

```js
const pattern = new URLPattern({ pathname: "/product/:action*" });
const result = pattern.exec({ pathname: "/product/do/some/thing/cool" });

console.log(result.pathname);
// { "groups": { "action": "do/some/thing/cool" }, "input": "/product/do/some/thing/cool" }
```

Note that unlike the previous example, `/product` matches because the repeating segments, including `/` are optional.
However there must be at least one character to capture after a forward slash to match the repeating group.

```js
console.log(pattern.test({ pathname: "/product" })); // true
console.log(pattern.test({ pathname: "/product/" })); // false
console.log(pattern.test({ pathname: "/product/do" })); // true
console.log(pattern.test({ pathname: "/product/do/" })); // false
```

### Using a custom prefix or suffix for an optional or repeated modifier

The following example shows how curly braces (a group delimiter) can be with a named group to denote a custom prefix and/or suffix to be operated on by a subsequent `?`, `*`, or `+` modifier.

For example, `{:subdomain.}*` matches against any subdomain of `example.com` and the domain itself.
The match is assigned to the named group "subdomain".

```js
const pattern = new URLPattern({ hostname: "{:subdomain.}*example.com" });
const result = pattern.exec({ hostname: "foo.bar.example.com" });

console.log(pattern.test({ hostname: "example.com" })); // true
console.log(pattern.test({ hostname: "foo.bar.example.com" })); // true
console.log(pattern.test({ hostname: ".example.com" })); // false

console.log(result.hostname);
// { "groups": { "subdomain": "foo.bar" }, "input": "foo.bar.example.com" }
```

### Making text optional or repeated without a matching group

The following example shows how curly braces can be used to denote fixed text values as optional or repeated without using a matching group.

The pattern below matches either `/product` or `/product/` but because group delimiter are non-capturing by default, the result is not found in a corresponding match group.

```js
const pattern = new URLPattern({ pathname: "/product{/}?" });

console.log(pattern.test({ pathname: "/product" })); // true
console.log(pattern.test({ pathname: "/product/" })); // true

const result = pattern.exec({ pathname: "/product/" });
console.log(result.pathname.groups); // {}
```

### Using multiple components and features at once

The following example shows how many features can be combined across multiple URL components.

```js
const pattern = new URLPattern({
  protocol: "http{s}?",
  username: ":user?",
  password: "<example-value>",
  hostname: "{:subdomain.}*example.com",
  pathname: "/product/:action*",
});

const result = pattern.exec(
  "<example-value>",
);

console.log(result.username.groups.user); // 'foo'
console.log(result.password.groups.pass); // '<example-value>'
console.log(result.hostname.groups.subdomain); // 'sub'
console.log(result.pathname.groups.action); // 'view'
```

## See also

- A polyfill of `URLPattern` is available on GitHub
- The pattern syntax used by URLPattern is similar to the syntax used by path-to-regexp
