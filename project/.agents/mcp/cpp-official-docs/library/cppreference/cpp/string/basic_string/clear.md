# std::basic_string<CharT,Traits,Allocator>::clear

`void clear();` (noexcept since C++11) (constexpr since C++20)

Removes all characters from the string as if by executing `erase(begin(), end())`.

All pointers, references, and iterators are invalidated.

### Parameters

(none)

### Return value

(none)

### Notes

Unlike for `std::vector::clear`, the C++ standard does not explicitly require that `capacity` is unchanged by this function, but existing implementations do not change capacity. This means that they do not release the allocated memory (see also `shrink_to_fit`).

### Complexity

Linear in the size of the string, although existing implementations operate in constant time.

### Example

```cpp
#include <cassert>
#include <iostream>
#include <string>

int main()
{
    std::string s{"Exemplar"};
    std::string::size_type const capacity = s.capacity();

    s.clear();
    assert(s.empty());
    assert(s.size() == 0);
    std::cout << std::boolalpha << (s.capacity() == capacity) << '\n';
}
```

Possible output:

```text
true
```

### See also

erase removes characters (public member function)
