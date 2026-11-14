# std::atomic_fetch_min, std::atomic_fetch_min_explicit

| Defined in header `<atomic>` |  |  |
| --- | --- | --- |
| `template< class T > T atomic_fetch_min( std::atomic<T>* obj, typename std::atomic<T>::value_type arg ) noexcept;` | (1) | (since C++26) |
| `template< class T > T atomic_fetch_min( volatile std::atomic<T>* obj, typename std::atomic<T>::value_type arg ) noexcept;` | (2) | (since C++26) |
| `template< class T > T atomic_fetch_min_explicit( std::atomic<T>* obj, typename std::atomic<T>::value_type arg, std::memory_order order ) noexcept;` | (3) | (since C++26) |
| `template< class T > T atomic_fetch_min_explicit( volatile std::atomic<T>* obj, typename std::atomic<T>::value_type arg, std::memory_order order ) noexcept;` | (4) | (since C++26) |

Atomically replaces the value pointed by `obj` with the result of `std::min` between the old value of `obj` and `arg`. Returns the value `obj` held previously. The operation is performed as if the following was executed:

1,2) `obj->fetch_min(arg)`

3,4) `obj->fetch_min(arg, order)`

If `std::atomic<T>` has no `fetch_min` member (this member is only provided for integral and pointer types except `bool`), the program is ill-formed.

### Parameters

|  |  |  |
| --- | --- | --- |
| obj | - | pointer to the atomic object to modify |
| arg | - | the value to `std::min` with the value stored in the atomic object |
| order | - | the memory synchronization ordering |

### Return value

The value immediately preceding the effects of this function in the modification order of `*obj`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_atomic_min_max` | `202403L` | (C++26) | Atomic minimum/maximum |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| fetch_min (C++26) | atomically performs `std::min` between the argument and the value of the atomic object and obtains the value held previously (public member function of `std::atomic<T>`) |
| atomic_fetch_max, atomic_fetch_max_explicit (C++26), (C++26) | replaces the atomic object with the result of `std::max` with a non-atomic argument and obtains the previous value of the atomic (function template) |
