# C++ keyword: `alignof` (since C++11)

### Usage

- `alignof` operator

### Example

```cpp
#include <cstddef>
#include <iostream>

int main()
{
    std::cout << alignof(std::max_align_t) << '\n';
}
```

Possible output:

```text
16
```

### See also

- `alignas`
