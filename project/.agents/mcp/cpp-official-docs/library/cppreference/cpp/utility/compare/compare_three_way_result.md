# std::compare_three_way_result

| Defined in header `<compare>` |  |
| --- | --- |
| `template< class T, class U = T > struct compare_three_way_result;` | (since C++20) |

Let `t` and `u` denote lvalue of `const std::remove_reference_t<T>` and `const std::remove_reference_t<U>` respectively, if the expression `t <=> u` is well-formed, provides the member typedef `type` equal to `decltype(t <=> u)`, otherwise there is no member `type`.

If the program adds specializations for `std::compare_three_way_result`, the behavior is undefined.

### Member types

| Name | Definition |
| --- | --- |
| `type` | the result type of `operator<=>` on const-qualified lvalue of `T` and `U` |

### Helper types

`template< class T, class U = T > using compare_three_way_result_t = compare_three_way_result<T, U>::type;` (since C++20)

### Possible implementation

`// recommended by Casey Carter // see also: https://github.com/microsoft/STL/pull/385#discussion_r357894054 template<class T, class U = T> using compare_three_way_result_t = decltype( std::declval<const std::remove_reference_t<T>&>() <=> std::declval<const std::remove_reference_t<U>&>() ); template<class T, class U = T> struct compare_three_way_result {}; template<class T, class U> requires requires { typename compare_three_way_result_t<T, U>; } struct compare_three_way_result<T, U> { using type = compare_three_way_result_t<T, U>; };`

### Example

```cpp
#include <compare>
#include <iostream>
#include <type_traits>

template<class Ord>
void print_cmp_type()
{
    if constexpr (std::is_same_v<Ord, std::strong_ordering>)
        std::cout << "strong ordering\n";
    else if constexpr (std::is_same_v<Ord, std::weak_ordering>)
        std::cout << "weak ordering\n";
    else if constexpr (std::is_same_v<Ord, std::partial_ordering>)
        std::cout << "partial ordering\n";
    else
        std::cout << "illegal comparison result type\n";
}

int main()
{
    print_cmp_type<std::compare_three_way_result_t<int>>();
    print_cmp_type<std::compare_three_way_result_t<double>>();
}
```

Output:

```text
strong ordering
partial ordering
```

### See also

|  |  |
| --- | --- |
| partial_ordering (C++20) | the result type of 3-way comparison that supports all 6 operators, is not substitutable, and allows incomparable values (class) |
| weak_ordering (C++20) | the result type of 3-way comparison that supports all 6 operators and is not substitutable (class) |
| strong_ordering (C++20) | the result type of 3-way comparison that supports all 6 operators and is substitutable (class) |
