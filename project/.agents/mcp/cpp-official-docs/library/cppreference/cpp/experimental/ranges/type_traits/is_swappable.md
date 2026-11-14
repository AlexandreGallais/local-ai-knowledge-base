# std::experimental::ranges::is_swappable_with, std::experimental::ranges::is_swappable, std::experimental::ranges::is_nothrow_swappable_with, std::experimental::ranges::is_nothrow_swappable

| Defined in header `<experimental/ranges/type_traits>` |  |  |
| --- | --- | --- |
| `template< class T, class U > struct is_swappable_with;` | (1) | (ranges TS) |
| `template< class T > struct is_swappable;` | (2) | (ranges TS) |
| `template< class T, class U > struct is_nothrow_swappable_with;` | (3) | (ranges TS) |
| `template< class T > struct is_nothrow_swappable;` | (4) | (ranges TS) |

1) If the expressions `ranges::swap(std::declval<T>(), std::declval<U>())` and `ranges::swap(std::declval<U>(), std::declval<T>())` are both well-formed when treated as an unevaluated operand, provides the member constant `value` equal `true`. Otherwise, `value` is `false`. Access checks are performed as if from a context unrelated to either type.

2) If `T` is not a referenceable type (i.e., possibly cv-qualified `void` or a function type with a *cv-qualifier-seq* or a *ref-qualifier*), provides a member constant `value` equal to `false`. Otherwise, provides a member constant `value` equal to `ranges::is_swappable_with<T&, T&>::value`.

3) Same as (1), but evaluations of both expressions from (1) are known not to throw exceptions.

4) Same as (2), but uses `is_nothrow_swappable_with`.

`T` and `U` shall each be a complete type, (possibly cv-qualified) `void`, or an array of unknown bound. Otherwise, the behavior is undefined.

### Helper variable templates

|  |  |  |
| --- | --- | --- |
| `template< class T, class U > constexpr bool is_swappable_with_v = is_swappable_with<T, U>::value;` | (1) | (ranges TS) |
| `template< class T > constexpr bool is_swappable_v = is_swappable<T>::value;` | (2) | (ranges TS) |
| `template< class T, class U > constexpr bool is_nothrow_swappable_with_v = is_nothrow_swappable_with<T, U>::value;` | (3) | (ranges TS) |
| `template< class T > constexpr bool is_nothrow_swappable_v = is_nothrow_swappable<T>::value;` | (4) | (ranges TS) |

## Inherited from std::integral_constant

### Member constants

value [static] `true` if `T` is swappable with `U`, `false` otherwise (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### Notes

This trait does not check anything outside the immediate context of the swap expressions: if the use of `T` or `U` would trigger template specializations, generation of implicitly-defined special member functions etc, and those have errors, the actual swap may not compile even if `ranges::is_swappable_with<T,U>::value` compiles and evaluates to `true`.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| Swappable, SwappableWith | specifies that a type can be swapped or that two types can be swapped with each other (concept) |
| is_swappable_with, is_swappable, is_nothrow_swappable_with, is_nothrow_swappable (C++17), (C++17), (C++17), (C++17) | checks if objects of a type can be swapped with objects of same or different type (class template) |
