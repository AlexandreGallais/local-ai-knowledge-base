# operator==(std::layout_left::mapping)

`template< class OtherExtents > friend constexpr bool operator==( const mapping& lhs, const mapping<OtherExtents>& rhs ) noexcept;` (since C++23)

Compares two layout mappings of the same layout type based on their underlying extents.

Layout mappings `lhs` and `rhs` compare equal if both `lhs.extents()` and `rhs.extents()` are equal.

This overload participates in overload resolution only if `extents_type::rank() == OtherExtents::rank()` is `true`.

### Parameters

lhs, rhs - layout mappings whose extents to compare

### Return value

`true` if `lhs.extents() == rhs.extents()` is `true`, `false` otherwise

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator== | compares this layout mapping of `layout_right` with other mapping (function template) |
| operator== | compares this layout mapping of `layout_stride` with other mapping (function template) |
| operator== (C++23) | compare underlying extents in each dimension of two `extents` (function) |
