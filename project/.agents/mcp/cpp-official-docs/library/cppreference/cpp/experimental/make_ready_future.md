# std::experimental::make_ready_future

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class T > future<V /* see below */> make_ready_future( T&& value );` | (1) | (concurrency TS) |
| `future<void> make_ready_future();` | (2) | (concurrency TS) |

1) If `std::decay_t<T>` is `std::reference_wrapper<X>`, then the type `V` is `X&`, otherwise, `V` is `std::decay_t<T>`.

Creates a shared state of type `V` that is immediately ready, with the result constructed from `std::forward<T>(value)`, then returns a `std::experimental::future` associated with that shared state.

2) Creates a shared state of type `void` that is immediately ready, then returns a `std::experimental::future` associated with that shared state.

### Return value

A `std::experimental::future` associated with the shared state that is created.

### See also

make_exceptional_future (concurrency TS) produces a future that is ready immediately and holds the given exception (function template)
