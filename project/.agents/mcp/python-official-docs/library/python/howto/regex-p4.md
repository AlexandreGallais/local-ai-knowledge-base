---
title: "Regular expression HOWTO (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/regex.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Regular expression HOWTO (part 4 of 6)

## More pattern power

So far we've only covered a part of the features of regular expressions.  In
this section, we'll cover some new metacharacters, and how to use groups to
retrieve portions of the text that was matched.

### More metacharacters

There are some metacharacters that we haven't covered yet.  Most of them will be
covered in this section.

Some of the remaining metacharacters to be discussed are :dfn:`zero-width
assertions`.  They don't cause the engine to advance through the string;
instead, they consume no characters at all, and simply succeed or fail.  For
example, `\b` is an assertion that the current position is located at a word
boundary; the position isn't changed by the `\b` at all.  This means that
zero-width assertions should never be repeated, because if they match once at a
given location, they can obviously be matched an infinite number of times.

`|`
Alternation, or the "or" operator.   If *A* and *B* are regular expressions,
`A|B` will match any string that matches either *A* or *B*. `|` has very
low precedence in order to make it work reasonably when you're alternating
multi-character strings. `Crow|Servo` will match either `'Crow'` or `'Servo'`,
not `'Cro'`, a `'w'` or an `'S'`, and `'ervo'`.

To match a literal `'|'`, use `|`, or enclose it inside a character class,
as in `[|]`.

`^`
Matches at the beginning of lines.  Unless the `MULTILINE` flag has been
set, this will only match at the beginning of the string.  In `MULTILINE`
mode, this also matches immediately after each newline within the string.

For example, if you wish to match the word `From` only at the beginning of a
line, the RE to use is `^From`.:

```
>>> print(re.search('^From', 'From Here to Eternity'))  #doctest: +ELLIPSIS
<re.Match object; span=(0, 4), match='From'>
>>> print(re.search('^From', 'Reciting From Memory'))
None
```

To match a literal `'^'`, use `\^`.

`$`
Matches at the end of a line, which is defined as either the end of the string,
or any location followed by a newline character.:

```
>>> print(re.search('}$', '{block}'))  #doctest: +ELLIPSIS
<re.Match object; span=(6, 7), match='}'>
>>> print(re.search('}$', '{block} '))
None
>>> print(re.search('}$', '{block}\n'))  #doctest: +ELLIPSIS
<re.Match object; span=(6, 7), match='}'>
```

To match a literal `'$'`, use `\$` or enclose it inside a character class,
as in  `[$]`.

`\A`
Matches only at the start of the string.  When not in `MULTILINE` mode,
`\A` and `^` are effectively the same.  In `MULTILINE` mode, they're
different: `\A` still matches only at the beginning of the string, but `^`
may match at any location inside the string that follows a newline character.

`\z`
Matches only at the end of the string.

`\Z`
The same as `\z`.  For compatibility with old Python versions.

`\b`
Word boundary.  This is a zero-width assertion that matches only at the
beginning or end of a word.  A word is defined as a sequence of alphanumeric
characters, so the end of a word is indicated by whitespace or a
non-alphanumeric character.

The following example matches `class` only when it's a complete word; it won't
match when it's contained inside another word.:

```
>>> p = re.compile(r'\bclass\b')
>>> print(p.search('no class at all'))
<re.Match object; span=(3, 8), match='class'>
>>> print(p.search('the declassified algorithm'))
None
>>> print(p.search('one subclass is'))
None
```

There are two subtleties you should remember when using this special sequence.
First, this is the worst collision between Python's string literals and regular
expression sequences.  In Python's string literals, `\b` is the backspace
character, ASCII value 8.  If you're not using raw strings, then Python will
convert the `\b` to a backspace, and your RE won't match as you expect it to.
The following example looks the same as our previous RE, but omits the `'r'`
in front of the RE string.:

```
>>> p = re.compile('\bclass\b')
>>> print(p.search('no class at all'))
None
>>> print(p.search('\b' + 'class' + '\b'))
<re.Match object; span=(0, 7), match='\x08class\x08'>
```

Second, inside a character class, where there's no use for this assertion,
`\b` represents the backspace character, for compatibility with Python's
string literals.

`\B`
Another zero-width assertion, this is the opposite of `\b`, only matching when
the current position is not at a word boundary.

### Grouping

Frequently you need to obtain more information than just whether the RE matched
or not.  Regular expressions are often used to dissect strings by writing a RE
divided into several subgroups which match different components of interest.
For example, an RFC-822 header line is divided into a header name and a value,
separated by a `':'`, like this:

```none
From: user@example.com
User-Agent: Thunderbird 1.5.0.9 (X11/20061227)
MIME-Version: 1.0
To: user@example.com
```

This can be handled by writing a regular expression which matches an entire
header line, and has one group which matches the header name, and another group
which matches the header's value.

Groups are marked by the `'('`, `')'` metacharacters. `'('` and `')'`
have much the same meaning as they do in mathematical expressions; they group
together the expressions contained inside them, and you can repeat the contents
of a group with a quantifier, such as `*`, `+`, `?`, or
`{m,n}`.  For example, `(ab)*` will match zero or more repetitions of
`ab`.:

```
>>> p = re.compile('(ab)*')
>>> print(p.search('ababababab').span())
(0, 10)
```

Groups indicated with `'('`, `')'` also capture the starting and ending
index of the text that they match; this can be retrieved by passing an argument
to `group()`, `start()`, `end()`, and
`span()`.  Groups are
numbered starting with 0.  Group 0 is always present; it's the whole RE, so
match object methods all have group 0 as their default
argument.  Later we'll see how to express groups that don't capture the span
of text that they match.:

```
>>> p = re.compile('(a)b')
>>> m = p.search('ab')
>>> m.group()
'ab'
>>> m.group(0)
'ab'
```

Subgroups are numbered from left to right, from 1 upward.  Groups can be nested;
to determine the number, just count the opening parenthesis characters, going
from left to right.:

```
>>> p = re.compile('(a(b)c)d')
>>> m = p.search('abcd')
>>> m.group(0)
'abcd'
>>> m.group(1)
'abc'
>>> m.group(2)
'b'
```

`group()` can be passed multiple group numbers at a time, in which case it
will return a tuple containing the corresponding values for those groups.:

```
>>> m.group(2,1,2)
('b', 'abc', 'b')
```

The `groups()` method returns a tuple containing the strings for all the
subgroups, from 1 up to however many there are.:

```
>>> m.groups()
('abc', 'b')
```

Backreferences in a pattern allow you to specify that the contents of an earlier
capturing group must also be found at the current location in the string.  For
example, `\1` will succeed if the exact contents of group 1 can be found at
the current position, and fails otherwise.  Remember that Python's string
literals also use a backslash followed by numbers to allow including arbitrary
characters in a string, so be sure to use a raw string when incorporating
backreferences in a RE.

For example, the following RE detects doubled words in a string.:

```
>>> p = re.compile(r'\b(\w+)\s+\1\b')
>>> p.search('Paris in the the spring').group()
'the the'
```

Backreferences like this aren't often useful for just searching through a string
--- there are few text formats which repeat data in this way --- but you'll soon
find out that they're *very* useful when performing string substitutions.

### Non-capturing and named groups

Elaborate REs may use many groups, both to capture substrings of interest, and
to group and structure the RE itself.  In complex REs, it becomes difficult to
keep track of the group numbers.  There are two features which help with this
problem.  Both of them use a common syntax for regular expression extensions, so
we'll look at that first.

Perl 5 is well known for its powerful additions to standard regular expressions.
For these new features the Perl developers couldn't choose new single-keystroke metacharacters
or new special sequences beginning with `\` without making Perl's regular
expressions confusingly different from standard REs.  If they chose `&` as a
new metacharacter, for example, old expressions would be assuming that `&` was
a regular character and wouldn't have escaped it by writing `\&` or `[&]`.

The solution chosen by the Perl developers was to use `(?...)` as the
extension syntax.  `?` immediately after a parenthesis was a syntax error
because the `?` would have nothing to repeat, so this didn't introduce any
compatibility problems.  The characters immediately after the `?`  indicate
what extension is being used, so `(?=foo)` is one thing (a positive lookahead
assertion) and `(?:foo)` is something else (a non-capturing group containing
the subexpression `foo`).

Python supports several of Perl's extensions and adds an extension
syntax to Perl's extension syntax.  If the first character after the
question mark is a `P`, you know that it's an extension that's
specific to Python.

Now that we've looked at the general extension syntax, we can return
to the features that simplify working with groups in complex REs.

Sometimes you'll want to use a group to denote a part of a regular expression,
but aren't interested in retrieving the group's contents. You can make this fact
explicit by using a non-capturing group: `(?:...)`, where you can replace the
`...` with any other regular expression.:

```
>>> m = re.search("([abc])+", "abc")
>>> m.groups()
('c',)
>>> m = re.search("(?:[abc])+", "abc")
>>> m.groups()
()
```

Except for the fact that you can't retrieve the contents of what the group
matched, a non-capturing group behaves exactly the same as a capturing group;
you can put anything inside it, repeat it with a repetition metacharacter such
as `*`, and nest it within other groups (capturing or non-capturing).
`(?:...)` is particularly useful when modifying an existing pattern, since you
can add new groups without changing how all the other groups are numbered.  It
should be mentioned that there's no performance difference in searching between
capturing and non-capturing groups; neither form is any faster than the other.

A more significant feature is named groups: instead of referring to them by
numbers, groups can be referenced by a name.

The syntax for a named group is one of the Python-specific extensions:
`(?P<name>...)`.  *name* is, obviously, the name of the group.  Named groups
behave exactly like capturing groups, and additionally associate a name
with a group.  The match object methods that deal with
capturing groups all accept either integers that refer to the group by number
or strings that contain the desired group's name.  Named groups are still
given numbers, so you can retrieve information about a group in two ways:

```
>>> p = re.compile(r'(?P<word>\b\w+\b)')
>>> m = p.search( '(((( Lots of punctuation )))' )
>>> m.group('word')
'Lots'
>>> m.group(1)
'Lots'
```

Additionally, you can retrieve named groups as a dictionary with
`groupdict()`:

```
>>> m = re.search(r'(?P<first>\w+) (?P<last>\w+)', 'Jane Doe')
>>> m.groupdict()
{'first': 'Jane', 'last': 'Doe'}
```

Named groups are handy because they let you use easily remembered names, instead
of having to remember numbers.  Here's an example RE from the `imaplib`
module:

```
InternalDate = re.compile(r'INTERNALDATE "'
        r'(?P<day>[ 123][0-9])-(?P<mon>[A-Z][a-z][a-z])-'
        r'(?P<year>[0-9][0-9][0-9][0-9])'
        r' (?P<hour>[0-9][0-9]):(?P<min>[0-9][0-9]):(?P<sec>[0-9][0-9])'
        r' (?P<zonen>[-+])(?P<zoneh>[0-9][0-9])(?P<zonem>[0-9][0-9])'
        r'"')
```

It's obviously much easier to retrieve `m.group('zonem')`, instead of having
to remember to retrieve group 9.

The syntax for backreferences in an expression such as `(...)\1` refers to the
number of the group.  There's naturally a variant that uses the group name
instead of the number. This is another Python extension: `(?P=name)` indicates
that the contents of the group called *name* should again be matched at the
current point.  The regular expression for finding doubled words,
`\b(\w+)\s+\1\b` can also be written as `\b(?P<word>\w+)\s+(?P=word)\b`:

```
>>> p = re.compile(r'\b(?P<word>\w+)\s+(?P=word)\b')
>>> p.search('Paris in the the spring').group()
'the the'
```
