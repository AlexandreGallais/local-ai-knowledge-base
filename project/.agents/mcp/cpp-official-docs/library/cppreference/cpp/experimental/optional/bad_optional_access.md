# std::experimental::bad_optional_access

| Defined in header `<experimental/optional>` |  |
| --- | --- |
| `class bad_optional_access;` | (library fundamentals TS) |

Defines a type of object to be thrown by `std::experimental::optional::value` when accessing an optional object that does not contain a value.

std-bad optional access-inheritance.svg

Inheritance diagram

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `bad_optional_access` object (public member function) |
| operator= | replaces the `bad_optional_access` object (public member function) |
| what | returns the explanatory string (public member function) |

## std::experimental::bad_optional_access::bad_optional_access

|  |  |  |
| --- | --- | --- |
| `bad_optional_access() noexcept;` | (1) | (library fundamentals TS) |
| `bad_optional_access( const bad_optional_access& other ) noexcept;` | (2) | (library fundamentals TS) |

Constructs a new `bad_optional_access` object with an implementation-defined null-terminated byte string which is accessible through `what()`.

1) Default constructor.

2) Copy constructor. If `*this` and `other` both have dynamic type `std::experimental::bad_optional_access` then `std::strcmp(what(), other.what()) == 0`.

### Parameters

other - another exception object to copy

## std::experimental::bad_optional_access::operator=

`bad_optional_access& operator=( const bad_optional_access& other ) noexcept;` (library fundamentals TS)

Assigns the contents with those of `other`.If `*this` and `other` both have dynamic type `std::experimental::bad_optional_access` then `std::strcmp(what(), other.what()) == 0` after assignment.

### Parameters

other - another exception object to assign with

### Return value

`*this`

## std::experimental::bad_optional_access::what

`virtual const char* what() const noexcept;` (library fundamentals TS)

Returns the explanatory string.

### Return value

Pointer to an implementation-defined null-terminated string with explanatory information. The string is suitable for conversion and display as a `std::wstring`. The pointer is guaranteed to be valid at least until the exception object from which it is obtained is destroyed, or until a non-const member function (e.g. copy assignment operator) on the exception object is called.

The returned string is encoded with the ordinary literal encoding during constant evaluation. (since C++26)

### Notes

Implementations are allowed but not required to override `what()`.

## Inherited from std::logic_error

## Inherited from std::exception

### Member functions

|  |  |
| --- | --- |
| (destructor) [virtual] | destroys the exception object (virtual public member function of `std::exception`) |
| what [virtual] | returns an explanatory string (virtual public member function of `std::exception`) |
