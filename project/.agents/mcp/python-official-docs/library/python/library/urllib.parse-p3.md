---
title: "urllib.parse --- Parse URLs into components (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.parse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# urllib.parse --- Parse URLs into components (part 3 of 4)

### `urljoin(base, url, allow_fragments=True)`

Construct a full ("absolute") URL by combining a "base URL" (*base*) with
another URL (*url*).  Informally, this uses components of the base URL, in
particular the addressing scheme, the network location and (part of) the
path, to provide missing components in the relative URL.  For example:

```python
>>> from urllib.parse import urljoin
>>> urljoin('http://www.cwi.nl/%7Eguido/Python.html', 'FAQ.html')
'http://www.cwi.nl/%7Eguido/FAQ.html'
```

The *allow_fragments* argument has the same meaning and default as for
`urlsplit()`.

> **Note:** If *url* is an absolute URL (that is, it starts with `//` or `scheme://`),
> the *url*'s hostname and/or scheme will be present in the result.  For example:
>
>
> ```python
>
> >>> urljoin('http://www.cwi.nl/%7Eguido/Python.html',
> ...         '//www.python.org/%7Eguido')
> 'http://www.python.org/%7Eguido'
> ```
>
>
> If you do not want that behavior, preprocess the *url* with `urlsplit()` and
> `urlunsplit()`, removing possible *scheme* and *netloc* parts.

> **Warning:** Because an absolute URL may be passed as the `url` parameter, it is
> generally **not secure** to use `urljoin` with an attacker-controlled
> `url`. For example in,
> `urljoin("https://website.com/users/", username)`, if `username` can
> contain an absolute URL, the result of `urljoin` will be the absolute
> URL.

> *Changed in version 3.5.*
> Behavior updated to match the semantics defined in RFC 3986.

### `urldefrag(url, *, missing_as_none=False)`

If *url* contains a fragment identifier, return a modified version of *url*
with no fragment identifier, and the fragment identifier as a separate
string.  If there is no fragment identifier in *url*, return *url* unmodified
and an empty string (by default) or `None` if *missing_as_none* is true.

The return value is a named tuple, its items can be accessed by index
or as named attributes:

```text
+------------------+-------+-------------------------+-------------------------------+
| Attribute        | Index | Value                   | Value if not present          |
+==================+=======+=========================+===============================+
| :attr:`url`      | 0     | URL with no fragment    | empty string                  |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`fragment` | 1     | Fragment identifier     | ``None`` or empty string [3]_ |
+------------------+-------+-------------------------+-------------------------------+
```

See section urlparse-result-object for more information on the result
object.

> *Changed in version 3.2.*
> Result is a structured object rather than a simple 2-tuple.

> *Changed in version 3.15.*
> Added the *missing_as_none* parameter.

### `unwrap(url)`

Extract the url from a wrapped URL (that is, a string formatted as
`<URL:scheme://host/path>`, `<scheme://host/path>`, `URL:scheme://host/path`
or `scheme://host/path`). If *url* is not a wrapped URL, it is returned
without changes.

## URL parsing security

The `urlsplit()` and `urlparse()` APIs do not perform **validation** of
inputs.  They may not raise errors on inputs that other applications consider
invalid.  They may also succeed on some inputs that might not be considered
URLs elsewhere.  Their purpose is for practical functionality rather than
purity.

Instead of raising an exception on unusual input, they may instead return some
component parts as empty strings or `None` (depending on the value of the
*missing_as_none* argument).
Or components may contain more than perhaps they should.

We recommend that users of these APIs where the values may be used anywhere
with security implications code defensively. Do some verification within your
code before trusting a returned component part.  Does that `scheme` make
sense?  Is that a sensible `path`?  Is there anything strange about that
`hostname`?  etc.

What constitutes a URL is not universally well defined.  Different applications
have different needs and desired constraints.  For instance the living `WHATWG
spec`_ describes what user facing web clients such as a web browser require.
While RFC 3986 is more general.  These functions incorporate some aspects of
both, but cannot be claimed compliant with either.  The APIs and existing user
code with expectations on specific behaviors predate both standards leading us
to be very cautious about making API behavior changes.

## Parsing ASCII Encoded Bytes

The URL parsing functions were originally designed to operate on character
strings only. In practice, it is useful to be able to manipulate properly
quoted and encoded URLs as sequences of ASCII bytes. Accordingly, the
URL parsing functions in this module all operate on `bytes` and
`bytearray` objects in addition to `str` objects.

If `str` data is passed in, the result will also contain only
`str` data. If `bytes` or `bytearray` data is
passed in, the result will contain only `bytes` data.

Attempting to mix `str` data with `bytes` or
`bytearray` in a single function call will result in a
`TypeError` being raised, while attempting to pass in non-ASCII
byte values will trigger `UnicodeDecodeError`.

To support easier conversion of result objects between `str` and
`bytes`, all return values from URL parsing functions provide
either an `encode()` method (when the result contains `str`
data) or a `decode()` method (when the result contains `bytes`
data). The signatures of these methods match those of the corresponding
`str` and `bytes` methods (except that the default encoding
is `'ascii'` rather than `'utf-8'`). Each produces a value of a
corresponding type that contains either `bytes` data (for
`encode()` methods) or `str` data (for
`decode()` methods).

Applications that need to operate on potentially improperly quoted URLs
that may contain non-ASCII data will need to do their own decoding from
bytes to characters before invoking the URL parsing methods.

The behaviour described in this section applies only to the URL parsing
functions. The URL quoting functions use their own rules when producing
or consuming byte sequences as detailed in the documentation of the
individual URL quoting functions.

> *Changed in version 3.2.*
> URL parsing functions now accept ASCII encoded byte sequences

## Structured Parse Results

The result objects from the `urlsplit()`, `urlparse()`  and
`urldefrag()` functions are subclasses of the `tuple` type.
These subclasses add the attributes listed in the documentation for
those functions, the encoding and decoding support described in the
previous section, as well as an additional method:

### `urllib.parse.SplitResult.geturl()`

Return the re-combined version of the original URL as a string. This may
differ from the original URL in that the scheme may be normalized to lower
case and empty components may be dropped. Specifically, empty parameters,
queries, and fragment identifiers will be removed unless the URL was parsed
with `missing_as_none=True`.

For `urldefrag()` results, only empty fragment identifiers will be removed.
For `urlsplit()` and `urlparse()` results, all noted changes will be
made to the URL returned by this method.

The result of this method remains unchanged if passed back through the original
parsing function:

```python
>>> from urllib.parse import urlsplit
>>> url = 'HTTP://www.Python.org/doc/#'
>>> r1 = urlsplit(url)
>>> r1.geturl()
'http://www.Python.org/doc/'
>>> r2 = urlsplit(r1.geturl())
>>> r2.geturl()
'http://www.Python.org/doc/'
>>> r3 = urlsplit(url, missing_as_none=True)
>>> r3.geturl()
'http://www.Python.org/doc/#'
```

The following classes provide the implementations of the structured parse
results when operating on `str` objects:

### class `DefragResult(url, fragment)`

Concrete class for `urldefrag()` results containing `str`
data. The `encode()` method returns a `DefragResultBytes`
instance.

> *Added in version 3.2.*

### class `ParseResult(scheme, netloc, path, params, query, fragment)`

Concrete class for `urlparse()` results containing `str`
data. The `encode()` method returns a `ParseResultBytes`
instance.

### class `SplitResult(scheme, netloc, path, query, fragment)`

Concrete class for `urlsplit()` results containing `str`
data. The `encode()` method returns a `SplitResultBytes`
instance.

The following classes provide the implementations of the parse results when
operating on `bytes` or `bytearray` objects:

### class `DefragResultBytes(url, fragment)`

Concrete class for `urldefrag()` results containing `bytes`
data. The `decode()` method returns a `DefragResult`
instance.

> *Added in version 3.2.*

### class `ParseResultBytes(scheme, netloc, path, params, query, fragment)`

Concrete class for `urlparse()` results containing `bytes`
data. The `decode()` method returns a `ParseResult`
instance.

> *Added in version 3.2.*

### class `SplitResultBytes(scheme, netloc, path, query, fragment)`

Concrete class for `urlsplit()` results containing `bytes`
data. The `decode()` method returns a `SplitResult`
instance.

> *Added in version 3.2.*
