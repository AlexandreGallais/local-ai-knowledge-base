# std::map<Key,T,Compare,Allocator>::max_size

`size_type max_size() const;` (noexcept since C++11)

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
#include <map>

int main()
{
    std::map<char, char> p;
    std::map<long, char> q;

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
p.max_size() = 461,168,601,842,738,790 = 0x666,666,666,666,666
q.max_size() = 384,307,168,202,282,325 = 0x555,555,555,555,555
```

### See also

size returns the number of elements (public member function)
