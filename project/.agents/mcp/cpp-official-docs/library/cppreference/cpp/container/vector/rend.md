# std::vector<T,Allocator>::rend, std::vector<T,Allocator>::crend

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rend();` | (1) | (noexcept since C++11) (constexpr since C++20) |
| `const_reverse_iterator rend() const;` | (2) | (noexcept since C++11) (constexpr since C++20) |
| `const_reverse_iterator crend() const noexcept;` | (3) | (since C++11) (constexpr since C++20) |

Returns a reverse iterator to the element following the last element of the reversed `vector`. It corresponds to the element preceding the first element of the non-reversed `vector`. This element acts as a placeholder, attempting to access it results in undefined behavior.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the element following the last element.

### Complexity

Constant.

### Notes

libc++ backports `crend()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

int main()
{
    std::vector<int> nums{1, 2, 4, 8, 16};
    std::vector<std::string> fruits{"orange", "apple", "raspberry"};
    std::vector<char> empty;

    // Print vector.
    std::for_each(nums.rbegin(), nums.rend(), [](const int n) { std::cout << n << ' '; });
    std::cout << '\n';

    // Sums all integers in the vector nums (if any), printing only the result.
    std::cout << "Sum of nums: "
              << std::accumulate(nums.rbegin(), nums.rend(), 0) << '\n';

    // Prints the first fruit in the vector fruits, checking if there is any.
    if (!fruits.empty())
        std::cout << "First fruit: " << *fruits.rbegin() << '\n';

    if (empty.rbegin() == empty.rend())
        std::cout << "vector 'empty' is indeed empty.\n";
}
```

Output:

```text
16 8 4 2 1
Sum of nums: 31
First fruit: raspberry
vector 'empty' is indeed empty.
```

### See also

|  |  |
| --- | --- |
| rbegin, crbegin (C++11) | returns a reverse iterator to the beginning (public member function) |
| rend, crend (C++14) | returns a reverse end iterator for a container or array (function template) |
