# std::exception::operator=

|  |  |
| --- | --- |
| `exception& operator=( const exception& other ) throw();` | (until C++11) |
| `exception& operator=( const exception& other ) noexcept;` | (since C++11) (constexpr since C++26) |

Copy assignment operator. Assigns the contents of `other`.

If `*this` and `other` both have dynamic type `std::exception` then `std::strcmp(what(), other.what()) == 0` after assignment.

### Parameters

other - another exception to assign the contents of

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 471 | C++98 | the effects of calling `what()` after assignment are implementation-defined | required to be the same as the original `what()` if the dynamic types are the same |
