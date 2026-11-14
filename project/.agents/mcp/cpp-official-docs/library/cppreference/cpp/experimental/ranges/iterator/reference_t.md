# std::experimental::ranges::reference_t, std::experimental::ranges::rvalue_reference_t, std::experimental::ranges::iter_common_reference_t

| Defined in header `<experimental/ranges/iterator>` |  |  |
| --- | --- | --- |
| `template< class T > concept bool /*dereferenceable*/ = requires(T& t) { {*t} -> auto&&; };` |  | (exposition only*) |
| `template< /*dereferenceable*/ T > using reference_t = decltype(*declval<T&>());` | (1) | (ranges TS) |
| `template< /*dereferenceable*/ T > requires requires(T& t) { { ranges::iter_move(t) } -> auto&&; } using rvalue_reference_t = decltype(ranges::iter_move(declval<T&>()));` | (2) | (ranges TS) |
| `template< Readable T > using iter_common_reference_t = ranges::common_reference_t<ranges::reference_t<T>, ranges::value_type_t<T>&>;` | (3) | (ranges TS) |

1) Obtain the *reference type* of a dereferenceable type `T`.

2) Obtain the *rvalue reference type* of a dereferenceable type `T`, that is, the return type of `ranges::iter_move`.

3) Compute a `Readable` type's *common reference type*. This is the common reference type of its reference type and an lvalue reference to its value type.

### Notes

The `-> auto&&` constraint checks that the type of the expression is not `void`.
