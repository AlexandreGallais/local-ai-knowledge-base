# std::execution::let_error

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto let_error( execution::sender auto input, std::invocable</*errors-sent-by*/(input)...> function );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| input | - | sender which once an error occurs, sends the errors to the function |
| function | - | invocable to be called with errors in case an error occurs by input sender |

### Return value

Returns a sender describing the task graph described by the input sender, with an added node of invoking the provided function with errors sent by the input sender, if an error occurs.

### Example

This section is incomplete Reason: no example
