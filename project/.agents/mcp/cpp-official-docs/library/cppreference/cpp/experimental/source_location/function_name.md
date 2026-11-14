# std::experimental::source_location::function_name

`constexpr const char* function_name() const noexcept;` (library fundamentals TS v2)

Returns the name of the function associated with the position represented by this object, if any.

### Parameters

(none)

### Return value

If this object represents a position in a body of a function, returns an implementation-defined null-terminated byte string corresponding to the name of the function.

Otherwise, an empty string is returned.

### Example

The following example shows how it is possible to use the `std::source_location::function_name()` to print a name of a function, constructor, destructor, or overloaded `operator()`.

```cpp
#include <experimental/source_location>
#include <iostream>
#include <string_view>

inline void function_name(
    const std::string_view signature = "()",
    const std::experimental::source_location& location
        = std::experimental::source_location::current())
{
    std::cout
        << location.function_name() // <- name of the caller!
        << signature
        << '\n';
}

void foo() { function_name(); }

struct S {
    S() { function_name(); }
    S(int) { function_name("(int)"); }
    S& operator=(S const&) { function_name("(const S&)"); return *this; }
    S& operator=(S&&) { function_name("(S&&)"); return *this; }
    ~S() { function_name(); }
};

int main()
{
    foo();
    S p;
    S q{42};
    p = q;
    p = std::move(q);
}
```

Possible output:

```text
foo()
S()
S(int)
operator=(const S&)
operator=(S&&)
~S()
~S()
```

### See also

|  |  |
| --- | --- |
| line | return the line number represented by this object (public member function) |
| column | return the column number represented by this object (public member function) |
| file_name | return the file name represented by this object (public member function) |
| C++ documentation for Filename and line information |  |
