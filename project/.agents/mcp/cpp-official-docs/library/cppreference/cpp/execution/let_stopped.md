# std::execution::let_stopped

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto let_stopped( execution::sender auto input, std::invocable auto function );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| input | - | sender which once stopped, sends the "stop token" to execute the function |
| function | - | invocable to be called with errors in case an error occurs by input sender |

### Return value

Returns a sender describing the task graph described by the input sender, with an added node invoked when the "stopped" signal is sent.

### Example

This section is incomplete Reason: no example
