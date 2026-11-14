# Experimental library header <experimental/ranges/type_traits>

This header is part of the ranges library.

### Metaprogramming and type traits

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| is_swappable_with, is_swappable, is_nothrow_swappable_with, is_nothrow_swappable | checks if objects of a type can be swapped with objects of same or different type (class template) |
| common_reference | determine the common reference type of a set of types (class template) |
| common_type | determine the common type of a set of types (class template) |

### Synopsis

```cpp
namespace std { namespace experimental { namespace ranges { inline namespace v1 {

template <class T, class U> struct is_swappable_with;
template <class T> struct is_swappable;

template <class T, class U> struct is_nothrow_swappable_with;
template <class T> struct is_nothrow_swappable;

template <class T, class U> constexpr bool is_swappable_with_v
  = is_swappable_with<T, U>::value;
template <class T> constexpr bool is_swappable_v
  = is_swappable<T>::value;

template <class T, class U> constexpr bool is_nothrow_swappable_with_v
  = is_nothrow_swappable_with<T, U>::value;
template <class T> constexpr bool is_nothrow_swappable_v
  = is_nothrow_swappable<T>::value;

template <class... T> struct common_type;
template <class T, class U, template <class> class TQual, template <class> class UQual>
  struct basic_common_reference { };
template <class... T> struct common_reference;

template <class... T>
  using common_type_t = typename common_type<T...>::type;
template <class... T>
  using common_reference_t = typename common_reference<T...>::type;

}}}}
```
