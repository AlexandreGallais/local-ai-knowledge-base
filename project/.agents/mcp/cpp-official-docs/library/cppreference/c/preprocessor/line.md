# Filename and line information

Changes the current line number and file name in the preprocessor.

### Syntax

|  |  |
| --- | --- |
| `#line` lineno | (1) |
| `#line` lineno `"`filename`"` | (2) |

### Explanation

1) Changes the current preprocessor line number to lineno. Occurrences of the macro `__LINE__` beyond this point will expand to lineno plus the number of actual source code lines encountered since.

2) Also changes the current preprocessor file name to filename. Occurrences of the macro `__FILE__` beyond this point will produce filename.

Any preprocessing tokens (macro constants or expressions) are permitted as arguments to `#line` as long as they expand to a valid decimal integer optionally following a valid character string.

lineno must be a sequence of at least one decimal digit (the program is ill-formed, otherwise) and is always interpreted as decimal (even if it starts with `0`).

If lineno is `0` or greater than `32767`(until C99)`2147483647`(since C99), the behavior is undefined.

### Notes

This directive is used by some automatic code generation tools which produce C source files from a file written in another language. In that case, `#line` directives may be inserted in the generated C file referencing line numbers and the file name of the original (human-editable) source file.

The line number following the directive `#line __LINE__` is unspecified (there are two possible values that `__LINE__` can expand to in this case: number of endlines seen so far, or number of endlines seen so far plus the endline that ends the `#line` directive). This is the result of DR 464, which applies retroactively.

### Example

```c
#include <assert.h>
#define FNAME "test.c"
int main(void)
{
#line 777 FNAME
        assert(2+2 == 5);
}
```

Possible output:

```text
test: test.c:777: int main(): Assertion `2+2 == 5' failed.
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 6.10.4 Line control (p: 126)

- J.1 Unspecified behavior

- C11 standard (ISO/IEC 9899:2011):

- 6.10.4 Line control (p: 173)

- C99 standard (ISO/IEC 9899:1999):

- 6.10.4 Line control (p: 158)

- C89/C90 standard (ISO/IEC 9899:1990):

- 3.8.4 Line control

### See also

C++ documentation for Filename and line information
