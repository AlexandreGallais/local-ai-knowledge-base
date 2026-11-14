# std::experimental::static_pointer_cast, std::experimental::dynamic_pointer_cast, std::experimental::const_pointer_cast, std::experimental::reinterpret_pointer_cast

|  |  |  |
| --- | --- | --- |
| `template< class T, class U > std::experimental::shared_ptr<T> static_pointer_cast( const std::experimental::shared_ptr<U>& r ) noexcept;` | (1) | (library fundamentals TS) |
| `template< class T, class U > std::experimental::shared_ptr<T> dynamic_pointer_cast( const std::experimental::shared_ptr<U>& r ) noexcept;` | (2) | (library fundamentals TS) |
| `template< class T, class U > std::experimental::shared_ptr<T> const_pointer_cast( const std::experimental::shared_ptr<U>& r ) noexcept;` | (3) | (library fundamentals TS) |
| `template< class T, class U > std::experimental::shared_ptr<T> reinterpret_pointer_cast( const std::experimental::shared_ptr<U>& r ) noexcept;` | (4) | (library fundamentals TS) |

Creates a new instance of `std::experimental::shared_ptr` whose stored pointer is obtained from `r`'s stored pointer using a cast expression. If `r` is empty, so is the new `shared_ptr` (but its stored pointer is not necessarily null).

Otherwise, the new `shared_ptr` will share ownership with `r`, except that it is empty if the `dynamic_cast` performed by `dynamic_pointer_cast` returns a null pointer.

Let `Y` be `typename std::experimental::shared_ptr<T>::element_type`, then the resulting `std::experimental::shared_ptr`'s stored pointer will be obtained by calling (in respective order):

1) `static_cast<Y*>(r.get())`.

2) `dynamic_cast<Y*>(r.get())` (if the result of the `dynamic_cast` is a null pointer value, the returned `shared_ptr` will be empty).

3) `const_cast<Y*>(r.get())`.

4) `reinterpret_cast<Y*>(r.get())`.

The behavior of these functions is undefined unless the corresponding cast from `U*` to `T*` is well formed:

1) The behavior is undefined unless `static_cast<T*>((U*)nullptr)` is well formed.

2) The behavior is undefined unless `dynamic_cast<T*>((U*)nullptr)` is well formed.

3) The behavior is undefined unless `const_cast<T*>((U*)nullptr)` is well formed.

4) The behavior is undefined unless `reinterpret_cast<T*>((U*)nullptr)` is well formed.

### Parameters

r - the pointer to convert

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| (constructor) | constructs new `shared_ptr` (public member function) |
| static_pointer_cast, dynamic_pointer_cast, const_pointer_cast, reinterpret_pointer_cast (C++17) | applies `static_cast`, `dynamic_cast`, `const_cast`, or `reinterpret_cast` to the stored pointer (function template) |
