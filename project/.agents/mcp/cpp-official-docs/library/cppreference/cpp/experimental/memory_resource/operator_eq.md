# operator==, operator!= (std::experimental::pmr::memory_resource)

|  |  |  |
| --- | --- | --- |
| `bool operator==( const memory_resource& a, const memory_resource& b ) noexcept;` | (1) | (library fundamentals TS) |
| `bool operator!=( const memory_resource& a, const memory_resource& b ) noexcept;` | (2) | (library fundamentals TS) |

Compares the `memory_resource`s `a` and `b` for equality. Two `memory_resource`s compare equal if and only if memory allocated from one `memory_resource` can be deallocated from the other and vice versa.

### Return value

1) `&a == &b || a.is_equal(b)`

2) `!(a == b)`

### See also

is_equal compare for equality with another `memory_resource` (public member function)
