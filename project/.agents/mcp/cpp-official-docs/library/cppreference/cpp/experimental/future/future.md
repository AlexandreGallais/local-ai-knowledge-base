# std::experimental::future<T>::future

|  |  |
| --- | --- |
| `future() noexcept;` | (1) |
| `future( std::experimental::future<T>&& f ) noexcept;` | (2) |
| `future( const std::experimental::future<T>& ) = delete;` | (3) |
| `future( std::experimental::future<std::experimental::future<T>> && other ) noexcept;` | (4) |

1) Default constructor. Constructs an empty `future` object that does not refer to a shared state.

2) Constructs a `future` object, transferring the shared state held by `f`, if any. After construction, `f.valid()` is `false`.

3) Copy constructor is deleted. `future` cannot be copied.

4) Unwrapping constructor. Constructs a `future` object from the shared state referred to by `other`, if any. If `other.valid() == false` prior to this call, the constructed `future` object is empty. Otherwise, the resulting `future` object becomes ready when one of the following happens:

- `other` and `other.get()` are both ready. The value or exception from `other.get()` is stored in the shared state associated with the resulting `future` object.
- `other` is ready, but `other.get()` is invalid. An exception of type `std::future_error` with an error condition of `std::future_errc::broken_promise` is stored in the shared state associated with the resulting `future` object.

After this constructor returns, `valid()` is equal to the value of `other.valid()` prior to this call, and `other.valid() == false`.

### Parameters

|  |  |  |
| --- | --- | --- |
| f | - | another future object to initialize with |
| other | - | a `std::experimental::future` object to unwrap |

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2697 | Concurrency TS | behavior of unwrapping constructor is unclear with an invalid `future` | constructs an empty `future` |

### See also

(constructor) constructs the future object (public member function of `std::future<T>`)
