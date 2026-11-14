# std::erase, std::erase_if(std::basic_string)

| Defined in header `<string>` |  |  |
| --- | --- | --- |
|  | (1) |  |
| `template< class CharT, class Traits, class Alloc, class U > constexpr std::basic_string<CharT, Traits, Alloc>::size_type erase( std::basic_string<CharT, Traits, Alloc>& c, const U& value );` |  | (since C++20) (until C++26) |
| `template< class CharT, class Traits, class Alloc, class U = CharT > constexpr std::basic_string<CharT, Traits, Alloc>::size_type erase( std::basic_string<CharT, Traits, Alloc>& c, const U& value );` |  | (since C++26) |
| `template< class CharT, class Traits, class Alloc, class Pred > constexpr std::basic_string<CharT, Traits, Alloc>::size_type erase_if( std::basic_string<CharT, Traits, Alloc>& c, Pred pred );` | (2) | (since C++20) |

1) Erases all elements that compare equal to `value` from the container. Equivalent to

```cpp
auto it = std::remove(c.begin(), c.end(), value);
auto r = c.end() - it;
c.erase(it, c.end());
return r;
```

2) Erases all elements that satisfy the predicate `pred` from the container. Equivalent to

```cpp
auto it = std::remove_if(c.begin(), c.end(), pred);
auto r = c.end() - it;
c.erase(it, c.end());
return r;
```

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| value | - | value to be removed |
| pred | - | unary predicate which returns ​`true` if the element should be erased. The expression `pred(v)` must be convertible to `bool` for every argument `v` of type (possibly const) `CharT`, regardless of value category, and must not modify `v`. Thus, a parameter type of `CharT&`is not allowed, nor is `CharT` unless for `CharT` a move is equivalent to a copy(since C++11). ​ |

### Return value

The number of erased elements.

### Complexity

Linear.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_algorithm_default_value_type` | `202403` | (C++26) | List-initialization for algorithm (1) |

### Example

```cpp
#include <iomanip>
#include <iostream>
#include <string>

int main()
{
    std::string word{"startling"};
    std::cout << "Initially, word = " << std::quoted(word) << '\n';

    std::erase(word, 'l');
    std::cout << "After erase 'l': " << std::quoted(word) << '\n';

    auto erased = std::erase_if(word, [](char x)
    {
        return x == 'a' or x == 'r' or x == 't';
    });

    std::cout << "After erase all 'a', 'r', and 't': " << std::quoted(word) << '\n';
    std::cout << "Erased symbols count: " << erased << '\n';

#if __cpp_lib_algorithm_default_value_type
    std::erase(word, {'g'});
    std::cout << "After erase {'g'}: " << std::quoted(word) << '\n';
#endif
}
```

Possible output:

```text
Initially, word = "startling"
After erase 'l', word = "starting"
After erase all 'a', 'r', and 't': "sing"
Erased symbols count: 4
After erase {'g'}: "sin"
```

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| ranges::remove, ranges::remove_if (C++20), (C++20) | removes elements satisfying specific criteria (algorithm function object) |
