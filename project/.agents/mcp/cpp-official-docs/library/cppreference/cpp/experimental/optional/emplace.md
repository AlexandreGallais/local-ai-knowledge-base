# std::experimental::optional<T>::emplace

|  |  |
| --- | --- |
| `template< class... Args > void emplace( Args&&... args );` | (library fundamentals TS) |
| `template< class U, class... Args > void emplace( std::initializer_list<U> ilist, Args&&... args );` | (library fundamentals TS) |

Constructs the contained value in-place. If `*this` already contains a value before the call, the contained value is destroyed by calling its destructor.

1) Initializes the contained value by direct-initializing (but not direct-list-initializing) with `std::forward<Args>(args)...` as parameters.

2) Initializes the contained value by calling its constructor with `ilist, std::forward<Args>(args)...` as parameters. This overload participates in overload resolution only if `std::is_constructible<T, std::initializer_list<U>&, Args&&...>::value` is `true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| args... | - | the arguments to pass to the constructor |
| ilist | - | the initializer list to pass to the constructor |
| Type requirements |  |  |
| - `T` must be constructible from `Args...` |  |  |
| - `T` must be constructible from `std::initializer_list` and `Args...` |  |  |

### Return value

(none)

### Exceptions

Any exception thrown by the selected constructor of `T`. If an exception is thrown, `*this` does not contain a value after this call (the previously contained value, if any, had been destroyed).

### See also

operator= assigns contents (public member function)
