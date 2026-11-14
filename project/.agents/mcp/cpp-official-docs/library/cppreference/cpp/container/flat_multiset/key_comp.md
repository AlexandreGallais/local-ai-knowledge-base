# std::flat_multiset<Key,Compare,KeyContainer>::key_comp

`key_compare key_comp() const;` (since C++23)

Returns the function object that compares the keys, which is a copy of this container's constructor argument `comp`. It is the same as `value_comp`.

### Parameters

(none)

### Return value

The key comparison function object.

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <flat_set>
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
    std::flat_multiset<int, ModCmp> cont{1, 2, 3, 4, 5};

    auto comp_func = cont.key_comp();

    for (const int key : cont)
    {
        const bool before = comp_func(key, 100);
        const bool after = comp_func(100, key);

        std::cout << '(' << key << ") ";
        if (!before && !after)
            std::cout << "equivalent to key (100)\n";
        else if (before)
            std::cout << "goes before key (100)\n";
        else if (after)
            std::cout << "goes after key (100)\n";
        else
            std::unreachable();
    }
}
```

Output:

```text
Key (1) goes before key (100)
Key (2) goes before key (100)
Key (3) equivalent to key (100)
Key (4) goes after key (100)
Key (5) goes after key (100)
```

### See also

value_comp returns the function that compares keys in objects of type `value_type` (public member function)
