# std::stop_source::get_token

`std::stop_token get_token() const noexcept;` (since C++20)

Returns a `stop_token` object associated with the `stop_source`'s stop-state, if the `stop_source` has stop-state; otherwise returns a default-constructed (empty) `stop_token`.

### Parameters

(none)

### Return value

A `stop_token` object, which will be empty if `this->stop_possible() == false`.

### Example

This section is incomplete Reason: no example
