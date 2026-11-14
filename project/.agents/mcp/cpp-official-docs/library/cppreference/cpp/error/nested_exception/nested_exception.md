# std::nested_exception::nested_exception

|  |  |  |
| --- | --- | --- |
| `nested_exception() noexcept;` | (1) | (since C++11) (constexpr since C++26) |
| `nested_exception( const nested_exception& other ) noexcept = default;` | (2) | (since C++11) (constexpr since C++26) |

Constructs new `nested_exception` object.

1) Default constructor. Stores an exception object obtained by calling `std::current_exception()` within the new `nested_exception` object.

2) Copy constructor. Initializes the object with the exception stored in `other`.

### Parameters

other - nested exception to initialize the contents with
