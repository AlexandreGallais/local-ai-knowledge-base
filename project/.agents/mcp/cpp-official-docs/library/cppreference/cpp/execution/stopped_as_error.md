# std::execution::stopped_as_error

| Defined in header `<execution>` |  |
| --- | --- |
| `template< std::move_constructible Error > execution::sender auto stopped_as_error( execution::sender auto snd, Error err );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| snd | - | input sender of which the stopped channel is mapped into `err` |
| err | - | error to which the stop channel is mapped into |

### Return value

Returns a sender that maps the stopped channel to an error of `err`.

### Example

This section is incomplete Reason: no example
