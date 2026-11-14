# std::rank

| Defined in header `<type_traits>` |  |
| --- | --- |
| `template< class T > struct rank;` | (since C++11) |

If `T` is an array type, provides the member constant `value` equal to the number of dimensions of the array. For any other type, `value` is `​0​`.

If the program adds specializations for `std::rank` or `std::rank_v`(since C++17), the behavior is undefined.

### Helper variable template

`template< class T > constexpr std::size_t rank_v = rank<T>::value;` (since C++17)

## Inherited from std::integral_constant

### Member constants

value [static] the number of dimensions of `T` or zero (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator std::size_t | converts the object to `std::size_t`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `std::size_t` |
| `type` | `std::integral_constant<std::size_t, value>` |

### Possible implementation

`template<class T> struct rank : public std::integral_constant<std::size_t, 0> {}; template<class T> struct rank<T[]> : public std::integral_constant<std::size_t, rank<T>::value + 1> {}; template<class T, std::size_t N> struct rank<T[N]> : public std::integral_constant<std::size_t, rank<T>::value + 1> {};`

### Example

```cpp
#include <type_traits>

static_assert(std::rank<int>{} == 0);
static_assert(std::rank<int[5]>{} == 1);
static_assert(std::rank<int[5][5]>{} == 2);
static_assert(std::rank<int[][5][5]>{} == 3);

int main()
{
    [[maybe_unused]] int ary[][3] = {{1, 2, 3}};

    // The rank of reference type, e.g., ary[0], that is int(&)[3], is 0:
    static_assert(std::rank_v<decltype(ary[0])> == 0);
    static_assert(std::is_same_v<decltype(ary[0]), int(&)[3]>);

    // The solution is to remove the reference type.
    static_assert(std::rank_v<std::remove_cvref_t<decltype(ary[0])>> == 1);
}
```

### See also

|  |  |
| --- | --- |
| is_array (C++11) | checks if a type is an array type (class template) |
| extent (C++11) | obtains the size of an array type along a specified dimension (class template) |
| remove_extent (C++11) | removes one extent from the given array type (class template) |
| remove_all_extents (C++11) | removes all extents from the given array type (class template) |
