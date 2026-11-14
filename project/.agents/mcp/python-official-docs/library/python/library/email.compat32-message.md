---
title: "email.message.Message: Representing an email message using the compat32 API (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.compat32-message.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `email.message.Message`: Representing an email message using the `compat32` API

Module `email.message`.

The `Message` class is very similar to the
`EmailMessage` class, without the methods added by that
class, and with the default behavior of certain other methods being slightly
different.  We also document here some methods that, while supported by the
`EmailMessage` class, are not recommended unless you are
dealing with legacy code.

The philosophy and structure of the two classes is otherwise the same.

This document describes the behavior under the default (for `Message`)
policy `Compat32`.  If you are going to use another policy,
you should be using the `EmailMessage` class instead.

An email message consists of *headers* and a *payload*.  Headers must be
RFC 5322 style names and values, where the field name and value are
separated by a colon.  The colon is not part of either the field name or the
field value.  The payload may be a simple text message, or a binary object, or
a structured sequence of sub-messages each with their own set of headers and
their own payload.  The latter type of payload is indicated by the message
having a MIME type such as multipart/* or
message/rfc822.

The conceptual model provided by a `Message` object is that of an
ordered dictionary of headers with additional methods for accessing both
specialized information from the headers, for accessing the payload, for
generating a serialized version of the message, and for recursively walking
over the object tree.  Note that duplicate headers are supported but special
methods must be used to access them.

The `Message` pseudo-dictionary is indexed by the header names, which
must be ASCII values.  The values of the dictionary are strings that are
supposed to contain only ASCII characters; there is some special handling for
non-ASCII input, but it doesn't always produce the correct results.  Headers
are stored and returned in case-preserving form, but field names are matched
case-insensitively.  There may also be a single envelope header, also known as
the *Unix-From* header or the `From_` header.  The *payload* is either a
string or bytes, in the case of simple message objects, or a list of
`Message` objects, for MIME container documents (e.g.
multipart/* and message/rfc822).

Here are the methods of the `Message` class:

### class `Message(policy=compat32)`

If *policy* is specified (it must be an instance of a `policy`
class) use the rules it specifies to update and serialize the representation
of the message.  If *policy* is not set, use the :class:`compat32
<email.policy.Compat32>` policy, which maintains backward compatibility with
the Python 3.2 version of the email package.  For more information see the
`policy` documentation.

> *Changed in version 3.3.*

### `as_string(unixfrom=False, maxheaderlen=0, policy=None)`

Return the entire message flattened as a string.  When optional *unixfrom*
is true, the envelope header is included in the returned string.
*unixfrom* defaults to `False`.  For backward compatibility reasons,
*maxheaderlen* defaults to `0`, so if you want a different value you
must override it explicitly (the value specified for *max_line_length* in
the policy will be ignored by this method).  The *policy* argument may be
used to override the default policy obtained from the message instance.
This can be used to control some of the formatting produced by the
method, since the specified *policy* will be passed to the `Generator`.

Flattening the message may trigger changes to the `Message` if
defaults need to be filled in to complete the transformation to a string
(for example, MIME boundaries may be generated or modified).

Note that this method is provided as a convenience and may not always
format the message the way you want.  For example, by default it does
not do the mangling of lines that begin with `From` that is
required by the Unix mbox format.  For more flexibility, instantiate a
`Generator` instance and use its
`flatten()` method directly.  For example:

```
from io import StringIO
from email.generator import Generator
fp = StringIO()
g = Generator(fp, mangle_from_=True, maxheaderlen=60)
g.flatten(msg)
text = fp.getvalue()
```

If the message object contains binary data that is not encoded according
to RFC standards, the non-compliant data will be replaced by Unicode
"unknown character" code points.  (See also `.as_bytes()` and
`BytesGenerator`.)

> *Changed in version 3.4.*

### `__str__()`

Equivalent to `.as_string()`.  Allows `str(msg)` to produce a
string containing the formatted message.

### `as_bytes(unixfrom=False, policy=None)`

Return the entire message flattened as a bytes object.  When optional
*unixfrom* is true, the envelope header is included in the returned
string.  *unixfrom* defaults to `False`.  The *policy* argument may be
used to override the default policy obtained from the message instance.
This can be used to control some of the formatting produced by the
method, since the specified *policy* will be passed to the
`BytesGenerator`.

Flattening the message may trigger changes to the `Message` if
defaults need to be filled in to complete the transformation to a string
(for example, MIME boundaries may be generated or modified).

Note that this method is provided as a convenience and may not always
format the message the way you want.  For example, by default it does
not do the mangling of lines that begin with `From` that is
required by the Unix mbox format.  For more flexibility, instantiate a
`BytesGenerator` instance and use its
`flatten()` method directly.
For example:

```
from io import BytesIO
from email.generator import BytesGenerator
fp = BytesIO()
g = BytesGenerator(fp, mangle_from_=True, maxheaderlen=60)
g.flatten(msg)
text = fp.getvalue()
```

> *Added in version 3.4.*

### `__bytes__()`

Equivalent to `.as_bytes()`.  Allows `bytes(msg)` to produce a
bytes object containing the formatted message.

> *Added in version 3.4.*

### `is_multipart()`

Return `True` if the message's payload is a list of
sub-`Message` objects, otherwise return `False`.  When
`is_multipart()` returns `False`, the payload should be a string
object (which might be a CTE encoded binary payload).  (Note that
`is_multipart()` returning `True` does not necessarily mean that
"msg.get_content_maintype() == 'multipart'" will return the `True`.
For example, `is_multipart` will return `True` when the
`Message` is of type `message/rfc822`.)

### `set_unixfrom(unixfrom)`

Set the message's envelope header to *unixfrom*, which should be a string.

### `get_unixfrom()`

Return the message's envelope header.  Defaults to `None` if the
envelope header was never set.

### `attach(payload)`

Add the given *payload* to the current payload, which must be `None` or
a list of `Message` objects before the call. After the call, the
payload will always be a list of `Message` objects.  If you want to
set the payload to a scalar object (e.g. a string), use
`set_payload()` instead.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by `set_content()` and the
related `make` and `add` methods.

### `get_payload(i=None, decode=False)`

Return the current payload, which will be a list of
`Message` objects when `is_multipart()` is `True`, or a
string when `is_multipart()` is `False`.  If the payload is a list
and you mutate the list object, you modify the message's payload in place.

With optional argument *i*, `get_payload()` will return the *i*-th
element of the payload, counting from zero, if `is_multipart()` is
`True`.  An `IndexError` will be raised if *i* is less than 0 or
greater than or equal to the number of items in the payload.  If the
payload is a string (i.e.  `is_multipart()` is `False`) and *i* is
given, a `TypeError` is raised.

Optional *decode* is a flag indicating whether the payload should be
decoded or not, according to the Content-Transfer-Encoding
header. When `True` and the message is not a multipart, the payload will
be decoded if this header's value is `quoted-printable` or `base64`.
If some other encoding is used, or Content-Transfer-Encoding
header is missing, the payload is
returned as-is (undecoded).  In all cases the returned value is binary
data.  If the message is a multipart and the *decode* flag is `True`,
then `None` is returned.  If the payload is base64 and it was not
perfectly formed (missing padding, characters outside the base64
alphabet), then an appropriate defect will be added to the message's
defect property (`InvalidBase64PaddingDefect` or
`InvalidBase64CharactersDefect`, respectively).

When *decode* is `False` (the default) the body is returned as a string
without decoding the Content-Transfer-Encoding.  However,
for a Content-Transfer-Encoding of 8bit, an attempt is made
to decode the original bytes using the `charset` specified by the
Content-Type header, using the `replace` error handler.
If no `charset` is specified, or if the `charset` given is not
recognized by the email package, the body is decoded using the default
ASCII charset.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by `get_content()` and
`iter_parts()`.

### `set_payload(payload, charset=None)`

Set the entire message object's payload to *payload*.  It is the client's
responsibility to ensure the payload invariants.  Optional *charset* sets
the message's default character set; see `set_charset()` for details.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by `set_content()`.

### `set_charset(charset)`

Set the character set of the payload to *charset*, which can either be a
`Charset` instance (see `email.charset`), a
string naming a character set, or `None`.  If it is a string, it will
be converted to a `Charset` instance.  If *charset*
is `None`, the `charset` parameter will be removed from the
Content-Type header (the message will not be otherwise
modified).  Anything else will generate a `TypeError`.

If there is no existing MIME-Version header one will be
added.  If there is no existing Content-Type header, one
will be added with a value of text/plain.  Whether the
Content-Type header already exists or not, its `charset`
parameter will be set to *charset.output_charset*.   If
*charset.input_charset* and *charset.output_charset* differ, the payload
will be re-encoded to the *output_charset*.  If there is no existing
Content-Transfer-Encoding header, then the payload will be
transfer-encoded, if needed, using the specified
`Charset`, and a header with the appropriate value
will be added.  If a Content-Transfer-Encoding header
already exists, the payload is assumed to already be correctly encoded
using that Content-Transfer-Encoding and is not modified.

This is a legacy method.  On the
`EmailMessage` class its functionality is
replaced by the *charset* parameter of the
`email.message.EmailMessage.set_content()` method.

### `get_charset()`

Return the `Charset` instance associated with the
message's payload.

This is a legacy method.  On the
`EmailMessage` class it always returns
`None`.

The following methods implement a mapping-like interface for accessing the
message's RFC 2822 headers.  Note that there are some semantic differences
between these methods and a normal mapping (i.e. dictionary) interface.  For
example, in a dictionary there are no duplicate keys, but here there may be
duplicate message headers.  Also, in dictionaries there is no guaranteed
order to the keys returned by `keys()`, but in a `Message` object,
headers are always returned in the order they appeared in the original
message, or were added to the message later.  Any header deleted and then
re-added are always appended to the end of the header list.

These semantic differences are intentional and are biased toward maximal
convenience.

Note that in all cases, any envelope header present in the message is not
included in the mapping interface.

In a model generated from bytes, any header values that (in contravention of
the RFCs) contain non-ASCII bytes will, when retrieved through this
interface, be represented as `Header` objects with
a charset of `unknown-8bit`.

### `__len__()`

Return the total number of headers, including duplicates.

### `__contains__(name)`

Return `True` if the message object has a field named *name*. Matching is
done case-insensitively and *name* should not include the trailing colon.
Used for the `in` operator, e.g.:

```
if 'message-id' in myMessage:
   print('Message-ID:', myMessage['message-id'])
```

### `__getitem__(name)`

Return the value of the named header field.  *name* should not include the
colon field separator.  If the header is missing, `None` is returned; a
`KeyError` is never raised.

Note that if the named field appears more than once in the message's
headers, exactly which of those field values will be returned is
undefined.  Use the `get_all()` method to get the values of all the
extant named headers.

### `__setitem__(name, val)`

Add a header to the message with field name *name* and value *val*.  The
field is appended to the end of the message's existing fields.

Note that this does *not* overwrite or delete any existing header with the same
name.  If you want to ensure that the new header is the only one present in the
message with field name *name*, delete the field first, e.g.:

```
del msg['subject']
msg['subject'] = 'Python roolz!'
```

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
named header is missing (defaults to `None`).

Here are some additional useful methods:

### `get_all(name, failobj=None)`

Return a list of all the values for the field named *name*. If there are
no such named headers in the message, *failobj* is returned (defaults to
`None`).
