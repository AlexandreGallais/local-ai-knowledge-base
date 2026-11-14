# std::experimental::function

| Defined in header `<experimental/functional>` |  |
| --- | --- |
| `template< class > class function; /* undefined */` | (library fundamentals TS) |
| `template< class R, class... Args > class function<R(Args...)>` | (library fundamentals TS) |

`std::experimental::function` is a modified version of `std::function` with support for type-erased allocators.

### Member types

| Type | Definition |
| --- | --- |
| `allocator_type` | `std::experimental::erased_type` (library fundamentals TS) (until library fundamentals TS v3) `std::pmr::polymorphic_allocator<>` (library fundamentals TS v3) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `std::experimental::function` instance (public member function) |
| operator= | assigns a new target (public member function) |
| swap | swaps the contents (public member function) |
| get_memory_resource (removed in library fundamentals TS v3) | retrieves a pointer to the memory resource used by this object to allocate memory (public member function) |
| get_allocator (library fundamentals TS v3) | retrieves a type-erased `std::pmr::polymorphic_allocator` used by this object to allocate memory (public member function) |

### Non-member functions

|  |  |
| --- | --- |
| std::experimental::swap(std::experimental::function) | specializes the `swap` algorithm (function template) |
| operator==, operator!= (removed in library fundamentals TS v3) | compares an `std::experimental::function` with `nullptr` (function template) |

### Helper classes

std::uses_allocator<std::experimental::function> (removed in library fundamentals TS v3) specializes the `std::uses_allocator` type trait (class template specialization)

## Members identical to std::function

### Member types

| Type | Definition |
| --- | --- |
| `result_type` | `R` |
| Member types removed in Library Fundamental TS v3 |  |
| `argument_type` | `T` if `sizeof...(Args) == 1` and `T` is the first and only type in `Args...` |
| `first_argument_type` | `T1` if `sizeof...(Args) == 2` and `T1` is the first of the two types in `Args...` |
| `second_argument_type` | `T2` if `sizeof...(Args) == 2` and `T2` is the second of the two types in `Args...` |

Member types `argument_type`, `first_argument_type`, and `second_argument_type` are removed, because the correponding member types of `std::function` are removed in C++20. (library fundamentals TS v3)

### Member functions

|  |  |
| --- | --- |
| (destructor) | destroys a `std::function` instance (public member function of `std::function<R(Args...)>`) |
| operator bool | checks if a target is contained (public member function of `std::function<R(Args...)>`) |
| operator() | invokes the target (public member function of `std::function<R(Args...)>`) |
| Target access |  |
| target_type | obtains the `typeid` of the stored target (public member function of `std::function<R(Args...)>`) |
| target | obtains a pointer to the stored target (public member function of `std::function<R(Args...)>`) |
