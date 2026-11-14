# std::experimental::basic_string_view<CharT,Traits>::operator[]

`constexpr const_reference operator[](size_type pos) const;` (library fundamentals TS)

Returns a const reference to the character at specified location `pos`.

No bounds checking is performed: the behavior is undefined if `pos >= size()`.

### Parameters

pos - position of the character to return

### Return value

Const reference to the requested character

### Exceptions

Does not throw

### Complexity

Constant.

### Notes

Unlike `std::basic_string::operator[]`, `basic_string_view::operator[](size())` has undefined behavior instead of returning `CharT()`.

### Example

```cpp
#include <iostream>
#include <experimental/string_view>
int main()
{
    std::string str = "Exemplar";
    std::experimental::string_view v = str;
    std::cout << v[2] << '\n';
//  v[2] = 'y'; // Error: cannot modify through a string view
    str[2] = 'y';
    std::cout << v[2] << '\n';
}
```

Output:

```text
e
y
```

### See also

at access specified character with bounds checking (public member function)
