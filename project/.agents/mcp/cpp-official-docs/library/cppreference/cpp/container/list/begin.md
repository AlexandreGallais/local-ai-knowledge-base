# std::list<T,Allocator>::begin, std::list<T,Allocator>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin();` | (1) | (noexcept since C++11) |
| `const_iterator begin() const;` | (2) | (noexcept since C++11) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++11) |

Returns an iterator to the first element of the `list`.

If the `list` is empty, the returned iterator will be equal to `end()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first element.

### Complexity

Constant.

### Notes

libc++ backports `cbegin()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <list>

int main()
{
    std::list<int> nums{1, 2, 4, 8, 16};
    std::list<std::string> fruits{"orange", "apple", "raspberry"};
    std::list<char> empty;

    // Print list.
    std::for_each(nums.begin(), nums.end(), [](const int n) { std::cout << n << ' '; });
    std::cout << '\n';

    // Sums all integers in the list nums (if any), printing only the result.
    std::cout << "Sum of nums: "
              << std::accumulate(nums.begin(), nums.end(), 0) << '\n';

    // Prints the first fruit in the list fruits, checking if there is any.
    if (!fruits.empty())
        std::cout << "First fruit: " << *fruits.begin() << '\n';

    if (empty.begin() == empty.end())
        std::cout << "list 'empty' is indeed empty.\n";
}
```

Output:

```text
1 2 4 8 16
Sum of nums: 31
First fruit: orange
list 'empty' is indeed empty.
```

### See also

|  |  |
| --- | --- |
| end, cend (C++11) | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
