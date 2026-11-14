---
title: "Regular expression HOWTO (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/regex.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Regular expression HOWTO (part 5 of 6)

### Lookahead assertions

Another zero-width assertion is the lookahead assertion.  Lookahead assertions
are available in both positive and negative form, and  look like this:

`(?=...)`
Positive lookahead assertion.  This succeeds if the contained regular
expression, represented here by `...`, successfully matches at the current
location, and fails otherwise. But, once the contained expression has been
tried, the matching engine doesn't advance at all; the rest of the pattern is
tried right where the assertion started.

`(?!...)`
Negative lookahead assertion.  This is the opposite of the positive assertion;
it succeeds if the contained expression *doesn't* match at the current position
in the string.

To make this concrete, let's look at a case where a lookahead is useful.
Consider a simple pattern to match a filename and split it apart into a base
name and an extension, separated by a `.`.  For example, in `news.rc`,
`news` is the base name, and `rc` is the filename's extension.

The pattern to match this is quite simple:

`.*[.].*$`

Notice that the `.` needs to be treated specially because it's a
metacharacter, so it's inside a character class to only match that
specific character.  Also notice the trailing `$`; this is added to
ensure that all the rest of the string must be included in the
extension.  This regular expression matches `foo.bar` and
`autoexec.bat` and `sendmail.cf` and `printers.conf`.

Now, consider complicating the problem a bit; what if you want to match
filenames where the extension is not `bat`? Some incorrect attempts:

`.*..*$`

The first attempt above tries to exclude `bat` by requiring
that the first character of the extension is not a `b`.  This is wrong,
because the pattern also doesn't match `foo.bar`.

`.*.$`

The expression gets messier when you try to patch up the first solution by
requiring one of the following cases to match: the first character of the
extension isn't `b`; the second character isn't `a`; or the third character
isn't `t`.  This accepts `foo.bar` and rejects `autoexec.bat`, but it
requires a three-letter extension and won't accept a filename with a two-letter
extension such as `sendmail.cf`.  We'll complicate the pattern again in an
effort to fix it.

`.*.$`

In the third attempt, the second and third letters are all made optional in
order to allow matching extensions shorter than three characters, such as
`sendmail.cf`.

The pattern's getting really complicated now, which makes it hard to read and
understand.  Worse, if the problem changes and you want to exclude both `bat`
and `exe` as extensions, the pattern would get even more complicated and
confusing.

A negative lookahead cuts through all this confusion:

`.*.[^.]*$`

The negative lookahead means: if the expression `bat`
doesn't match at this point, try the rest of the pattern; if `bat$` does
match, the whole pattern will fail.  The trailing `$` is required to ensure
that something like `sample.batch`, where the extension only starts with
`bat`, will be allowed.  The `[^.]*` makes sure that the pattern works
when there are multiple dots in the filename.

Excluding another filename extension is now easy; simply add it as an
alternative inside the assertion.  The following pattern excludes filenames that
end in either `bat` or `exe`:

`.*.[^.]*$`

## Modifying strings

Up to this point, we've simply performed searches against a static string.
Regular expressions are also commonly used to modify strings in various ways,
using the following pattern methods:

```text
+------------------+-----------------------------------------------+
| Method/Attribute | Purpose                                       |
+==================+===============================================+
| ``split()``      | Split the string into a list, splitting it    |
|                  | wherever the RE matches                       |
+------------------+-----------------------------------------------+
| ``sub()``        | Find all substrings where the RE matches, and |
|                  | replace them with a different string          |
+------------------+-----------------------------------------------+
| ``subn()``       | Does the same thing as :meth:`!sub`,  but     |
|                  | returns the new string and the number of      |
|                  | replacements                                  |
+------------------+-----------------------------------------------+
```

### Splitting strings

The `split()` method of a pattern splits a string apart
wherever the RE matches, returning a list of the pieces. It's similar to the
`split()` method of strings but provides much more generality in the
delimiters that you can split by; string `split()` only supports splitting by
whitespace or by a fixed string.  As you'd expect, there's a module-level
`re.split()` function, too.

### `.split(string [, maxsplit=0])`

Split *string* by the matches of the regular expression.  If capturing
parentheses are used in the RE, then their contents will also be returned as
part of the resulting list.  If *maxsplit* is nonzero, at most *maxsplit* splits
are performed.

You can limit the number of splits made, by passing a value for *maxsplit*.
When *maxsplit* is nonzero, at most *maxsplit* splits will be made, and the
remainder of the string is returned as the final element of the list.  In the
following example, the delimiter is any sequence of non-alphanumeric characters.

```
>>> p = re.compile(r'\W+')
>>> p.split('This is a test, short and sweet, of split().')
['This', 'is', 'a', 'test', 'short', 'and', 'sweet', 'of', 'split', '']
>>> p.split('This is a test, short and sweet, of split().', 3)
['This', 'is', 'a', 'test, short and sweet, of split().']
```

Sometimes you're not only interested in what the text between delimiters is, but
also need to know what the delimiter was.  If capturing parentheses are used in
the RE, then their values are also returned as part of the list.  Compare the
following calls:

```
>>> p = re.compile(r'\W+')
>>> p2 = re.compile(r'(\W+)')
>>> p.split('This... is a test.')
['This', 'is', 'a', 'test', '']
>>> p2.split('This... is a test.')
['This', '... ', 'is', ' ', 'a', ' ', 'test', '.', '']
```

The module-level function `re.split()` adds the RE to be used as the first
argument, but is otherwise the same.:

```
>>> re.split(r'[\W]+', 'Words, words, words.')
['Words', 'words', 'words', '']
>>> re.split(r'([\W]+)', 'Words, words, words.')
['Words', ', ', 'words', ', ', 'words', '.', '']
>>> re.split(r'[\W]+', 'Words, words, words.', 1)
['Words', 'words, words.']
```

### Search and replace

Another common task is to find all the matches for a pattern, and replace them
with a different string.  The `sub()` method takes a replacement value,
which can be either a string or a function, and the string to be processed.

### `.sub(replacement, string[, count=0])`

Returns the string obtained by replacing the leftmost non-overlapping
occurrences of the RE in *string* by the replacement *replacement*.  If the
pattern isn't found, *string* is returned unchanged.

The optional argument *count* is the maximum number of pattern occurrences to be
replaced; *count* must be a non-negative integer.  The default value of 0 means
to replace all occurrences.

Here's a simple example of using the `sub()` method.  It replaces colour
names with the word `colour`:

```
>>> p = re.compile('(blue|white|red)')
>>> p.sub('colour', 'blue socks and red shoes')
'colour socks and colour shoes'
>>> p.sub('colour', 'blue socks and red shoes', count=1)
'colour socks and red shoes'
```

The `subn()` method does the same work, but returns a 2-tuple containing the
new string value and the number of replacements  that were performed:

```
>>> p = re.compile('(blue|white|red)')
>>> p.subn('colour', 'blue socks and red shoes')
('colour socks and colour shoes', 2)
>>> p.subn('colour', 'no colours at all')
('no colours at all', 0)
```

Empty matches are replaced only when they're not adjacent to a previous empty match.

```
>>> p = re.compile('x*')
>>> p.sub('-', 'abxd')
'-a-b--d-'
```

If *replacement* is a string, any backslash escapes in it are processed.  That
is, `\n` is converted to a single newline character, `\r` is converted to a
carriage return, and so forth. Unknown escapes such as `\&` are left alone.
Backreferences, such as `\6`, are replaced with the substring matched by the
corresponding group in the RE.  This lets you incorporate portions of the
original text in the resulting replacement string.

This example matches the word `section` followed by a string enclosed in
`{`, `}`, and changes `section` to `subsection`:

```
>>> p = re.compile('section{ ( [^}]* ) }', re.VERBOSE)
>>> p.sub(r'subsection{\1}','section{First} section{second}')
'subsection{First} subsection{second}'
```

There's also a syntax for referring to named groups as defined by the
`(?P<name>...)` syntax.  `\g<name>` will use the substring matched by the
group named `name`, and  `\g<number>`  uses the corresponding group number.
`\g<2>` is therefore equivalent to `\2`,  but isn't ambiguous in a
replacement string such as `\g<2>0`.  (`\20` would be interpreted as a
reference to group 20, not a reference to group 2 followed by the literal
character `'0'`.)  The following substitutions are all equivalent, but use all
three variations of the replacement string.:

```
>>> p = re.compile('section{ (?P<name> [^}]* ) }', re.VERBOSE)
>>> p.sub(r'subsection{\1}','section{First}')
'subsection{First}'
>>> p.sub(r'subsection{\g<1>}','section{First}')
'subsection{First}'
>>> p.sub(r'subsection{\g<name>}','section{First}')
'subsection{First}'
```

*replacement* can also be a function, which gives you even more control.  If
*replacement* is a function, the function is called for every non-overlapping
occurrence of *pattern*.  On each call, the function is passed a
match object argument for the match and can use this
information to compute the desired replacement string and return it.

In the following example, the replacement function translates decimals into
hexadecimal:

```
>>> def hexrepl(match):
...     "Return the hex string for a decimal number"
...     value = int(match.group())
...     return hex(value)
...
>>> p = re.compile(r'\d+')
>>> p.sub(hexrepl, 'Call 65490 for printing, 49152 for user code.')
'Call 0xffd2 for printing, 0xc000 for user code.'
```

When using the module-level `re.sub()` function, the pattern is passed as
the first argument.  The pattern may be provided as an object or as a string; if
you need to specify regular expression flags, you must either use a
pattern object as the first parameter, or use embedded modifiers in the
pattern string, e.g. `sub("(?i)b+", "x", "bbbb BBBB")` returns `'x x'`.
