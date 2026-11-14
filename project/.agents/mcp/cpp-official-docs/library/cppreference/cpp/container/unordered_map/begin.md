# std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::begin, std::unordered_map<Key,T,Hash,KeyEqual,Allocator>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin() noexcept;` | (1) | (since C++11) |
| `const_iterator begin() const noexcept;` | (2) | (since C++11) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++11) |

Returns an iterator to the first element of the `unordered_map`.

If the `unordered_map` is empty, the returned iterator will be equal to `end()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first element.

### Complexity

Constant.

### Example

```cpp
#include <cmath>
#include <iostream>
#include <unordered_map>

struct Node { double x, y; };

int main()
{
    Node nodes[3] = {{1, 0}, {2, 0}, {3, 0}};

    // mag is a map mapping the address of a Node to its magnitude in the plane
    std::unordered_map<Node*, double> mag =
    {
        { nodes + 0, 1 },
        { nodes + 1, 2 },
        { nodes + 2, 3 }
    };

    // Change each y-coordinate from 0 to the magnitude
    for (auto iter = mag.begin(); iter != mag.end(); ++iter)
    {
        auto cur = iter->first; // pointer to Node
        cur->y = mag[cur]; // could also have used cur->y = iter->second;
    }

    // Update and print the magnitude of each node
    for (auto iter = mag.begin(); iter != mag.end(); ++iter)
    {
        auto cur = iter->first;
        mag[cur] = std::hypot(cur->x, cur->y);
        std::cout << "The magnitude of (" << cur->x << ", " << cur->y << ") is ";
        std::cout << iter->second << '\n';
    }

    // Repeat the above with the range-based for loop
    for (auto i : mag)
    {
        auto cur = i.first;
        cur->y = i.second;
        mag[cur] = std::hypot(cur->x, cur->y);
        std::cout << "The magnitude of (" << cur->x << ", " << cur->y << ") is ";
        std::cout << mag[cur] << '\n';
        // Note that in contrast to std::cout << iter->second << '\n'; above,
        // std::cout << i.second << '\n'; will NOT print the updated magnitude
    }
}
```

Possible output:

```text
The magnitude of (3, 3) is 4.24264
The magnitude of (1, 1) is 1.41421
The magnitude of (2, 2) is 2.82843
The magnitude of (3, 4.24264) is 5.19615
The magnitude of (1, 1.41421) is 1.73205
The magnitude of (2, 2.82843) is 3.4641
```

### See also

|  |  |
| --- | --- |
| end, cend | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
