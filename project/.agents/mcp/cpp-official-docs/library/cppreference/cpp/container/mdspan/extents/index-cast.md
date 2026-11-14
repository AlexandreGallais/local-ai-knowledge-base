# std::extents<IndexType,Extents...>::*index-cast*

`template< class OtherIndexType > static constexpr auto /*index-cast*/( OtherIndexType&& i ) noexcept;` (since C++23) (exposition only*)

Casts the index `i` of type `OtherIndexType` into a certain integral type.

It is equivalent to:

- `return i;`, if `OtherIndexType` is an integral type other than `bool` and
- `return static_cast<index_type>(i);` otherwise.

### Parameters

i - the index to be cast

### Return value

Cast index.

### Notes

A call to this function will always return an integral type other than `bool`. Integer-class types can use the `static_cast` branch without loss of precision because this function's call sites are already constrained on the convertibility of `OtherIndexType` to `index_type`.
