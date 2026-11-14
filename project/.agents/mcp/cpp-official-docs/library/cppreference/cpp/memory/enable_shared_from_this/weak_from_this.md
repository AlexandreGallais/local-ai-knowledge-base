# std::enable_shared_from_this<T>::weak_from_this

|  |  |  |
| --- | --- | --- |
| `std::weak_ptr<T> weak_from_this() noexcept;` | (1) | (since C++17) |
| `std::weak_ptr<T const> weak_from_this() const noexcept;` | (2) | (since C++17) |

Returns a `std::weak_ptr<T>` that tracks ownership of `*this` by all existing `std::shared_ptr` that refer to `*this`.

### Return value

`weak_this`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_enable_shared_from_this` | `201603L` | (C++17) | `std::enable_shared_from_this::weak_from_this` |

### Example

This section is incomplete Reason: no example

### See also

shared_ptr (C++11) smart pointer with shared object ownership semantics (class template)
