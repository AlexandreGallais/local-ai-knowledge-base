---
title: "urllib.parse --- Parse URLs into components (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/urllib.parse.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# urllib.parse --- Parse URLs into components (part 2 of 4)

## URL Parsing

The URL parsing functions focus on splitting a URL string into its components,
or on combining URL components into a URL string.

### `urlsplit(urlstring, scheme=None, allow_fragments=True, *, missing_as_none=False)`

Parse a URL into five components, returning a 5-item named tuple
`SplitResult` or `SplitResultBytes`.
This corresponds to the general structure of a URL:
`scheme://netloc/path?query#fragment`.
Each tuple item is a string, possibly empty, or `None` if
*missing_as_none* is true.
Not defined component are represented an empty string (by default) or
`None` if *missing_as_none* is true.
The delimiters as shown above are not part of the result, except for a
leading slash in the *path* component, which is retained if present.

Additionally, the netloc property is broken down into these additional
attributes added to the returned object: username, password, hostname, and
port.

Percent-encoded sequences are not decoded.

For example:

```python

>>> from urllib.parse import urlsplit
>>> urlsplit("scheme://netloc/path?query#fragment")
SplitResult(scheme='scheme', netloc='netloc', path='/path',
            query='query', fragment='fragment')
>>> o = urlsplit("http://docs.python.org:80/3/library/urllib.parse.html?"
...              "highlight=params#url-parsing")
>>> o
SplitResult(scheme='http', netloc='docs.python.org:80',
            path='/3/library/urllib.parse.html',
            query='highlight=params', fragment='url-parsing')
>>> o.scheme
'http'
>>> o.netloc
'docs.python.org:80'
>>> o.hostname
'docs.python.org'
>>> o.port
80
>>> o._replace(fragment="").geturl()
'http://docs.python.org:80/3/library/urllib.parse.html?highlight=params'
>>> urlsplit("http://docs.python.org?")
SplitResult(scheme='http', netloc='docs.python.org', path='',
            query='', fragment='')
>>> urlsplit("http://docs.python.org?", missing_as_none=True)
SplitResult(scheme='http', netloc='docs.python.org', path='',
            query='', fragment=None)
```

Following the syntax specifications in RFC 1808, `urlsplit()` recognizes
a netloc only if it is properly introduced by '//'.  Otherwise the
input is presumed to be a relative URL and thus to start with
a path component.

```python

>>> from urllib.parse import urlsplit
>>> urlsplit('//www.cwi.nl:80/%7Eguido/Python.html')
SplitResult(scheme='', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            query='', fragment='')
>>> urlsplit('www.cwi.nl/%7Eguido/Python.html')
SplitResult(scheme='', netloc='', path='www.cwi.nl/%7Eguido/Python.html',
            query='', fragment='')
>>> urlsplit('help/Python.html')
SplitResult(scheme='', netloc='', path='help/Python.html',
            query='', fragment='')
>>> urlsplit('help/Python.html', missing_as_none=True)
SplitResult(scheme=None, netloc=None, path='help/Python.html',
            query=None, fragment=None)
```

The *scheme* argument gives the default addressing scheme, to be
used only if the URL does not specify one.  It should be the same type
(text or bytes) as *urlstring* or `None`, except that the `''` is
always allowed, and is automatically converted to `b''` if appropriate.

If the *allow_fragments* argument is false, fragment identifiers are not
recognized.  Instead, they are parsed as part of the path
or query component, and `fragment` is set to `None` or the empty
string (depending on the value of *missing_as_none*) in the return value.

The return value is a named tuple, which means that its items can
be accessed by index or as named attributes, which are:

```text
+------------------+-------+-------------------------+-------------------------------+
| Attribute        | Index | Value                   | Value if not present          |
+==================+=======+=========================+===============================+
| :attr:`scheme`   | 0     | URL scheme specifier    | *scheme* parameter or         |
|                  |       |                         | empty string [1]_             |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`netloc`   | 1     | Network location part   | ``None`` or empty string [1]_ |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`path`     | 2     | Hierarchical path       | empty string                  |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`query`    | 3     | Query component         | ``None`` or empty string [1]_ |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`fragment` | 4     | Fragment identifier     | ``None`` or empty string [1]_ |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`username` |       | User name               | ``None``                      |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`password` |       | Password                | ``None``                      |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`hostname` |       | Host name (lower case)  | ``None``                      |
+------------------+-------+-------------------------+-------------------------------+
| :attr:`port`     |       | Port number as integer, | ``None``                      |
|                  |       | if present              |                               |
+------------------+-------+-------------------------+-------------------------------+
```

Reading the `port` attribute will raise a `ValueError` if
an invalid port is specified in the URL.  See section
urlparse-result-object for more information on the result object.

Unmatched square brackets in the `netloc` attribute will raise a
`ValueError`.

Characters in the `netloc` attribute that decompose under NFKC
normalization (as used by the IDNA encoding) into any of `/`, `?`,
`#`, `@`, or `:` will raise a `ValueError`. If the URL is
decomposed before parsing, no error will be raised.

Following some of the WHATWG spec that updates RFC 3986, leading C0
control and space characters are stripped from the URL. `\n`,
`\r` and tab `\t` characters are removed from the URL at any position.

As is the case with all named tuples, the subclass has a few additional methods
and attributes that are particularly useful. One such method is `_replace()`.
The `_replace()` method will return a new `SplitResult` object
replacing specified fields with new values.

```python

>>> from urllib.parse import urlsplit
>>> u = urlsplit('//www.cwi.nl:80/%7Eguido/Python.html')
>>> u
SplitResult(scheme='', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            query='', fragment='')
>>> u._replace(scheme='http')
SplitResult(scheme='http', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            query='', fragment='')
```

> **Warning:** `urlsplit()` does not perform validation.  See :ref:`URL parsing
> security <url-parsing-security>` for details.

> *Changed in version 3.2.*
> Added IPv6 URL parsing capabilities.

> *Changed in version 3.3.*
> The fragment is now parsed for all URL schemes (unless *allow_fragments* is
> false), in accordance with RFC 3986.  Previously, an allowlist of
> schemes that support fragments existed.

> *Changed in version 3.6.*
> Out-of-range port numbers now raise `ValueError`, instead of
> returning `None`.

> *Changed in version 3.8.*
> Characters that affect netloc parsing under NFKC normalization will
> now raise `ValueError`.

> *Changed in version 3.10.*
> ASCII newline and tab characters are stripped from the URL.

> *Changed in version 3.12.*
> Leading WHATWG C0 control and space characters are stripped from the URL.

> *Changed in version 3.15.*
> Added the *missing_as_none* parameter.

### `parse_qs(qs, keep_blank_values=False, strict_parsing=False, encoding='utf-8', errors='replace', max_num_fields=None, separator='&')`

Parse a query string given as a string argument (data of type
application/x-www-form-urlencoded).  Data are returned as a
dictionary.  The dictionary keys are the unique query variable names and the
values are lists of values for each name.

The optional argument *keep_blank_values* is a flag indicating whether blank
values in percent-encoded queries should be treated as blank strings. A true value
indicates that blanks should be retained as  blank strings.  The default false
value indicates that blank values are to be ignored and treated as if they were
not included.

The optional argument *strict_parsing* is a flag indicating what to do with
parsing errors.  If false (the default), errors are silently ignored.  If true,
errors raise a `ValueError` exception.

The optional *encoding* and *errors* parameters specify how to decode
percent-encoded sequences into Unicode characters, as accepted by the
`bytes.decode()` method.

The optional argument *max_num_fields* is the maximum number of fields to
read. If set, then throws a `ValueError` if there are more than
*max_num_fields* fields read.

The optional argument *separator* is the symbol to use for separating the
query arguments. It defaults to `&`.

Use the `urllib.parse.urlencode()` function (with the `doseq`
parameter set to `True`) to convert such dictionaries into query
strings.

> *Changed in version 3.2.*
> Add *encoding* and *errors* parameters.

> *Changed in version 3.8.*
> Added *max_num_fields* parameter.

> *Changed in version 3.10.*
> Added *separator* parameter with the default value of `&`. Python
> versions earlier than Python 3.10 allowed using both `;` and `&` as
> query parameter separator. This has been changed to allow only a single
> separator key, with `&` as the default separator.

> *Deprecated since version 3.14.*
> Accepting objects with false values (like `0` and `[]`) except empty
> strings and byte-like objects and `None` is now deprecated.

### `parse_qsl(qs, keep_blank_values=False, strict_parsing=False, encoding='utf-8', errors='replace', max_num_fields=None, separator='&')`

Parse a query string given as a string argument (data of type
application/x-www-form-urlencoded).  Data are returned as a list of
name, value pairs.

The optional argument *keep_blank_values* is a flag indicating whether blank
values in percent-encoded queries should be treated as blank strings. A true value
indicates that blanks should be retained as  blank strings.  The default false
value indicates that blank values are to be ignored and treated as if they were
not included.

The optional argument *strict_parsing* is a flag indicating what to do with
parsing errors.  If false (the default), errors are silently ignored.  If true,
errors raise a `ValueError` exception.

The optional *encoding* and *errors* parameters specify how to decode
percent-encoded sequences into Unicode characters, as accepted by the
`bytes.decode()` method.

The optional argument *max_num_fields* is the maximum number of fields to
read. If set, then throws a `ValueError` if there are more than
*max_num_fields* fields read.

The optional argument *separator* is the symbol to use for separating the
query arguments. It defaults to `&`.

Use the `urllib.parse.urlencode()` function to convert such lists of pairs into
query strings.

> *Changed in version 3.2.*
> Add *encoding* and *errors* parameters.

> *Changed in version 3.8.*
> Added *max_num_fields* parameter.

> *Changed in version 3.10.*
> Added *separator* parameter with the default value of `&`. Python
> versions earlier than Python 3.10 allowed using both `;` and `&` as
> query parameter separator. This has been changed to allow only a single
> separator key, with `&` as the default separator.

### `urlunsplit(parts)`

```python
urlunsplit(parts, *, keep_empty)
```

Construct a URL from a tuple as returned by `urlsplit()`. The *parts*
argument can be any five-item iterable.

This may result in a slightly different, but equivalent URL, if the
URL that was parsed originally had unnecessary delimiters (for example,
a `?` with an empty query; the RFC states that these are equivalent).

If *keep_empty* is true, empty strings are kept in the result (for example,
a `?` for an empty query), only `None` components are omitted.
This allows rebuilding a URL that was parsed with option
`missing_as_none=True`.
By default, *keep_empty* is true if *parts* is the result of the
`urlsplit()` call with `missing_as_none=True`.

> *Changed in version 3.15.*
> Added the *keep_empty* parameter.

### `urlparse(urlstring, scheme=None, allow_fragments=True, *, missing_as_none=False)`

This is similar to `urlsplit()`, but additionally splits the *path*
component on *path* and *params*.
This function returns a 6-item named tuple `ParseResult`
or `ParseResultBytes`.
Its items are the same as for the `urlsplit()` result, except that
*params* is inserted at index 3, between *path* and *query*.

This function is based on obsoleted RFC 1738 and RFC 1808, which
listed *params* as the main URL component.
The more recent URL syntax allows parameters to be applied to each segment
of the *path* portion of the URL (see RFC 3986).
`urlsplit()` should generally be used instead of `urlparse()`.
A separate function is needed to separate the path segments and parameters.

### `urlunparse(parts)`

```python
urlunparse(parts, *, keep_empty)
```

Combine the elements of a tuple as returned by `urlparse()` into a
complete URL as a string. The *parts* argument can be any six-item
iterable.

This may result in a slightly different, but equivalent URL, if the
URL that was parsed originally had unnecessary delimiters (for example,
a `?` with an empty query; the RFC states that these are equivalent).

If *keep_empty* is true, empty strings are kept in the result (for example,
a `?` for an empty query), only `None` components are omitted.
This allows rebuilding a URL that was parsed with option
`missing_as_none=True`.
By default, *keep_empty* is true if *parts* is the result of the
`urlparse()` call with `missing_as_none=True`.

> *Changed in version 3.15.*
> Added the *keep_empty* parameter.
