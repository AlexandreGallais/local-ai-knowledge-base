# std::uses_allocator<std::experimental::promise>

| Defined in header `<experimental/future>` |  |
| --- | --- |
| `template< class R, class Alloc > struct uses_allocator<std::experimental::promise<R>, Alloc> : std::true_type {};` | (library fundamentals TS) |

This specialization of `std::uses_allocator` informs other library components that all objects of type `std::experimental::promise` support *uses-allocator construction*.

## Inherited from std::integral_constant

### Member constants

value [static] `true` (public static member constant)

### Member functions

|  |  |
| --- | --- |
| operator bool | converts the object to `bool`, returns `value` (public member function) |
| operator() (C++14) | returns `value` (public member function) |

### Member types

| Type | Definition |
| --- | --- |
| `value_type` | `bool` |
| `type` | `std::integral_constant<bool, value>` |

### See also

uses_allocator (C++11) checks if the specified type supports uses-allocator construction (class template)
