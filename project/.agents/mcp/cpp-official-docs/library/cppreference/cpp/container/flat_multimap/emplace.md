# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::emplace

`template< class... Args > iterator emplace( Args&&... args );` (since C++23)

Inserts a new element into the container constructed in-place with the given `args`.

Initializes an object `t` of type `std::pair<key_type, mapped_type>` with `std::forward<Args>(args)...`; if the map already contains an element whose key is equivalent to `t.first`, `*this` is unchanged. Otherwise, equivalent to:

```cpp
auto key_it = ranges::upper_bound(c.keys, t.first, compare);
auto value_it = c.values.begin() + std::distance(c.keys.begin(), key_it);
c.keys.insert(key_it, std::move(t.first));
c.values.insert(value_it, std::move(t.second));
```

This overload participates in overload resolution only if `std::is_constructible_v<std::pair<key_type, mapped_type>, Args...>` is `true`.

Careful use of `emplace` allows the new element to be constructed while avoiding unnecessary copy or move operations.

Information on iterator invalidation is copied from here

### Parameters

args - arguments to forward to the constructor of the element

### Return value

An iterator to the inserted element.

### Exceptions

If an exception is thrown for any reason, this function has no effect (strong exception safety guarantee).

### Complexity

Linear in the size of the container

### Example

```cpp
#include <iostream>
#include <string>
#include <utility>
#include <flat_map>

int main()
{
    std::flat_multimap<std::string, std::string> m;

    // uses pair's move constructor
    m.emplace(std::make_pair(std::string("a"), std::string("a")));

    // uses pair's converting move constructor
    m.emplace(std::make_pair("b", "abcd"));

    // uses pair's template constructor
    m.emplace("d", "ddd");

    // emplace with duplicate key
    m.emplace("d", "DDD");

    // uses pair's piecewise constructor
    m.emplace(std::piecewise_construct,
              std::forward_as_tuple("c"),
              std::forward_as_tuple(10, 'c'));

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
d => DDD
```

### See also

|  |  |
| --- | --- |
| emplace_hint | constructs elements in-place using a hint (public member function) |
| try_emplace | inserts in-place if the key does not exist, does nothing if the key exists (public member function) |
| insert | inserts elements (public member function) |
