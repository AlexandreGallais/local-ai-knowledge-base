# std::experimental::get_underlying

|  |  |
| --- | --- |
| `template< class T > constexpr T& get_underlying( propagate_const<T>& pt ) noexcept;` | (library fundamentals TS v2) |
| `template< class T > constexpr const T& get_underlying( const propagate_const<T>& pt ) noexcept;` | (library fundamentals TS v2) |

Retrieves a reference to the pointer-like object stored in a `propagate_const`.

### Parameters

pt - a `propagate_const` object

### Return value

A reference to the pointer-like object stored in `pt`.
