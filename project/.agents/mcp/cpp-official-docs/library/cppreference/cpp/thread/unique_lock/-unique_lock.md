# std::unique_lock<Mutex>::~unique_lock

`~unique_lock();` (since C++11)

Destroys the lock. If `*this` has an associated mutex and has acquired ownership of it, the mutex is unlocked.
