# std::shared_future<T>::get

|  |  |  |
| --- | --- | --- |
| Main template |  |  |
| `const T& get() const;` | (1) | (since C++11) |
| `std::shared_future<T&>` specializations |  |  |
| `T& get() const;` | (2) | (since C++11) |
| `std::shared_future<void>` specialization |  |  |
| `void get() const;` | (3) | (since C++11) |

The `get` member function waits (by calling `wait()`) until the shared state is ready, then retrieves the value stored in the shared state (if any).

If `valid()` is `false` before the call to this function, the behavior is undefined.

### Return value

1) A const reference to the value stored in the shared state. The behavior of accessing the value through this reference after the shared state has been destroyed is undefined.

2) The reference stored as value in the shared state.

3) (none)

### Exceptions

If an exception was stored in the shared state referenced by the future (e.g. via a call to `std::promise::set_exception()`) then that exception will be thrown.

### Notes

The C++ standard recommends the implementations to detect the case when `valid()` is `false` before the call and throw a `std::future_error` with an error condition of `std::future_errc::no_state`.

### Example

This section is incomplete Reason: no example

### See also

valid checks if the future has a shared state (public member function)
