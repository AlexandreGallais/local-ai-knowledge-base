# isprint

Defined in header `<ctype.h>`

`int isprint( int ch );`

Checks if the given character can be printed, i.e. it is either a number (`0123456789`), an uppercase letter (`ABCDEFGHIJKLMNOPQRSTUVWXYZ`), a lowercase letter (`abcdefghijklmnopqrstuvwxyz`), a punctuation character(`` !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ ``), or space, or any character classified as printable by the current C locale.

The behavior is undefined if the value of `ch` is not representable as `unsigned char` and is not equal to `EOF`.

### Parameters

ch - character to classify

### Return value

Non-zero value if the character can be printed, zero otherwise.

### Example

```c
#include <stdio.h>
#include <ctype.h>
#include <locale.h>

int main(void)
{
    unsigned char c = '\xa0'; // the non-breaking space in ISO-8859-1
    printf("In the default C locale, \\xa0 is %sprintable\n", isprint(c)?"":"not ");
    setlocale(LC_ALL, "en_GB.iso88591");
    printf("In ISO-8859-1 locale, \\xa0 is %sprintable\n", isprint(c)?"":"not ");
}
```

Possible output:

```text
In the default C locale, \xa0 is not printable
In ISO-8859-1 locale, \xa0 is printable
```

### References

- C17 standard (ISO/IEC 9899:2018):

- 7.4.1.8 The isprint function (p: 146)

- C11 standard (ISO/IEC 9899:2011):

- 7.4.1.8 The isprint function (p: 202)

- C99 standard (ISO/IEC 9899:1999):

- 7.4.1.8 The isprint function (p: 183)

- C89/C90 standard (ISO/IEC 9899:1990):

- 4.3.1.7 The isprint function

### See also

|  |  |
| --- | --- |
| iswprint (C95) | checks if a wide character is a printing character (function) |
| C++ documentation for isprint |  |

| ASCII values |  |  | characters | `iscntrl` `iswcntrl` | **`isprint`** `iswprint` | `isspace` `iswspace` | `isblank` `iswblank` | `isgraph` `iswgraph` | `ispunct` `iswpunct` | `isalnum` `iswalnum` | `isalpha` `iswalpha` | `isupper` `iswupper` | `islower` `iswlower` | `isdigit` `iswdigit` | `isxdigit` `iswxdigit` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| decimal | hexadecimal | octal |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 0–8 | `\x0`–`\x8` | `\0`–`\10` | control codes (`NUL`, etc.) | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 9 | `\x9` | `\11` | tab (`\t`) | **`≠0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 10–13 | `\xA`–`\xD` | `\12`–`\15` | whitespaces (`\n`, `\v`, `\f`, `\r`) | **`≠0`** | **`0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 14–31 | `\xE`–`\x1F` | `\16`–`\37` | control codes | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 32 | `\x20` | `\40` | space | **`0`** | **`≠0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 33–47 | `\x21`–`\x2F` | `\41`–`\57` | `!"#$%&'()*+,-./` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 48–57 | `\x30`–`\x39` | `\60`–`\71` | `0123456789` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`≠0`** | **`≠0`** |
| 58–64 | `\x3A`–`\x40` | `\72`–`\100` | `:;<=>?@` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 65–70 | `\x41`–`\x46` | `\101`–`\106` | `ABCDEF` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`0`** | **`≠0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** |
| 71–90 | `\x47`–`\x5A` | `\107`–`\132` | `GHIJKLMNOP` `QRSTUVWXYZ` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`0`** | **`≠0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** |
| 91–96 | `\x5B`–`\x60` | `\133`–`\140` | `` [\]^_` `` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 97–102 | `\x61`–`\x66` | `\141`–`\146` | `abcdef` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`≠0`** | **`0`** | **`≠0`** |
| 103–122 | `\x67`–`\x7A` | `\147`–`\172` | `ghijklmnop` `qrstuvwxyz` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`≠0`** | **`0`** | **`0`** |
| 123–126 | `\x7B`–`\x7E` | `\173`–`\176` | `{\|}~` | **`0`** | **`≠0`** | **`0`** | **`0`** | **`≠0`** | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
| 127 | `\x7F` | `\177` | backspace character (`DEL`) | **`≠0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** | **`0`** |
