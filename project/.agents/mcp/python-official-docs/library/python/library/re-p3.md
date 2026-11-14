---
title: "re --- Regular expression operations (part 3 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 3 of 8)

### Special characters

The special characters are:

#### `.`

(Dot.)  In the default mode, this matches any character except a newline.  If
the `DOTALL` flag has been specified, this matches any character
including a newline.  `(?s:.)` matches any character regardless of flags.

#### `^`

(Caret.)  Matches the start of the string, and in `MULTILINE` mode also
matches immediately after each newline.

#### `$`

Matches the end of the string or just before the newline at the end of the
string, and in `MULTILINE` mode also matches before a newline.  `foo`
matches both 'foo' and 'foobar', while the regular expression `foo$` matches
only 'foo'.  More interestingly, searching for `foo.$` in `'foo1\nfoo2\n'`
matches 'foo2' normally, but 'foo1' in `MULTILINE` mode; searching for
a single `$` in `'foo\n'` will find two (empty) matches: one just before
the newline, and one at the end of the string.

#### `*`

Causes the resulting RE to match 0 or more repetitions of the preceding RE, as
many repetitions as are possible.  `ab*` will match 'a', 'ab', or 'a' followed
by any number of 'b's.

#### `+`

Causes the resulting RE to match 1 or more repetitions of the preceding RE.
`ab+` will match 'a' followed by any non-zero number of 'b's; it will not
match just 'a'.

#### `?`

Causes the resulting RE to match 0 or 1 repetitions of the preceding RE.
`ab?` will match either 'a' or 'ab'.

#### `*?`, `+?`, `??`

The `'*'`, `'+'`, and `'?'` quantifiers are all greedy; they match
as much text as possible.  Sometimes this behaviour isn't desired; if the RE
`<.*>` is matched against `' b <c>'`, it will match the entire
string, and not just `''`.  Adding `?` after the quantifier makes it
perform the match in non-greedy or minimal fashion; as *few*
characters as possible will be matched.  Using the RE `<.*?>` will match
only `''`.

#### `*+`, `++`, `?+`

Like the `'*'`, `'+'`, and `'?'` quantifiers, those where `'+'` is
appended also match as many times as possible.
However, unlike the true greedy quantifiers, these do not allow
back-tracking when the expression following it fails to match.
These are known as possessive quantifiers.
For example, `a*a` will match `'aaaa'` because the `a*` will match
all 4 `'a'`s, but, when the final `'a'` is encountered, the
expression is backtracked so that in the end the `a*` ends up matching
3 `'a'`s total, and the fourth `'a'` is matched by the final `'a'`.
However, when `a*+a` is used to match `'aaaa'`, the `a*+` will
match all 4 `'a'`, but when the final `'a'` fails to find any more
characters to match, the expression cannot be backtracked and will thus
fail to match.
`x*+`, `x++` and `x?+` are equivalent to `(?>x*)`, `(?>x+)`
and `(?>x?)` correspondingly.

> *Added in version 3.11.*

#### `{m}`

Specifies that exactly *m* copies of the previous RE should be matched; fewer
matches cause the entire RE not to match.  For example, `a{6}` will match
exactly six `'a'` characters, but not five.

#### `{m,n}`

Causes the resulting RE to match from *m* to *n* repetitions of the preceding
RE, attempting to match as many repetitions as possible.  For example,
`a{3,5}` will match from 3 to 5 `'a'` characters.  Omitting *m* specifies a
lower bound of zero,  and omitting *n* specifies an infinite upper bound.  As an
example, `a{4,}b` will match `'aaaab'` or a thousand `'a'` characters
followed by a `'b'`, but not `'aaab'`. The comma may not be omitted or the
modifier would be confused with the previously described form.

#### `{m,n}?`

Causes the resulting RE to match from *m* to *n* repetitions of the preceding
RE, attempting to match as *few* repetitions as possible.  This is the
non-greedy version of the previous quantifier.  For example, on the
6-character string `'aaaaaa'`, `a{3,5}` will match 5 `'a'` characters,
while `a{3,5}?` will only match 3 characters.

#### `{m,n}+`

Causes the resulting RE to match from *m* to *n* repetitions of the
preceding RE, attempting to match as many repetitions as possible
*without* establishing any backtracking points.
This is the possessive version of the quantifier above.
For example, on the 6-character string `'aaaaaa'`, `a{3,5}+aa`
attempts to match 5 `'a'` characters, then, requiring 2 more `'a'`s,
will need more characters than available and thus fail, while
`a{3,5}aa` will match with `a{3,5}` capturing 5, then 4 `'a'`s
by backtracking and then the final 2 `'a'`s are matched by the final
`aa` in the pattern.
`x{m,n}+` is equivalent to `(?>x{m,n})`.

> *Added in version 3.11.*

#### `\`

Either escapes special characters (permitting you to match characters like
`'*'`, `'?'`, and so forth), or signals a special sequence; special
sequences are discussed below.

If you're not using a raw string to express the pattern, remember that Python
also uses the backslash as an escape sequence in string literals; if the escape
sequence isn't recognized by Python's parser, the backslash and subsequent
character are included in the resulting string.  However, if Python would
recognize the resulting sequence, the backslash should be repeated twice.  This
is complicated and hard to understand, so it's highly recommended that you use
raw strings for all but the simplest expressions.

#### `[]`

Used to indicate a set of characters.  In a set:

- Characters can be listed individually, e.g. `[amk]` will match `'a'`,
`'m'`, or `'k'`.

- Ranges of characters can be indicated by giving two characters and separating
them by a `'-'`, for example `[a-z]` will match any lowercase ASCII letter,
`0-5` will match all the two-digits numbers from `00` to `59`, and
`[0-9A-Fa-f]` will match any hexadecimal digit.  If `-` is escaped (e.g.
`[a\-z]`) or if it's placed as the first or last character
(e.g. `[-a]` or `[a-]`), it will match a literal `'-'`.

- Special characters except backslash lose their special meaning inside sets.
For example,
`[(+*)]` will match any of the literal characters `'('`, `'+'`,
`'*'`, or `')'`.

- Backslash either escapes characters which have special meaning in a set
such as `'-'`, `']'`, `'^'` and `'\'` itself or signals
a special sequence which represents a single character such as
`\xa0` or `\n` or a character class such as `\w` or `\S`
(defined below).
Note that `\b` represents a single "backspace" character,
not a word boundary as outside a set, and numeric escapes
such as `\1` are always octal escapes, not group references.
Special sequences which do not match a single character such as `\A`
and `\z` are not allowed.

- Characters that are not within a range can be matched by complementing
the set.  If the first character of the set is `'^'`, all the characters
that are *not* in the set will be matched.  For example, `[^5]` will match
any character except `'5'`, and `[^^]` will match any character except
`'^'`.  `^` has no special meaning if it's not the first character in
the set.

- To match a literal `']'` inside a set, precede it with a backslash, or
place it at the beginning of the set.  For example, both `[()[\]{}]` and
`[]()[{}]` will match a right bracket, as well as left bracket, braces,
and parentheses.

- Support of nested sets and set operations as in `Unicode Technical
Standard #18`_ might be added in the future.  This would change the
syntax, so to facilitate this change a `FutureWarning` will be raised
in ambiguous cases for the time being.
That includes sets starting with a literal `'['` or containing literal
character sequences `'--'`, `'&&'`, `'~~'`, and `'||'`.  To
avoid a warning escape them with a backslash.

> *Changed in version 3.7.*
> `FutureWarning` is raised if a character set contains constructs
> that will change semantically in the future.

#### `|`

`A|B`, where *A* and *B* can be arbitrary REs, creates a regular expression that
will match either *A* or *B*.  An arbitrary number of REs can be separated by the
`'|'` in this way.  This can be used inside groups (see below) as well.  As
the target string is scanned, REs separated by `'|'` are tried from left to
right. When one pattern completely matches, that branch is accepted. This means
that once *A* matches, *B* will not be tested further, even if it would
produce a longer overall match.  In other words, the `'|'` operator is never
greedy.  To match a literal `'|'`, use `|`, or enclose it inside a
character class, as in `[|]`.

#### `(...)`

Matches whatever regular expression is inside the parentheses, and indicates the
start and end of a group; the contents of a group can be retrieved after a match
has been performed, and can be matched later in the string with the `\number`
special sequence, described below.  To match the literals `'('` or `')'`,
use `\(` or `\)`, or enclose them inside a character class: `[(]`, `[)]`.

#### `(?...)`

This is an extension notation (a `'?'` following a `'('` is not meaningful
otherwise).  The first character after the `'?'` determines what the meaning
and further syntax of the construct is. Extensions usually do not create a new
group; `(?P<name>...)` is the only exception to this rule. Following are the
currently supported extensions.

#### `(?aiLmsux)`

(One or more letters from the set
`'a'`, `'i'`, `'L'`, `'m'`, `'s'`, `'u'`, `'x'`.)
The group matches the empty string;
the letters set the corresponding flags for the entire regular expression:

- `re.A` (ASCII-only matching)
- `re.I` (ignore case)
- `re.L` (locale dependent)
- `re.M` (multi-line)
- `re.S` (dot matches all)
- `re.U` (Unicode matching)
- `re.X` (verbose)

(The flags are described in contents-of-module-re.)
This is useful if you wish to include the flags as part of the
regular expression, instead of passing a *flag* argument to the
`re.compile()` function.
Flags should be used first in the expression string.

> *Changed in version 3.11.*
> This construction can only be used at the start of the expression.

#### `(?:...)`

A non-capturing version of regular parentheses.  Matches whatever regular
expression is inside the parentheses, but the substring matched by the group
*cannot* be retrieved after performing a match or referenced later in the
pattern.

#### `(?aiLmsux-imsx:...)`

(Zero or more letters from the set
`'a'`, `'i'`, `'L'`, `'m'`, `'s'`, `'u'`, `'x'`,
optionally followed by `'-'` followed by
one or more letters from the `'i'`, `'m'`, `'s'`, `'x'`.)
The letters set or remove the corresponding flags for the part of the expression:

- `re.A` (ASCII-only matching)
- `re.I` (ignore case)
- `re.L` (locale dependent)
- `re.M` (multi-line)
- `re.S` (dot matches all)
- `re.U` (Unicode matching)
- `re.X` (verbose)

(The flags are described in contents-of-module-re.)

The letters `'a'`, `'L'` and `'u'` are mutually exclusive when used
as inline flags, so they can't be combined or follow `'-'`.  Instead,
when one of them appears in an inline group, it overrides the matching mode
in the enclosing group.  In Unicode patterns `(?a:...)` switches to
ASCII-only matching, and `(?u:...)` switches to Unicode matching
(default).  In bytes patterns `(?L:...)` switches to locale dependent
matching, and `(?a:...)` switches to ASCII-only matching (default).
This override is only in effect for the narrow inline group, and the
original matching mode is restored outside of the group.

> *Added in version 3.6.*

> *Changed in version 3.7.*
> The letters `'a'`, `'L'` and `'u'` also can be used in a group.

#### `(?>...)`

Attempts to match `...` as if it was a separate regular expression, and
if successful, continues to match the rest of the pattern following it.
If the subsequent pattern fails to match, the stack can only be unwound
to a point *before* the `(?>...)` because once exited, the expression,
known as an atomic group, has thrown away all stack points within
itself.
Thus, `(?>.*).` would never match anything because first the `.*`
would match all characters possible, then, having nothing left to match,
the final `.` would fail to match.
Since there are no stack points saved in the Atomic Group, and there is
no stack point before it, the entire expression would thus fail to match.

> *Added in version 3.11.*

#### `(?P<name>...)`

Similar to regular parentheses, but the substring matched by the group is
accessible via the symbolic group name *name*.  Group names must be valid
Python identifiers, and in `bytes` patterns they can only contain
bytes in the ASCII range.  Each group name must be defined only once within
a regular expression.  A symbolic group is also a numbered group, just as if
the group were not named.

Named groups can be referenced in three contexts.  If the pattern is
`(?P<quote>['"]).*?(?P=quote)` (i.e. matching a string quoted with either
single or double quotes):

```text
+---------------------------------------+----------------------------------+
| Context of reference to group "quote" | Ways to reference it             |
+=======================================+==================================+
| in the same pattern itself            | * ``(?P=quote)`` (as shown)      |
|                                       | * ``\1``                         |
+---------------------------------------+----------------------------------+
| when processing match object *m*      | * ``m.group('quote')``           |
|                                       | * ``m.end('quote')`` (etc.)      |
+---------------------------------------+----------------------------------+
| in a string passed to the *repl*      | * ``\g<quote>``                  |
| argument of ``re.sub()``              | * ``\g<1>``                      |
|                                       | * ``\1``                         |
+---------------------------------------+----------------------------------+
```

> *Changed in version 3.12.*
> In `bytes` patterns, group *name* can only contain bytes
> in the ASCII range (`b'\x00'`-`b'\x7f'`).

#### `(?P=name)`

A backreference to a named group; it matches whatever text was matched by the
earlier group named *name*.

#### `(?#...)`

A comment; the contents of the parentheses are simply ignored.

#### `(?=...)`

Matches if `...` matches next, but doesn't consume any of the string.  This is
called a lookahead assertion.  For example, `Isaac (?=Asimov)` will match
`'Isaac '` only if it's followed by `'Asimov'`.

#### `(?!...)`

Matches if `...` doesn't match next.  This is a negative lookahead assertion.
For example, `Isaac (?!Asimov)` will match `'Isaac '` only if it's *not*
followed by `'Asimov'`.

#### `(?<=...)`
