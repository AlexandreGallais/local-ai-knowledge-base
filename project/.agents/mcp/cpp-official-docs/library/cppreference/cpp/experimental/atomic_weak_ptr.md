# std::experimental::atomic_weak_ptr

| Defined in header `<experimental/atomic>` |  |
| --- | --- |
| `template< class T > class atomic_weak_ptr;` | (concurrency TS) |

The class template `atomic_weak_ptr` provides thread-safe atomic pointer operations over a `std::weak_ptr`.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs an `atomic_weak_ptr` object (public member function) |
| operator= | stores a value into an `atomic_weak_ptr` object (public member function) |
| is_lock_free | checks if the `atomic_weak_ptr` object is lock-free (public member function) |
| store | atomically replaces the value of the atomic object with a non-atomic argument (public member function) |
| load | atomically obtains the value of the atomic object (public member function) |
| operator weak_ptr<T> | loads a value from an atomic object (public member function) |
| exchange | atomically replaces the value of the atomic object and obtains the value held previously (public member function) |
| compare_exchange_weak, compare_exchange_strong | atomically compares the value of the atomic object with non-atomic argument and performs atomic exchange if equal or atomic load if not (public member function) |
