# atexit

Defined in header `<stdlib.h>`

`int atexit( void (*func)(void) );`

Registers the function pointed to by `func` to be called on normal program termination (via `exit()` or returning from `main()`). The functions will be called in reverse order they were registered, i.e. the function registered last will be executed first.

The same function may be registered more than once.

The implementation is guaranteed to support the registration of at least `32` functions. The exact limit is implementation-defined.

### Parameters

func - pointer to a function to be called on normal program termination

### Return value

`​0​` if the registration succeeds, nonzero value otherwise.

### Example

```c
#include <stdlib.h>
#include <stdio.h>

void f1(void)
{
    puts("f1");
}

void f2(void)
{
    puts("f2");
}

int main(void)
{
    if ( ! atexit(f1) && ! atexit(f2) && ! atexit(f2) )
        return EXIT_SUCCESS ;

    // atexit registration failed
    return EXIT_FAILURE ;

}   // <- if registration was successful calls f2, f2, f1
```

Output:

```text
f2
f2
f1
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.22.4.2 The atexit function (p: 255)

- C11 standard (ISO/IEC 9899:2011):

- 7.22.4.2 The atexit function (p: 350)

- C99 standard (ISO/IEC 9899:1999):

- 7.20.4.2 The atexit function (p: 315)

- C89/C90 standard (ISO/IEC 9899:1990):

- 7.10.4.2 The atexit function (p: 156)

### See also

|  |  |
| --- | --- |
| at_quick_exit (C11) | registers a function to be called on `quick_exit` invocation (function) |
| C++ documentation for atexit |  |
