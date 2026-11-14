# std::execution::stopped_as_optional

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto stopped_as_optional( /*single-sender*/ auto snd );` | (since C++26) |

### Parameters

snd - input sender of which the value channel and stopped channel are mapped.

### Return value

Returns a sender that maps the value channel from a `T` to an `std::optional<std::decay_t<T>>`, and maps the stopped channel to a value of an empty `std::optional<std::decay_t<T>>`.

### Example

This section is incomplete Reason: no example
