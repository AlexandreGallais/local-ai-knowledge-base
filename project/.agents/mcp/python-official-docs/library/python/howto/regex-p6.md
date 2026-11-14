---
title: "Regular expression HOWTO (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/regex.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Regular expression HOWTO (part 6 of 6)

## Common problems

Regular expressions are a powerful tool for some applications, but in some ways
their behaviour isn't intuitive and at times they don't behave the way you may
expect them to.  This section will point out some of the most common pitfalls.

### Use string methods

Sometimes using the `re` module is a mistake.  If you're matching a fixed
string, or a single character class, and you're not using any `re` features
such as the `IGNORECASE` flag, then the full power of regular expressions
may not be required. Strings have several methods for performing operations with
fixed strings and they're usually much faster, because the implementation is a
single small C loop that's been optimized for the purpose, instead of the large,
more generalized regular expression engine.

One example might be replacing a single fixed string with another one; for
example, you might replace `word` with `deed`.  `re.sub()` seems like the
function to use for this, but consider the `replace()` method.  Note that
`replace()` will also replace `word` inside words, turning `swordfish`
into `sdeedfish`, but the  naive RE `word` would have done that, too.  (To
avoid performing the substitution on parts of words, the pattern would have to
be `\bword\b`, in order to require that `word` have a word boundary on
either side.  This takes the job beyond  `replace()`'s abilities.)

Another common task is deleting every occurrence of a single character from a
string or replacing it with another single character.  You might do this with
something like `re.sub('\n', ' ', S)`, but `translate()` is capable of
doing both tasks and will be faster than any regular expression operation can
be.

In short, before turning to the `re` module, consider whether your problem
can be solved with a faster and simpler string method.

### prefixmatch() (aka match) versus search()

`prefixmatch()` was added in Python 3.15 as the :ref:`preferred name
<prefixmatch-vs-match>` for `match()`. Before this, it was only known
as `match()` and the distinction with `search()` was often
misunderstood.

`prefixmatch()` aka `match()` only checks if the RE matches at the
beginning of the string while `search()` scans forward through the
string for a match.:

```
>>> print(re.prefixmatch('super', 'superstition').span())
(0, 5)
>>> print(re.prefixmatch('super', 'insuperable'))
None
```

On the other hand, `search()` scans forward through the string,
reporting the first match it finds.:

```
>>> print(re.search('super', 'superstition').span())
(0, 5)
>>> print(re.search('super', 'insuperable').span())
(2, 7)
```

This distinction is important to remember when using the old `match()`
name in code requiring compatibility with older Python versions.

### Greedy versus non-greedy

When repeating a regular expression, as in `a*`, the resulting action is to
consume as much of the pattern as possible.  This fact often bites you when
you're trying to match a pair of balanced delimiters, such as the angle brackets
surrounding an HTML tag.  The naive pattern for matching a single HTML tag
doesn't work because of the greedy nature of `.*`.:

```
>>> s = '<html><head><title>Title</title>'
>>> len(s)
32
>>> print(re.prefixmatch('<.*>', s).span())
(0, 32)
>>> print(re.prefixmatch('<.*>', s).group())
<html><head><title>Title</title>
```

The RE matches the `'<'` in `'<html>'`, and the `.*` consumes the rest of
the string.  There's still more left in the RE, though, and the `>` can't
match at the end of the string, so the regular expression engine has to
backtrack character by character until it finds a match for the `>`.   The
final match extends from the `'<'` in `'<html>'` to the `'>'` in
`'</title>'`, which isn't what you want.

In this case, the solution is to use the non-greedy quantifiers `*?`, `+?`,
`??`, or `{m,n}?`, which match as *little* text as possible.  In the above
example, the `'>'` is tried immediately after the first `'<'` matches, and
when it fails, the engine advances a character at a time, retrying the `'>'`
at every step.  This produces just the right result:

```
>>> print(re.prefixmatch('<.*?>', s).group())
<html>
```

(Note that parsing HTML or XML with regular expressions is painful.
Quick-and-dirty patterns will handle common cases, but HTML and XML have special
cases that will break the obvious regular expression; by the time you've written
a regular expression that handles all of the possible cases, the patterns will
be *very* complicated.  Use an HTML or XML parser module for such tasks.)

### Using re.VERBOSE

By now you've probably noticed that regular expressions are a very compact
notation, but they're not terribly readable.  REs of moderate complexity can
become lengthy collections of backslashes, parentheses, and metacharacters,
making them difficult to read and understand.

For such REs, specifying the `re.VERBOSE` flag when compiling the regular
expression can be helpful, because it allows you to format the regular
expression more clearly.

The `re.VERBOSE` flag has several effects.  Whitespace in the regular
expression that *isn't* inside a character class is ignored.  This means that an
expression such as `dog | cat` is equivalent to the less readable `dog|cat`,
but `[a b]` will still match the characters `'a'`, `'b'`, or a space.  In
addition, you can also put comments inside a RE; comments extend from a `#`
character to the next newline.  When used with triple-quoted strings, this
enables REs to be formatted more neatly:

```
pat = re.compile(r"""
 \s*                 # Skip leading whitespace
 (?P<header>[^:]+)   # Header name
 \s* :               # Whitespace, and a colon
 (?P<value>.*?)      # The header's value -- *? used to
                     # lose the following trailing whitespace
 \s*$                # Trailing whitespace to end-of-line
""", re.VERBOSE)
```

This is far more readable than:

```
pat = re.compile(r"\s*(?P<header>[^:]+)\s*:(?P<value>.*?)\s*$")
```

## Feedback

Regular expressions are a complicated topic.  Did this document help you
understand them?  Were there parts that were unclear, or problems you
encountered that weren't covered here?  If so, please send suggestions for
improvements to the issue tracker.

The most complete book on regular expressions is almost certainly Jeffrey
Friedl's Mastering Regular Expressions, published by O'Reilly.  Unfortunately,
it exclusively concentrates on Perl and Java's flavours of regular expressions,
and doesn't contain any Python material at all, so it won't be useful as a
reference for programming in Python.  (The first edition covered Python's
now-removed `regex` module, which won't help you much.)  Consider checking
it out from your library.
