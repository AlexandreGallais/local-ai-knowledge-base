# std::set<Key,Compare,Allocator>::rend, std::set<Key,Compare,Allocator>::crend

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rend();` | (1) | (noexcept since C++11) |
| `const_reverse_iterator rend() const;` | (2) | (noexcept since C++11) |
| `const_reverse_iterator crend() const noexcept;` | (3) | (since C++11) |

Returns a reverse iterator to the element following the last element of the reversed `set`. It corresponds to the element preceding the first element of the non-reversed `set`. This element acts as a placeholder, attempting to access it results in undefined behavior.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the element following the last element.

### Complexity

Constant.

### Notes

Because both `iterator` and `const_iterator` are constant iterators (and may in fact be the same type), it is not possible to mutate the elements of the container through an iterator returned by any of these member functions.

libc++ backports `crend()` to C++98 mode.

### Example

```cpp
#include <iostream>
#include <set>

int main()
{
    std::set<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};

    for (auto it = rep.crbegin(); it != rep.crend(); ++it)
    {
        for (auto n = *it; n > 0; --n)
            std::cout << "⏼" << ' ';
        std::cout << '\n';
    }
}
```

Output:

```text
⏼ ⏼ ⏼ ⏼
⏼ ⏼ ⏼
⏼ ⏼
⏼
```

### See also

|  |  |
| --- | --- |
| rbegin, crbegin (C++11) | returns a reverse iterator to the beginning (public member function) |
| rend, crend (C++14) | returns a reverse end iterator for a container or array (function template) |
