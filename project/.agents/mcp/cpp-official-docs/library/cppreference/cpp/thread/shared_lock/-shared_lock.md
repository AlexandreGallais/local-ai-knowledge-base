# std::shared_lock<Mutex>::~shared_lock

`~shared_lock();` (since C++14)

Destroys the lock.

If `*this` has an associated mutex ((`mutex()` returns a non-null pointer) and has acquired ownership of it (`owns()` returns `true`), the mutex is unlocked by calling `unlock_shared()`.
