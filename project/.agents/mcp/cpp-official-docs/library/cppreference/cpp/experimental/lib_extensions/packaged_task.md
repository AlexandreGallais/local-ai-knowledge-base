# std::experimental::packaged_task (library fundamentals TS)

*This page is about the modified version of `std::packaged_task` with type-erased allocator support provided by the Library Fundamentals TSes. For the version of `packaged_task` provided by the concurrency TS supporting the `std::future` improvements made by that TS, see `std::experimental::concurrency_v1::packaged_task`.*

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class > class packaged_task; //not defined` | (1) | (library fundamentals TS) |
| `template< class R, class ...Args > class packaged_task<R(Args...)>;` | (2) | (library fundamentals TS) |

`std::experimental::fundamentals_v1::packaged_task` (and `std::experimental::fundamentals_v2::packaged_task`) is a modified version of `std::packaged_task` provided by the library fundamentals TS with support for type-erased allocators.

### Member types

| Member type | Definition |
| --- | --- |
| `allocator_type` | `std::experimental::erased_type` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the task object (public member function) |
| get_memory_resource | retrieves a pointer to the memory resource used by this object to allocate memory (public member function) |

### Non-member function

std::experimental::swap(std::experimental::packaged_task) specializes the `swap` algorithm (function template)

### Helper classes

std::uses_allocator<std::experimental::packaged_task> specializes the `std::uses_allocator` type trait (class template specialization)

## Members identical to std::packaged_task

### Member functions

|  |  |
| --- | --- |
| (destructor) | destructs the task object (public member function of `std::packaged_task<R(Args...)>`) |
| operator= | moves the task object (public member function of `std::packaged_task<R(Args...)>`) |
| valid | checks if the task object has a valid function (public member function of `std::packaged_task<R(Args...)>`) |
| swap | swaps two task objects (public member function of `std::packaged_task<R(Args...)>`) |
| Getting the result |  |
| get_future | returns a `std::future` associated with the promised result (public member function of `std::packaged_task<R(Args...)>`) |
| Execution |  |
| operator() | executes the function (public member function of `std::packaged_task<R(Args...)>`) |
| make_ready_at_thread_exit | executes the function ensuring that the result is ready only once the current thread exits (public member function of `std::packaged_task<R(Args...)>`) |
| reset | resets the state abandoning any stored results of previous executions (public member function of `std::packaged_task<R(Args...)>`) |
