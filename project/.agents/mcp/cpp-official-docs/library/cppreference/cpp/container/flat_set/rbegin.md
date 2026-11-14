# std::flat_set<Key,Compare,KeyContainer>::rbegin, std::flat_set<Key,Compare,KeyContainer>::crbegin

|  |  |  |
| --- | --- | --- |
| `reverse_iterator rbegin() noexcept;` | (1) | (since C++23) |
| `const_reverse_iterator rbegin() const noexcept;` | (2) | (since C++23) |
| `const_reverse_iterator crbegin() const noexcept;` | (3) | (since C++23) |

Returns a reverse iterator to the first element of the reversed `flat_set`. It corresponds to the last element of the non-reversed `flat_set`. If the `flat_set` is empty, the returned iterator is equal to `rend()`.

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

### Example

```cpp
#include <iostream>
#include <flat_set>

int main()
{
    std::flat_set<unsigned> rep{1, 2, 3, 4, 1, 2, 3, 4};

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
| rend, crend | returns a reverse iterator to the end (public member function) |
| rbegin, crbegin (C++14) | returns a reverse iterator to the beginning of a container or array (function template) |
