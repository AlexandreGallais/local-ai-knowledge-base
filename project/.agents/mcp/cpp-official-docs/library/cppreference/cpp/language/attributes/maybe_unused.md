# C++ attribute: maybe_unused (since C++17)

Suppresses warnings on unused entities.

### Syntax

`[[maybe_unused]]`

### Explanation

This attribute can appear in the declaration of the following entities:

- class/struct/union: `struct [[maybe_unused]] S;`
- typedef, including those declared by alias declaration: `[[maybe_unused]] typedef S* PS;`, `using PS [[maybe_unused]] = S*;`
- variable, including static data member: `[[maybe_unused]] int x;`
- non-static data member: `union U { [[maybe_unused]] int n; };`,
- function: `[[maybe_unused]] void f();`
- enumeration: `enum [[maybe_unused]] E {};`
- enumerator: `enum { A [[maybe_unused]], B [[maybe_unused]] = 42 };`
- structured binding: `[[maybe_unused]] auto [a, b] = std::make_pair(42, 0.23);`

For entities declared `[[maybe_unused]]`, if the entities or their structured bindings are unused, the warning on unused entities issued by the compiler is suppressed.

For labels declared `[[maybe_unused]]`, if they are unused, the warning on unused labels issued by the compiler is suppressed. (since C++26)

### Example

```cpp
#include <cassert>

[[maybe_unused]] void f([[maybe_unused]] bool thing1,
                        [[maybe_unused]] bool thing2)
{
    [[maybe_unused]] lb: // the label “lb” is not used, no warning
    [[maybe_unused]] bool b = thing1 && thing2;
    assert(b); // in release mode, assert is compiled out, and “b” is unused
               // no warning because it is declared [[maybe_unused]]
} // parameters “thing1” and “thing2” are not used, no warning

int main() {}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| CWG 2360 | C++17 | could not apply `[[maybe_unused]]` to structured bindings | allowed |

### References

- C++23 standard (ISO/IEC 14882:2024):

- 9.12.8 Maybe unused attribute [dcl.attr.unused]

- C++20 standard (ISO/IEC 14882:2020):

- 9.12.7 Maybe unused attribute [dcl.attr.unused]

- C++17 standard (ISO/IEC 14882:2017):

- 10.6.6 Maybe unused attribute [dcl.attr.unused]

### See also

C documentation for maybe_unused
