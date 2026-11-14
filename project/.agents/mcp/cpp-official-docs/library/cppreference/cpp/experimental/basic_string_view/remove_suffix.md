# std::experimental::basic_string_view<CharT,Traits>::remove_suffix

`constexpr void remove_suffix( size_type n );` (library fundamentals TS)

Moves the end of the view back by `n` characters.

The behavior is undefined if `n > size()`.

### Parameters

n - number of characters to remove from the end of the view

### Return value

(none)

### Complexity

Constant.

### Example

```cpp
#include <experimental/string_view>
#include <iostream>

int main()
{
    char arr[] = {'a', 'b', 'c', 'd', '\0', '\0', '\0'};
    std::experimental::string_view v(arr, sizeof arr);
    auto trim_pos = v.find('\0');
    if (trim_pos != v.npos)
        v.remove_suffix(v.size() - trim_pos);
    std::cout << "Array: '" << arr << "', size=" << sizeof arr << '\n'
              << "View : '" << v << "', size=" << v.size() << '\n';
}
```

Output:

```text
Array: 'abcd', size=7
View : 'abcd', size=4
```

### See also

remove_prefix shrinks the view by moving its start forward (public member function)
