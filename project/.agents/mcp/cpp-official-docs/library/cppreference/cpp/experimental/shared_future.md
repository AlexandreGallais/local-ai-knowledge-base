# std::experimental::shared_future

| Defined in header `<experimental/shared_future>` |  |  |
| --- | --- | --- |
| `template< class T > class shared_future;` | (1) | (concurrency TS) |
| `template< class T > class shared_future<T&>;` | (2) | (concurrency TS) |
| `template<> class shared_future<void>;` | (3) | (concurrency TS) |

The class template `std::experimental::shared_future` extends `std::shared_future` with the following operations:

- an *unwrapping constructor* from `future<shared_future<T>>`;
- a member function `is_ready` to query whether the associated shared state is ready; and
- a member function `then` to attach a continuation to the future.

There is no interoperation between `std::experimental::shared_future` and `std::shared_future`.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a `shared_future` (public member function) |
| is_ready | checks if the shared state is ready (public member function) |
| then | attaches a continuation to a `shared_future` (public member function) |
| operator= | assigns the contents (public member function) |

## Members identical to std::shared_future

### Member functions

|  |  |
| --- | --- |
| (destructor) | destructs the future object (public member function of `std::shared_future<T>`) |
| Getting the result |  |
| get | returns the result (public member function of `std::shared_future<T>`) |
| State |  |
| valid | checks if the future has a shared state (public member function of `std::shared_future<T>`) |
| wait | waits for the result to become available (public member function of `std::shared_future<T>`) |
| wait_for | waits for the result, returns if it is not available for the specified timeout duration (public member function of `std::shared_future<T>`) |
| wait_until | waits for the result, returns if it is not available until specified time point has been reached (public member function of `std::shared_future<T>`) |

### Example

This section is incomplete Reason: no example

### See also

future (concurrency TS) a version of `std::future` enhanced with continuations and other features (class template)
