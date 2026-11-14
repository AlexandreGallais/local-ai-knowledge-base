# C attribute: maybe_unused (since C23)

Suppresses warnings on unused entities.

### Syntax

`[[` `maybe_unused` `]]` `[[` `__maybe_unused__` `]]`

### Explanation

This attribute can appear in the declaration of the following entities:

- struct/union: `struct [[maybe_unused]] S;`,
- typedef name: `[[maybe_unused]] typedef S* PS;`,
- object: `[[maybe_unused]] int x;`,
- struct/union member: `union U { [[maybe_unused]] int n; };`,
- function: `[[maybe_unused]] void f(void);`,
- enumeration: `enum [[maybe_unused]] E {};`,
- enumerator: `enum { A [[maybe_unused]], B [[maybe_unused]] = 42 };`.

If the compiler issues warnings on unused entities, that warning is suppressed for any entity declared `maybe_unused`.

### Example

```c
#include <assert.h>

[[maybe_unused]] void f([[maybe_unused]] _Bool cond1, [[maybe_unused]] _Bool cond2)
{
   [[maybe_unused]] _Bool b = cond1 && cond2;
   assert(b); // in release mode, assert is compiled out, and b is unused
              // no warning because it is declared [[maybe_unused]]
} // parameters cond1 and cond2 are not used, no warning

int main(void)
{
    f(1, 1);
}
```

### See also

C++ documentation for maybe_unused
