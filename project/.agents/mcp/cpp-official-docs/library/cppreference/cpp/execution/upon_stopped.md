# std::execution::upon_stopped

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto upon_stopped( execution::sender auto input, std::invocable auto function );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| input | - | sender which once gets "stop token", will notify the new node to execute the function |
| function | - | invocable to be called in case a "stopped" signal is sent to the input sender |

### Return value

Returns a sender describing the task graph described by the input sender, with an added node of invoking the provided function in case the "stopped" signal is sent to the input sender.

### Example

This section is incomplete Reason: no example
