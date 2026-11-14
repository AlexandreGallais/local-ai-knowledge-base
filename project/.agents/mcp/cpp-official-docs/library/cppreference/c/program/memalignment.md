# memalignment

| Defined in header `<stdlib.h>` |  |
| --- | --- |
| `size_t memalignment( const void *p );` | (since C23) |

Returns the maximum alignment satisfied by the provided address. The return value can be greater than any alignment value supported by the implementation. If `p` is a null pointer value, `​0​` is returned to indicate that the pointer cannot be used to access an object of any type.

If the return value compares is greater than or equal to `alignof(T)`, the alignment requirement for the type `T` is satisfied by the pointer.

A freestanding implementation needs to provide `memalignment`.

### Parameters

p - pointer to query alignment

### Return value

The alignment value of `p`, or `​0​` if `p` is a null pointer value.

### Notes

On common platforms where

- null pointers are cast to integer `​0​`,
- pointer values are directly cast to the numeric values of virtual addresses, and
- `size_t` is same as `uintptr_t`,

this function can be implemented as `return (size_t)p & -(size_t)p;`.

### Example

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    alignas(128) int i = 0;
    printf("%zu\n%zu\n", memalignment(nullptr), memalignment(&i));
}
```

Possible output:

```text
0
128
```

### References

- C23 standard (ISO/IEC 9899:2024):

- 7.24.9.1 The memalignment function (p: 374)

### See also

|  |  |
| --- | --- |
| aligned_alloc (C11) | allocates aligned memory (function) |
| free_aligned_sized (C23) | deallocates previously allocated sized and aligned memory (function) |
