---
title: "Regular expressions (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/regular_expressions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Regular expressions (part 2 of 2)

## Using regular expressions in JavaScript

Regular expressions are used with the `RegExp` methods `test()` and `exec()` and with the `String` methods `match()`, `matchAll()`, `replace()`, `replaceAll()`, `search()`, and `split()`.

| Method                                          | Description                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `exec()`             | Executes a search for a match in a string. It returns an array of information or `null` on a mismatch.           |
| `test()`             | Tests for a match in a string. It returns `true` or `false`.                                                     |
| `match()`           | Returns an array containing all of the matches, including capturing groups, or `null` if no match is found.      |
| `matchAll()`     | Returns an iterator containing all of the matches, including capturing groups.                                   |
| `search()`         | Tests for a match in a string. It returns the index of the match, or `-1` if the search fails.                   |
| `replace()`       | Executes a search for a match in a string, and replaces the matched substring with a replacement substring.      |
| `replaceAll()` | Executes a search for all matches in a string, and replaces the matched substrings with a replacement substring. |
| `split()`           | Uses a regular expression or a fixed string to break a string into an array of substrings.                       |

When you want to know whether a pattern is found in a string, use the `test()` or `search()` methods; for more information (but slower execution) use the `exec()` or `match()` methods.
If you use `exec()` or `match()` and if the match succeeds, these methods return an array and update properties of the associated regular expression object and also of the predefined regular expression object, `RegExp`.
If the match fails, the `exec()` method returns `null` (which coerces to `false`).

In the following example, the script uses the `exec()` method to find a match in a string.

```js
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
```

If you do not need to access the properties of the regular expression, an alternative way of creating `myArray` is with this script:

```js
const myArray = /d(b+)d/g.exec("cdbbdbsbz");
// similar to 'cdbbdbsbz'.match(/d(b+)d/g); however,
// 'cdbbdbsbz'.match(/d(b+)d/g) outputs [ "dbbd" ]
// while /d(b+)d/g.exec('cdbbdbsbz') outputs [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz' ]
```

(See Using the global search flag with `exec()` for further info about the different behaviors.)

If you want to construct the regular expression from a string, yet another alternative is this script:

```js
const myRe = new RegExp("d(b+)d", "g");
const myArray = myRe.exec("cdbbdbsbz");
```

With these scripts, the match succeeds and returns the array and updates the properties shown in the following table.

    Results of regular expression execution.

       | Object
       | Property or index
       | Description
       | In this example

       | `myArray`
       |
       | The matched string and all remembered substrings.
       | `['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']`

       | `index`
       | The 0-based index of the match in the input string.
       | `1`

       | `input`
       | The original string.
       | `'cdbbdbsbz'`

       | `[0]`
       | The last matched characters.
       | `'dbbd'`

       | `myRe`
       | `lastIndex`
       | The index at which to start the next match.
        (This property is set only if the regular expression uses the g option, described in
        Advanced Searching With Flags.)

       | `5`

       | `source`
       |
        The text of the pattern. Updated at the time that the regular expression is created, not executed.

       | `'d(b+)d'`

As shown in the second form of this example, you can use a regular expression created with an object initializer without assigning it to a variable.
If you do, however, every occurrence is a new regular expression.
For this reason, if you use this form without assigning it to a variable, you cannot subsequently access the properties of that regular expression.
For example, assume you have this script:

```js
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
console.log(`The value of lastIndex is ${myRe.lastIndex}`);

// "The value of lastIndex is 5"
```

However, if you have this script:

```js
const myArray = /d(b+)d/g.exec("cdbbdbsbz");
console.log(`The value of lastIndex is ${/d(b+)d/g.lastIndex}`);

// "The value of lastIndex is 0"
```

The occurrences of `/d(b+)d/g` in the two statements are different regular expression objects and hence have different values for their `lastIndex` property.
If you need to access the properties of a regular expression created with an object initializer, you should first assign it to a variable.

### Advanced searching with flags

Regular expressions have optional flags that allow for functionality like global searching and case-insensitive searching.
These flags can be used separately or together in any order, and are included as part of the regular expression.

| Flag | Description                                                                                   | Corresponding property                          |
| ---- | --------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `d`  | Generate indices for substring matches.                                                       | `hasIndices`   |
| `g`  | Global search.                                                                                | `global`           |
| `i`  | Case-insensitive search.                                                                      | `ignoreCase`   |
| `m`  | Makes `^` and `$` match the start and end of each line instead of those of the entire string. | `multiline`     |
| `s`  | Allows `.` to match newline characters.                                                       | `dotAll`           |
| `u`  | "Unicode"; treat a pattern as a sequence of Unicode code points.                              | `unicode`         |
| `v`  | An upgrade to the `u` mode with more Unicode features.                                        | `unicodeSets` |
| `y`  | Perform a "sticky" search that matches starting at the current position in the target string. | `sticky`           |

To include a flag with the regular expression, use this syntax:

```js
const re = /pattern/flags;
```

or

```js
const re = new RegExp("pattern", "flags");
```

Note that the flags are an integral part of a regular expression. They cannot be added or removed later.

For example, `re = /\w+\s/g` creates a regular expression that looks for one or more characters followed by a space, and it looks for this combination throughout the string.

```js
const re = /\w+\s/g;
const str = "fee fi fo fum";
const myArray = str.match(re);
console.log(myArray);

// ["fee ", "fi ", "fo "]
```

You could replace the line:

```js
const re = /\w+\s/g;
```

with:

```js
const re = new RegExp("\\w+\\s", "g");
```

and get the same result.

The `m` flag is used to specify that a multiline input string should be treated as multiple lines.
If the `m` flag is used, `^` and `$` match at the start or end of any line within the input string instead of the start or end of the entire string.

The `i`, `m`, and `s` flags can be enabled or disabled for specific parts of a regex using the modifier syntax.

#### Using the global search flag with exec()

`RegExp.prototype.exec()` method with the `g` flag returns each match and its position iteratively.

```js
const str = "fee fi fo fum";
const re = /\w+\s/g;

console.log(re.exec(str)); // ["fee ", index: 0, input: "fee fi fo fum"]
console.log(re.exec(str)); // ["fi ", index: 4, input: "fee fi fo fum"]
console.log(re.exec(str)); // ["fo ", index: 7, input: "fee fi fo fum"]
console.log(re.exec(str)); // null
```

In contrast, `String.prototype.match()` method returns all matches at once, but without their position.

```js
console.log(str.match(re)); // ["fee ", "fi ", "fo "]
```

#### Using unicode regular expressions

The `u` flag is used to create "unicode" regular expressions; that is, regular expressions which support matching against unicode text. An important feature that's enabled in unicode mode is Unicode property escapes. For example, the following regular expression might be used to match against an arbitrary unicode "word":

```js
/\p{L}*/u;
```

Unicode regular expressions have different execution behavior as well. `RegExp.prototype.unicode` contains more explanation about this.

## Examples

> **Note:**
> Several examples are also available in:
>
> - The reference pages for `exec()`, `test()`, `match()`, `matchAll()`, `search()`, `replace()`, `split()`
> - The guide articles: character classes, assertions, groups and backreferences, quantifiers

### Using special characters to verify input

In the following example, the user is expected to enter a phone number.
When the user presses the "Check" button, the script checks the validity of the number.
If the number is valid (matches the character sequence specified by the regular expression), the script shows a message thanking the user and confirming the number.
If the number is invalid, the script informs the user that the phone number is not valid.

The regular expression looks for:

1. the beginning of the line of data: `^`
2. followed by three numeric characters `\d{3}` OR `|` a left parenthesis `\(`, followed by three digits `\d{3}`, followed by a close parenthesis `\)`, in a non-capturing group `(?:)`
3. followed by one dash, forward slash, or decimal point in a capturing group `()`
4. followed by three digits `\d{3}`
5. followed by the match remembered in the (first) captured group `\1`
6. followed by four digits `\d{4}`
7. followed by the end of the line of data: `$`

#### HTML

```html
<p>
  Enter your phone number (with area code) and then click "Check".
  <br />
  The expected format is like ###-###-####.
</p>
<form id="form">
  <input id="phone" />
  <button type="submit">Check</button>
</form>
<p id="output"></p>
```

#### JavaScript

```js
const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const output = document.querySelector("#output");

const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(phoneInput) {
  const ok = re.exec(phoneInput.value);

  output.textContent = ok
    ? `Thanks, your phone number is ${ok[0]}`
    : `${phoneInput.value} isn't a phone number with area code!`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});
```

#### Result

## Tools

- RegExr
    An online tool to learn, build, & test Regular Expressions.
- Regex tester
    An online regex builder/debugger
- Regex interactive tutorial
    An online interactive tutorials, Cheat sheet, & Playground.
- Regex visualizer
    An online visual regex tester.
