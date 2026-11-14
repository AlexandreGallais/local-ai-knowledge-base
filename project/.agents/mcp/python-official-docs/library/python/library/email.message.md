---
title: "email.message: Representing an email message (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.message.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `email.message`: Representing an email message

Module `email.message`.

**Source code:** Lib/email/message.py

> *Added in version 3.6.*

The central class in the `email` package is the `EmailMessage`
class, imported from the `email.message` module.  It is the base class for
the `email` object model.  `EmailMessage` provides the core
functionality for setting and querying header fields, for accessing message
bodies, and for creating or modifying structured messages.

An email message consists of *headers* and a *payload* (which is also referred
to as the *content*).  Headers are RFC 5322 or RFC 6532 style field names
and values, where the field name and value are separated by a colon.  The colon
is not part of either the field name or the field value.  The payload may be a
simple text message, or a binary object, or a structured sequence of
sub-messages each with their own set of headers and their own payload.  The
latter type of payload is indicated by the message having a MIME type such as
multipart/* or message/rfc822.

The conceptual model provided by an `EmailMessage` object is that of an
ordered dictionary of headers coupled with a *payload* that represents the
RFC 5322 body of the message, which might be a list of sub-`EmailMessage`
objects.  In addition to the normal dictionary methods for accessing the header
names and values, there are methods for accessing specialized information from
the headers (for example the MIME content type), for operating on the payload,
for generating a serialized version of the message, and for recursively walking
over the object tree.

The `EmailMessage` dictionary-like interface is indexed by the header
names, which must be ASCII values.  The values of the dictionary are strings
with some extra methods.  Headers are stored and returned in case-preserving
form, but field names are matched case-insensitively.  The keys are ordered,
but unlike a real dict, there can be duplicates.  Additional methods are
provided for working with headers that have duplicate keys.

The *payload* is either a string or bytes object, in the case of simple message
objects, or a list of `EmailMessage` objects, for MIME container
documents such as multipart/* and message/rfc822
message objects.

### class `EmailMessage(policy=default)`

If *policy* is specified use the rules it specifies to update and serialize
the representation of the message.  If *policy* is not set, use the
`default` policy, which follows the rules of the email
RFCs except for line endings (instead of the RFC mandated `\r\n`, it uses
the Python standard `\n` line endings).  For more information see the
`policy` documentation.

### `as_string(unixfrom=False, maxheaderlen=None, policy=None)`

Return the entire message flattened as a string.  When optional
*unixfrom* is true, the envelope header is included in the returned
string.  *unixfrom* defaults to `False`.  For backward compatibility
with the base `Message` class *maxheaderlen* is
accepted, but defaults to `None`, which means that by default the line
length is controlled by the
`max_line_length` of the policy.  The
*policy* argument may be used to override the default policy obtained
from the message instance.  This can be used to control some of the
formatting produced by the method, since the specified *policy* will be
passed to the `Generator`.

Flattening the message may trigger changes to the `EmailMessage`
if defaults need to be filled in to complete the transformation to a
string (for example, MIME boundaries may be generated or modified).

Note that this method is provided as a convenience and may not be the
most useful way to serialize messages in your application, especially if
you are dealing with multiple messages.  See
`email.generator.Generator` for a more flexible API for
serializing messages.  Note also that this method is restricted to
producing messages serialized as "7 bit clean" when
`utf8` is `False`, which is the default.

> *Changed in version 3.6.*
> is not specified was changed from defaulting to 0 to defaulting
> to the value of *max_line_length* from the policy.

### `__str__()`

Equivalent to `as_string(policy=self.policy.clone(utf8=True))`.  Allows
`str(msg)` to produce a string containing the serialized message in a
readable format.

> *Changed in version 3.4.*
> thus producing an RFC 6531-like message representation, instead of
> being a direct alias for `as_string()`.

### `as_bytes(unixfrom=False, policy=None)`

Return the entire message flattened as a bytes object.  When optional
*unixfrom* is true, the envelope header is included in the returned
string.  *unixfrom* defaults to `False`.  The *policy* argument may be
used to override the default policy obtained from the message instance.
This can be used to control some of the formatting produced by the
method, since the specified *policy* will be passed to the
`BytesGenerator`.

Flattening the message may trigger changes to the `EmailMessage`
if defaults need to be filled in to complete the transformation to a
string (for example, MIME boundaries may be generated or modified).

Note that this method is provided as a convenience and may not be the
most useful way to serialize messages in your application, especially if
you are dealing with multiple messages.  See
`email.generator.BytesGenerator` for a more flexible API for
serializing messages.

### `__bytes__()`

Equivalent to `.as_bytes()`.  Allows `bytes(msg)` to produce a
bytes object containing the serialized message.

### `is_multipart()`

Return `True` if the message's payload is a list of
sub-`EmailMessage` objects, otherwise return `False`.  When
`is_multipart()` returns `False`, the payload should be a string
object (which might be a CTE encoded binary payload).  Note that
`is_multipart()` returning `True` does not necessarily mean that
"msg.get_content_maintype() == 'multipart'" will return the `True`.
For example, `is_multipart` will return `True` when the
`EmailMessage` is of type `message/rfc822`.

### `set_unixfrom(unixfrom)`

Set the message's envelope header to *unixfrom*, which should be a
string.  (See `mboxMessage` for a brief description of
this header.)

### `get_unixfrom()`

Return the message's envelope header.  Defaults to `None` if the
envelope header was never set.

The following methods implement the mapping-like interface for accessing the
message's headers.  Note that there are some semantic differences
between these methods and a normal mapping (i.e. dictionary) interface.  For
example, in a dictionary there are no duplicate keys, but here there may be
duplicate message headers.  Also, in dictionaries there is no guaranteed
order to the keys returned by `keys()`, but in an `EmailMessage`
object, headers are always returned in the order they appeared in the
original message, or in which they were added to the message later.  Any
header deleted and then re-added is always appended to the end of the
header list.

These semantic differences are intentional and are biased toward
convenience in the most common use cases.

Note that in all cases, any envelope header present in the message is not
included in the mapping interface.

### `__len__()`

Return the total number of headers, including duplicates.

### `__contains__(name)`

Return `True` if the message object has a field named *name*. Matching is
done without regard to case and *name* does not include the trailing
colon.  Used for the `in` operator.  For example:

```
if 'message-id' in myMessage:
   print('Message-ID:', myMessage['message-id'])
```

### `__getitem__(name)`

Return the value of the named header field.  *name* does not include the
colon field separator.  If the header is missing, `None` is returned; a
`KeyError` is never raised.

Note that if the named field appears more than once in the message's
headers, exactly which of those field values will be returned is
undefined.  Use the `get_all()` method to get the values of all the
extant headers named *name*.

Using the standard (non-`compat32`) policies, the returned value is an
instance of a subclass of `email.headerregistry.BaseHeader`.

### `__setitem__(name, val)`

Add a header to the message with field name *name* and value *val*.  The
field is appended to the end of the message's existing headers.

Note that this does *not* overwrite or delete any existing header with the same
name.  If you want to ensure that the new header is the only one present in the
message with field name *name*, delete the field first, e.g.:

```
del msg['subject']
msg['subject'] = 'Python roolz!'
```

If the `policy` defines certain headers to be unique (as the standard
policies do), this method may raise a `ValueError` when an attempt
is made to assign a value to such a header when one already exists.  This
behavior is intentional for consistency's sake, but do not depend on it
as we may choose to make such assignments do an automatic deletion of the
existing header in the future.

### `__delitem__(name)`

Delete all occurrences of the field with name *name* from the message's
headers.  No exception is raised if the named field isn't present in the
headers.

### `keys()`

Return a list of all the message's header field names.

### `values()`

Return a list of all the message's field values.

### `items()`

Return a list of 2-tuples containing all the message's field headers and
values.

### `get(name, failobj=None)`

Return the value of the named header field.  This is identical to
`__getitem__()` except that optional *failobj* is returned if the
named header is missing (*failobj* defaults to `None`).

Here are some additional useful header related methods:

### `get_all(name, failobj=None)`

Return a list of all the values for the field named *name*. If there are
no such named headers in the message, *failobj* is returned (defaults to
`None`).

### `add_header(_name, _value, **_params)`

Extended header setting.  This method is similar to `__setitem__()`
except that additional header parameters can be provided as keyword
arguments.  *_name* is the header field to add and *_value* is the
*primary* value for the header.

For each item in the keyword argument dictionary *_params*, the key is
taken as the parameter name, with underscores converted to dashes (since
dashes are illegal in Python identifiers).  Normally, the parameter will
be added as `key="value"` unless the value is `None`, in which case
only the key will be added.

If the value contains non-ASCII characters, the charset and language may
be explicitly controlled by specifying the value as a three tuple in the
format `(CHARSET, LANGUAGE, VALUE)`, where `CHARSET` is a string
naming the charset to be used to encode the value, `LANGUAGE` can
usually be set to `None` or the empty string (see RFC 2231 for other
possibilities), and `VALUE` is the string value containing non-ASCII
code points.  If a three tuple is not passed and the value contains
non-ASCII characters, it is automatically encoded in RFC 2231 format
using a `CHARSET` of `utf-8` and a `LANGUAGE` of `None`.

Here is an example:

```
msg.add_header('Content-Disposition', 'attachment', filename='bud.gif')
```

This will add a header that looks like:

```
Content-Disposition: attachment; filename="bud.gif"
```

An example of the extended interface with non-ASCII characters:

```
msg.add_header('Content-Disposition', 'attachment',
               filename=('iso-8859-1', '', 'Fußballer.ppt'))
```

### `replace_header(_name, _value)`

Replace a header.  Replace the first header found in the message that
matches *_name*, retaining header order and field name case of the
original header.  If no matching header is found, raise a
`KeyError`.

### `get_content_type()`

Return the message's content type, coerced to lower case of the form
maintype/subtype.  If there is no Content-Type
header in the message return the value returned by
`get_default_type()`.  If the Content-Type header is
invalid, return `text/plain`.

(According to RFC 2045, messages always have a default type,
`get_content_type()` will always return a value.  RFC 2045 defines
a message's default type to be text/plain unless it appears
inside a multipart/digest container, in which case it would
be message/rfc822.  If the Content-Type header
has an invalid type specification, RFC 2045 mandates that the default
type be text/plain.)

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
text/plain or message/rfc822, although this is
not enforced.  The default content type is not stored in the
Content-Type header, so it only affects the return value of
the `get_content_type` methods when no Content-Type
header is present in the message.

### `set_param(param, value, header='Content-Type', requote=True, \`

```python
charset=None, language='', replace=False)
```

Set a parameter in the Content-Type header.  If the
parameter already exists in the header, replace its value with *value*.
When *header* is `Content-Type` (the default) and the header does not
yet exist in the message, add it, set its value to
text/plain, and append the new parameter value.  Optional
*header* specifies an alternative header to Content-Type.

If the value contains non-ASCII characters, the charset and language may
be explicitly specified using the optional *charset* and *language*
parameters.  Optional *language* specifies the RFC 2231 language,
defaulting to the empty string.  Both *charset* and *language* should be
strings.  The default is to use the `utf8` *charset* and `None` for
the *language*.

If *replace* is `False` (the default) the header is moved to the
end of the list of headers.  If *replace* is `True`, the header
will be updated in place.

Use of the *requote* parameter with `EmailMessage` objects is
deprecated.

Note that existing parameter values of headers may be accessed through
the `params` attribute of the
header value (for example, `msg['Content-Type'].params['charset']`).

> *Changed in version 3.4.*

### `del_param(param, header='content-type', requote=True)`

Remove the given parameter completely from the Content-Type
header.  The header will be re-written in place without the parameter or
its value.  Optional *header* specifies an alternative to
Content-Type.

Use of the *requote* parameter with `EmailMessage` objects is
deprecated.
