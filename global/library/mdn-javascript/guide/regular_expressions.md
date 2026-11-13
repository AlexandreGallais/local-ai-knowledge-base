---
title: "Regular expressions (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/regular_expressions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Regular expressions

Regular expressions are patterns used to match character combinations in strings.
In JavaScript, regular expressions are also objects. These patterns are used with the `exec()` and `test()` methods of `RegExp`, and with the `match()`, `matchAll()`, `replace()`, `replaceAll()`, `search()`, and `split()` methods of `String`.
This chapter describes JavaScript regular expressions. It provides a brief overview of each syntax element. For a detailed explanation of each one's semantics, read the regular expressions reference.

## Creating a regular expression

You construct a regular expression in one of two ways:

- Using a regular expression literal, which consists of a pattern enclosed between slashes, as follows:

  ```js
  const re = /ab+c/;
  ```

  Regular expression literals provide compilation of the regular expression when the script is loaded.
  If the regular expression remains constant, using this can improve performance.

- Or calling the constructor function of the `RegExp` object, as follows:

  ```js
  const re = new RegExp("ab+c");
  ```

  Using the constructor function provides runtime compilation of the regular expression.
  Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

## Writing a regular expression pattern

A regular expression pattern is composed of simple characters, such as `/abc/`, or a combination of simple and special characters, such as `/ab*c/` or `/Chapter (\d+)\.\d*/`.
The last example includes parentheses, which are used as a memory device.
The match made with this part of the pattern is remembered for later use, as described in Using groups.

### Using simple patterns

Simple patterns are constructed of characters for which you want to find a direct match. For example, the pattern `/abc/` matches character combinations in strings only when the exact sequence `"abc"` occurs (all characters together and in that order).
Such a match would succeed in the strings `"Hi, do you know your abc's?"` and `"The latest airplane designs evolved from slabcraft."`.
In both cases the match is with the substring `"abc"`.
There is no match in the string `"Grab crab"` because while it contains the substring `"ab c"`, it does not contain the exact substring `"abc"`.

### Using special characters

When the search for a match requires something more than a direct match, such as finding one or more b's, or finding white space, you can include special characters in the pattern.
For example, to match _a single `"a"` followed by zero or more `"b"`s followed by `"c"`_, you'd use the pattern `/ab*c/`: the `*` after `"b"` means "0 or more occurrences of the preceding item."
In the string `"cbbabbbbcdebc"`, this pattern will match the substring `"abbbbc"`.

The following pages provide lists of the different special characters that fit into each category, along with descriptions and examples.

- Assertions guide
    Assertions include boundaries, which indicate the beginnings and endings of lines and words, and other patterns indicating in some way that a match is possible (including look-ahead, look-behind, and conditional expressions).
- Character classes guide
    Distinguish different types of characters. For example, distinguishing between letters and digits.
- Groups and backreferences guide
    Groups group multiple patterns as a whole, and capturing groups provide extra submatch information when using a regular expression pattern to match against a string. Backreferences refer to a previously captured group in the same regular expression.
- Quantifiers guide
    Indicate numbers of characters or expressions to match.

If you want to look at all the special characters that can be used in regular expressions in a single table, see the following:

    Special characters in regular expressions.

       | Characters / constructs
       | Corresponding article

       |
        `[xyz]`, `[^xyz]`, `.`,
        `\d`, `\D`, `\w`, `\W`,
        `\s`, `\S`, `\t`, `\r`,
        `\n`, `\v`, `\f`, `[\b]`,
        `\0`, <code>\cX</code>, <code>\xHH</code>,
        <code>\uHHHH</code>, <code>\u{H…H}</code>,
        <code>x|y</code>

       |

          Character classes

       |
        `^`, `$`, `\b`, `\B`,
        `x(?=y)`, `x(?!y)`, `(?&#x3C;=y)x`,
        `(?&#x3C;!y)x`

       |

          Assertions

       |
        <code>(x)</code>, `(?&#x3C;Name>x)`, <code>(?:x)</code>,
        <code>\n</code>, `\k&#x3C;Name>`

       |

          Groups and backreferences

       |
        <code>x*</code>, <code>x+</code>, <code>x?</code>,
        <code>x{n}</code>, <code>x{n,}</code>,
        <code>x{n,m}</code>

       |

          Quantifiers

> **Note:**
> A larger cheat sheet is also available (only aggregating parts of those individual articles).

### Escaping

If you need to use any of the special characters literally (actually searching for a `"*"`, for instance), you should escape it by putting a backslash in front of it. For instance, to search for `"a"` followed by `"*"` followed by `"b"`, you'd use `/a\*b/` — the backslash "escapes" the `"*"`, making it literal instead of special.

> **Note:**
> In many cases, when trying match a special character, you can wrap it in a character class as an alternative to escaping, for example `/a[*]b/`.

Similarly, if you're writing a regular expression literal and need to match a slash ("/"), you need to escape that (otherwise, it terminates the pattern).
For instance, to search for the string "/example/" followed by one or more alphabetic characters, you'd use `/\/example\/[a-z]+/i`—the backslashes before each slash make them literal.

To match a literal backslash, you need to escape the backslash.
For instance, to match the string "C:\\" where "C" can be any letter, you'd use `/[A-Z]:\\/` — the first backslash escapes the one after it, so the expression searches for a single literal backslash.

If using the `RegExp` constructor with a string literal, remember that the backslash is an escape in string literals, so to use it in the regular expression, you need to escape it at the string literal level.
`/a\*b/` and `new RegExp("a\\*b")` create the same expression, which searches for "a" followed by a literal "\*" followed by "b".

The `RegExp.escape()` function returns a new string where all special characters in regex syntax are escaped. This allows you to do `new RegExp(RegExp.escape("a*b"))` to create a regular expression that matches only the string `"a*b"`.

### Using parentheses

Parentheses around any part of the regular expression pattern causes that part of the matched substring to be remembered.
Once remembered, the substring can be recalled for other use. See Groups and backreferences for more details.
