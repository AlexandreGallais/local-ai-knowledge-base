# std::experimental::future

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class T > class future;` | (1) | (concurrency TS) |
| `template< class T > class future<T&>;` | (2) | (concurrency TS) |
| `template<> class future<void>;` | (3) | (concurrency TS) |

The class template `std::experimental::future` extends `std::future` with the following operations:

- an *unwrapping constructor* from `future<future<T>>`;
- a member function `is_ready` to query whether the associated shared state is ready; and
- a member function `then` to attach a continuation to the future.

However, there is no interoperation between `std::experimental::future` and `std::future`.

### Member functions

|  |  |
| --- | --- |
| (constructor) | construct a `future` object (public member function) |
| is_ready | checks if the shared state is ready (public member function) |
| then | attaches a continuation to a future (public member function) |
| operator= | moves the future object (public member function) |

## Members identical to std::future

### Member functions

Note that `share()` returns a `std::experimental::shared_future<T>`. The behavior is otherwise identical.

|  |  |
| --- | --- |
| (destructor) | destructs the future object (public member function of `std::future<T>`) |
| share | transfers the shared state from `*this` to a `shared_future` and returns it (public member function of `std::future<T>`) |
| Getting the result |  |
| get | returns the result (public member function of `std::future<T>`) |
| State |  |
| valid | checks if the future has a shared state (public member function of `std::future<T>`) |
| wait | waits for the result to become available (public member function of `std::future<T>`) |
| wait_for | waits for the result, returns if it is not available for the specified timeout duration (public member function of `std::future<T>`) |
| wait_until | waits for the result, returns if it is not available until specified time point has been reached (public member function of `std::future<T>`) |

### Example

This section is incomplete Reason: no example

### See also

shared_future (concurrency TS) a version of `std::shared_future` enhanced with continuations and other features (class template)
