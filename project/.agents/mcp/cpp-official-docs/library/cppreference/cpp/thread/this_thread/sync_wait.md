# std::execution::sync_wait

| Defined in header `<execution>` |  |
| --- | --- |
| `auto sync_wait( execution::sender auto sender ) requires (/*always-sends-some-values*/(sender)) -> std::optional<std::tuple</*value-sent-by*/(sender)>>;` | (since C++26) |

### Parameters

sender - sender upon which the completion of `sync_wait` is blocked

### Return value

Returns an optional tuple of values that were sent by the provided sender on its completion of work.

### Notes

The sender returned by `sync_wait` similarly to `ensure_started`, except that it blocks the current `std::thread` or thread of main until the work is completed.

### See also

ensure_started Eagerly starts a sender, returning a sender that will deliver the results to a receiver to which it is connected and started, if any. When the result sender is not connected to a receiver, or if the resulting operation state is not started, the results are ignored. If such a sender is destroyed before the underlying operation completes, the operation continues running detached. (function template)
