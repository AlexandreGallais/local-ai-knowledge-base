# std::experimental::ranges::difference_type

| Defined in header `<experimental/ranges/iterator>` |  |
| --- | --- |
| `template< class I > struct difference_type {};` | (1) |
| `template< class T > struct difference_type<T*>;` | (2) |
| `template< class T > struct difference_type<const T> : difference_type<std::decay_t<T>> {};` | (3) |
| `template< class T > requires requires { typename T::difference_type; } struct difference_type<T>;` | (4) |
| `template< class T > requires !requires { typename T::difference_type; } && requires(const T& a, const T& b) { {a - b} -> Integral; } struct difference_type<T>;` | (5) |

Computes the associated difference type of the type `I`, if any. Users may specialize `difference_type` for a program-defined type.

1) Primary template is an empty struct.

2) Specialization for pointers. If `T` is an object type, provides a member type `type` equal to `std::ptrdiff_t`. Otherwise, there is no member `type`.

3) Specialization for const-qualified types.

4) Specialization for types that define a public and accessible member type `difference_type`. Provides a member type `type` equal to `T::difference_type`.

5) Specialization for types that do not define a public and accessible member type `difference_type` but do support subtraction. Provides a member type `type` equal to `std::make_signed_t<decltype(std::declval<T>() - std::declval<T>())>`.

### Helper alias template

`template< class T > using difference_type_t = typename ranges::difference_type<T>::type;` (ranges TS)

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| WeaklyIncrementable | specifies that a `Semiregular` type can be incremented with pre- and post-increment operators (concept) |
| iterator_traits | compatibility traits class that collects an iterator’s associated types (alias template) |
