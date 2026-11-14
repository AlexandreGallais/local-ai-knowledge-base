# std::basic_stacktrace<Allocator>::empty

`bool empty() const noexcept;` (since C++23)

Checks if the stacktrace has no stacktrace entries.

### Parameters

(none)

### Return value

`true` if the stacktrace is empty, `false` otherwise.

### Complexity

Constant.

### Example

```cpp
#include <stacktrace>
#include <iostream>

int main()
{
    std::cout << std::boolalpha;
    std::stacktrace bktr;
    std::cout << "Initially, bktr.empty(): " << bktr.empty() << '\n';

    bktr = std::stacktrace::current();
    std::cout << "After getting entries, bktr.empty(): " << bktr.empty() << '\n';
}
```

Possible output:

```text
Initially, bktr.empty(): true
After getting entries, bktr.empty(): false
```

### See also

size returns the number of stacktrace entries (public member function)
