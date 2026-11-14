# std::experimental::ranges::value_type

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class I > struct value_type {};` | (1) |
| `template< class T > struct value_type<T*>;` | (2) |
| `template< class I > requires std::is_array<I>::value struct value_type<I> : value_type<std::decay_t<I>> {};` | (3) |
| `template< class T > struct value_type<const T> : value_type<std::decay_t<T>> {};` | (4) |
| `template< class T > requires requires { typename T::value_type; } struct value_type<T>;` | (5) |
| `template< class T > requires requires { typename T::element_type; } struct value_type<T>;` | (6) |

Computes the associated value type of the type `I`, if any. Users may specialize `value_type` for a program-defined type.

1) Primary template is an empty struct.

2) Specialization for pointers. If `T` is an object type, provides a member type `type` equal to `std::remove_cv_t<T>`. Otherwise, there is no member `type`.

3) Specialization for array types.

4) Specialization for const-qualified types.

5) Specialization for types that define a public and accessible member type `value_type`. If `T::value_type` is an object type, provides a member type `type` equal to `T::value_type`. Otherwise, there is no member `type`.

6) Specialization for types that define a public and accessible member type `element_type` (e.g., `std::shared_ptr`). If `T::element_type` is an object type, provides a member type `type` equal to `std::remove_cv_t<typename T::element_type>`. Otherwise, there is no member `type`.

### Helper alias template

`template< class T > using value_type_t = typename ranges::value_type<T>::type;` (ranges TS)

### Notes

If a type contains both a `value_type` member and a `element_type` member, then the specializations (5) and (6) are ambiguous.

`value_type` is intended for use with `Readable` types such as iterators. It is not intended for use with ranges.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| Readable | specifies that a type is readable by applying operator `*` (concept) |
| iterator_traits | compatibility traits class that collects an iterator’s associated types (alias template) |
