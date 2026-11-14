# std::allocator<T>::allocator

|  |  |  |
| --- | --- | --- |
|  | (1) |  |
| `allocator() throw();` |  | (until C++11) |
| `allocator() noexcept;` |  | (since C++11) (until C++20) |
| `constexpr allocator() noexcept;` |  | (since C++20) |
|  | (2) |  |
| `allocator( const allocator& other ) throw();` |  | (until C++11) |
| `allocator( const allocator& other ) noexcept;` |  | (since C++11) (until C++20) |
| `constexpr allocator( const allocator& other ) noexcept;` |  | (since C++20) |
|  | (3) |  |
| `template< class U > allocator( const allocator<U>& other ) throw();` |  | (until C++11) |
| `template< class U > allocator( const allocator<U>& other ) noexcept;` |  | (since C++11) (until C++20) |
| `template< class U > constexpr allocator( const allocator<U>& other ) noexcept;` |  | (since C++20) |

Constructs the default allocator. Since the default allocator is stateless, the constructors have no visible effect.

### Parameters

other - another allocator to construct with
