# toupper

Defined in header `<ctype.h>`

`int toupper( int ch );`

Converts the given character to uppercase according to the character conversion rules defined by the currently installed C locale.

In the default `"C"` locale, the following lowercase letters `abcdefghijklmnopqrstuvwxyz` are replaced with respective uppercase letters `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

### Parameters

ch - character to be converted. If the value of `ch` is not representable as `unsigned char` and does not equal `EOF`, the behavior is undefined.

### Return value

Uppercase version of `ch` or unmodified `ch` if no uppercase version is listed in the current C locale.

### Example

```c
#include <ctype.h>
#include <limits.h>
#include <locale.h>
#include <stdio.h>

int main(void)
{
    // in the default locale:
    for (unsigned char l = 0, u; l != UCHAR_MAX; ++l)
        if ((u = toupper(l)) != l)
            printf("%c%c ", l, u);
    printf("\n\n");

    unsigned char c = '\xb8'; // the character ž in ISO-8859-15
                              // but ¸ (cedilla) in ISO-8859-1
    setlocale(LC_ALL, "en_US.iso88591");
    printf("in iso8859-1, toupper('0x%x') gives 0x%x\n", c, toupper(c));
    setlocale(LC_ALL, "en_US.iso885915");
    printf("in iso8859-15, toupper('0x%x') gives 0x%x\n", c, toupper(c));
}
```

Possible output:

```text
aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ

in iso8859-1, toupper('0xb8') gives 0xb8
in iso8859-15, toupper('0xb8') gives 0xb4
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.4.2.2 The toupper function (p: TBD)

- C17 standard (ISO/IEC 9899:2018):

- 7.4.2.2 The toupper function (p: 147-148)

- C11 standard (ISO/IEC 9899:2011):

- 7.4.2.2 The toupper function (p: 204)

- C99 standard (ISO/IEC 9899:1999):

- 7.4.2.2 The toupper function (p: 185)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.3.2.2 The toupper function

### See also

|  |  |
| --- | --- |
| tolower | converts a character to lowercase (function) |
| towupper (C95) | converts a wide character to uppercase (function) |
| C++ documentation for toupper |  |
