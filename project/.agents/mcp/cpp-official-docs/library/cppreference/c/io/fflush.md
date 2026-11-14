# fflush

Defined in header `<stdio.h>`

`int fflush( FILE* stream );`

For output streams (and for update streams on which the last operation was output), writes any unwritten data from the `stream`'s buffer to the associated output device.

For input streams (and for update streams on which the last operation was input), the behavior is undefined.

If `stream` is a null pointer, all open output streams are flushed, including the ones manipulated within library packages or otherwise not directly accessible to the program.

### Parameters

stream - the file stream to write out

### Return value

Returns zero on success. Otherwise `EOF` is returned and the error indicator of the file stream is set.

### Notes

POSIX extends the specification of fflush by defining its effects on an input stream, as long as that stream represents a file or another seekable device: in that case the POSIX file pointer is repositioned to match the C stream pointer (which effectively undoes any read buffering) and the effects of any `ungetc` or `ungetwc` that weren't yet read back from the stream are discarded.

Microsoft also extends the specification of fflush by defining its effects on an input stream: in Visual Studio 2013 and prior, it discarded the input buffer, in Visual Studio 2015 and newer, it has no effect, buffers are retained.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.21.5.2 The fflush function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.21.5.2 The fflush function (p: TBD)

- C11 standard (ISO/IEC 9899:2011):

- 7.21.5.2 The fflush function (p: 305)

- C99 standard (ISO/IEC 9899:1999):

- 7.19.5.2 The fflush function (p: 270-271)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.9.5.2 The fflush function

### See also

|  |  |
| --- | --- |
| fopen, fopen_s (C11) | opens a file (function) |
| fclose | closes a file (function) |
| C++ documentation for fflush |  |
