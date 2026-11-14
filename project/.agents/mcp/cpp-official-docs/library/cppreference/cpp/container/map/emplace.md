# std::map<Key,T,Compare,Allocator>::emplace

`template< class... Args > std::pair<iterator, bool> emplace( Args&&... args );` (since C++11)

Inserts a new element into the container constructed in-place with the given `args`, if there is no element with the key in the container.

The constructor of the new element (i.e. `std::pair<const Key, T>`) is called with exactly the same arguments as supplied to `emplace`, forwarded via `std::forward<Args>(args)...`. The element may be constructed even if there already is an element with the key in the container, in which case the newly constructed element will be destroyed immediately (see `try_emplace()` if this behavior is undesirable).

Careful use of `emplace` allows the new element to be constructed while avoiding unnecessary copy or move operations.

No iterators or references are invalidated.

### Parameters

args - arguments to forward to the constructor of the element

### Return value

A pair consisting of an iterator to the inserted element (or to the element that prevented the insertion) and a `bool` value set to `true` if and only if the insertion took place.

### Exceptions

If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Complexity

Logarithmic in the size of the container.

### Example

```cpp
#include <iostream>
#include <string>
#include <utility>
#include <map>

int main()
{
    std::map<std::string, std::string> m;

    // uses pair's move constructor
    m.emplace(std::make_pair(std::string("a"), std::string("a")));

    // uses pair's converting move constructor
    m.emplace(std::make_pair("b", "abcd"));

    // uses pair's template constructor
    m.emplace("d", "ddd");

    // emplace with duplicate key has no effect
    m.emplace("d", "DDD");

    // uses pair's piecewise constructor
    m.emplace(std::piecewise_construct,
              std::forward_as_tuple("c"),
              std::forward_as_tuple(10, 'c'));
    // an alternative is: m.try_emplace("c", 10, 'c');

    for (const auto& p : m)
        std::cout << p.first << " => " << p.second << '\n';
}
```

Output:

```text
a => a
b => abcd
c => cccccccccc
d => ddd
```

### See also

|  |  |
| --- | --- |
| emplace_hint (C++11) | constructs elements in-place using a hint (public member function) |
| try_emplace (C++17) | inserts in-place if the key does not exist, does nothing if the key exists (public member function) |
| insert | inserts elements or nodes(since C++17) (public member function) |
