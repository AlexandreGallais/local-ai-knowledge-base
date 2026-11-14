# std::experimental::observer_ptr<W>::observer_ptr

|  |  |  |
| --- | --- | --- |
| `constexpr observer_ptr() noexcept; constexpr observer_ptr( nullptr_t ) noexcept;` | (1) | (library fundamentals TS v2) |
| `constexpr explicit observer_ptr( element_type* p ) noexcept;` | (2) | (library fundamentals TS v2) |
| `template< class W2 > constexpr observer_ptr( observer_ptr<W2> other ) noexcept;` | (3) | (library fundamentals TS v2) |
| `observer_ptr( const observer_ptr& other ) = default;` | (4) | (library fundamentals TS v2) (implicitly declared) |
| `observer_ptr( observer_ptr&& other ) = default;` | (5) | (library fundamentals TS v2) (implicitly declared) |

1) Constructs an `observer_ptr` that has no corresponding watched object.

2) Constructs an `observer_ptr` that watches `p`.

3) Constructs an `observer_ptr` that watches `other.get()`. This overload participates in overload resolution only if `W2*` is convertible to `element_type*`.

4,5) Implicitly declared copy and move constructors. Constructs an `observer_ptr` that watches `other.get()`.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | a pointer to an object to watch |
| other | - | another `observer_ptr` to copy from |
