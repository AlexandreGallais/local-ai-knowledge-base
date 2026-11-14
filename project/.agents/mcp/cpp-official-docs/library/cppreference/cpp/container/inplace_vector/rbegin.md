# std::inplace_vector<T,N>::rbegin, std::inplace_vector<T,N>::crbegin

|  |  |  |
| --- | --- | --- |
| `constexpr reverse_iterator rbegin() noexcept;` | (1) | (since C++26) |
| `constexpr const_reverse_iterator rbegin() const noexcept;` | (2) | (since C++26) |
| `constexpr const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++26) |

Returns a reverse iterator to the first element of the reversed `inplace_vector`. It corresponds to the last element of the non-reversed `inplace_vector`. If the `inplace_vector` is empty, the returned iterator is equal to `rend()`.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first element.

### Complexity

Constant.

### Notes

The underlying iterator of the returned reverse iterator is the end iterator. Hence the returned iterator is invalidated if and when the end iterator is invalidated.

### Example

```cpp
#include <algorithm>
#include <inplace_vector>
#include <iostream>
#include <string>
#include <string_view>

void print(const std::string_view s) { std::cout << s << ' '; }

int main()
{
    const std::inplace_vector<std::string_view, 8> data
    {
        "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"
    };
    std::inplace_vector<std::string, 8> arr(8);

    std::copy(data.cbegin(), data.cend(), arr.begin());

    print("Print 'arr' in direct order using [cbegin, cend):\t");
    std::for_each(arr.cbegin(), arr.cend(), print);

    print("\n\nPrint 'arr' in reverse order using [crbegin, crend):\t");
    std::for_each(arr.crbegin(), arr.crend(), print);
}
```

Output:

```text
Print 'arr' in direct order using [cbegin, cend):        ▁ ▂ ▃ ▄ ▅ ▆ ▇ █

Print 'arr' in reverse order using [crbegin, crend):     █ ▇ ▆ ▅ ▄ ▃ ▂ ▁
```

### See also

|  |  |
| --- | --- |
| rend, crend | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
