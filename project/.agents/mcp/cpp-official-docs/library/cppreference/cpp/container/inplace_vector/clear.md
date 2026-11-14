# std::inplace_vector<T,N>::clear

`constexpr void clear() noexcept;` (since C++26)

Erases all elements from the container. After this call, `size()` returns zero.

Invalidates any references, pointers, and iterators referring to contained elements. Any past-the-end iterators are also invalidated.

### Parameters

(none)

### Return value

(none)

### Complexity

Linear in the size of the container, i.e., the number of elements.

### Example

```cpp
#include <iostream>
#include <string_view>
#include <inplace_vector>

void print_info(std::string_view rem, const std::inplace_vector<int, 3>& v)
{
    std::cout << rem << "{ ";
    for (const auto& value : v)
        std::cout << value << ' ';
    std::cout << "}\n";
    std::cout << "Size=" << v.size() << '\n';
}

int main()
{
    std::inplace_vector<int, 3> container{1, 2, 3};
    print_info("Before clear: ", container);
    container.clear();
    print_info("After clear: ", container);
}
```

Output:

```text
Before clear: { 1 2 3 }
Size=3
After clear: { }
Size=0
```

### See also

erase erases elements (public member function)
