---
title: "Non-capturing group: (?:...)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/non-capturing_group/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Non-capturing group: (?:...)

A **non-capturing group** groups a subpattern, allowing you to apply a quantifier to the entire group or use disjunctions within it. It acts like the grouping operator in JavaScript expressions, and unlike capturing groups, it does not memorize the matched text, allowing for better performance and avoiding confusion when the pattern also contains useful capturing groups.

## Syntax

```regex
(?:pattern)
```

### Parameters

- `pattern`
    A pattern consisting of anything you may use in a regex literal, including a disjunction.

## Examples

### Grouping a subpattern and applying a quantifier

In the following example, we test if a file path ends with `styles.css` or `styles.[a hex hash].css`. Because the entire `\.[\da-f]+` part is optional, in order to apply the `?` quantifier to it, we need to group it into a new atom. Using a non-capturing group improves performance by not creating the extra match information that we don't need.

```js
function isStylesheet(path) {
  return /styles(?:\.[\da-f]+)?\.css$/.test(path);
}

isStylesheet("styles.css"); // true
isStylesheet("styles.1234.css"); // true
isStylesheet("styles.cafe.css"); // true
isStylesheet("styles.1234.min.css"); // false
```

### Grouping a disjunction

A disjunction has the lowest precedence in a regular expression. If you want to use a disjunction as a part of a bigger pattern, you must group it. You are advised to use a non-capturing group unless you rely on the matched text of the disjunction. The following example matches file extensions, using the same code as the input boundary assertion article:

```js
function isImage(filename) {
  return /\.(?:png|jpe?g|webp|avif|gif)$/i.test(filename);
}

isImage("image.png"); // true
isImage("image.jpg"); // true
isImage("image.pdf"); // false
```

### Avoiding refactoring hazards

Capturing groups are accessed by their position in the pattern. If you add or remove a capturing group, you must also update the positions of the other capturing groups, if you are accessing them through match results or backreferences. This can be a source of bugs, especially if most groups are purely for syntactic purposes (to apply quantifiers or to group disjunctions). Using non-capturing groups avoids this problem, and allows the indices of actual capturing groups to be easily tracked.

For example, suppose we have a function that matches the `title='xxx'` pattern in a string (example taken from capturing group). To ensure the quotes match, we use a backreference to refer to the first quote.

```js
function parseTitle(metastring) {
  return metastring.match(/title=(["'])(.*?)\1/)[2];
}

parseTitle('title="foo"'); // 'foo'
```

If we later decided to add `name='xxx'` as an alias for `title=`, we would need to group the disjunction in another group:

```js
function parseTitle(metastring) {
  // Oops — the backreference and index access are now off by one!
  return metastring.match(/(title|name)=(["'])(.*?)\1/)[2];
}

parseTitle('name="foo"'); // Cannot read properties of null (reading '2')
// Because \1 now refers to the "name" string, which isn't found at the end.
```

Instead of locating all places where we are referring to the capturing groups' indices and updating them one-by-one, it's better to avoid using a capturing group:

```js
function parseTitle(metastring) {
  // Do not capture the title|name disjunction
  // because we don't use its value
  return metastring.match(/(?:title|name)=(["'])(.*?)\1/)[2];
}

parseTitle('name="foo"'); // 'foo'
```

Named capturing groups are another way to avoid refactoring hazards. They allow capturing groups to be accessed by a custom name, which is unaffected when other capturing groups are added or removed.

## See also

- Groups and backreferences guide
- Regular expressions
- Capturing group: `(...)`
- Named capturing group: `(?<name>...)`
