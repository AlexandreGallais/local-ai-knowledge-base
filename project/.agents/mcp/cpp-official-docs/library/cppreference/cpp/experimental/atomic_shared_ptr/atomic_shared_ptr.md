# std::experimental::atomic_shared_ptr<T>::atomic_shared_ptr

|  |  |
| --- | --- |
| `constexpr atomic_shared_ptr() noexcept;` | (1) |
| `constexpr atomic_shared_ptr( shared_ptr<T> desired ) noexcept;` | (2) |
| `atomic_shared_ptr( const atomic_shared_ptr& ) = delete;` | (3) |

Constructs a new `atomic_shared_ptr` object.

1) The default constructor initializes the object to an empty state.

2) Initializes the underlying `shared_ptr<T>` with `desired`. The initialization is not atomic.

3) Atomic variables are not CopyConstructible.

### Parameters

desired - value to initialize with

### Exceptions
