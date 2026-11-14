# std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::max_size

`size_type max_size() const noexcept;` (since C++11)

Returns the maximum number of elements the container is able to hold due to system or library implementation limitations, i.e. `std::distance(begin(), end())` for the largest container.

### Parameters

(none)

### Return value

Maximum number of elements.

### Complexity

Constant.

### Notes

This value typically reflects the theoretical limit on the size of the container, at most `std::numeric_limits<difference_type>::max()`. At runtime, the size of the container may be limited to a value smaller than `max_size()` by the amount of RAM available.

### Example

```cpp
#include <iostream>
#include <locale>
#include <unordered_map>

int main()
{
    std::unordered_map<char, char> p;
    std::unordered_map<long, char> q;

    std::cout.imbue(std::locale("en_US.UTF-8"));
    std::cout << std::uppercase
              << "p.max_size() = " << std::dec << p.max_size() << " = 0x"
              << std::hex << p.max_size() << '\n'
              << "q.max_size() = " << std::dec << q.max_size() << " = 0x"
              << std::hex << q.max_size() << '\n';
}
```

Possible output:

```text
p.max_size() = 1,152,921,504,606,846,975 = 0xFFF,FFF,FFF,FFF,FFF
q.max_size() = 768,614,336,404,564,650 = 0xAAA,AAA,AAA,AAA,AAA
```

### See also

size returns the number of elements (public member function)
