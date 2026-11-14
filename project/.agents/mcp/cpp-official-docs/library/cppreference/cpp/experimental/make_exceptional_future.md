# std::experimental::make_exceptional_future

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class T > future<T> make_exceptional_future( std::exception_ptr ex );` | (1) | (concurrency TS) |
| `template< class T, class E > future<T> make_exceptional_future( E ex );` | (2) | (concurrency TS) |

1) Creates a shared state of type `T` that is immediately ready and stores the exception pointer `ex`, then return a future associated with that shared state, as if by `promise<T> p; p.set_exception(ex); return p.get_future();`. The behavior is undefined if `ex` is null.

2) Creates a shared state of type `T` that is immediately ready and stores an exception pointer created from `ex`, then return a future associated with that shared state, as if by `promise<T> p; p.set_exception(std::make_exception_ptr(ex)); return p.get_future();`.

### Return value

A `future` object associated with the shared state that was created.

### See also

make_ready_future (concurrency TS) produces a future that is ready immediately and holds the given value (function template)
