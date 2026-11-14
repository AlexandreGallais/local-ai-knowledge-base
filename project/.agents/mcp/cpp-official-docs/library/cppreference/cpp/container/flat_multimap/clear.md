# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::clear

`void clear() noexcept;` (since C++23)

Erases all elements from the container adaptor. After this call, `size()` returns zero.

Invalidates any references, pointers, and iterators referring to contained elements.

### Parameters

(none)

### Return value

(none)

### Complexity

Linear in the size of the container adaptor, i.e., the number of elements.

### Example

```cpp
#include <iostream>
#include <string_view>
#include <flat_map>

void print_info(std::string_view rem, const std::flat_multimap<int, char>& v)
{
    std::cout << rem << "{ ";
    for (const auto& [key, value] : v)
        std::cout << '[' << key << "]:" << value << ' ';
    std::cout << "}\n";
    std::cout << "Size=" << v.size() << '\n';
}

int main()
{
    std::flat_multimap<int, char> container{{1, 'x'}, {2, 'y'}, {3, 'z'}};
    print_info("Before clear: ", container);
    container.clear();
    print_info("After clear: ", container);
}
```

Output:

```text
Before clear: { [1]:x [2]:y [3]:z }
Size=3
After clear: { }
Size=0
```

### See also

erase erases elements (public member function)
