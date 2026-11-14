# std::bad_exception::operator=

|  |  |
| --- | --- |
| `bad_exception& operator=( const bad_exception& other ) throw();` | (until C++11) |
| `bad_exception& operator=( const bad_exception& other ) noexcept;` | (since C++11) (constexpr since C++26) |

Assigns the contents of `other`. If `*this` and `other` both have dynamic type `std::exception` then `std::strcmp(what(), other.what()) == 0` after assignment.(since C++11)

### Parameters

other - another `bad_exception` object to assign

### Return value

`*this`.
