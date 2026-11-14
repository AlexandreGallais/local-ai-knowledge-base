# operator==,!=(std::experimental::function)

| Defined in header `<experimental/functional>` |  |  |
| --- | --- | --- |
| `template< class R, class... ArgTypes > bool operator==( const std::experimental::function<R(ArgTypes...)>& f, std::nullptr_t ) noexcept;` | (1) | (library fundamentals TS) |
| `template< class R, class... ArgTypes > bool operator==( std::nullptr_t, const std::experimental::function<R(ArgTypes...)>& f ) noexcept;` | (2) | (library fundamentals TS) (removed in library fundamentals TS v3) |
| `template< class R, class... ArgTypes > bool operator!=( const std::experimental::function<R(ArgTypes...)>& f, std::nullptr_t ) noexcept;` | (3) | (library fundamentals TS) (removed in library fundamentals TS v3) |
| `template< class R, class... ArgTypes > bool operator!=( std::nullptr_t, const std::experimental::function<R(ArgTypes...)>& f ) noexcept;` | (4) | (library fundamentals TS) (removed in library fundamentals TS v3) |

Compares a `std::experimental::function` with a null pointer. Empty functions (that is, functions without a callable target) compare equal, non-empty functions compare non-equal.

The `!=` operator is synthesized from `operator==`. (library fundamentals TS v3)

### Parameters

f - `std::experimental::function` to compare

### Return value

1,2) `!f`

3,4) `(bool) f`

### See also

operator==, operator!= (removed in C++20) compares a `std::function` with `nullptr` (function template)
