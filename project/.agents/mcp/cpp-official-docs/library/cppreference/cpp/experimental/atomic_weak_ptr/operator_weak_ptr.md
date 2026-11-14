# std::experimental::atomic_weak_ptr<T>::operator weak_ptr<T>

`operator weak_ptr<T>() const noexcept;`

Atomically loads and returns the current value of the `atomic_weak_ptr`. Equivalent to `load()`.

### Parameters

(none)

### Return value

The current value of the `atomic_weak_ptr`.

### Remarks

All associated `use_count` increments are guaranteed to be performed as part of the atomic operation.

### See also

load atomically obtains the value of the atomic object (public member function)
