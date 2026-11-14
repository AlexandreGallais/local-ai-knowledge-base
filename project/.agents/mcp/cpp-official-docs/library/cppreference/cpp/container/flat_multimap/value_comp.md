# std::flat_multimap<Key,T,Compare,KeyContainer,MappedContainer>::value_comp

`std::flat_multimap::value_compare value_comp() const;` (since C++23)

Returns a function object that compares objects of type `std::flat_multimap::``value_type` (key-value pairs) by using `key_comp` to compare the first components of the pairs.

### Parameters

(none)

### Return value

The value comparison function object.

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <flat_map>
#include <utility>

// Example module 97 key compare function
struct ModCmp
{
    bool operator()(int lhs, int rhs) const
    {
        return (lhs % 97) < (rhs % 97);
    }
};

int main()
{
    std::flat_multimap<int, char, ModCmp> cont;
    cont = {{1, 'a'}, {2, 'b'}, {3, 'c'}, {4, 'd'}, {5, 'e'}};

    auto comp_func = cont.value_comp();

    for (const std::pair<int, char> val = {100, 'a'}; auto it : cont)
    {
        const bool before = comp_func(it, val);
        const bool after = comp_func(val, it);

        std::cout << '(' << it.first << ',' << it.second << ") ";
        if (!before && !after)
            std::cout << "equivalent to key (" << val.first << ")\n";
        else if (before)
            std::cout << "goes before key (" << val.first << ")\n";
        else if (after)
            std::cout << "goes after key (" << val.first << ")\n";
        else
            std::unreachable();
    }
}
```

Output:

```text
(1,a) goes before key (100)
(2,b) goes before key (100)
(3,c) equivalent to key (100)
(4,d) goes after key (100)
(5,e) goes after key (100)
```

### See also

key_comp returns the function that compares keys (public member function)
