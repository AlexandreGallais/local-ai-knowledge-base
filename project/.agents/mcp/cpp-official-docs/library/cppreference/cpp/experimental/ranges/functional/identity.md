# std::experimental::ranges::identity

| Defined in header `<experimental/ranges/functional>` |  |
| --- | --- |
| `struct identity;` | (ranges TS) |

`ranges::identity` is a function object type whose `operator()` returns its argument unchanged. It is used as the default projection for all Ranges TS algorithms.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** returns the argument unchanged (public member function)

## std::experimental::ranges::identity::operator()

`template< class T > constexpr T&& operator()( T&& t ) const noexcept;`

Returns `std::forward<T>(t)`.

### Parameters

t - argument to return

### Return value

`std::forward<T>(t)`.

### Example

This section is incomplete Reason: no example
