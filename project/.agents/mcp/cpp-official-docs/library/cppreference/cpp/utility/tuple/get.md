# std::get(std::tuple)

| Defined in header `<tuple>` |  |  |
| --- | --- | --- |
| `template< std::size_t I, class... Types > typename std::tuple_element<I, std::tuple<Types...>>::type& get( std::tuple<Types...>& t ) noexcept;` | (1) | (since C++11) (constexpr since C++14) |
| `template< std::size_t I, class... Types > typename std::tuple_element<I, std::tuple<Types...>>::type&& get( std::tuple<Types...>&& t ) noexcept;` | (2) | (since C++11) (constexpr since C++14) |
| `template< std::size_t I, class... Types > const typename std::tuple_element<I, std::tuple<Types...>>::type& get( const std::tuple<Types...>& t ) noexcept;` | (3) | (since C++11) (constexpr since C++14) |
| `template< std::size_t I, class... Types > const typename std::tuple_element<I, std::tuple<Types...>>::type&& get( const std::tuple<Types...>&& t ) noexcept;` | (4) | (since C++11) (constexpr since C++14) |
| `template< class T, class... Types > constexpr T& get( std::tuple<Types...>& t ) noexcept;` | (5) | (since C++14) |
| `template< class T, class... Types > constexpr T&& get( std::tuple<Types...>&& t ) noexcept;` | (6) | (since C++14) |
| `template< class T, class... Types > constexpr const T& get( const std::tuple<Types...>& t ) noexcept;` | (7) | (since C++14) |
| `template< class T, class... Types > constexpr const T&& get( const std::tuple<Types...>&& t ) noexcept;` | (8) | (since C++14) |

1-4) Extracts the `I`th element from the tuple. `I` must be an integer value in `[``​0​``,``sizeof...(Types)``)`.

5-8) Extracts the element of the tuple `t` whose type is `T`. Fails to compile unless the tuple has exactly one element of that type.

### Parameters

t - tuple whose contents to extract

### Return value

A reference to the selected element of `t`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_tuples_by_type` | `201304L` | (C++14) | Addressing tuples by type (5-8) |

### Example

```cpp
#include <cassert>
#include <iostream>
#include <string>
#include <tuple>

int main()
{
    auto x = std::make_tuple(1, "Foo", 3.14);

    // Index-based access
    std::cout << "( " << std::get<0>(x)
              << ", " << std::get<1>(x)
              << ", " << std::get<2>(x)
              << " )\n";

    // Type-based access (since C++14)
    std::cout << "( " << std::get<int>(x)
              << ", " << std::get<const char*>(x)
              << ", " << std::get<double>(x)
              << " )\n";

    const std::tuple<int, const int, double, double> y(1, 2, 6.9, 9.6);
    const int& i1 = std::get<int>(y); // OK: not ambiguous
    assert(i1 == 1);
    const int& i2 = std::get<const int>(y); // OK: not ambiguous
    assert(i2 == 2);
    // const double& d = std::get<double>(y); // Error: ill-formed (ambiguous)

    // Note: std::tie and structured binding can be
    // used to unpack a tuple into individual objects.
}
```

Output:

```text
( 1, Foo, 3.14 )
( 1, Foo, 3.14 )
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2485 | C++11 (by index) C++14 (by type) | there are no overloads for `const tuple&&` | added these overloads ((4) and (8)) |

### See also

|  |  |
| --- | --- |
| get(std::array) (C++11) | accesses an element of an `array` (function template) |
| get(std::pair) (C++11) | accesses an element of a `pair` (function template) |
| get(std::variant) (C++17) | reads the value of the variant given the index or the type (if the type is unique), throws on error (function template) |
| get(std::ranges::subrange) (C++20) | obtains iterator or sentinel from a `std::ranges::subrange` (function template) |
| get(std::complex) (C++26) | obtains a reference to real or imaginary part from a `std::complex` (function template) |
| tie (C++11) | creates a `tuple` of lvalue references or unpacks a tuple into individual objects (function template) |
| Structured binding (C++17) | binds the specified names to sub-objects or tuple elements of the initializer |
