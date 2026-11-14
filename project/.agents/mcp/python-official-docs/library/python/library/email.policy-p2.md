---
title: "email.policy: Policy Objects (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.policy.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# email.policy: Policy Objects (part 2 of 2)

### `utf8`

If `False`, follow RFC 5322, supporting non-ASCII characters in
headers by encoding them as RFC 2047 "encoded words".  If `True`,
follow RFC 6532 and use `utf-8` encoding for headers.  Messages
formatted in this way may be passed to SMTP servers that support
the `SMTPUTF8` extension (RFC 6531).

When `False`, the generator will raise
`HeaderWriteError` if any header includes non-ASCII
characters in a context where RFC 2047 does not permit encoded words.
This particularly applies to mailboxes ("addr-spec") with non-ASCII
characters, which can be created via
`Address`. To use a mailbox with a non-ASCII
domain name with `utf8=False`, first encode the domain using the
third-party idna or uts46 module or with
`encodings.idna`. It is not possible to use a non-ASCII username
("local-part") in a mailbox when `utf8=False`.

> *Changed in version 3.15.*
> Can trigger the raising of `HeaderWriteError`.
> (Earlier versions incorrectly applied RFC 2047 in certain contexts,
> mostly notably in addr-specs.)

### `refold_source`

If the value for a header in the `Message` object originated from a
`parser` (as opposed to being set by a program), this
attribute indicates whether or not a generator should refold that value
when transforming the message back into serialized form.  The possible
values are:

```text
========  ===============================================================
``none``  all source values use original folding
```

`long`  source values that have any line that is longer than
`max_line_length` will be refolded

`all`   all values are refolded.
========  ===============================================================

The default is `long`.

### `header_factory`

A callable that takes two arguments, `name` and `value`, where
`name` is a header field name and `value` is an unfolded header field
value, and returns a string subclass that represents that header.  A
default `header_factory` (see `headerregistry`) is provided
that supports custom parsing for the various address and date 5322
header field types, and the major MIME header field stypes.  Support for
additional custom parsing will be added in the future.

### `content_manager`

An object with at least two methods: get_content and set_content.  When
the `get_content()` or
`set_content()` method of an
`EmailMessage` object is called, it calls the
corresponding method of this object, passing it the message object as its
first argument, and any arguments or keywords that were passed to it as
additional arguments.  By default `content_manager` is set to
`raw_data_manager`.

> *Added in version 3.4.*

The class provides the following concrete implementations of the abstract
methods of `Policy`:

### `header_max_count(name)`

Returns the value of the
`max_count` attribute of the
specialized class used to represent the header with the given name.

### `header_source_parse(sourcelines)`

The name is parsed as everything up to the '`:`' and returned
unmodified.  The value is determined by stripping leading whitespace off
the remainder of the first line, joining all subsequent lines together,
and stripping any trailing carriage return or linefeed characters.

### `header_store_parse(name, value)`

The name is returned unchanged.  If the input value has a `name`
attribute and it matches *name* ignoring case, the value is returned
unchanged.  Otherwise the *name* and *value* are passed to
`header_factory`, and the resulting header object is returned as
the value.  In this case a `ValueError` is raised if the input value
contains CR or LF characters.

### `header_fetch_parse(name, value)`

If the value has a `name` attribute, it is returned to unmodified.
Otherwise the *name*, and the *value* with any CR or LF characters
removed, are passed to the `header_factory`, and the resulting
header object is returned.  Any surrogateescaped bytes get turned into
the Unicode unknown-character glyph.

### `fold(name, value)`

Header folding is controlled by the `refold_source` policy setting.
A value is considered to be a 'source value' if and only if it does not
have a `name` attribute (having a `name` attribute means it is a
header object of some sort).  If a source value needs to be refolded
according to the policy, it is converted into a header object by
passing the *name* and the *value* with any CR and LF characters removed
to the `header_factory`.  Folding of a header object is done by
calling its `fold` method with the current policy.

Source values are split into lines using `splitlines()`.  If
the value is not to be refolded, the lines are rejoined using the
`linesep` from the policy and returned.  The exception is lines
containing non-ascii binary data.  In that case the value is refolded
regardless of the `refold_source` setting, which causes the binary data
to be CTE encoded using the `unknown-8bit` charset.

### `fold_binary(name, value)`

The same as `fold()` if `cte_type` is `7bit`, except
that the returned value is bytes.

If `cte_type` is `8bit`, non-ASCII binary data is
converted back
into bytes.  Headers with binary data are not refolded, regardless of the
`refold_header` setting, since there is no way to know whether the
binary data consists of single byte characters or multibyte characters.

The following instances of `EmailPolicy` provide defaults suitable for
specific application domains.  Note that in the future the behavior of these
instances (in particular the `HTTP` instance) may be adjusted to conform even
more closely to the RFCs relevant to their domains.

### `default`

An instance of `EmailPolicy` with all defaults unchanged.  This policy
uses the standard Python `\n` line endings rather than the RFC-correct
`\r\n`.

### `SMTP`

Suitable for serializing messages in conformance with the email RFCs.
Like `default`, but with `linesep` set to `\r\n`, which is RFC
compliant.

### `SMTPUTF8`

The same as `SMTP` except that `utf8` is `True`.
Useful for serializing messages to a message store without using encoded
words in the headers.  Should only be used for SMTP transmission if the
sender or recipient addresses have non-ASCII characters (the
`smtplib.SMTP.send_message()` method handles this automatically).

### `HTTP`

Suitable for serializing headers with for use in HTTP traffic.  Like
`SMTP` except that `max_line_length` is set to `None` (unlimited).

### `strict`

Convenience instance.  The same as `default` except that
`raise_on_defect` is set to `True`.  This allows any policy to be made
strict by writing:

```
somepolicy + policy.strict
```

With all of these `EmailPolicies`, the effective API of
the email package is changed from the Python 3.2 API in the following ways:

- Setting a header on a `Message` results in that
header being parsed and a header object created.

- Fetching a header value from a `Message` results
in that header being parsed and a header object created and
returned.

- Any header object, or any header that is refolded due to the
policy settings, is folded using an algorithm that fully implements the
RFC folding algorithms, including knowing where encoded words are required
and allowed.

From the application view, this means that any header obtained through the
`EmailMessage` is a header object with extra
attributes, whose string value is the fully decoded value of the
header.  Likewise, a header may be assigned a new value, or a new header
created, using a string, and the policy will take care of converting
the string into the correct RFC encoded form.

The header objects and their attributes are described in
`headerregistry`.

### class `Compat32(**kw)`

This concrete `Policy` is the backward compatibility policy.  It
replicates the behavior of the email package in Python 3.2.  The
`policy` module also defines an instance of this class,
`compat32`, that is used as the default policy.  Thus the default
behavior of the email package is to maintain compatibility with Python 3.2.

The following attributes have values that are different from the
`Policy` default:

### `mangle_from_`

The default is `True`.

The class provides the following concrete implementations of the
abstract methods of `Policy`:

### `header_source_parse(sourcelines)`

The name is parsed as everything up to the '`:`' and returned
unmodified.  The value is determined by stripping leading whitespace off
the remainder of the first line, joining all subsequent lines together,
and stripping any trailing carriage return or linefeed characters.

### `header_store_parse(name, value)`

The name and value are returned unmodified.

### `header_fetch_parse(name, value)`

If the value contains binary data, it is converted into a
`Header` object using the `unknown-8bit` charset.
Otherwise it is returned unmodified.

### `fold(name, value)`

Headers are folded using the `Header` folding
algorithm, which preserves existing line breaks in the value, and wraps
each resulting line to the `max_line_length`.  Non-ASCII binary data are
CTE encoded using the `unknown-8bit` charset.

### `fold_binary(name, value)`

Headers are folded using the `Header` folding
algorithm, which preserves existing line breaks in the value, and wraps
each resulting line to the `max_line_length`.  If `cte_type` is
`7bit`, non-ascii binary data is CTE encoded using the `unknown-8bit`
charset.  Otherwise the original source header is used, with its existing
line breaks and any (RFC invalid) binary data it may contain.

### `compat32`

An instance of `Compat32`, providing  backward compatibility with the
behavior of the email package in Python 3.2.

> **Note:** The `compat32` policy should not be used as a policy for
> `EmailMessage` objects, and should only be used
> to serialize messages that were created using the `compat32`
> policy.

**Footnotes**
