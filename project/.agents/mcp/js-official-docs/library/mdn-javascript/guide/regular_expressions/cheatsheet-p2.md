---
title: "Regular expression syntax cheat sheet (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/regular_expressions/cheatsheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Regular expression syntax cheat sheet (part 2 of 2)

## Groups and backreferences

Groups and backreferences indicate groups of expression characters.

       | Characters
       | Meaning

       | <code>(x)</code>
       |

          Capturing group:
          Matches <code>x</code> and
          remembers the match. For example, `/(foo)/` matches and
          remembers "foo" in "foo bar".

          A regular expression may have multiple capturing groups. In results,
          matches to capturing groups typically in an array whose members are in
          the same order as the left parentheses in the capturing group. This is
          usually just the order of the capturing groups themselves. This
          becomes important when capturing groups are nested. Matches are
          accessed using the index of the result's elements (<code
            >[1], …, [n]</code
          >) or from the predefined `RegExp` object's properties
          (`$1, …, $9`).

          Capturing groups have a performance penalty. If you don't need the
          matched substring to be recalled, prefer non-capturing parentheses
          (see below).

          <code
            >String.prototype.match()</code
          >
          won't return groups if the `/.../g` flag is set. However,
          you can still use
          <code
            >String.prototype.matchAll()</code
          >
          to get all matches.

       | `(?&#x3C;Name>x)`
       |

          Named capturing group:
          Matches "x" and stores it on
          the groups property of the returned matches under the name specified
          by `&#x3C;Name>`. The angle brackets (`&#x3C;`
          and `>`) are required for group name.

          For example, to extract the United States area code from a phone
          number, we could use `/\((?&#x3C;area>\d\d\d)\)/`. The
          resulting number would appear under `matches.groups.area`.

       | <code>(?:x)</code>
       |

          Non-capturing group:
          Matches "x" but does not remember
          the match. The matched substring cannot be recalled from the resulting
          array's elements (`[1], …, [n]`) or from the predefined
          `RegExp` object's properties (`$1, …, $9`).

       | <code>(?flags:x)</code>, <code>(?flags-flags:x)</code>
       |

          Modifier:
          Enables or disables the specified flags only to the enclosed pattern. Only the `i`, `m`, and `s` flags can be used in a modifier.

       |
        <code>\n</code>

       |

          Backreference:
          Where "n" is a positive integer. Matches the same substring matched by
          the nth capturing group in the regular expression
          (counting left parentheses). For example,
          `/apple(,)\sorange\1/` matches "apple, orange," in "apple,
          orange, cherry, peach".

       | `\k&#x3C;Name>`
       |

          Named backreference:
          A back reference to the last substring matching the
          Named capture group specified by
          `&#x3C;Name>`.

          For example,
          `/(?&#x3C;title>\w+), yes \k&#x3C;title>/` matches "Sir,
          yes Sir" in "Do you copy? Sir, yes Sir!".

            Note: `\k` is used literally here to
            indicate the beginning of a back reference to a Named capture group.

## Quantifiers

Quantifiers indicate numbers of characters or expressions to match.

> **Note:**
> In the following, _item_ refers not only to singular characters, but also includes character classes and groups and backreferences.

       | Characters
       | Meaning

       |
        <code>x*</code>

       |

          Matches the preceding item "x" 0 or more times. For example,
          `/bo*/` matches "boooo" in "A ghost booooed" and "b" in "A
          bird warbled", but nothing in "A goat grunted".

       |
        <code>x+</code>

       |

          Matches the preceding item "x" 1 or more times. Equivalent to
          `{1,}`. For example, `/a+/` matches the "a" in
          "candy" and all the "a"'s in "caaaaaaandy".

       |
        <code>x?</code>

       |

          Matches the preceding item "x" 0 or 1 times. For example,
          `/e?le?/` matches the "el" in "angel" and the "le" in
          "angle."

          If used immediately after any of the quantifiers `*`,
          `+`, `?`, or `{}`, makes the
          quantifier non-greedy (matching the minimum number of times), as
          opposed to the default, which is greedy (matching the maximum number
          of times).

       |
        <code>x{n}</code>

       |

          Where "n" is a non-negative integer, matches exactly "n" occurrences of
          the preceding item "x". For example, `/a{2}/` doesn't match
          the "a" in "candy", but it matches all of the "a"'s in "caandy", and
          the first two "a"'s in "caaandy".

       |
        <code>x{n,}</code>

       |

          Where "n" is a non-negative integer, matches at least "n" occurrences of
          the preceding item "x". For example, `/a{2,}/` doesn't
          match the "a" in "candy", but matches all of the a's in "caandy" and
          in "caaaaaaandy".

       |
        <code>x{n,m}</code>

       |

          Where "n" and "m" are non-negative integers and `m >= n`,
          matches at least "n" and at most "m" occurrences of the preceding
          item "x". For example, `/a{1,3}/` matches nothing in
          "cndy", the "a" in "candy", the two "a"'s in "caandy", and the first
          three "a"'s in "caaaaaaandy". Notice that when matching "caaaaaaandy",
          the match is "aaa", even though the original string had more "a"s in
          it.

       |

          <code>x*?</code><code>x+?</code><code
            >x??</code
          ><code>x{n}?</code><code>x{n,}?</code
          ><code>x{n,m}?</code>

       |

          By default quantifiers like `*` and `+` are
          "greedy", meaning that they try to match as many times as
          possible. The `?` character after the quantifier makes the
          quantifier "non-greedy": meaning that it will stop as soon as it finds the minimum number of matches. For example, given a string like "some &#x3C;foo> &#x3C;bar>
          new &#x3C;/bar> &#x3C;/foo> thing":

            `/&#x3C;.*>/` will match "&#x3C;foo> &#x3C;bar> new
            &#x3C;/bar> &#x3C;/foo>"

          `/&#x3C;.*?>/` will match "&#x3C;foo>"

            Note: Adding `?` after `{n}` is syntactically valid but practically useless.
            Since `{n}` always matches exactly n times, `x{n}?` behaves the same as `x{n}`.
