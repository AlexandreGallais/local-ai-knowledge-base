# std::experimental::function<R(Args...)>::swap

`void swap( function& other );` (library fundamentals TS)

Exchanges the stored callable objects of `*this` and `other`.

The allocators of `*this` and `other` are not exchanged.

|  |  |
| --- | --- |
| The behavior is undefined if `*this->get_memory_resource() != *other.get_memory_resource()`. | (library fundamentals TS) (until library fundamentals TS v3) |
| The behavior is undefined if `this->get_allocator() != other.get_allocator()`. | (library fundamentals TS v3) |

### Parameters

other - function wrapper to exchange the stored callable object with

### Return value

(none)
