# std::forward_list<T,Allocator>::begin, std::forward_list<T,Allocator>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin() noexcept;` | (1) | (since C++11) |
| `const_iterator begin() const noexcept;` | (2) | (since C++11) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++11) |

Returns an iterator to the first element of the `forward_list`.

If the `forward_list` is empty, the returned iterator will be equal to `end()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first element.

### Complexity

Constant.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <forward_list>

int main()
{
    std::forward_list<int> nums{1, 2, 4, 8, 16};
    std::forward_list<std::string> fruits{"orange", "apple", "raspberry"};
    std::forward_list<char> empty;

    // Print forward_list.
    std::for_each(nums.begin(), nums.end(), [](const int n) { std::cout << n << ' '; });
    std::cout << '\n';

    // Sums all integers in the forward_list nums (if any), printing only the result.
    std::cout << "Sum of nums: "
              << std::accumulate(nums.begin(), nums.end(), 0) << '\n';

    // Prints the first fruit in the forward_list fruits, checking if there is any.
    if (!fruits.empty())
        std::cout << "First fruit: " << *fruits.begin() << '\n';

    if (empty.begin() == empty.end())
        std::cout << "forward_list 'empty' is indeed empty.\n";
}
```

Output:

```text
1 2 4 8 16
Sum of nums: 31
First fruit: orange
forward_list 'empty' is indeed empty.
```

### See also

|  |  |
| --- | --- |
| end, cend | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
