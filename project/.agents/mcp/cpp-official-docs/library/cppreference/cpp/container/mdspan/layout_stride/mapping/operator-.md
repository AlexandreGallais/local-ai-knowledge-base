# operator==(std::layout_stride::mapping)

`template< class OtherMapping > friend constexpr bool operator==( const mapping& lhs, const OtherMapping& rhs ) noexcept;` (since C++23)

Compares two layout mappings of possibly different layout types based on their underlying extents and strides.

Layout mappings `lhs` and `rhs` compare equal if all of the following conditions are `true`:

- both `lhs.extents()` and `rhs.extents()` are equal,
- `OFFSET(rhs)` is equal to `​0​`, and
- for every rank index `r` in the range `[``​0​``,``lhs.extents().rank()``)`, `lhs.stride(r)` is equal to `rhs.stride(r)`

Where `OFFSET(rhs)` is equal to:

- `rhs()`, if `rhs.extents().rank()` is `​0​`,
- otherwise `​0​`, if the size of the multidimensional index space `rhs.extents()` is `​0​`,
- otherwise `rhs(z...)` for a pack of integers `z` that is a multidimensional index in `rhs.extents()` and each element of `z` is equal to `​0​`.

This overload participates in overload resolution only if all of the following constraints are satisfied:

- `layout-mapping-alike` `<OtherMapping>` is satisfied,
- `rank_ == OtherMapping::extents_type::rank()` is `true`, and
- `OtherMapping::is_always_strided()` is `true`

(`rank_` is an exposition-only static member constant defined in `std::layout_stride::mapping`.)

If `OtherMapping` does not meet the LayoutMapping requirements, the behavior is undefined.

### Parameters

lhs, rhs - layout mappings whose extents and strides to compare

### Return value

`true` if `lhs` and `rhs` are both equal as specified above, `false` otherwise

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator== | compares this layout mapping of `layout_left` with other mapping (function template) |
| operator== | compares this layout mapping of `layout_right` with other mapping (function template) |
| operator== (C++23) | compare underlying extents in each dimension of two `extents` (function) |
