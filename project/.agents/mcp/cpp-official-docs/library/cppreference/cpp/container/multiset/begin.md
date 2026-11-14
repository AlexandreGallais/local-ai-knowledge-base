# std::multiset<Key,Compare,Allocator>::begin, std::multiset<Key,Compare,Allocator>::cbegin

|  |  |  |
| --- | --- | --- |
| `iterator begin();` | (1) | (noexcept since C++11) |
| `const_iterator begin() const;` | (2) | (noexcept since C++11) |
| `const_iterator cbegin() const noexcept;` | (3) | (since C++11) |

Returns an iterator to the first element of the `multiset`.

If the `multiset` is empty, the returned iterator will be equal to `end()`.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the first element.

### Complexity

Constant.

### Notes

Because both `iterator` and `const_iterator` are constant iterators (and may in fact be the same type), it is not possible to mutate the elements of the container through an iterator returned by any of these member functions.

libc++ backports `cbegin()` to C++98 mode.

### Example

```cpp
#include <iostream>
#include <iterator>
#include <set>
#include <string>

int main()
{
    const std::multiset<std::string> words =
    {
        "some", "not", "sorted", "words",
        "will", "come", "out", "sorted",
    };

    for (auto it = words.begin(); it != words.end(); )
    {
        auto count = words.count(*it);
        std::cout << *it << ":\t" << count << '\n';
        std::advance(it, count); // all count elements have equivalent keys
    }
}
```

Output:

```text
come:	1
not:	1
out:	1
some:	1
sorted:	2
will:	1
words:	1
```

### See also

|  |  |
| --- | --- |
| end, cend (C++11) | returns an iterator to the end (public member function) |
| begin, cbegin (C++11), (C++14) | returns an iterator to the beginning of a container or array (function template) |
