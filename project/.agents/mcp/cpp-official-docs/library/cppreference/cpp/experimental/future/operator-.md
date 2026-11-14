# std::experimental::future<T>::operator=

|  |  |
| --- | --- |
| `std::experimental::future<T>& operator=( std::experimental::future<T>&& other ) noexcept;` | (1) |
| `std::experimental::future<T>& operator=( const std::experimental::future<T>& other ) = delete;` | (2) |

Assigns the contents of another future object.

1) Releases any shared state and move-assigns the contents of `other` to `*this`. After the assignment, `other.valid() == false` and `this->valid()` will yield the same value as `other.valid()` before the assignment.

2) `std::experimental::future` is not CopyAssignable.

### Parameters

other - a `std::experimental::future` that will transfer state to `*this`

### Return value

`*this`
