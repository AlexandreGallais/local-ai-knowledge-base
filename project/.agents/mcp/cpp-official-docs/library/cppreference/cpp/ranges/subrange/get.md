# std::ranges::get(std::ranges::subrange)

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< std::size_t N, class I, class S, ranges::subrange_kind K > requires ((N == 0 && std::copyable<I>) \|\| N == 1) constexpr auto get( const ranges::subrange<I, S, K>& r );` | (1) | (since C++20) |
| `template< std::size_t N, class I, class S, ranges::subrange_kind K > requires (N < 2) constexpr auto get( ranges::subrange<I, S, K>&& r );` | (2) | (since C++20) |
| `namespace std { using ranges::get; }` | (3) | (since C++20) |

Provides structured binding support.

1) Obtains the iterator or sentinel from a `subrange` lvalue (or a const rvalue) when `N == 0` or `N == 1`, respectively.

2) Same as (1), except that it takes a non-const `subrange` rvalue.

3) Overloads (1,2) are imported into namespace `std`, which simplifies their usage and makes every `subrange` with a copyable iterator a pair-like type.

### Parameters

r - a `subrange`

### Return value

1,2) If `N` is `​0​`, returns `r.begin()`. Otherwise (`N` is `1`), returns `r.end()`.

### Example

```cpp
#include <array>
#include <iostream>
#include <iterator>
#include <ranges>

int main()
{
    std::array a{1, -2, 3, -4};

    std::ranges::subrange sub_a{std::next(a.begin()), std::prev(a.end())};
    std::cout << *std::ranges::get<0>(sub_a) << ' '   // == *(begin(a) + 1)
              << *std::ranges::get<1>(sub_a) << '\n'; // == *(end(a) - 1)

    *std::get<0>(sub_a) = 42; // OK
//  *std::get<2>(sub_a) = 13; // Error: index can only be 0 or 1
}
```

Output:

```text
-2 -4
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3589 | C++20 | overload (1) copies `begin_` if `N` is `​0​`, but `I` might not model `copyable` | added constraints |

### See also

|  |  |
| --- | --- |
| Structured binding (C++17) | binds the specified names to sub-objects or tuple elements of the initializer |
| get(std::tuple) (C++11) | tuple accesses specified element (function template) |
| get(std::pair) (C++11) | accesses an element of a `pair` (function template) |
| get(std::array) (C++11) | accesses an element of an `array` (function template) |
| get(std::variant) (C++17) | reads the value of the variant given the index or the type (if the type is unique), throws on error (function template) |
| get(std::complex) (C++26) | obtains a reference to real or imaginary part from a `std::complex` (function template) |
