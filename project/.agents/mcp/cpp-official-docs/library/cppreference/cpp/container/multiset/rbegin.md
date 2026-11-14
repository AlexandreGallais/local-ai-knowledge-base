# std::multiset<Key,Compare,Allocator>::rbegin, std::multiset<Key,Compare,Allocator>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin();` | (1) | (noexcept since C++11) |
| `const_reverse_iterator rbegin() const;` | (2) | (noexcept since C++11) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++11) |

Returns a reverse iterator to the first element of the reversed `multiset`. It corresponds to the last element of the non-reversed `multiset`. If the `multiset` is empty, the returned iterator is equal to `rend()`.

range-rbegin-rend.svg

### Parameters

(none)

### Return value

Reverse iterator to the first element.

### Complexity

Constant.

### Notes

Because both `iterator` and `const_iterator` are constant iterators (and may in fact be the same type), it is not possible to mutate the elements of the container through an iterator returned by any of these member functions.

The underlying iterator of the returned reverse iterator is the end iterator. Hence the returned iterator is invalidated if and when the end iterator is invalidated.

libc++ backports `crbegin()` to C++98 mode.

### Example

```cpp
#include <iostream>
#include <set>

int main()
{
    std::multiset<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};

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
⏼ ⏼ ⏼ ⏼
⏼ ⏼ ⏼
⏼ ⏼ ⏼
⏼ ⏼
⏼ ⏼
⏼
⏼
```

### See also

|  |  |
| --- | --- |
| rend, crend (C++11) | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
