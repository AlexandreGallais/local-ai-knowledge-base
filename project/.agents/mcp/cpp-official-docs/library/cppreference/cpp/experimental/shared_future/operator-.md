# std::experimental::shared_future<T>::operator=

|  |  |
| --- | --- |
| `std::experimental::shared_future<T>& operator=( const std::experimental::shared_future<T>& other );` | (1) |
| `std::experimental::shared_future<T>& operator=( std::experimental::shared_future<T>&& other ) noexcept;` | (2) |

Assigns the contents of another `std::experimental::shared_future` object.

1) Releases any shared state and assigns the contents of `other` to `*this`. After the assignment, `this->valid() == other.valid()`.

2) Releases any shared state and move-assigns the contents of `other` to `*this`. After the assignment, `other.valid() == false` and `this->valid()` will yield the same value as `other.valid()` before the assignment.

### Parameters

other - a `std::experimental::shared_future` object to assign from

### Return value

`*this`
