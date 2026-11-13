---
title: "URL Pattern API (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url_pattern_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL Pattern API (part 2 of 4)

## Pattern syntax

The syntax for patterns is based on the path-to-regexp JavaScript library.
This syntax is similar to the one used in Ruby on Rails, or JavaScript frameworks like Express or Next.js.

### Fixed text and capture groups

Each pattern can contain a combination of fixed text and groups.
The fixed text is a sequence of characters that is matched exactly.
Groups match an arbitrary string based on matching rules.
Each URL part has its own default rules that are explained below, but they can be overwritten.

```js
// A pattern matching some fixed text
const pattern = new URLPattern({ pathname: "/books" });
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.exec("https://example.com/books").pathname.groups); // {}
```

```js
// A pattern matching with a named group
const pattern = new URLPattern({ pathname: "/books/:id" });
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { id: '123' }
```

### Segment wildcard

By default, a group matching the `pathname` part of the URL will match all characters but the forward slash (`/`). In the `hostname` part, the group will match all characters except the dot (`.`).
In all other parts, the group will match all characters.
The segment wildcard is non-greedy, meaning that it will match the shortest possible string.

### Regex matchers

Instead of using the default match rules for a group, you can specify a regex for each group by specifying it in parentheses.
This regex defines the matching rules for the group.
Below is an example of a regex matcher on a named group that constrains the group to only match if it contains one or more digits:

```js
const pattern1 = new URLPattern("/books/:id(\\d+)", "https://example.com");
console.log(pattern1.test("https://example.com/books/123")); // true
console.log(pattern1.test("https://example.com/books/abc")); // false
console.log(pattern1.test("https://example.com/books/")); // false
```

You can also use regex when constructing a `URLPattern` with the object syntax.

```js
const pattern2 = new URLPattern({ pathname: "/books/:id(\\d+)" });
console.log(pattern2.test("https://example.com/books/123")); // true
console.log(pattern2.test("https://example.com/books/abc")); // false
console.log(pattern2.test("https://example.com/books/")); // false
```

#### Pathname matching

The `pathname` URL-part always starts with `/`.
If you omit the `/` in your regular expression the match will fail.
The example below

```js
// Doesn't match, because omits the `/`
const pattern1 = new URLPattern({ pathname: "(b.*)" });
console.log(pattern1.test("https://example.com/b")); // false
console.log(pattern1.test("https://example.com/ba")); // false
```

The following examples include the `/`:

```js
// Matches URL where path is exactly "/b"
const pattern2 = new URLPattern({ pathname: "(/b)" });
console.log(pattern2.test("https://example.com/b")); // true
console.log(pattern2.test("https://example.com/ba")); // false

// Matches URL where path is /b followed by any number of characters
const pattern3 = new URLPattern({ pathname: "(/b.*)" });
console.log(pattern3.test("https://example.com/b")); // true
console.log(pattern3.test("https://example.com/ba")); // true
```

#### Start and end of line anchors

The start of line anchor (`^`) and end-of line anchor (`$`) are used to anchor patterns to the start and end of the test string, respectively.
While these can be specified for the start and end of a URL-part they are redundant.
This is because all URL-parts are implicitly preceded by the `^` anchor, and followed by the `$` anchor.

The following code demonstrates that it doesn't matter whether or not `^` is specified.
The example uses a pattern in the `protocol` URL-part, but the other parts of the URL behave the same.

```js
// with `^` in protocol
const pattern1 = new URLPattern({ protocol: "(^https?)" });
console.log(pattern1.test("https://example.com/index.html")); // true

// without `^` in protocol
const pattern2 = new URLPattern({ protocol: "(https?)" });
console.log(pattern2.test("https://example.com/index.html")); // true
```

The code below demonstrates that it doesn't matter whether or not `$` is specified.

```js
// with `$` in pathname
const pattern1 = new URLPattern({ pathname: "(/path$)" });
console.log(pattern1.test("https://example.com/path")); // true

// without `$` in pathname
const pattern2 = new URLPattern({ pathname: "(/path)" });
console.log(pattern2.test("https://example.com/path")); // true

// with `$` in hash
const pattern3 = new URLPattern({ hash: "(hash$)" });
console.log(pattern3.test("https://example.com/#hash")); // true

// without `$` in hash
const pattern4 = new URLPattern({ hash: "(hash)" });
console.log(pattern4.test("https://example.com/#hash")); // true
```

#### Lookahead and lookbehind assertions

Lookahead and lookbehind asserts allow you to specify that text ahead or behind the current parsing position matches a particular pattern, without that match being captured, or the characters being consumed.

There are four types of assertions:

- `(?=...)`: A positive lookahead assertion specifies a pattern that the following characters must match.
- `(?!...)`: A negative lookahead assertion specifies a pattern that the following characters must not match.
- `(?<=...)`: A positive lookbehind assertion specifies a pattern that the preceding characters must match.
- `(?<!...)`: A negative lookbehind assertion specifies a pattern that the preceding characters must not match.

Be careful when using lookahead and lookbehind assertions with `URLPattern`, as there is some behavior you may find unintuitive.
For example, you would expect the following lookahead assertion to match a `pathname` of `/ab`, but this is not what happens.

```js
const pattern = new URLPattern({ pathname: "(/a(?=b))" });
console.log(pattern.test("https://example.com/ab")); // false
```

The `URLPattern` engine matches the test string against the `pathname` pattern, first finding the match for `/a` and then asserts that the next character in the test URL is `b` — but not consuming it.
The engine continues matching the test URL at the unconsumed character `b`, but there is nothing left in the pattern to match it against, which causes the match to fail.

For the match to work the pattern has to consume all the characters in the test string.
To consume the `b` character you could add `b` to the end of the expression, a `.` to match any character, or `.*` to match all characters after the lookahead assertion:

```js
// positive-lookahead
const pattern1 = new URLPattern({ pathname: "(/a(?=b).*)" });
console.log(pattern1.test("https://example.com/ab")); // true
console.log(pattern1.test("https://example.com/ax")); // false
```

The next example shows a negative lookahead match for `/a` which is not followed by `b`.
Note that the assertion is followed by `.*` to consume the character matched by the assertion.

```js
// negative-lookahead - matches /a<not b><anything>
const pattern2 = new URLPattern({ pathname: "(/a(?!b).*)" });
console.log(pattern2.test("https://example.com/ab")); // false
console.log(pattern2.test("https://example.com/ax")); // true
```

The following example shows a positive lookbehind match that matches on a pathname like `/ba`.
The pattern matches `/`, then `.` to consume the next character, followed by the assertion that the previous character was a `b`, and then an `a`.

```js
// positive-lookbehind
const pattern = new URLPattern({ pathname: "(/.(?<=b)a)" });
console.log(pattern.test("https://example.com/ba")); // true
console.log(pattern.test("https://example.com/xa")); // false
```

This example shows a negative lookbehind match that matches on a pathname like `/<not b>a`.
The pattern matches `/`, then `.` to consume the next character (`x`), followed by the assertion that the previous character was not `b`, and then an `a`.

```js
// negative-lookbehind
const pattern4 = new URLPattern({ pathname: "(/.*(?<!b)a)" });
console.log(pattern4.test("https://example.com/ba")); // false
console.log(pattern4.test("https://example.com/xa")); // true
```

#### Other regex matcher limitations

Some other regex patterns may not work as you may expect:

- Parentheses need to be escaped in range expressions within URLPattern even though they don't in RegExp.

  ```js
  new URLPattern({ pathname: "([()])" }); // throws
  new URLPattern({ pathname: "([\\(\\)])" }); // ok

  new RegExp("[()]"); // ok
  new RegExp("[\\(\\)]"); // ok
  ```

### Unnamed and named groups

Groups can either be named or unnamed. Named groups are specified by prefixing the group name with a colon (`:`).
Regex groups that are not prefixed by a colon and a name are unnamed. Unnamed groups are numerically indexed in the match result based on their order in the pattern.

```js
// A named group
const pattern = new URLPattern("/books/:id(\\d+)", "https://example.com");
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { id: '123' }
```

```js
// An unnamed group
const pattern = new URLPattern("/books/(\\d+)", "https://example.com");
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { '0': '123' }
```

### Group modifiers

Groups can also have modifiers.
These are specified after the group name (or after the regex if there is one).
There are three modifiers: `?` to make the group optional, `+` to make the group repeat one or more times, and `*` to make the group repeat zero or more times.

```js
// An optional group
const pattern = new URLPattern("/books/:id?", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.test("https://example.com/books/")); // false
console.log(pattern.test("https://example.com/books/123/456")); // false
console.log(pattern.test("https://example.com/books/123/456/789")); // false
```

```js
// A repeating group with a minimum of one
const pattern = new URLPattern("/books/:id+", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books")); // false
console.log(pattern.test("https://example.com/books/")); // false
console.log(pattern.test("https://example.com/books/123/456")); // true
console.log(pattern.test("https://example.com/books/123/456/789")); // true
```

```js
// A repeating group with a minimum of zero
const pattern = new URLPattern("/books/:id*", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.test("https://example.com/books/")); // false
console.log(pattern.test("https://example.com/books/123/456")); // true
console.log(pattern.test("https://example.com/books/123/456/789")); // true
```

### Group delimiters

Patterns can also contain group delimiters. These are pieces of a pattern that are surrounded by curly braces (`{}`).
These group delimiters are not captured in the match result like capturing groups, but can still have modifiers applied to them, just like groups.
If group delimiters are not modified by a modifier, they are treated as if the items in them were just part of the parent pattern.
Group delimiters may not contain other group delimiters, but may contain any other pattern items (capturing groups, regex, wildcard, or fixed text).

```js
// A group delimiter with a ? (optional) modifier
const pattern = new URLPattern("/book{s}?", "https://example.com");
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.test("https://example.com/book")); // true
console.log(pattern.exec("https://example.com/books").pathname.groups); // {}
```

```js
// A group delimiter without a modifier
const pattern = new URLPattern("/book{s}", "https://example.com");
console.log(pattern.pathname); // /books
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.test("https://example.com/book")); // false
```

```js
// A group delimiter containing a capturing group
const pattern = new URLPattern({ pathname: "/blog/:id(\\d+){-:title}?" });
console.log(pattern.test("https://example.com/blog/123-my-blog")); // true
console.log(pattern.test("https://example.com/blog/123")); // true
console.log(pattern.test("https://example.com/blog/my-blog")); // false
```

### Automatic group prefixing in pathnames

In patterns that match against the `pathname` part of a URL, groups get an automatic slash (`/`) prefix added if the group definition is preceded by a slash (`/`).
This is useful for groups with modifiers, as it allows for repeating groups to work as expected.

If you do not want automatic prefixing, you can disable it by surrounding the group with group delimiters (`{}`).
Group delimiters do not have automatic prefixing behavior.

```js
// A pattern with an optional group, preceded by a slash
const pattern = new URLPattern("/books/:id?", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books")); // true
console.log(pattern.test("https://example.com/books/")); // false
```

```js
// A pattern with a repeating group, preceded by a slash
const pattern = new URLPattern("/books/:id+", "https://example.com");
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books/123/456")); // true
console.log(pattern.test("https://example.com/books/123/")); // false
console.log(pattern.test("https://example.com/books/123/456/")); // false
```

```js
// Segment prefixing does not occur outside of pathname patterns
const pattern = new URLPattern({ hash: "/books/:id?" });
console.log(pattern.test("https://example.com#/books/123")); // true
console.log(pattern.test("https://example.com#/books")); // false
console.log(pattern.test("https://example.com#/books/")); // true
```

```js
// Disabling segment prefixing for a group using a group delimiter
const pattern = new URLPattern({ pathname: "/books/{:id}?" });
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.test("https://example.com/books")); // false
console.log(pattern.test("https://example.com/books/")); // true
```
