# std::queue<T,Container>::operator=

|  |  |  |
| --- | --- | --- |
| `queue& operator=( const queue& other );` | (1) | (implicitly declared) |
| `queue& operator=( queue&& other );` | (2) | (since C++11) (implicitly declared) |

Replaces the contents of the container adaptor with the contents of given argument.

1) Copy assignment operator. Replaces the contents with a copy of the contents of `other`. Effectively calls `c = other.c;`.

2) Move assignment operator. Replaces the contents with those of `other` using move semantics. Effectively calls `c = std::move(other.c);`.

### Parameters

other - another container adaptor to be used as source

### Return value

`*this`

### Complexity

1,2) Equivalent to that of `operator=` of the underlying container.

### Example

This section is incomplete Reason: no example

### See also

(constructor) constructs the `queue` (public member function)
