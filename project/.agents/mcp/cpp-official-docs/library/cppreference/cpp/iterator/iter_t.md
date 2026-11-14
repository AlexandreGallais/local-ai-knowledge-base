# std::iter_value_t, std::iter_reference_t, std::iter_const_reference_t, std::iter_difference_t, std::iter_rvalue_reference_t, std::iter_common_reference_t

| Defined in header `<iterator>` |  |  |
| --- | --- | --- |
| `template< class T > using iter_value_t = /* see below */;` | (1) | (since C++20) |
| `template< /*dereferenceable*/ T > using iter_reference_t = decltype(*std::declval<T&>());` | (2) | (since C++20) |
| `template< std::indirectly_readable T > using iter_const_reference_t = std::common_reference_t<const std::iter_value_t<T>&&, std::iter_reference_t<T>>;` | (3) | (since C++23) |
| `template< class T > using iter_difference_t = /* see below */;` | (4) | (since C++20) |
| `template< /*dereferenceable*/ T> requires /* see below */ using iter_rvalue_reference_t = decltype(ranges::iter_move(std::declval<T&>()));` | (5) | (since C++20) |
| `template< std::indirectly_readable T > using iter_common_reference_t = std::common_reference_t<std::iter_reference_t<T>, /*indirect-value-t*/<T>>;` | (6) | (since C++20) |
| Helper templates |  |  |
| `template< class T > concept /*dereferenceable*/ = /* see below */;` | (7) | (exposition only*) |
| `template< std::indirectly_readable T > using /*indirect-value-t*/ = /* see below */;` | (8) | (exposition only*) |

Compute the associated types of an iterator.

1) Computes the value type of `T`.

- If `std::iterator_traits<std::remove_cvref_t<T>>` is not specialized, then `std::iter_value_t<T>` is `std::indirectly_readable_traits<std::remove_cvref_t<T>>::value_type`.
- Otherwise, it is `std::iterator_traits<std::remove_cvref_t<T>>::value_type`.

2) Computes the *reference type* of `T`.

3) Computes the *const reference type* of `T`.

4) Computes the difference type of `T`.

- If `std::iterator_traits<std::remove_cvref_t<T>>` is not specialized, then `std::iter_difference_t<T>` is `std::incrementable_traits<std::remove_cvref_t<T>>::difference_type`.
- Otherwise, it is `std::iterator_traits<std::remove_cvref_t<T>>::difference_type`.

5) Computes the *rvalue reference type* of `T`. The constraint on this alias template is satisfied if and only if the expression `ranges::iter_move(std::declval<T&>())` is valid and has a referenceable type.

6) Computes the *common reference type* of `T`. This is the common reference type between its reference type and an lvalue reference to its value type.

7) The exposition-only concept `dereferenceable` is satisfied if and only if the expression `*std::declval<T&>()` is valid and has a referenceable type.

8) The exposition-only alias template `indirect-value-t` denotes the following:

- `std::invoke_result_t<Proj&, /*indirect-value-t*/<I>>` if `T` is the same as `std::projected<I, Proj>` for some types `I` and `Proj`.
- Otherwise, `std::iter_value_t<T>&`.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| P2609R3 | C++20 | `std::iter_common_reference_t` was defined in terms of `std::iter_value_t<T>&` which incorrectly handled `std::projected` types that project into rvalue reference types | defined in terms of `/*indirect-value-t*/<T>` to handle such cases |

### See also

|  |  |
| --- | --- |
| indirectly_readable (C++20) | specifies that a type is indirectly readable by applying operator `*` (concept) |
| weakly_incrementable (C++20) | specifies that a `semiregular` type can be incremented with pre- and post-increment operators (concept) |
| indirectly_readable_traits (C++20) | computes the value type of an `indirectly_readable` type (class template) |
| incrementable_traits (C++20) | computes the difference type of a `weakly_incrementable` type (class template) |
| iterator_traits | provides uniform interface to the properties of an iterator (class template) |
| ranges::iterator_t, ranges::const_iterator_t, ranges::sentinel_t, ranges::const_sentinel_t (C++20), (C++23), (C++20), (C++23) | obtains iterator and sentinel types of a range (alias template) |
| ranges::range_reference_t, ranges::range_const_reference_t, ranges::range_rvalue_reference_t, ranges::range_common_reference_t (C++20), (C++23), (C++20), (C++20) | obtains reference types of a range (alias template) |
| ranges::range_difference_t, ranges::range_size_t, ranges::range_value_t (C++20), (C++20), (C++20) | obtains size, difference, and value types of a range (alias template) |
