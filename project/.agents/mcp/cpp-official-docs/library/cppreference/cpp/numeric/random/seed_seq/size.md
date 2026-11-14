# std::seed_seq::size

`std::size_t size() const noexcept;` (since C++11)

Returns the size of the underlying seed sequence.

### Return value

`v .size()`

### Complexity

Constant time.

### Example

```cpp
#include <iostream>
#include <random>

int main()
{
    std::seed_seq s1 = {-1, 0, 1};
    std::cout << s1.size() << '\n';
}
```

Output:

```text
3
```

### Defect report

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2440 | C++11 | `seed_seq::size` was not noexcept | made noexcept |
