# std::scoped_lock<MutexTypes...>::~scoped_lock

`~scoped_lock();` (since C++17)

Releases the ownership of the owned mutexes.

Effectively calls `unlock()` on every mutex from the pack of mutexes passed to the `scoped_lock`'s constructor.
