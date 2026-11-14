---
title: "zlib --- Compression compatible with gzip (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/zlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# zlib --- Compression compatible with gzip (part 2 of 2)

### `Z_TREES`

Flush mode `6`, for inflate operations. Instructs inflate to return when
it gets to the next deflate block boundary.

This constant is only available if Python was compiled with zlib
1.2.3.4 or greater.

> *Added in version 3.6.*

Information about the version of the zlib library in use is available through
the following constants:

### `ZLIB_VERSION`

The version string of the zlib library that was used for building the module.
This may be different from the zlib library actually used at runtime, which
is available as `ZLIB_RUNTIME_VERSION`.

### `ZLIB_RUNTIME_VERSION`

The version string of the zlib library actually loaded by the interpreter.

> *Added in version 3.3.*

### `ZLIBNG_VERSION`

The version string of the zlib-ng library that was used for building the
module if zlib-ng was used. When present, the `ZLIB_VERSION` and
`ZLIB_RUNTIME_VERSION` constants reflect the version of the zlib API
provided by zlib-ng.

If zlib-ng was not used to build the module, this constant will be absent.

> *Added in version 3.14.*

> **See also:** Module `gzip`
> Reading and writing `gzip`-format files.
>
> https://www.zlib.net
> The zlib library home page.
>
> https://www.zlib.net/manual.html
> The zlib manual explains  the semantics and usage of the library's many
> functions.
>
> In case gzip (de)compression is a bottleneck, the python-isal
> package speeds up (de)compression with a mostly compatible API.
>
