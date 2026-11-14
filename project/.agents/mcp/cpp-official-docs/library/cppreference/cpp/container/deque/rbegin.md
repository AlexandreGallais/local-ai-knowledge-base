# std::deque<T,Allocator>::rbegin, std::deque<T,Allocator>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin();` | (1) | (noexcept since C++11) |
| `const_reverse_iterator rbegin() const;` | (2) | (noexcept since C++11) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++11) |

Returns a reverse iterator to the first element of the reversed `deque`. It corresponds to the last element of the non-reversed `deque`. If the `deque` is empty, the returned iterator is equal to `rend()`.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first element.

### Complexity

Constant.

### Notes

The underlying iterator of the returned reverse iterator is the end iterator. Hence the returned iterator is invalidated if and when the end iterator is invalidated.

libc++ backports `crbegin()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <string>
#include <deque>

int main()
{
    std::deque<int> nums{1, 2, 4, 8, 16};
    std::deque<std::string> fruits{"orange", "apple", "raspberry"};
    std::deque<char> empty;

    // Print deque.
    std::for_each(nums.rbegin(), nums.rend(), [](const int n) { std::cout << n << ' '; });
    std::cout << '\n';

    // Sums all integers in the deque nums (if any), printing only the result.
    std::cout << "Sum of nums: "
              << std::accumulate(nums.rbegin(), nums.rend(), 0) << '\n';

    // Prints the first fruit in the deque fruits, checking if there is any.
    if (!fruits.empty())
        std::cout << "First fruit: " << *fruits.rbegin() << '\n';

    if (empty.rbegin() == empty.rend())
        std::cout << "deque 'empty' is indeed empty.\n";
}
```

Output:

```text
16 8 4 2 1
Sum of nums: 31
First fruit: raspberry
deque 'empty' is indeed empty.
```

### See also

|  |  |
| --- | --- |
| rend, crend (C++11) | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
