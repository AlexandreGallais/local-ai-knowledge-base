# std::experimental::source_location::line

`constexpr std::uint_least32_t line() const noexcept;` (library fundamentals TS v2)

Returns the line number represented by this object.

### Parameters

(none)

### Return value

The line number represented by this object.

### Example

```cpp
#include <experimental/source_location>
#include <iostream>
#include <string_view>
using std::experimental::source_location;

inline void cur_line(
    const std::string_view message = "",
    const source_location& location = source_location::current())
{
    std::cout
        << location.line() // <- the call-site line #
        << ") "
        << message;
}

int main()
{
    cur_line("++" "\n");
    cur_line(); std::cout << "Hello," "\n";
    cur_line(); std::cout << "C++20!" "\n";
    cur_line("--" "\n");
}
```

Output:

```text
18) ++
19) Hello,
20) C++20!
21) --
```

### See also

|  |  |
| --- | --- |
| column | return the column number represented by this object (public member function) |
| file_name | return the file name represented by this object (public member function) |
| function_name | return the name of the function represented by this object, if any (public member function) |
| C++ documentation for Filename and line information |  |
