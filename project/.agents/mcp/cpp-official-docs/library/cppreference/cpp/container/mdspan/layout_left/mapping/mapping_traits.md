# std::layout_left::mapping<Extents>::*mapping-traits*

|  |  |  |
| --- | --- | --- |
| `static constexpr bool is_unique() noexcept;` | (1) | (since C++23) |
| `static constexpr bool is_exhaustive() noexcept;` | (2) | (since C++23) |
| `static constexpr bool is_strided() noexcept;` | (3) | (since C++23) |
| `static constexpr bool is_always_unique() noexcept;` | (4) | (since C++23) |
| `static constexpr bool is_always_exhaustive() noexcept;` | (5) | (since C++23) |
| `static constexpr bool is_always_strided() noexcept;` | (6) | (since C++23) |

Every instance of every specialization of `mapping` is unique, exhaustive, and strided. See LayoutMapping for the semantics of these predicate mapping traits.

### Parameters

(none)

### Return value

1-6) `true`

### Example

This section is incomplete Reason: no example

### See also

This section is incomplete
