# std::get(std::array)

| Defined in header `<array>` |  |  |
| --- | --- | --- |
| `template< std::size_t I, class T, std::size_t N > T& get( std::array<T,N>& a ) noexcept;` | (1) | (since C++11) (constexpr since C++14) |
| `template< std::size_t I, class T, std::size_t N > T&& get( std::array<T,N>&& a ) noexcept;` | (2) | (since C++11) (constexpr since C++14) |
| `template< std::size_t I, class T, std::size_t N > const T& get( const std::array<T,N>& a ) noexcept;` | (3) | (since C++11) (constexpr since C++14) |
| `template< std::size_t I, class T, std::size_t N > const T&& get( const std::array<T,N>&& a ) noexcept;` | (4) | (since C++11) (constexpr since C++14) |

Extracts the `I`th element from the array using tuple-like interface.

`I` must be an integer value in range `[``​0​``,``N``)`. This is enforced at compile time as opposed to `at()` or `operator[]`.

### Parameters

a - array whose contents to extract

### Return value

A reference to the `I`th element of `a`.

### Complexity

Constant.

### Example

```cpp
#include <array>
#include <iostream>

constexpr std::array v{1, 2, 3};
static_assert(get<0>(v) == 1 && get<1>(v) == 2 && get<2>(v) == 3);

int main()
{
    std::array<int, 3> a;

    // set values:
    get<0>(a) = 1, get<1>(a) = 2, get<2>(a) = 3;

    // get values:
    std::cout << '(' << get<0>(a) << ',' << get<1>(a) << ',' << get<2>(a) << ")\n";
}
```

Output:

```text
(1,2,3)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2485 | C++11 | there are no overloads for const array&& | the overloads are added |

### See also

|  |  |
| --- | --- |
| Structured binding (C++17) | binds the specified names to sub-objects or tuple elements of the initializer |
| operator[] | access specified element (public member function) |
| at | access specified element with bounds checking (public member function) |
| get(std::tuple) (C++11) | tuple accesses specified element (function template) |
| get(std::pair) (C++11) | accesses an element of a `pair` (function template) |
| get(std::variant) (C++17) | reads the value of the variant given the index or the type (if the type is unique), throws on error (function template) |
| get(std::ranges::subrange) (C++20) | obtains iterator or sentinel from a `std::ranges::subrange` (function template) |
| get(std::complex) (C++26) | obtains a reference to real or imaginary part from a `std::complex` (function template) |
