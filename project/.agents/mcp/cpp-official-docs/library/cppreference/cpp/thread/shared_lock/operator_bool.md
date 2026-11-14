# std::shared_lock<Mutex>::operator bool

`explicit operator bool() const noexcept;` (since C++14)

Checks whether `*this` owns a locked mutex or not. Effectively calls `owns_lock()`.

### Parameters

(none)

### Return value

`true` if `*this` has an associated mutex and has acquired shared ownership of it, `false` otherwise.

### See also

owns_lock tests whether the lock owns its associated mutex (public member function)
