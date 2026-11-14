# std::execution::let_value

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto let_value( execution::sender auto input, std::invocable</*values-sent-by*/(input)...> function );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| input | - | sender which once executed sends the values upon which the function executes |
| function | - | invocable to be called with the values from the input sender |

### Return value

Returns a sender describing the task graph described by the input sender, with an added node of invoking the provided function with the values sent by the input sender as arguments.

`let_value` is similar to `then`, however, where the sender returned from `then` sends exactly what that function ends up returning - `let_value` requires that the function returns a sender, and the sender returned by `let_value` sends the values sent by the sender returned from the callback.

### Example

This section is incomplete Reason: no example
