# std::copyable_function::operator bool

`explicit operator bool() const noexcept;` (since C++26)

Checks whether `*this` stores a callable target, i.e. is not empty.

### Parameters

(none)

### Return value

`true` if `*this` stores a callable target, `false` otherwise.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| operator== (C++26) | compares a `std::copyable_function` with `nullptr` (function) |
| operator bool | checks if a target is contained (public member function of `std::function<R(Args...)>`) |
| operator bool | checks if the `std::move_only_function` has a target (public member function of `std::move_only_function`) |
