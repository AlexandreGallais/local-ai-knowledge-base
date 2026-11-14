# std::bad_variant_access

| Defined in header `<variant>` |  |
| --- | --- |
| `class bad_variant_access : public std::exception` | (since C++17) |

`std::bad_variant_access` is the type of the exception thrown in the following situations:

- `std::get(std::variant)` called with an index or type that does not match the currently active alternative.
- `std::visit` called to visit a variant that is `valueless_by_exception`.

`std::variant::visit` called to visit a variant that is `valueless_by_exception`. (since C++26)

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `bad_variant_access` object (public member function) |
| operator= | replaces the `bad_variant_access` object (public member function) |
| what | returns the explanatory string (public member function) |

## std::bad_variant_access::bad_variant_access

|  |  |  |
| --- | --- | --- |
| `bad_variant_access() noexcept;` | (1) | (since C++17) |
| `bad_variant_access( const bad_variant_access& other ) noexcept;` | (2) | (since C++17) |

Constructs a new `bad_variant_access` object with an implementation-defined null-terminated byte string which is accessible through `what()`.

1) Default constructor.

2) Copy constructor. If `*this` and `other` both have dynamic type `std::bad_variant_access` then `std::strcmp(what(), other.what()) == 0`.

### Parameters

other - another exception object to copy

## std::bad_variant_access::operator=

`bad_variant_access& operator=( const bad_variant_access& other ) noexcept;` (since C++17)

Assigns the contents with those of `other`.If `*this` and `other` both have dynamic type `std::bad_variant_access` then `std::strcmp(what(), other.what()) == 0` after assignment.

### Parameters

other - another exception object to assign with

### Return value

`*this`

## std::bad_variant_access::what

`virtual const char* what() const noexcept;` (since C++17)

Returns the explanatory string.

### Return value

Pointer to an implementation-defined null-terminated string with explanatory information. The string is suitable for conversion and display as a `std::wstring`. The pointer is guaranteed to be valid at least until the exception object from which it is obtained is destroyed, or until a non-const member function (e.g. copy assignment operator) on the exception object is called.

The returned string is encoded with the ordinary literal encoding during constant evaluation. (since C++26)

### Notes

Implementations are allowed but not required to override `what()`.

## Inherited from std::exception

### Member functions

|  |  |
| --- | --- |
| (destructor) [virtual] | destroys the exception object (virtual public member function of `std::exception`) |
| what [virtual] | returns an explanatory string (virtual public member function of `std::exception`) |

### Example

```cpp
#include <iostream>
#include <variant>

int main()
{
    std::variant<int, float> v;
    v = 12;
    try
    {
        std::get<float>(v);
    }
    catch (const std::bad_variant_access& e)
    {
        std::cout << e.what() << '\n';
    }
}
```

Possible output:

```text
bad_variant_access
```

### See also

|  |  |
| --- | --- |
| get(std::variant) (C++17) | reads the value of the variant given the index or the type (if the type is unique), throws on error (function template) |
| visit (C++17) | calls the provided functor with the arguments held by one or more `variant`s (function template) |
| visit (C++26) | calls the provided functor with the argument held by the `variant` (public member function) |
