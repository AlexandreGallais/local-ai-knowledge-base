# std::indirectly_readable_traits

| Defined in header `<iterator>` |  |  |
| --- | --- | --- |
| `template< class I > struct indirectly_readable_traits {};` | (1) | (since C++20) |
| `template< class T > struct indirectly_readable_traits<T*> : /* cond-value-type */<T> {};` | (2) | (since C++20) |
| `template< class I > requires std::is_array_v<I> struct indirectly_readable_traits<I>; { using value_type = std::remove_cv_t<std::remove_extent_t<I>>; }` | (3) | (since C++20) |
| `template< class T > struct indirectly_readable_traits<const T> : indirectly_readable_traits<T> {};` | (4) | (since C++20) |
| `template< /* has-member-value-type */ T > struct indirectly_readable_traits<T> : /* cond-value-type */<typename T::value_type> {};` | (5) | (since C++20) |
| `template< /* has-member-element-type */ T > struct indirectly_readable_traits<T> : /* cond-value-type */<typename T::element_type> {};` | (6) | (since C++20) |
| `template< /* has-member-value-type */ T > requires /* has-member-element-type */<T> struct indirectly_readable_traits<T> {};` | (7) | (since C++20) |
| `template< /* has-member-value-type */ T > requires /* has-member-element-type */<T> && std::same_as<std::remove_cv_t<typename T::element_type>, std::remove_cv_t<typename T::value_type>> struct indirectly_readable_traits<T> : /* cond-value-type */<typename T::value_type> {};` | (8) | (since C++20) |
| Helper classes and concepts |  |  |
| `template< class > struct /* cond-value-type */ {};` | (1) | (exposition only*) |
| `template< class T > requires std::is_object_v<T> struct /* cond-value-type */ <T> { using value_type = std::remove_cv_t<T>; };` | (2) | (exposition only*) |
| `template< class T > concept /* has-member-value-type */ = requires { typename T::value_type; };` | (3) | (exposition only*) |
| `template< class T > concept /* has-member-element-type */ = requires { typename T::element_type; };` | (4) | (exposition only*) |

Computes the associated value type of the template argument. If the associated value type exists, it is represented by the nested type `value_type`, otherwise `value_type` is not defined. A program may specialize `indirectly_readable_traits` for a program-defined type.

### Explanation

The specializations above can be informally described as below.

Given a type `T`, its associated value type `V` is determined as follows:

- If `T` is const-qualified, `V` is the associated value type of const-unqualified `T`.
- Otherwise, if `T` is an array type, `V` is the cv-unqualified array element type.
- Otherwise, a conditional value type `C` is determined first:

- If `T` is a pointer type, `C` is the pointed-to type.
- Otherwise, if `T` has nested types `value_type` and `element_type`:

- If these types are the same (not considering cv-qualification), `C` is `typename T::value_type`.
- Otherwise, `C` is undefined.

- Otherwise, if `T` has the nested type `value_type` but not `element_type`, `C` is `typename T::value_type`.
- Otherwise, if `T` has the nested type `element_type` but not `value_type`, `C` is `typename T::element_type`.
- Otherwise, `C` is undefined.

Then `V` is determined from `C` as follows:

- If `C` is undefined, or `C` is not an object type, `V` is undefined.
- Otherwise, `V` is cv-unqualified `C`.

### Notes

`value_type` is intended for use with `indirectly_readable` types such as iterators. It is not intended for use with ranges.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3446 | C++20 | specializations (5,6) were ambiguous for types having both `value_type` and `element_type` nested types | added specialization (8) |
| LWG 3541 | C++20 | LWG 3446 introduced hard error for ambiguous cases that `value_type` and `element_type` are different | added specialization (7) |

### See also

|  |  |
| --- | --- |
| indirectly_readable (C++20) | specifies that a type is indirectly readable by applying operator `*` (concept) |
| iter_value_t, iter_reference_t, iter_const_reference_t, iter_difference_t, iter_rvalue_reference_t, iter_common_reference_t (C++20), (C++20), (C++23), (C++20), (C++20), (C++20) | computes the associated types of an iterator (alias template) |
| iterator_traits | provides uniform interface to the properties of an iterator (class template) |
