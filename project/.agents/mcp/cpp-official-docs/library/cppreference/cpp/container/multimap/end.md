# std::multimap<Key,T,Compare,Allocator>::end, std::multimap<Key,T,Compare,Allocator>::cend

|  |  |  |
| --- | --- | --- |
| `iterator end();` | (1) | (noexcept since C++11) |
| `const_iterator end() const;` | (2) | (noexcept since C++11) |
| `const_iterator cend() const noexcept;` | (3) | (since C++11) |

Returns an iterator to the element following the last element of the `multimap`.

This element acts as a placeholder; attempting to access it results in undefined behavior.

range-begin-end.svg

### Parameters

(none)

### Return value

Iterator to the element following the last element.

### Complexity

Constant.

### Notes

libc++ backports `cend()` to C++98 mode.

### Example

```cpp
#include <algorithm>
#include <cassert>
#include <cstddef>
#include <iostream>
#include <map>
#include <string>

int main()
{
    auto show_node = [](const auto& node, char ending = '\n')
    {
        std::cout << "{ " << node.first << ", " << node.second << " }" << ending;
    };

    std::multimap<std::size_t, std::string> mmap;
    assert(mmap.begin() == mmap.end());   // OK
    assert(mmap.cbegin() == mmap.cend()); // OK

    mmap.insert({ sizeof(long), "LONG" });
    show_node(*(mmap.cbegin()));
    assert(mmap.begin() != mmap.end());   // OK
    assert(mmap.cbegin() != mmap.cend()); // OK
    mmap.begin()->second = "long";
    show_node(*(mmap.cbegin()));

    mmap.insert({ sizeof(int), "int" });
    show_node(*mmap.cbegin());

    mmap.insert({ sizeof(short), "short" });
    show_node(*mmap.cbegin());

    mmap.insert({ sizeof(char), "char" });
    show_node(*mmap.cbegin());

    mmap.insert({{ sizeof(float), "float" }, { sizeof(double), "double"}});

    std::cout << "mmap = { ";
    std::for_each(mmap.cbegin(), mmap.cend(), [&](const auto& n) { show_node(n, ' '); });
    std::cout << "};\n";
}
```

Possible output:

```text
{ 8, LONG }
{ 8, long }
{ 4, int }
{ 2, short }
{ 1, char }
mmap = { { 1, char } { 2, short } { 4, int } { 4, float } { 8, long } { 8, double } };
```

### See also

|  |  |
| --- | --- |
| begin, cbegin (C++11) | returns an iterator to the beginning (public member function) |
| end, cend (C++11), (C++14) | returns an iterator to the end of a container or array (function template) |
