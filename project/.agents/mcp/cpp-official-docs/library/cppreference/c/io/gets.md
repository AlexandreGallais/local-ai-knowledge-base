# gets, gets_s

| Defined in header `<stdio.h>` |  |  |
| --- | --- | --- |
| `char* gets( char* str );` | (1) | (removed in C11) |
| `char* gets_s( char* str, rsize_t n );` | (2) | (since C11) |

1) Reads `stdin` into the character array pointed to by `str` until a newline character is found or end-of-file occurs. A null character is written immediately after the last character read into the array. The newline character is discarded but not stored in the buffer.

2) Reads characters from `stdin` until a newline is found or end-of-file occurs. Writes only at most `n - 1` characters into the array pointed to by `str`, and always writes the terminating null character (unless `str` is a null pointer). The newline character, if found, is discarded and does not count toward the number of characters written to the buffer.

The following errors are detected at runtime and call the currently installed constraint handler function:

- `n` is zero;
- `n` is greater than `RSIZE_MAX`;
- `str` is a null pointer;
- *endline* or *eof* not encountered after storing `n - 1` characters to the buffer.

In any case, `gets_s` first finishes reading and discarding the characters from `stdin` until new-line character, end-of-file condition, or read error before calling the constraint handler.

As with all bounds-checked functions, `gets_s` is only guaranteed to be available if `__STDC_LIB_EXT1__` is defined by the implementation and if the user defines `__STDC_WANT_LIB_EXT1__` to the integer constant `1` before including `<stdio.h>`.

### Parameters

|  |  |  |
| --- | --- | --- |
| str | - | a character array the characters from `stdin` to be written to |
| n | - | maximum number of characters that can be written to the array pointed to by `str` |

### Return value

`str` on success, a null pointer on failure.

If the failure has been caused by end of file condition, additionally sets the *eof* indicator (see `feof()`) on `stdin`. If the failure has been caused by some other error, sets the *error* indicator (see `ferror()`) on `stdin`.

### Notes

The `gets()` function does not perform bounds checking, therefore this function is extremely vulnerable to buffer-overflow attacks. It cannot be used safely (unless the program runs in an environment which restricts what can appear on `stdin`). For this reason, the function has been deprecated in the third corrigendum to the C99 standard and removed altogether in the C11 standard. `fgets()` and `gets_s()` are the recommended replacements.

**WARNING: Never use `gets()`**.

### References

- C23 standard (ISO/IEC 9899:2024):

- K.3.5.4.1 The gets_s function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- K.3.5.4.1 The gets_s function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- K.3.5.4.1 The gets_s function (p: 602-603)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.7.7 The gets function (p: 298)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.7.7 The gets function

### See also

|  |  |
| --- | --- |
| scanf, fscanf, sscanf, scanf_s, fscanf_s, sscanf_s (C11), (C11), (C11) | reads formatted input from `stdin`, a file stream or a buffer (function) |
| fgets | gets a character string from a file stream (function) |
| fputs | writes a character string to a file stream (function) |
| getline, getwline, getdelim, getwdelim (dynamic memory TR) | read from a stream into an automatically resized buffer until delimiter/end of line (function) |
| C++ documentation for gets |  |
