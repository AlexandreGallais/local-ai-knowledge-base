# std::bad_exception::bad_exception

|  |  |  |
| --- | --- | --- |
|  | (1) |  |
| `bad_exception() throw();` |  | (until C++11) |
| `bad_exception() noexcept;` |  | (since C++11) (constexpr since C++26) |
|  | (2) |  |
| `bad_exception( const bad_exception& other ) throw();` |  | (until C++11) |
| `bad_exception( const bad_exception& other ) noexcept;` |  | (since C++11) (constexpr since C++26) |

Constructs new `bad_exception` object.

1) Default constructor. `what()` returns an implementation-defined string.

2) Copy constructor. Initializes the object with the contents of `other`. If `*this` and `other` both have dynamic type `std::bad_exception` then `std::strcmp(what(), other.what()) == 0`(since C++11).

### Parameters

other - `bad_exception` object to initialize with
