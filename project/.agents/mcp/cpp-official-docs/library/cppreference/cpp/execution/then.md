# std::execution::then

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto then( execution::sender auto input, std::invocable</*values-sent-by*/(input)...> function );` | (since C++26) |

### Parameters

|  |  |  |
| --- | --- | --- |
| input | - | sender which once executed sends the values upon which the function executes |
| function | - | invocable to be called by the new sender chained to the input sender |

### Return value

Returns a sender describing the task graph described by the input sender, with an added node of invoking the provided function with the values sent by the input sender as arguments.

`then` is guaranteed to not begin executing function until the returned sender is started.

### Example

Possible usage of `execution::then`.

```cpp
execution::sender auto input = get_input();
execution::sender auto snd = execution::then(input, [](auto... args)
{
    std::print(args...);
});
// snd describes the work described by pred
// followed by printing all of the values sent by pred
```
