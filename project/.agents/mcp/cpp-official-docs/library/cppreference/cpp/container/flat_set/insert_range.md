# std::flat_set<Key,Compare,KeyContainer>::insert_range

`template< container-compatible-range<value_type> R > void insert_range( R&& rg );` (since C++23)

Inserts a copy of each element in the range `rg` into underlying container `c` as if by:

```cpp
for (const auto& e : rg)
    c.insert(c.end(), e);
```

Then, sorts the range of newly inserted elements with respect to `compare`. Merges the resulting sorted range and the sorted range of pre-existing elements into a single sorted range. Finally, erases all but the first element from each group of consecutive equivalent elements.

Each iterator in the range `rg` is dereferenced exactly once. The behavior is undefined if `rg` overlaps with the container.

Information on iterator invalidation is copied from here

### Parameters

rg - a container compatible range, that is, an `input_range` whose elements are convertible to `T`

### Return value

(none)

### Complexity

`N + M·log(M)`, where `N` is `size()` before the operation and `M` is `ranges::distance(rg)`.

### Notes

Since `insert_range` performs an in-place merge operation, that may allocate memory.

### Example

```cpp
#include <iostream>
#include <flat_set>

void println(auto, auto const& container)
{
    for (const auto& elem : container)
        std::cout << elem << ' ';
    std::cout << '\n';
}

int main()
{
    auto container = std::flat_set{1, 3, 2, 4};
    const auto rg = {-1, 3, -2};
#ifdef __cpp_lib_containers_ranges
    container.insert_range(rg);
#else
    container.insert(rg.begin(), rg.end());
#endif
    println("{}", container);
}
```

Output:

```text
-2 -1 1 2 3 4
```

### See also

insert inserts elements (public member function)
