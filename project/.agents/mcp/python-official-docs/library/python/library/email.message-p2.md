---
title: "email.message: Representing an email message (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.message.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# email.message: Representing an email message (part 2 of 2)

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

Note that using this method is subtly different from deleting the old
Content-Type header and adding a new one with the new
boundary via `add_header()`, because `set_boundary()` preserves
the order of the Content-Type header in the list of
headers.

### `get_content_charset(failobj=None)`

Return the `charset` parameter of the Content-Type header,
coerced to lower case.  If there is no Content-Type header, or if
that header has no `charset` parameter, *failobj* is returned.

### `get_charsets(failobj=None)`

Return a list containing the character set names in the message.  If the
message is a multipart, then the list will contain one element
for each subpart in the payload, otherwise, it will be a list of length 1.

Each item in the list will be a string which is the value of the
`charset` parameter in the Content-Type header for the
represented subpart.  If the subpart has no Content-Type
header, no `charset` parameter, or is not of the text main
MIME type, then that item in the returned list will be *failobj*.

### `is_attachment`

Return `True` if there is a Content-Disposition header
and its (case insensitive) value is `attachment`, `False` otherwise.

> *Changed in version 3.4.2.*
> is_attachment is now a method instead of a property, for consistency
> with `is_multipart()`.

### `get_content_disposition()`

Return the lowercased value (without parameters) of the message's
Content-Disposition header if it has one, or `None`.  The
possible values for this method are *inline*, *attachment* or `None`
if the message follows RFC 2183.

> *Added in version 3.5.*

The following methods relate to interrogating and manipulating the content
(payload) of the message.

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

>>> from email.iterators import _structure
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

### `get_body(preferencelist=('related', 'html', 'plain'))`

Return the MIME part that is the best candidate to be the "body" of the
message.

*preferencelist* must be a sequence of strings from the set `related`,
`html`, and `plain`, and indicates the order of preference for the
content type of the part returned.

Start looking for candidate matches with the object on which the
`get_body` method is called.

If `related` is not included in *preferencelist*, consider the root
part (or subpart of the root part) of any related encountered as a
candidate if the (sub-)part matches a preference.

When encountering a `multipart/related`, check the `start` parameter
and if a part with a matching Content-ID is found, consider
only it when looking for candidate matches.  Otherwise consider only the
first (default root) part of the `multipart/related`.

If a part has a Content-Disposition header, only consider
the part a candidate match if the value of the header is `inline`.

If none of the candidates matches any of the preferences in
*preferencelist*, return `None`.

Notes: (1) For most applications the only *preferencelist* combinations
that really make sense are `('plain',)`, `('html', 'plain')`, and the
default `('related', 'html', 'plain')`.  (2) Because matching starts
with the object on which `get_body` is called, calling `get_body` on
a `multipart/related` will return the object itself unless
*preferencelist* has a non-default value. (3) Messages (or message parts)
that do not specify a Content-Type or whose
Content-Type header is invalid will be treated as if they
are of type `text/plain`, which may occasionally cause `get_body` to
return unexpected results.

### `iter_attachments()`

Return an iterator over all of the immediate sub-parts of the message
that are not candidate "body" parts.  That is, skip the first occurrence
of each of `text/plain`, `text/html`, `multipart/related`, or
`multipart/alternative` (unless they are explicitly marked as
attachments via Content-Disposition: attachment), and
return all remaining parts.  When applied directly to a
`multipart/related`, return an iterator over the all the related parts
except the root part (ie: the part pointed to by the `start` parameter,
or the first part if there is no `start` parameter or the `start`
parameter doesn't match the Content-ID of any of the
parts).  When applied directly to a `multipart/alternative` or a
non-`multipart`, return an empty iterator.

### `iter_parts()`

Return an iterator over all of the immediate sub-parts of the message,
which will be empty for a non-`multipart`.  (See also
`walk()`.)

### `get_content(*args, content_manager=None, **kw)`

Call the `get_content()` method
of the *content_manager*, passing self as the message object, and passing
along any other arguments or keywords as additional arguments.  If
*content_manager* is not specified, use the `content_manager` specified
by the current `policy`.

### `set_content(*args, content_manager=None, **kw)`

Call the `set_content()` method
of the *content_manager*, passing self as the message object, and passing
along any other arguments or keywords as additional arguments.  If
*content_manager* is not specified, use the `content_manager` specified
by the current `policy`.

### `make_related(boundary=None)`

Convert a non-`multipart` message into a `multipart/related` message,
moving any existing Content- headers and payload into a
(new) first part of the `multipart`.  If *boundary* is specified, use
it as the boundary string in the multipart, otherwise leave the boundary
to be automatically created when it is needed (for example, when the
message is serialized).

### `make_alternative(boundary=None)`

Convert a non-`multipart` or a `multipart/related` into a
`multipart/alternative`, moving any existing Content-
headers and payload into a (new) first part of the `multipart`.  If
*boundary* is specified, use it as the boundary string in the multipart,
otherwise leave the boundary to be automatically created when it is
needed (for example, when the message is serialized).

### `make_mixed(boundary=None)`

Convert a non-`multipart`, a `multipart/related`, or a
`multipart-alternative` into a `multipart/mixed`, moving any existing
Content- headers and payload into a (new) first part of the
`multipart`.  If *boundary* is specified, use it as the boundary string
in the multipart, otherwise leave the boundary to be automatically
created when it is needed (for example, when the message is serialized).

### `add_related(*args, content_manager=None, **kw)`

If the message is a `multipart/related`, create a new message
object, pass all of the arguments to its `set_content()` method,
and `attach()` it to the `multipart`.  If
the message is a non-`multipart`, call `make_related()` and then
proceed as above.  If the message is any other type of `multipart`,
raise a `TypeError`. If *content_manager* is not specified, use
the `content_manager` specified by the current `policy`.
If the added part has no Content-Disposition header,
add one with the value `inline`.

### `add_alternative(*args, content_manager=None, **kw)`

If the message is a `multipart/alternative`, create a new message
object, pass all of the arguments to its `set_content()` method, and
`attach()` it to the `multipart`.  If the
message is a non-`multipart` or `multipart/related`, call
`make_alternative()` and then proceed as above.  If the message is
any other type of `multipart`, raise a `TypeError`. If
*content_manager* is not specified, use the `content_manager` specified
by the current `policy`.

### `add_attachment(*args, content_manager=None, **kw)`

If the message is a `multipart/mixed`, create a new message object,
pass all of the arguments to its `set_content()` method, and
`attach()` it to the `multipart`.  If the
message is a non-`multipart`, `multipart/related`, or
`multipart/alternative`, call `make_mixed()` and then proceed as
above. If *content_manager* is not specified, use the `content_manager`
specified by the current `policy`.  If the added part
has no Content-Disposition header, add one with the value
`attachment`.  This method can be used both for explicit attachments
(Content-Disposition: attachment) and `inline` attachments
(Content-Disposition: inline), by passing appropriate
options to the `content_manager`.

### `clear()`

Remove the payload and all of the headers.

### `clear_content()`

Remove the payload and all of the Content- headers, leaving
all other headers intact and in their original order.

`EmailMessage` objects have the following instance attributes:

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
the end of the message.  As with the `preamble`,
if there is no epilog text this attribute will be `None`.

### `defects`

The *defects* attribute contains a list of all the problems found when
parsing this message.  See `email.errors` for a detailed description
of the possible parsing defects.

### class `MIMEPart(policy=default)`

This class represents a subpart of a MIME message.  It is identical to
`EmailMessage`, except that no MIME-Version headers are
added when `set_content()` is called, since sub-parts do
not need their own MIME-Version headers.

**Footnotes**
