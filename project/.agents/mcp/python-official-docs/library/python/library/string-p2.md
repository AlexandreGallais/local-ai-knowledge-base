---
title: "string --- Common string operations (part 2 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/string.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# string --- Common string operations (part 2 of 5)

## Format string syntax

The `str.format()` method and the `Formatter` class share the same
syntax for format strings (although in the case of `Formatter`,
subclasses can define their own format string syntax).  The syntax is
related to that of formatted string literals and
template string literals, but it is less sophisticated
and, in particular, does not support arbitrary expressions in interpolations.

Format strings contain "replacement fields" surrounded by curly braces `{}`.
Anything that is not contained in braces is considered literal text, which is
copied unchanged to the output.  If you need to include a brace character in the
literal text, it can be escaped by doubling: `{{` and `}}`.

The grammar for a replacement field is as follows:

```text
format-string
replacement_field: "{" [`field_name`] ["!" `conversion`] [":" `format_spec`] "}"
field_name: `arg_name` ("." `attribute_name` | "[" `element_index` "]")*
arg_name: [`~python-grammar:identifier` | `~python-grammar:digit`+]
attribute_name: `~python-grammar:identifier`
element_index: `~python-grammar:digit`+ | `index_string`
index_string: <any source character except "]"> +
conversion: "r" | "s" | "a"
format_spec: `format-spec:format_spec`
```

In less formal terms, the replacement field can start with a *field_name* that specifies
the object whose value is to be formatted and inserted
into the output instead of the replacement field.
The *field_name* is optionally followed by a  *conversion* field, which is
preceded by an exclamation point `'!'`, and a *format_spec*, which is preceded
by a colon `':'`.  These specify a non-default format for the replacement value.

See also the formatspec section.

The *field_name* itself begins with an *arg_name* that is either a number or a
keyword.  If it's a number, it refers to a positional argument, and if it's a keyword,
it refers to a named keyword argument. An *arg_name* is treated as a number if
a call to `str.isdecimal()` on the string would return true.
If the numerical arg_names in a format string
are 0, 1, 2, ... in sequence, they can all be omitted (not just some)
and the numbers 0, 1, 2, ... will be automatically inserted in that order.
Because *arg_name* is not quote-delimited, it is not possible to specify arbitrary
dictionary keys (e.g., the strings `'10'` or `':-]'`) within a format string.
The *arg_name* can be followed by any number of index or
attribute expressions. An expression of the form `'.name'` selects the named
attribute using `getattr()`, while an expression of the form `'[index]'`
does an index lookup using `__getitem__()`.

> *Changed in version 3.1.*
> The positional argument specifiers can be omitted for `str.format()`,
> so `'{} {}'.format(a, b)` is equivalent to `'{0} {1}'.format(a, b)`.

> *Changed in version 3.4.*
> The positional argument specifiers can be omitted for `Formatter`.

Some simple format string examples:

```
"First, thou shalt count to {0}"  # References first positional argument
"Bring me a {}"                   # Implicitly references the first positional argument
"From {} to {}"                   # Same as "From {0} to {1}"
"My quest is {name}"              # References keyword argument 'name'
"Weight in tons {0.weight}"       # 'weight' attribute of first positional arg
"Units destroyed: {players[0]}"   # First element of keyword argument 'players'.
```

The *conversion* field causes a type coercion before formatting.  Normally, the
job of formatting a value is done by the `__format__()` method of the value
itself.  However, in some cases it is desirable to force a type to be formatted
as a string, overriding its own definition of formatting.  By converting the
value to a string before calling `__format__()`, the normal formatting logic
is bypassed.

Three conversion flags are currently supported: `'!s'` which calls `str()`
on the value, `'!r'` which calls `repr()` and `'!a'` which calls
`ascii()`.

Some examples:

```
"Harold's a clever {0!s}"        # Calls str() on the argument first
"Bring out the holy {name!r}"    # Calls repr() on the argument first
"More {!a}"                      # Calls ascii() on the argument first
```

The *format_spec* field contains a specification of how the value should be
presented, including such details as field width, alignment, padding, decimal
precision and so on.  Each value type can define its own "formatting
mini-language" or interpretation of the *format_spec*.

Most built-in types support a common formatting mini-language, which is
described in the next section.

A *format_spec* field can also include nested replacement fields within it.
These nested replacement fields may contain a field name, conversion flag
and format specification, but deeper nesting is
not allowed.  The replacement fields within the
format_spec are substituted before the *format_spec* string is interpreted.
This allows the formatting of a value to be dynamically specified.

See the formatexamples section for some examples.
