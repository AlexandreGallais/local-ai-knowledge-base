---
title: "re --- Regular expression operations (part 7 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/re.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# re --- Regular expression operations (part 7 of 8)

## Match objects

Match objects always have a boolean value of `True`.
Since `match()` and `search()` return `None`
when there is no match, you can test whether there was a match with a simple
`if` statement:

```
if match := re.search(pattern, string):
    process(match)
```

### class `Match`

Match object returned by successful `match`es and `search`es.

Matches are generic over the type of string which was
matched (`str` or `bytes`).

> *Changed in version 3.9.*
> `re.Match` supports `[]` to indicate a Unicode (str) or bytes match.
> See types-genericalias.

### `Match.expand(template)`

Return the string obtained by doing backslash substitution on the template
string *template*, as done by the `sub()` method.
Escapes such as `\n` are converted to the appropriate characters,
and numeric backreferences (`\1`, `\2`) and named backreferences
(`\g<1>`, `\g<name>`) are replaced by the contents of the
corresponding group. The backreference `\g<0>` will be
replaced by the entire match.

> *Changed in version 3.5.*
> Unmatched groups are replaced with an empty string.

### `Match.group([group1, ...])`

Returns one or more subgroups of the match.  If there is a single argument, the
result is a single string; if there are multiple arguments, the result is a
tuple with one item per argument. Without arguments, *group1* defaults to zero
(the whole match is returned). If a *groupN* argument is zero, the corresponding
return value is the entire matching string; if it is a positive integer, it is
the string matching the corresponding parenthesized group.  If a group number is
negative or larger than the number of groups defined in the pattern, an
`IndexError` exception is raised. If a group is contained in a
part of the pattern that did not match, the corresponding result is `None`.
If a group is contained in a part of the pattern that matched multiple times,
the last match is returned.:

```
>>> m = re.search(r"\A(\w+) (\w+)", "Norwegian Blue, pining for the fjords")
>>> m.group(0)       # The entire match
'Norwegian Blue'
>>> m.group(1)       # The first parenthesized subgroup.
'Norwegian'
>>> m.group(2)       # The second parenthesized subgroup.
'Blue'
>>> m.group(1, 2)    # Multiple arguments give us a tuple.
('Norwegian', 'Blue')
```

If the regular expression uses the `(?P<name>...)` syntax, the *groupN*
arguments may also be strings identifying groups by their group name.  If a
string argument is not used as a group name in the pattern, an `IndexError`
exception is raised.

A moderately complicated example:

```
>>> m = re.search(r"(?P<adjective>\w+) (?P<animal>\w+)", "killer rabbit")
>>> m.group('adjective')
'killer'
>>> m.group('animal')
'rabbit'
```

Named groups can also be referred to by their index:

```
>>> m.group(1)
'killer'
>>> m.group(2)
'rabbit'
```

If a group matches multiple times, only the last match is accessible:

```
>>> m = re.search(r"(..)+", "a1b2c3")  # Matches 3 times.
>>> m.group(1)                         # Returns only the last match.
'c3'
```

### `Match.__getitem__(g)`

This is identical to `m.group(g)`.  This allows easier access to
an individual group from a match:

```
>>> m = re.search(r"(\w+) (\w+)", "Norwegian Blue, pining for the fjords")
>>> m[0]       # The entire match
'Norwegian Blue'
>>> m[1]       # The first parenthesized subgroup.
'Norwegian'
>>> m[2]       # The second parenthesized subgroup.
'Blue'
```

Named groups are supported as well:

```
>>> m = re.search(r"(?P<adjective>\w+) (?P<animal>\w+)", "killer rabbit")
>>> m['adjective']
'killer'
>>> m['animal']
'rabbit'
```

> *Added in version 3.6.*

### `Match.groups(default=None)`

Return a tuple containing all the subgroups of the match, from 1 up to however
many groups are in the pattern.  The *default* argument is used for groups that
did not participate in the match; it defaults to `None`.

For example:

```
>>> m = re.search(r"(\d+)\.(\d+)", "24.1632")
>>> m.groups()
('24', '1632')
```

If we make the decimal place and everything after it optional, not all groups
might participate in the match.  These groups will default to `None` unless
the *default* argument is given:

```
>>> m = re.search(r"(\d+)\.?(\d+)?", "24")
>>> m.groups()      # Second group defaults to None.
('24', None)
>>> m.groups('0')   # Now, the second group defaults to '0'.
('24', '0')
```

### `Match.groupdict(default=None)`

Return a dictionary containing all the *named* subgroups of the match, keyed by
the subgroup name.  The *default* argument is used for groups that did not
participate in the match; it defaults to `None`.  For example:

```
>>> m = re.search(r"(?P<adjective>\w+) (?P<animal>\w+)", "killer rabbit")
>>> m.groupdict()
{'adjective': 'killer', 'animal': 'rabbit'}
```

### `Match.start([group])`

```python
Match.end([group])
```

Return the indices of the start and end of the substring matched by *group*;
*group* defaults to zero (meaning the whole matched substring). Return `-1` if
*group* exists but did not contribute to the match.  For a match object *m*, and
a group *g* that did contribute to the match, the substring matched by group *g*
(equivalent to `m.group(g)`) is:

```
m.string[m.start(g):m.end(g)]
```

Note that `m.start(group)` will equal `m.end(group)` if *group* matched a
null string.  For example, after `m = re.search('b(c?)', 'cba')`,
`m.start(0)` is 1, `m.end(0)` is 2, `m.start(1)` and `m.end(1)` are both
2, and `m.start(2)` raises an `IndexError` exception.

An example that will remove *remove_this* from email addresses:

```
>>> email = "user@example.com"
>>> m = re.search("remove_this", email)
>>> email[:m.start()] + email[m.end():]
'user@example.com'
```

### `Match.span([group])`

For a match *m*, return the 2-tuple `(m.start(group), m.end(group))`. Note
that if *group* did not contribute to the match, this is `(-1, -1)`.
*group* defaults to zero, the entire match.

### `Match.pos`

The value of *pos* which was passed to the `search()` or
`match()` method of a regex object.  This is
the index into the string at which the RE engine started looking for a match.

### `Match.endpos`

The value of *endpos* which was passed to the `search()` or
`match()` method of a regex object.  This is
the index into the string beyond which the RE engine will not go.

### `Match.lastindex`

The integer index of the last matched capturing group, or `None` if no group
was matched at all. For example, the expressions `(a)b`, `((a)(b))`, and
`((ab))` will have `lastindex == 1` if applied to the string `'ab'`, while
the expression `(a)(b)` will have `lastindex == 2`, if applied to the same
string.

### `Match.lastgroup`

The name of the last matched capturing group, or `None` if the group didn't
have a name, or if no group was matched at all.

### `Match.re`

The regular expression object whose `match()` or
`search()` method produced this match instance.

### `Match.string`

The string passed to `match()` or `search()`.

> *Changed in version 3.7.*
> Added support of `copy.copy()` and `copy.deepcopy()`.  Match objects
> are considered atomic.
