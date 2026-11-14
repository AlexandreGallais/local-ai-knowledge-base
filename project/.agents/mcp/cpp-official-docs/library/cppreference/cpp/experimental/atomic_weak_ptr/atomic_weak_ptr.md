# std::experimental::atomic_weak_ptr<T>::atomic_weak_ptr

|  |  |
| --- | --- |
| `constexpr atomic_weak_ptr() noexcept;` | (1) |
| `constexpr atomic_weak_ptr( weak_ptr<T> desired ) noexcept;` | (2) |
| `atomic_weak_ptr( const atomic_weak_ptr& ) = delete;` | (3) |

Constructs a new `atomic_weak_ptr` object.

1) The default constructor initializes the object to an empty state.

2) Initializes the underlying `weak_ptr<T>` with `desired`. The initialization is not atomic.

3) Atomic variables are not CopyConstructible.

### Parameters

desired - value to initialize with
