# std::experimental::source_location::column

`constexpr std::uint_least32_t column() const noexcept;` (library fundamentals TS v2)

Returns an implementation-defined value representing some offset from the start of the line represented by this object (i.e., the column number).

### Parameters

(none)

### Return value

An implementation-defined value representing some offset from the start of the line represented by this object (i.e., the column number).

### Example

```cpp
#include <experimental/source_location>
#include <iostream>

template<typename T = std::experimental::source_location>
inline void pos(const T& location = T::current())
{
    std::cout
        << "("
        << location.line()
        << ':'
        << location.column()
        << ") ";
}

int main()
{
    pos(); std::cout << "Proxima\n";
    pos(); std::cout << "Centauri\n";
}
```

Possible output:

```text
(17:5) Proxima
(18:5) Centauri
```

### See also

|  |  |
| --- | --- |
| line | return the line number represented by this object (public member function) |
| file_name | return the file name represented by this object (public member function) |
| function_name | return the name of the function represented by this object, if any (public member function) |
| C++ documentation for Filename and line information |  |
