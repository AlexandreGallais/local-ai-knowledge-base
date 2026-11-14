# std::execution::upon_error

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto upon_error( execution::sender auto input, std::invocable</*errors-sent-by*/(input)...> function );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| input | - | sender which once an error occurs, sends the errors to the function |
| function | - | invocable to be called with errors in case an error occurs by input sender |

### Return value

Returns a sender describing the task graph described by the input sender, with an added node of invoking the provided function with the errors sent by the input sender as arguments (in case of an error).

### Example

This section is incomplete Reason: no example
