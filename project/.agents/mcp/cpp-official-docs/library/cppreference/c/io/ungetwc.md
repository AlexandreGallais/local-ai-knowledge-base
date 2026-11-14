# ungetwc

| Defined in header `<wchar.h>` |  |
| --- | --- |
| `wint_t ungetwc( wint_t ch, FILE *stream );` | (since C95) |

If `ch` does not equal `WEOF`, pushes the wide character `ch` into the input buffer associated with the stream `stream` in such a manner that subsequent read operation from `stream` will retrieve that wide character. The external device associated with the stream is not modified.

Stream repositioning operations `fseek`, `fsetpos`, and `rewind` discard the effects of `ungetwc`.

If `ungetwc` is called more than once without an intervening read or repositioning, it may fail (in other words, a pushback buffer of size 1 is guaranteed, but any larger buffer is implementation-defined). If multiple successful `ungetwc` were performed, read operations retrieve the pushed-back wide characters in reverse order of `ungetwc`

If `ch` equals `WEOF`, the operation fails and the stream is not affected.

A successful call to `ungetwc` clears the end of file status flag `feof`.

A successful call to `ungetwc` on a stream (whether text or binary) modifies the stream position indicator in unspecified manner but guarantees that after all pushed-back wide characters are retrieved with a read operation, the stream position indicator is equal to its value before `ungetwc`.

### Parameters

|  |  |  |
| --- | --- | --- |
| ch | - | wide character to be put back |
| stream | - | file stream to put the wide character back to |

### Return value

On success `ch` is returned.

On failure `WEOF` is returned and the given stream remains unchanged.

### References

- C11 standard (ISO/IEC 9899:2011):

- 7.29.3.10 The ungetwc function (p: 425-426)

- C99 standard (ISO/IEC 9899:1999):

- 7.24.3.10 The ungetwc function (p: 370-371)

### See also

|  |  |
| --- | --- |
| ungetc | puts a character back into a file stream (function) |
| fgetwc, getwc (C95) | gets a wide character from a file stream (function) |
| C++ documentation for ungetwc |  |
