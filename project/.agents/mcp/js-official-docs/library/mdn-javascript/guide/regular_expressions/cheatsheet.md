---
title: "Regular expression syntax cheat sheet (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/regular_expressions/cheatsheet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Regular expression syntax cheat sheet

This page provides an overall cheat sheet of all the capabilities of `RegExp` syntax by aggregating the content of the articles in the `RegExp` guide. If you need more information on a specific topic, please follow the link on the corresponding heading to access the full article or head to the guide.

## Character classes

Character classes distinguish kinds of characters such as, for example, distinguishing between letters and digits.

       | Characters
       | Meaning

       |
        <code>xyz</code>

       |

          Character class:
          Matches any one of the enclosed characters. You can
          specify a range of characters by using a hyphen, but if the hyphen
          appears as the first or last character enclosed in the square brackets,
          it is taken as a literal hyphen to be included in the character class
          as a normal character.

          For example, `[abcd]` is the same as `[a-d]`.
          They match the "b" in "brisket", and the "c" in "chop".

          For example, `[abcd-]` and `[-abcd]` match the
          "b" in "brisket", the "c" in "chop", and the "-" (hyphen) in
          "non-profit".

          For example, `[\w-]` is the same as
          `[A-Za-z0-9_-]`. They both match the "b" in "brisket", the
          "c" in "chop", and the "n" in "non-profit".

       |

          <code>^xyz</code>

       |

          Negated character class:
          Matches anything that is not enclosed in the square brackets. You can specify a range
          of characters by using a hyphen, but if the hyphen appears as the
          first character after the `^` or the last character enclosed in the square brackets, it is taken as
          a literal hyphen to be included in the character class as a normal
          character. For example, `[^abc]` is the same as
          `[^a-c]`. They initially match "o" in "bacon" and "h" in
          "chop".

            Note: The ^ character may also indicate the
            beginning of input.

       | `.`
       |

          Wildcard:
          Matches any single character except line terminators:
          `\n`, `\r`, `\u2028` or
          `\u2029`. For example, `/.y/` matches "my" and
          "ay", but not "yes", in "yes make my day", as there is no character before "y" in "yes". If the `dotAll` (s) flag is enabled, also matches line terminators.
          Inside a character class, the dot loses its special meaning and
          matches a literal dot.

       | `\d`
       |

          Digit character class escape:
          Matches any digit (Arabic numeral). Equivalent to `[0-9]`.
          For example, `/\d/` or `/[0-9]/` matches "2" in
          "B2 is the suite number".

       | `\D`
       |

          Non-digit character class escape:
          Matches any character that is not a digit (Arabic numeral). Equivalent
          to `[^0-9]`. For example, `/\D/` or
          `/[^0-9]/` matches "B" in "B2 is the suite number".

       | `\w`
       |

          Word character class escape:
          Matches any alphanumeric character from the basic Latin alphabet,
          including the underscore. Equivalent to `[A-Za-z0-9_]`. For
          example, `/\w/` matches "a" in "apple", "5" in "$5.28", "3"
          in "3D" and "m" in "Émanuel".

       | `\W`
       |

          Non-word character class escape:
          Matches any character that is not a word character from the basic
          Latin alphabet. Equivalent to `[^A-Za-z0-9_]`. For example,
          `/\W/` or `/[^A-Za-z0-9_]/` matches "%" in "50%"
          and "É" in "Émanuel".

       | `\s`
       |

          White space character class escape:
          Matches a single white space character, including space, tab, form
          feed, line feed, and other Unicode spaces. Equivalent to
          `[\f\n\r\t\v\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`. For example, `/\s\w*/` matches " bar" in "foo bar".

       | `\S`
       |

          Non-white space character class escape:
          Matches a single character other than white space. Equivalent to
          `[^\f\n\r\t\v\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`. For example, `/\S\w*/` matches "foo" in "foo bar".

       | `\t`
       | Matches a horizontal tab.

       | `\r`
       | Matches a carriage return.

       | `\n`
       | Matches a linefeed.

       | `\v`
       | Matches a vertical tab.

       | `\f`
       | Matches a form-feed.

       | `[\b]`
       |
        Matches a backspace. If you're looking for the word-boundary assertion
        (`\b`), see
        Assertions.

       | `\0`
       | Matches a NUL character. Do not follow this with another digit.

       |
        <code>\cX</code>

       |

          Matches a control character using
          caret notation, where "X" is a letter from A–Z or a–z (corresponding to code points
          `U+0001`–`U+001A`). For example,
          `/\cM\cJ/` matches "\r\n".

       |
        <code>\xhh</code>

       |
        Hex escape:
        Matches the character with the code <code>hh</code> (two
        hexadecimal digits).

       |
        <code>\uHHHH</code>

       |
        Unicode escape:
        Matches a UTF-16 code-unit with the value <code>HHHH</code> (four hexadecimal digits).

       |
        <code>\u{H…H}</code>

       |
        Unicode code point escape:
        Matches the character with the Unicode value <code>U+H…H</code> (1 to 6 hexadecimal digits).
        Only valid in Unicode-aware mode.

       |
        <code>\p{UnicodeProperty}</code>,
        <code>\P{UnicodeProperty}</code>

       |

          Unicode character class escape:
          Matches a character based on its Unicode character properties: for example, emoji characters, or Japanese
          katakana characters, or Chinese/Japanese Han/Kanji characters,
          etc.).
          Only valid in Unicode-aware mode.

       | `\`
       |

          Indicates that the following character should be treated specially, or
          "escaped". It behaves one of two ways.

            For characters that are usually treated literally, indicates that
            the next character is special and not to be interpreted literally.
            For example, `/b/` matches the character "b". By placing
            a backslash in front of "b", that is by using `/\b/`, the
            character becomes special to mean match a word boundary.

            For characters that are usually treated specially, indicates that
            the next character is not special and should be interpreted
            literally. For example, "*" is a special character that means 0 or
            more occurrences of the preceding character should be matched; for
            example, `/a*/` means match 0 or more "a"s. To match
            `*` literally, precede it with a backslash; for example,
            `/a\*/` matches "a*".

            Note: To match this character literally, escape it
            with itself. In other words to search for `\` use
            `/\\/`.

       |
        <code>x|y</code>

       |

          Disjunction:
          Matches either "x" or "y". Each component, separated by a pipe (`|`), is called an alternative. For example,
          `/green|red/` matches "green" in "green apple" and "red" in
          "red apple".

            Note: A disjunction is another way to specify "a set of choices", but it's not a character class. Disjunctions are not atoms — you need to use a group to make it part of a bigger pattern. `[abc]` is functionally equivalent to `(?:a|b|c)`.

## Assertions

Assertions include boundaries, which indicate the beginnings and endings of lines and words, and other patterns indicating in some way that a match is possible (including look-ahead, look-behind, and conditional expressions).

### Boundary-type assertions

       | Characters
       | Meaning

       | `^`
       |

          Input boundary beginning assertion:
          Matches the beginning of input. If the `multiline` (m) flag is enabled,
          also matches immediately after a line break character. For example,
          `/^A/` does not match the "A" in "an A", but does match the
          first "A" in "An A".

            Note: This character has a different meaning when
            it appears at the start of a
            character class.

       | `$`
       |

          Input boundary end assertion:
          Matches the end of input. If the `multiline` (m) flag is enabled, also
          matches immediately before a line break character. For example,
          `/t$/` does not match the "t" in "eater", but does match it
          in "eat".

       | `\A`
       |

          Buffer boundary start assertion: Matches the start of the entire string regardless of the presence of the `m` flag.
          Only valid in Unicode-aware mode.

       | `\z`
       |

          Buffer boundary end assertion: Matches the end of the entire string regardless of the presence of the `m` flag.
          Only valid in Unicode-aware mode.

       | `\Z`
       |

          Buffer boundary end assertion with optional newline: Matches the end of the entire string, but allows an optional trailing newline character sequence (either a line terminator or a `\r\n` sequence).
          Only valid in Unicode-aware mode.

       | `\b`
       |

          Word boundary assertion:
          Matches a word boundary. This is the position where a word character
          is not followed or preceded by another word-character, such as between
          a letter and a space. Note that a matched word boundary is not
          included in the match. In other words, the length of a matched word
          boundary is zero.

        Examples:

          `/\bm/` matches the "m" in "moon".

            `/oo\b/` does not match the "oo" in "moon", because "oo"
            is followed by "n" which is a word character.

            `/oon\b/` matches the "oon" in "moon", because "oon" is
            the end of the string, thus not followed by a word character.

            `/\w\b\w/` will never match anything, because a word
            character can never be followed by both a non-word and a word
            character.

          To match a backspace character (`[\b]`), see
          Character Classes.

       | `\B`
       |

          Non-word-boundary assertion:
          Matches a non-word boundary. This is a position where the previous and
          next character are of the same type: Either both must be words, or
          both must be non-words, for example between two letters or between two
          spaces. The beginning and end of a string are considered non-words.
          Same as the matched word boundary, the matched non-word boundary is
          also not included in the match. For example,
          `/\Bon/` matches "on" in "at noon", and
          `/ye\B/` matches "ye" in "possibly yesterday".

### Other assertions

> **Note:**
> The `?` character may also be used as a quantifier.

       | Characters
       | Meaning

       | `x(?=y)`
       |

          Lookahead assertion:
          Matches "x" only if "x" is
          followed by "y". For example, `/Jack(?=Sprat)/` matches
          "Jack" only if it is followed by "Sprat".<code
            >/Jack(?=Sprat|Frost)/</code
          >
          matches "Jack" only if it is followed by "Sprat" or "Frost". However,
          neither "Sprat" nor "Frost" is part of the match results.

       | `x(?!y)`
       |

          Negative lookahead assertion:
          Matches "x" only if "x"
          is not followed by "y". For example, `/\d+(?!\.)/` matches
          a number only if it is not followed by a decimal point. <code
            >/\d+(?!\.)/.exec('3.141')</code
          >
          matches "141" but not "3".

       | `(?&#x3C;=y)x`
       |

          Lookbehind assertion:
          Matches "x" only if "x" is
          preceded by "y". For example,
          `/(?&#x3C;=Jack)Sprat/` matches "Sprat" only if it is
          preceded by "Jack". `/(?&#x3C;=Jack|Tom)Sprat/` matches
          "Sprat" only if it is preceded by "Jack" or "Tom". However, neither
          "Jack" nor "Tom" is part of the match results.

       | `(?&#x3C;!y)x`
       |

          Negative lookbehind assertion:
          Matches "x" only if
          "x" is not preceded by "y". For example,
          `/(?&#x3C;!-)\d+/` matches a number only if it is not
          preceded by a minus sign. `/(?&#x3C;!-)\d+/.exec('3')`
          matches "3". `/(?&#x3C;!-)\d+/.exec('-3')`  match is not
          found because the number is preceded by the minus sign.
