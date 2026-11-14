# operator==,!=,<,<=,>,>=(std::experimental::basic_string_view)

| Defined in header `<experimental/string_view>` |  |  |
| --- | --- | --- |
| Compare two `basic_string_view` objects |  |  |
| `template< class CharT, class Traits > constexpr bool operator==( basic_string_view <CharT,Traits> lhs, basic_string_view <CharT,Traits> rhs ) noexcept;` | (1) | (library fundamentals TS) |
| `template< class CharT, class Traits > constexpr bool operator!=( basic_string_view <CharT,Traits> lhs, basic_string_view <CharT,Traits> rhs ) noexcept;` | (2) | (library fundamentals TS) |
| `template< class CharT, class Traits > constexpr bool operator<( basic_string_view <CharT,Traits> lhs, basic_string_view <CharT,Traits> rhs ) noexcept;` | (3) | (library fundamentals TS) |
| `template< class CharT, class Traits > constexpr bool operator<=( basic_string_view <CharT,Traits> lhs, basic_string_view <CharT,Traits> rhs ) noexcept;` | (4) | (library fundamentals TS) |
| `template< class CharT, class Traits > constexpr bool operator>( basic_string_view <CharT,Traits> lhs, basic_string_view <CharT,Traits> rhs ) noexcept;` | (5) | (library fundamentals TS) |
| `template< class CharT, class Traits > constexpr bool operator>=( basic_string_view <CharT,Traits> lhs, basic_string_view <CharT,Traits> rhs ) noexcept;` | (6) | (library fundamentals TS) |

Compares two views.

All comparisons are done via the `compare()` member function (which itself is defined in terms of `Traits::compare()`):

- Two views are equal if both the size of `lhs` and `rhs` are equal and each character in `lhs` has an equivalent character in `rhs` at the same position.

- The ordering comparisons are done lexicographically -- the comparison is performed by a function equivalent to `std::lexicographical_compare`.

The implementation shall provide sufficient additional `constexpr` and `noexcept` overloads of these functions so that a `basic_string_view<CharT,Traits>` object `sv` may be compared to another object `t` with an implicit conversion to `basic_string_view<CharT,Traits>`, with semantics identical to comparing `sv` and `basic_string_view<CharT,Traits>(t)`.

### Parameters

lhs, rhs - views to compare

### Return value

`true` if the corresponding comparison holds, `false` otherwise.

### Complexity

Linear in the size of the views.
