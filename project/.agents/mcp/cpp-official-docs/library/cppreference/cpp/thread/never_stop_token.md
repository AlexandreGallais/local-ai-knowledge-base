# std::never_stop_token

| Defined in header `<stop_token>` |  |
| --- | --- |
| `class never_stop_token;` | (since C++26) |

The `never_stop_token` class models `unstoppable_token` that provides static information that a stop is never possible nor requested. It is the default stop token type returned by `std::get_stop_token` if no other associated stop token is being provided in the queryable object.

### Member alias templates

| Type | Definition |
| --- | --- |
| `callback_type<Callback>` | `/*callback-type*/` where the type is defined as: `struct /*callback-type*/ { explicit /*callback-type*/( never_stop_token, auto&& ) noexcept {} };` (exposition only*) |

### Member functions

|  |  |
| --- | --- |
| stop_requested [static] | indicates that a stop can never be requested (public static member function) |
| stop_possible [static] | indicates that a stop is not possible (public static member function) |
| operator== | compares two `never_stop_token` objects (public member function) |

## std::never_stop_token::stop_requested

`static constexpr bool stop_requested() noexcept { return false; }`

Always returns `false`, indicating that a stop can never be requested.

## std::never_stop_token::stop_possible

`static constexpr bool stop_possible() noexcept { return false; }`

Always returns `false`, indicating that a stop is not possible.

## std::never_stop_token::operator==

`bool operator==(const never_stop_token&) const = default;`

Two `never_stop_token` objects always compare equal.

### Example

This section is incomplete Reason: no example
