# memccpy

| Defined in header `<string.h>` |  |
| --- | --- |
| `void* memccpy( void* restrict dest, const void* restrict src, int c, size_t count );` | (since C23) |

Copies bytes from the object pointed to by `src` to the object pointed to by `dest`, stopping after *any* of the next two conditions are satisfied:

- `count` bytes are copied
- the byte `(unsigned char)c` is found (and copied).

The `src` and `dest` objects are interpreted as arrays of `unsigned char`.

The behavior is undefined if *any* condition is met:

- access occurs beyond the end of the `dest` array;
- the objects overlap (which is a violation of the `restrict` contract)
- either `dest` or `src` is an invalid or null pointer

### Parameters

|  |  |  |
| --- | --- | --- |
| dest | - | pointer to the object to copy to |
| src | - | pointer to the object to copy from |
| c | - | terminating byte, converted to `unsigned char` at first |
| count | - | number of bytes to copy |

### Return value

If the byte `(unsigned char)c` was found, `memccpy` returns a pointer to the next byte in `dest` after `(unsigned char)c`. Otherwise it returns a null pointer.

### Notes

The function is identical to the POSIX `memccpy`.

`memccpy(dest, src, 0, count)` behaves similar to `strncpy(dest, src, count)`, except that the former returns a pointer to the *end* of the buffer written, and does not zero-pad the destination array. Thus, `memccpy` is useful for efficiently concatenating multiple strings.

```c
char bigString[1000];
char* end = bigString + sizeof bigString;

char* p = memccpy(bigString, "John, ", '\0', sizeof bigString - 1);
if (p)
    p = memccpy(p - 1, "Paul, ", '\0', end - p);
if (p)
    p = memccpy(p - 1, "George, ", '\0', end - p);
if (p)
    p = memccpy(p - 1, "Joel ", '\0', end - p);
if (!p)
    end[-1] = '\0';

puts(bigString); // John, Paul, George, Joel
```

### Example

```c
#include <ctype.h>
#include <stdio.h>
#include <string.h>

int main(void)
{
    const char src[] = "Stars: Altair, Sun, Vega.";
    const char terminal[] = {':', ' ', ',', '.', '!'};
    char dest[sizeof src];
    const char alt = '@';

    for (size_t i = 0; i != sizeof terminal; ++i)
    {
        void* to = memccpy(dest, src, terminal[i], sizeof dest);

        printf("Terminal '%c' (%s):\t\"", terminal[i], to ? "found" : "absent");

        // if `terminal` character was not found - print the whole `dest`
        to = to ? to : dest + sizeof dest;

        for (char* from = dest; from != to; ++from)
            putchar(isprint(*from) ? *from : alt);

        puts("\"");
    }

    puts("\n" "Separate star names from distances (ly):");
    const char *star_distance[] = {
        "Arcturus : 37", "Vega : 25", "Capella : 43", "Rigel : 860", "Procyon : 11"
    };
    char names_only[64];
    char *first = names_only;
    char *last = names_only + sizeof names_only;

    for (size_t t = 0; t != (sizeof star_distance) / (sizeof star_distance[0]); ++t)
    {
        if (first)
            first = memccpy(first, star_distance[t], ' ', last - first);
        else
            break;
    }

    if (first)
    {
        *first = '\0';
        puts(names_only);
    }
    else
        puts("Buffer is too small.");
}
```

Output:

```text
Terminal ':' (found):   "Stars:"
Terminal ' ' (found):   "Stars: "
Terminal ',' (found):   "Stars: Altair,"
Terminal '.' (found):   "Stars: Altair, Sun, Vega."
Terminal '!' (absent):  "Stars: Altair, Sun, Vega.@"

Separate star names from distances (ly):
Arcturus Vega Capella Rigel Procyon
```

### See also

|  |  |
| --- | --- |
| memcpy, memcpy_s (C11) | copies one buffer to another (function) |
| wmemcpy, wmemcpy_s (C95), (C11) | copies a certain amount of wide characters between two non-overlapping arrays (function) |
| memmove, memmove_s (C11) | moves one buffer to another (function) |
| strcpy, strcpy_s (C11) | copies one string to another (function) |
| strcat, strcat_s (C11) | concatenates two strings (function) |
