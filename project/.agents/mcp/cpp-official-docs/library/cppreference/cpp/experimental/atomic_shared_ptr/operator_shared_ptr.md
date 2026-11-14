# std::experimental::atomic_shared_ptr<T>::operator shared_ptr<T>

`operator shared_ptr<T>() const noexcept;`

Atomically loads and returns the current value of the `atomic_shared_ptr`. Equivalent to `load()`.

### Parameters

(none)

### Return value

The current value of the `atomic_shared_ptr`.

### Remarks

All associated `use_count` increments are guaranteed to be performed as part of the atomic operation.

### See also

load atomically obtains the value of the atomic object (public member function)
