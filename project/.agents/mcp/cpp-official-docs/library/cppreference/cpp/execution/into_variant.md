# std::execution::into_variant

| Defined in header `<execution>` |  |
| --- | --- |
| `execution::sender auto into_variant( execution::sender auto snd );` | (since C++26) |

### Parameters

snd - input sender which can send multiple sets of values depending on runtime conditions.

### Return value

Returns a sender that sends a variant of tuples of all the possible sets of types sent by the input sender. The helper function turns them into a single variant value.
