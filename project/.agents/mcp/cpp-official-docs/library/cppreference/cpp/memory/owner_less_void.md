# std::owner_less

| Defined in header `<memory>` |  |
| --- | --- |
| `template<> struct owner_less<void>;` | (since C++17) |

`std::owner_less<void>` is a specialization of `std::owner_less` with parameter types deduced.

### Nested types

| Nested type | Definition |
| --- | --- |
| `is_transparent` | unspecified |

### Member functions

**operator()** compares its arguments using owner-based semantics (function)

## std::owner_less<void>::operator()

|  |  |
| --- | --- |
| `template< class T, class U > bool operator()( const std::shared_ptr<T>& lhs, const std::shared_ptr<U>& rhs ) const noexcept;` | (since C++17) |
| `template< class T, class U > bool operator()( const std::shared_ptr<T>& lhs, const std::weak_ptr<U>& rhs ) const noexcept;` | (since C++17) |
| `template< class T, class U > bool operator()( const std::weak_ptr<T>& lhs, const std::shared_ptr<U>& rhs ) const noexcept;` | (since C++17) |
| `template< class T, class U > bool operator()( const std::weak_ptr<T>& lhs, const std::weak_ptr<U>& rhs ) const noexcept;` | (since C++17) |

Compares `lhs` and `rhs` using owner-based semantics. Effectively calls `lhs.owner_before(rhs)`.

The ordering is strict weak ordering relation.

`lhs` and `rhs` are equivalent only if they are both empty or share ownership.

### Parameters

lhs, rhs - shared-ownership pointers to compare

### Return value

`true` if `lhs` is *less than* `rhs` as determined by the owner-based ordering.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_transparent_operators` | `201510L` | (C++17) | Transparent `std::owner_less` (`std::owner_less<void>`) |

### See also

|  |  |
| --- | --- |
| owner_before | provides owner-based ordering of shared pointers (public member function of `std::shared_ptr<T>`) |
| owner_before | provides owner-based ordering of weak pointers (public member function of `std::weak_ptr<T>`) |
