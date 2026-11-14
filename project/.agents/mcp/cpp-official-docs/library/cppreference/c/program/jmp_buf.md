# jmp_buf

Defined in header `<setjmp.h>`

`typedef /* unspecified */ jmp_buf;`

The `jmp_buf` type is an array type suitable for storing information to restore a calling environment. The stored information is sufficient to restore execution at the correct block of the program and invocation of that block. The state of floating-point status flags, or open files, or any other data is not stored in an object of type `jmp_buf`.

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.13/2 Nonlocal jumps <setjmp.h> (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.13/2 Nonlocal jumps <setjmp.h> (p: 191)

- C11 standard (ISO/IEC 9899:2011):

- 7.13/2 Nonlocal jumps <setjmp.h> (p: 262)

- C99 standard (ISO/IEC 9899:1999):

- 7.13/2 Nonlocal jumps <setjmp.h> (p: 243)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.6 NON-LOCAL JUMPS <setjmp.h>

### See also

|  |  |
| --- | --- |
| setjmp | saves the context (function macro) |
| longjmp | jumps to specified location (function) |
| C++ documentation for jmp_buf |  |
