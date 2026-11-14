# __STDC_ENDIAN_LITTLE__, __STDC_ENDIAN_BIG__, __STDC_ENDIAN_NATIVE__

| Defined in header `<stdbit.h>` |  |  |
| --- | --- | --- |
| `#define __STDC_ENDIAN_LITTLE__ /* implementation-defined */` | (1) | (since C23) |
| `#define __STDC_ENDIAN_BIG__ /* implementation-defined */` | (2) | (since C23) |
| `#define __STDC_ENDIAN_NATIVE__ /* implementation-defined */` | (3) | (since C23) |

Indicates the endianness of all scalar types:

- If all scalar types are little-endian, `__STDC_ENDIAN_NATIVE__` equals `__STDC_ENDIAN_LITTLE__`.
- If all scalar types are big-endian, `__STDC_ENDIAN_NATIVE__` equals `__STDC_ENDIAN_BIG__`.
- If the platform uses neither little-endian nor big-endian, `__STDC_ENDIAN_NATIVE__` equals neither `__STDC_ENDIAN_BIG__` nor `__STDC_ENDIAN_LITTLE__`.
- The values of the integer constant expressions for `__STDC_ENDIAN_BIG__` and `__STDC_ENDIAN_LITTLE__` are not equal.

### Example

```c
#include <stdbit.h>
#include <stdio.h>

int main()
{
    switch(__STDC_ENDIAN_NATIVE__)
    {
        case __STDC_ENDIAN_LITTLE__:
            printf("__STDC_ENDIAN_LITTLE__\n");
            break;
        case __STDC_ENDIAN_BIG__:
            printf("__STDC_ENDIAN_BIG__\n");
            break;
        default:
            printf("mixed-endian\n");
    }
    return __STDC_ENDIAN_NATIVE__;
}
```

Possible output:

```text
mixed-endian
```

### See also

C++ documentation for endian
