---
title: "email.message.Message: Representing an email message using the compat32 API (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.compat32-message.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# email.message.Message: Representing an email message using the compat32 API (part 2 of 2)

### `add_header(_name, _value, **_params)`

Extended header setting.  This method is similar to `__setitem__()`
except that additional header parameters can be provided as keyword
arguments.  *_name* is the header field to add and *_value* is the
*primary* value for the header.

For each item in the keyword argument dictionary *_params*, the key is
taken as the parameter name, with underscores converted to dashes (since
dashes are illegal in Python identifiers).  Normally, the parameter will
be added as `key="value"` unless the value is `None`, in which case
only the key will be added.  If the value contains non-ASCII characters,
it can be specified as a three tuple in the format
`(CHARSET, LANGUAGE, VALUE)`, where `CHARSET` is a string naming the
charset to be used to encode the value, `LANGUAGE` can usually be set
to `None` or the empty string (see RFC 2231 for other possibilities),
and `VALUE` is the string value containing non-ASCII code points.  If
a three tuple is not passed and the value contains non-ASCII characters,
it is automatically encoded in RFC 2231 format using a `CHARSET`
of `utf-8` and a `LANGUAGE` of `None`.

Here's an example:

```
msg.add_header('Content-Disposition', 'attachment', filename='bud.gif')
```

This will add a header that looks like:

```
Content-Disposition: attachment; filename="bud.gif"
```

An example with non-ASCII characters:

```
msg.add_header('Content-Disposition', 'attachment',
               filename=('iso-8859-1', '', 'Fußballer.ppt'))
```

Which produces:

```
Content-Disposition: attachment; filename*="iso-8859-1''Fu%DFballer.ppt"
```

### `replace_header(_name, _value)`

Replace a header.  Replace the first header found in the message that
matches *_name*, retaining header order and field name case.  If no
matching header was found, a `KeyError` is raised.

### `get_content_type()`

Return the message's content type.  The returned string is coerced to
lower case of the form maintype/subtype.  If there was no
Content-Type header in the message the default type as given
by `get_default_type()` will be returned.  Since according to
RFC 2045, messages always have a default type, `get_content_type()`
will always return a value.

RFC 2045 defines a message's default type to be text/plain
unless it appears inside a multipart/digest container, in
which case it would be message/rfc822.  If the
Content-Type header has an invalid type specification,
RFC 2045 mandates that the default type be text/plain.

### `get_content_maintype()`

Return the message's main content type.  This is the maintype
part of the string returned by `get_content_type()`.

### `get_content_subtype()`

Return the message's sub-content type.  This is the subtype
part of the string returned by `get_content_type()`.

### `get_default_type()`

Return the default content type.  Most messages have a default content
type of text/plain, except for messages that are subparts of
multipart/digest containers.  Such subparts have a default
content type of message/rfc822.

### `set_default_type(ctype)`

Set the default content type.  *ctype* should either be
text/plain or message/rfc822, although this is not
enforced.  The default content type is not stored in the
Content-Type header.

### `get_params(failobj=None, header='content-type', unquote=True)`

Return the message's Content-Type parameters, as a list.
The elements of the returned list are 2-tuples of key/value pairs, as
split on the `'='` sign.  The left hand side of the `'='` is the key,
while the right hand side is the value.  If there is no `'='` sign in
the parameter the value is the empty string, otherwise the value is as
described in `get_param()` and is unquoted if optional *unquote* is
`True` (the default).

Optional *failobj* is the object to return if there is no
Content-Type header.  Optional *header* is the header to
search instead of Content-Type.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by the *params* property of the individual header objects
returned by the header access methods.

### `get_param(param, failobj=None, header='content-type', unquote=True)`

Return the value of the Content-Type header's parameter
*param* as a string.  If the message has no Content-Type
header or if there is no such parameter, then *failobj* is returned
(defaults to `None`).

Optional *header* if given, specifies the message header to use instead of
Content-Type.

Parameter keys are always compared case insensitively.  The return value
can either be a string, or a 3-tuple if the parameter was RFC 2231
encoded.  When it's a 3-tuple, the elements of the value are of the form
`(CHARSET, LANGUAGE, VALUE)`.  Note that both `CHARSET` and
`LANGUAGE` can be `None`, in which case you should consider `VALUE`
to be encoded in the `us-ascii` charset.  You can usually ignore
`LANGUAGE`.

If your application doesn't care whether the parameter was encoded as in
RFC 2231, you can collapse the parameter value by calling
`email.utils.collapse_rfc2231_value()`, passing in the return value
from `get_param()`.  This will return a suitably decoded Unicode
string when the value is a tuple, or the original string unquoted if it
isn't.  For example:

```
rawparam = msg.get_param('foo')
param = email.utils.collapse_rfc2231_value(rawparam)
```

In any case, the parameter value (either the returned string, or the
`VALUE` item in the 3-tuple) is always unquoted, unless *unquote* is set
to `False`.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by the *params* property of the individual header objects
returned by the header access methods.

### `set_param(param, value, header='Content-Type', requote=True, \`

```python
charset=None, language='', replace=False)
```

Set a parameter in the Content-Type header.  If the
parameter already exists in the header, its value will be replaced with
*value*.  If the Content-Type header as not yet been defined
for this message, it will be set to text/plain and the new
parameter value will be appended as per RFC 2045.

Optional *header* specifies an alternative header to
Content-Type, and all parameters will be quoted as necessary
unless optional *requote* is `False` (the default is `True`).

If optional *charset* is specified, the parameter will be encoded
according to RFC 2231. Optional *language* specifies the RFC 2231
language, defaulting to the empty string.  Both *charset* and *language*
should be strings.

If *replace* is `False` (the default) the header is moved to the
end of the list of headers.  If *replace* is `True`, the header
will be updated in place.

> *Changed in version 3.4.*

### `del_param(param, header='content-type', requote=True)`

Remove the given parameter completely from the Content-Type
header.  The header will be re-written in place without the parameter or
its value.  All values will be quoted as necessary unless *requote* is
`False` (the default is `True`).  Optional *header* specifies an
alternative to Content-Type.

### `set_type(type, header='Content-Type', requote=True)`

Set the main type and subtype for the Content-Type
header. *type* must be a string in the form maintype/subtype,
otherwise a `ValueError` is raised.

This method replaces the Content-Type header, keeping all
the parameters in place.  If *requote* is `False`, this leaves the
existing header's quoting as is, otherwise the parameters will be quoted
(the default).

An alternative header can be specified in the *header* argument. When the
Content-Type header is set a MIME-Version
header is also added.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by the `make_` and `add_` methods.

### `get_filename(failobj=None)`

Return the value of the `filename` parameter of the
Content-Disposition header of the message.  If the header
does not have a `filename` parameter, this method falls back to looking
for the `name` parameter on the Content-Type header.  If
neither is found, or the header is missing, then *failobj* is returned.
The returned string will always be unquoted as per
`email.utils.unquote()`.

### `get_boundary(failobj=None)`

Return the value of the `boundary` parameter of the
Content-Type header of the message, or *failobj* if either
the header is missing, or has no `boundary` parameter.  The returned
string will always be unquoted as per `email.utils.unquote()`.

### `set_boundary(boundary)`

Set the `boundary` parameter of the Content-Type header to
*boundary*.  `set_boundary()` will always quote *boundary* if
necessary.  A `HeaderParseError` is raised if the
message object has no Content-Type header.

Note that using this method is subtly different than deleting the old
Content-Type header and adding a new one with the new
boundary via `add_header()`, because `set_boundary()` preserves
the order of the Content-Type header in the list of
headers. However, it does *not* preserve any continuation lines which may
have been present in the original Content-Type header.

### `get_content_charset(failobj=None)`

Return the `charset` parameter of the Content-Type header,
coerced to lower case.  If there is no Content-Type header, or if
that header has no `charset` parameter, *failobj* is returned.

Note that this method differs from `get_charset()` which returns the
`Charset` instance for the default encoding of the message body.

### `get_charsets(failobj=None)`

Return a list containing the character set names in the message.  If the
message is a multipart, then the list will contain one element
for each subpart in the payload, otherwise, it will be a list of length 1.

Each item in the list will be a string which is the value of the
`charset` parameter in the Content-Type header for the
represented subpart.  However, if the subpart has no
Content-Type header, no `charset` parameter, or is not of
the text main MIME type, then that item in the returned list
will be *failobj*.

### `get_content_disposition()`

Return the lowercased value (without parameters) of the message's
Content-Disposition header if it has one, or `None`.  The
possible values for this method are *inline*, *attachment* or `None`
if the message follows RFC 2183.

> *Added in version 3.5.*

### `walk()`

The `walk()` method is an all-purpose generator which can be used to
iterate over all the parts and subparts of a message object tree, in
depth-first traversal order.  You will typically use `walk()` as the
iterator in a `for` loop; each iteration returns the next subpart.

Here's an example that prints the MIME type of every part of a multipart
message structure:

```python

>>> for part in msg.walk():
...     print(part.get_content_type())
multipart/report
text/plain
message/delivery-status
text/plain
text/plain
message/rfc822
text/plain
```

`walk` iterates over the subparts of any part where
`is_multipart()` returns `True`, even though
`msg.get_content_maintype() == 'multipart'` may return `False`.  We
can see this in our example by making use of the `_structure` debug
helper function:

```python

>>> for part in msg.walk():
...     print(part.get_content_maintype() == 'multipart',
...           part.is_multipart())
True True
False False
False True
False False
False False
False True
False False
>>> _structure(msg)
multipart/report
    text/plain
    message/delivery-status
        text/plain
        text/plain
    message/rfc822
        text/plain
```

Here the `message` parts are not `multiparts`, but they do contain
subparts. `is_multipart()` returns `True` and `walk` descends
into the subparts.

`Message` objects can also optionally contain two instance attributes,
which can be used when generating the plain text of a MIME message.

### `preamble`

The format of a MIME document allows for some text between the blank line
following the headers, and the first multipart boundary string. Normally,
this text is never visible in a MIME-aware mail reader because it falls
outside the standard MIME armor.  However, when viewing the raw text of
the message, or when viewing the message in a non-MIME aware reader, this
text can become visible.

The *preamble* attribute contains this leading extra-armor text for MIME
documents.  When the `Parser` discovers some text
after the headers but before the first boundary string, it assigns this
text to the message's *preamble* attribute.  When the
`Generator` is writing out the plain text
representation of a MIME message, and it finds the
message has a *preamble* attribute, it will write this text in the area
between the headers and the first boundary.  See `email.parser` and
`email.generator` for details.

Note that if the message object has no preamble, the *preamble* attribute
will be `None`.

### `epilogue`

The *epilogue* attribute acts the same way as the *preamble* attribute,
except that it contains text that appears between the last boundary and
the end of the message.

You do not need to set the epilogue to the empty string in order for the
`Generator` to print a newline at the end of the
file.

### `defects`

The *defects* attribute contains a list of all the problems found when
parsing this message.  See `email.errors` for a detailed description
of the possible parsing defects.
