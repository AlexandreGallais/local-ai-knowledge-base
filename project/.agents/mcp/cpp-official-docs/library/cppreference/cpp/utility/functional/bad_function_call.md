# std::bad_function_call

Defined in header `<functional>`

`class bad_function_call;`

`std::bad_function_call` is the type of the exception thrown by `std::function::operator()` if the function wrapper has no target.

std-bad function call-inheritance.svg

Inheritance diagram

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `bad_function_call` object (public member function) |
| operator= | replaces the `bad_function_call` object (public member function) |
| what | returns the explanatory string (public member function) |

## std::bad_function_call::bad_function_call

|  |  |  |
| --- | --- | --- |
| `bad_function_call() noexcept;` | (1) | (since C++11) |
| `bad_function_call( const bad_function_call& other ) noexcept;` | (2) | (since C++11) |

Constructs a new `bad_function_call` object with an implementation-defined null-terminated byte string which is accessible through `what()`.

1) Default constructor.

2) Copy constructor. If `*this` and `other` both have dynamic type `std::bad_function_call` then `std::strcmp(what(), other.what()) == 0`.

### Parameters

other - another exception object to copy

## std::bad_function_call::operator=

`bad_function_call& operator=( const bad_function_call& other ) noexcept;` (since C++11)

Assigns the contents with those of `other`.If `*this` and `other` both have dynamic type `std::bad_function_call` then `std::strcmp(what(), other.what()) == 0` after assignment.

### Parameters

other - another exception object to assign with

### Return value

`*this`

## std::bad_function_call::what

`virtual const char* what() const noexcept;` (since C++11)

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
#include <functional>
#include <iostream>

int main()
{
    std::function<int()> f = nullptr;
    try
    {
        f();
    }
    catch (const std::bad_function_call& e)
    {
        std::cout << e.what() << '\n';
    }
}
```

Possible output:

```text
bad function call
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2233 | C++11 | `what()` always returned the same explanatory string as `std::exception::what()` | returns its own explanatory string |

### See also

function (C++11) copyable wrapper of any copy constructible callable object (class template)
