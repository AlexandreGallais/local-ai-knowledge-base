# std::execution::on

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto on( execution::scheduler auto sched, execution::sender auto snd );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| sched | - | provides execution agent on which the sender will be executed |
| snd | - | work to be executed on the execution resource associated with sched |

### Return value

Returns a sender which, when started, will start the provided sender on an execution agent belonging to the execution resource associated with the provided scheduler.

The returned sender has no completion schedulers.

### Example

This section is incomplete Reason: no example
