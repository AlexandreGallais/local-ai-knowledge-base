# std::bad_typeid

Defined in header `<typeinfo>`

`class bad_typeid : public std::exception;`

An exception of this type is thrown when a `typeid` operator is applied to a dereferenced null pointer value of a polymorphic type.

std-bad typeid-inheritance.svg

Inheritance diagram

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `bad_typeid` object (public member function) |
| operator= | replaces the `bad_typeid` object (public member function) |
| what | returns the explanatory string (public member function) |

## std::bad_typeid::bad_typeid

|  |  |  |
| --- | --- | --- |
|  | (1) |  |
| `bad_typeid() throw();` |  | (until C++11) |
| `bad_typeid() noexcept;` |  | (since C++11) |
|  | (2) |  |
| `bad_typeid( const bad_typeid& other ) throw();` |  | (until C++11) |
| `bad_typeid( const bad_typeid& other ) noexcept;` |  | (since C++11) |

Constructs a new `bad_typeid` object with an implementation-defined null-terminated byte string which is accessible through `what()`.

1) Default constructor.

2) Copy constructor. If `*this` and `other` both have dynamic type `std::bad_typeid` then `std::strcmp(what(), other.what()) == 0`.(since C++11)

### Parameters

other - another exception object to copy

## std::bad_typeid::operator=

|  |  |
| --- | --- |
| `bad_typeid& operator=( const bad_typeid& other ) throw();` | (until C++11) |
| `bad_typeid& operator=( const bad_typeid& other ) noexcept;` | (since C++11) |

Assigns the contents with those of `other`. If `*this` and `other` both have dynamic type `std::bad_typeid` then `std::strcmp(what(), other.what()) == 0` after assignment.(since C++11)

### Parameters

other - another exception object to assign with

### Return value

`*this`

## std::bad_typeid::what

|  |  |
| --- | --- |
| `virtual const char* what() const throw();` | (until C++11) |
| `virtual const char* what() const noexcept;` | (since C++11) (constexpr since C++26) |

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

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_constexpr_exceptions` | `202411L` | (C++26) | `constexpr` for exception types |

### Example

```cpp
#include <iostream>
#include <typeinfo>

struct S // The type has to be polymorphic
{
    virtual void f();
};

int main()
{
    S* p = nullptr;
    try
    {
        std::cout << typeid(*p).name() << '\n';
    }
    catch (const std::bad_typeid& e)
    {
        std::cout << e.what() << '\n';
    }
}
```

Possible output:

```text
Attempted a typeid of NULL pointer!
```
