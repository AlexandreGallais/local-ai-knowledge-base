# std::experimental::basic_string_view<CharT,Traits>::operator=

`basic_string_view& operator=( const basic_string_view& view ) noexcept = default;` (library fundamentals TS)

Replaces the view with that of `view`.

### Parameters

view - view to copy

### Return value

`*this`

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <experimental/string_view>
int main()
{
    std::experimental::string_view v = "Hello, world";
    v = v.substr(7);
    std::cout << v << '\n';
}
```

Output:

```text
world
```

### See also

(constructor) constructs a `basic_string_view` (public member function)
