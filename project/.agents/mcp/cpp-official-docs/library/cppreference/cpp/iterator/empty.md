# std::empty

| Defined in header `<array>` |  |  |
| --- | --- | --- |
| Defined in header `<deque>` |  |  |
| Defined in header `<flat_map>` |  |  |
| Defined in header `<flat_set>` |  |  |
| Defined in header `<forward_list>` |  |  |
| Defined in header `<inplace_vector>` |  |  |
| Defined in header `<iterator>` |  |  |
| Defined in header `<list>` |  |  |
| Defined in header `<map>` |  |  |
| Defined in header `<regex>` |  |  |
| Defined in header `<set>` |  |  |
| Defined in header `<span>` |  |  |
| Defined in header `<string>` |  |  |
| Defined in header `<string_view>` |  |  |
| Defined in header `<unordered_map>` |  |  |
| Defined in header `<unordered_set>` |  |  |
| Defined in header `<vector>` |  |  |
| `template< class C > constexpr auto empty( const C& c ) -> decltype(c.empty());` | (1) | (since C++17) |
| `template< class T, std::size_t N > constexpr bool empty( const T (&array)[N] ) noexcept;` | (2) | (since C++17) |
| `template< class E > constexpr bool empty( std::initializer_list<E> il ) noexcept;` | (3) | (since C++17) |

Returns whether the given range is empty.

1) Returns `c.empty()`.

2) Returns `false`.

3) Returns `il.size() == 0`.

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | a container or view with an `empty` member function |
| array | - | an array of arbitrary type |
| il | - | an `std::initializer_list` |

### Return value

1) `c.empty()`

2) `false`

3) `il.size() == 0`

### Exceptions

1) May throw implementation-defined exceptions.

### Notes

The overload for `std::initializer_list` is necessary because it does not have a member function `empty`.

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_nonmember_container_access` | `201411L` | (C++17) | `std::size()`, `std::data()`, and `std::empty()` |

### Possible implementation

First version

`template<class C> [[nodiscard]] constexpr auto empty(const C& c) -> decltype(c.empty()) { return c.empty(); }`

Second version

`template<class T, std::size_t N> [[nodiscard]] constexpr bool empty(const T (&array)[N]) noexcept { return false; }`

Third version

`template<class E> [[nodiscard]] constexpr bool empty(std::initializer_list<E> il) noexcept { return il.size() == 0; }`

### Example

```cpp
#include <iostream>
#include <vector>

template<class T>
void print(const T& container)
{
    if (std::empty(container))
        std::cout << "Empty\n";
    else
    {
        std::cout << "Elements:";
        for (const auto& element : container)
            std::cout << ' ' << element;
        std::cout << '\n';
    }
}

int main()
{
    std::vector<int> c = {1, 2, 3};
    print(c);
    c.clear();
    print(c);

    int array[] = {4, 5, 6};
    print(array);

    auto il = {7, 8, 9};
    print(il);
}
```

Output:

```text
Elements: 1 2 3
Empty
Elements: 4 5 6
Elements: 7 8 9
```

### See also

ranges::empty (C++20) checks whether a range is empty (customization point object)
