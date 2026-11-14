# std::experimental::make_optional

| Defined in header `<experimental/optional>` |  |
| --- | --- |
| `template< class T > constexpr optional<typename std::decay<T>::type> make_optional( T&& value );` | (library fundamentals TS) |

Creates an optional object from `value`. Effectively calls `optional<typename std::decay<T>::type>(std::forward<T>(value))`.

### Parameters

value - the value to construct optional object with

### Return value

An optional object with `value` as the contained value.

### Exceptions

Throws any exception thrown by the constructor of `T`.

### See also

(constructor) constructs the optional object (public member function)
