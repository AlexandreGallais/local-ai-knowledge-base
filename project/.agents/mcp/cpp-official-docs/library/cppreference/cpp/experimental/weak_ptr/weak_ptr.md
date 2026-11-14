# std::experimental::weak_ptr<T>::weak_ptr

|  |  |  |
| --- | --- | --- |
| `constexpr weak_ptr() noexcept;` | (1) | (library fundamentals TS) |
| `weak_ptr( const weak_ptr& r ) noexcept;` | (2) | (library fundamentals TS) |
| `template< class Y > weak_ptr( const weak_ptr<Y>& r ) noexcept;` | (2) | (library fundamentals TS) |
| `template< class Y > weak_ptr( const std::experimental::shared_ptr<Y>& r ) noexcept;` | (2) | (library fundamentals TS) |
| `weak_ptr( weak_ptr&& r ) noexcept;` | (3) | (library fundamentals TS) |
| `template< class Y > weak_ptr( weak_ptr<Y>&& r ) noexcept;` | (3) | (library fundamentals TS) |

Constructs a new `weak_ptr` that potentially shares an object with `r`.

1) Default constructor. Constructs empty `weak_ptr`.

2) Constructs new `weak_ptr` which shares an object managed by `r`. If `r` manages no object, `*this` manages no object too. The templated overloads don't participate in overload resolution unless either `Y*` is implicitly convertible to `T*`, or `Y` is the type "array of `N` `U`" for some type `U` and some number `N`, and `T` is the type "array of unknown bound of (possibly cv-qualified) `U`".

3) Move constructors. Moves a `weak_ptr` instance from `r` into `*this`. After this, `r` is empty and `r.use_count() == 0`. The templated overload doesn't participate in overload resolution unless either `Y*` is implicitly convertible to `T*`, or `Y` is the type "array of `N` `U`" for some type `U` and some number `N`, and `T` is the type "array of unknown bound of (possibly cv-qualified) `U`".

### Parameters

r - a `std::experimental::shared_ptr` or `std::experimental::weak_ptr` that will be viewed by this `std::experimental::weak_ptr`

### Exceptions

`noexcept` specification:

`noexcept`

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| (constructor) | creates a new `weak_ptr` (public member function of `std::weak_ptr<T>`) |
| operator= | assigns the `weak_ptr` (public member function of `std::weak_ptr<T>`) |
