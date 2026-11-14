# operator==(std::text_encoding)

|  |  |  |
| --- | --- | --- |
| `friend constexpr bool operator==( const text_encoding& a, const text_encoding& b ) noexcept;` | (1) | (since C++26) |
| `friend constexpr bool operator==( const text_encoding& a, id i ) noexcept;` | (2) | (since C++26) |

Performs comparison operations on `text_encoding` objects.

1) Compares two `text_encoding` objects. The objects compare equal if and only if `comp-name (a.name(), b.name())` is `true` when both `a.mib()` and `b.mib()` are equal to `id::other`, or `a.mib()` is equal to `b.mib()`.

2) Compare `text_encoding` object with a MIBenum value. The objects compare equal if and only if `a.mib()` is equal to `i`.

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::text_encoding` is an associated class of the arguments.

The `!=` operator is synthesized from `operator==`.

### Parameters

|  |  |  |
| --- | --- | --- |
| a, b | - | `text_encoding` objects to compare |
| i | - | `id` value to compare with the MIBenum value contained in `a` |

### Return value

1) `a.mib() == id::other && b.mib() == id::other ? comp-name (a.name(), b.name()) : a.mib() == b.mib()`.

2) `a.mib() == i`.

### Example

This section is incomplete Reason: no example

### See also

operator==, operator!= (removed in C++20) equality comparison between locale objects (public member function of `std::locale`)
