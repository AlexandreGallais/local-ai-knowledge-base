# std::text_encoding::aliases

`constexpr aliases_view aliases() const noexcept;` (since C++26)

Returns a non-empty range of type `text_encoding::aliases_view` containing the aliases of `*this` if it represents a known registered character encoding. Otherwise, returns an empty range of type `text_encoding::aliases_view`.

### Parameters

(none)

### Return value

A `view` containing aliases of the known registered character encoding represented by `*this`; otherwise an empty range.

### Example

This section is incomplete Reason: no example
