# std::experimental::bad_any_cast

| Defined in header `<experimental/any>` |  |
| --- | --- |
| `class bad_any_cast : public std::bad_cast;` | (library fundamentals TS) |

Defines a type of object to be thrown by the value-returning forms of `std::experimental::any_cast` on failure.

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `bad_any_cast` object (public member function) |
| operator= | replaces the `bad_any_cast` object (public member function) |
| what | returns the explanatory string (public member function) |

## std::experimental::bad_any_cast::bad_any_cast

|  |  |  |
| --- | --- | --- |
| `bad_any_cast() noexcept;` | (1) | (library fundamentals TS) |
| `bad_any_cast( const bad_any_cast& other ) noexcept;` | (2) | (library fundamentals TS) |

Constructs a new `bad_any_cast` object with an implementation-defined null-terminated byte string which is accessible through `what()`.

1) Default constructor.

2) Copy constructor. If `*this` and `other` both have dynamic type `std::experimental::bad_any_cast` then `std::strcmp(what(), other.what()) == 0`.

### Parameters

other - another exception object to copy

## std::experimental::bad_any_cast::operator=

`bad_any_cast& operator=( const bad_any_cast& other ) noexcept;` (library fundamentals TS)

Assigns the contents with those of `other`.If `*this` and `other` both have dynamic type `std::experimental::bad_any_cast` then `std::strcmp(what(), other.what()) == 0` after assignment.

### Parameters

other - another exception object to assign with

### Return value

`*this`

## std::experimental::bad_any_cast::what

`virtual const char* what() const noexcept;` (library fundamentals TS)

Returns the explanatory string.

### Return value

Pointer to an implementation-defined null-terminated string with explanatory information. The string is suitable for conversion and display as a `std::wstring`. The pointer is guaranteed to be valid at least until the exception object from which it is obtained is destroyed, or until a non-const member function (e.g. copy assignment operator) on the exception object is called.

The returned string is encoded with the ordinary literal encoding during constant evaluation. (since C++26)

### Notes

Implementations are allowed but not required to override `what()`.

## Inherited from std::bad_cast

## Inherited from std::exception

### Member functions

|  |  |
| --- | --- |
| (destructor) [virtual] | destroys the exception object (virtual public member function of `std::exception`) |
| what [virtual] | returns an explanatory string (virtual public member function of `std::exception`) |
