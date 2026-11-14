# std::experimental::promise (library fundamentals TS)

*This page is about the modified version of `std::promise` with type-erased allocator support provided by the Library Fundamentals TSes. For the version of `promise` provided by the concurrency TS supporting the `std::future` improvements made by that TS, see `std::experimental::concurrency_v1::promise`.*

| Defined in header `<experimental/future>` |  |  |
| --- | --- | --- |
| `template< class R > class promise;` | (1) | (library fundamentals TS) |
| `template< class R > class promise<R&>;` | (2) | (library fundamentals TS) |
| `template<> class promise<void>;` | (3) | (library fundamentals TS) |

`std::experimental::fundamentals_v1::promise` (and `std::experimental::fundamentals_v2::promise`) is a modified version of `std::promise` provided by the library fundamentals TS with support for type-erased allocators.

### Member types

| Member type | Definition |
| --- | --- |
| `allocator_type` | `std::experimental::erased_type` |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs the promise object (public member function) |
| get_memory_resource | retrieves a pointer to the memory resource used by this object to allocate memory (public member function) |

### Non-member function

std::experimental::swap(std::experimental::promise) specializes the `swap` algorithm (function template)

### Helper classes

std::uses_allocator<std::experimental::promise> specializes the `std::uses_allocator` type trait (class template specialization)

## Members identical to std::promise

### Member functions

|  |  |
| --- | --- |
| (destructor) | destructs the promise object (public member function of `std::promise<R>`) |
| operator= | assigns the shared state (public member function of `std::promise<R>`) |
| swap | swaps two promise objects (public member function of `std::promise<R>`) |
| Getting the result |  |
| get_future | returns a `future` associated with the promised result (public member function of `std::promise<R>`) |
| Setting the result |  |
| set_value | sets the result to specific value (public member function of `std::promise<R>`) |
| set_value_at_thread_exit | sets the result to specific value while delivering the notification only at thread exit (public member function of `std::promise<R>`) |
| set_exception | sets the result to indicate an exception (public member function of `std::promise<R>`) |
| set_exception_at_thread_exit | sets the result to indicate an exception while delivering the notification only at thread exit (public member function of `std::promise<R>`) |
