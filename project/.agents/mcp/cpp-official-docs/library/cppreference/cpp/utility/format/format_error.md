# std::format_error

| Defined in header `<format>` |  |
| --- | --- |
| `class format_error;` | (since C++20) |

Defines the type of exception object thrown to report errors in the formatting library.

std-format error-inheritance.svg

Inheritance diagram

### Member functions

|  |  |
| --- | --- |
| (constructor) | constructs a new `format_error` object with the given message (public member function) |
| operator= | replaces the `format_error` object (public member function) |

## std::format_error::format_error

|  |  |
| --- | --- |
| `format_error( const std::string& what_arg );` | (1) |
| `format_error( const char* what_arg );` | (2) |
| `format_error( const format_error& other ) noexcept;` | (3) |

1) Constructs the exception object with `what_arg` as explanatory string. After construction, `std::strcmp(what(), what_arg.c_str()) == 0`.

2) Constructs the exception object with `what_arg` as explanatory string. After construction, `std::strcmp(what(), what_arg) == 0`.

3) Copy constructor. If `*this` and `other` both have dynamic type `std::format_error` then `std::strcmp(what(), other.what()) == 0`. No exception can be thrown from the copy constructor.

### Parameters

|  |  |  |
| --- | --- | --- |
| what_arg | - | explanatory string |
| other | - | another exception object to copy |

### Exceptions

1,2) May throw `std::bad_alloc`.

### Notes

Because copying `std::format_error` is not permitted to throw exceptions, this message is typically stored internally as a separately-allocated reference-counted string. This is also why there is no constructor taking `std::string&&`: it would have to copy the content anyway.

A derived standard exception class must have a publicly accessible copy constructor. It can be implicitly defined as long as the explanatory strings obtained by `what()` are the same for the original object and the copied object.

## std::format_error::operator=

`format_error& operator=( const format_error& other ) noexcept;`

Assigns the contents with those of `other`. If `*this` and `other` both have dynamic type `std::format_error` then `std::strcmp(what(), other.what()) == 0` after assignment. No exception can be thrown from the copy assignment operator.

### Parameters

other - another exception object to assign with

### Return value

`*this`

### Notes

A derived standard exception class must have a publicly accessible copy assignment operator. It can be implicitly defined as long as the explanatory strings obtained by `what()` are the same for the original object and the copied object.

## Inherited from std::runtime_error

## Inherited from std::exception

### Member functions

|  |  |
| --- | --- |
| (destructor) [virtual] | destroys the exception object (virtual public member function of `std::exception`) |
| what [virtual] | returns an explanatory string (virtual public member function of `std::exception`) |

### Example

```cpp
#include <format>
#include <print>
#include <string_view>
#include <utility>

int main()
{
    try
    {
        auto x13{37};
        auto args{std::make_format_args(x13)};
        std::ignore = std::vformat("{:()}", args); // throws
    }
    catch(const std::format_error& ex)
    {
        std::println("{}", ex.what());
    }
}
```

Possible output:

```text
format error: failed to parse format-spec
```

### See also
