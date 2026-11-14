# std::flat_set<Key,Compare,KeyContainer>::value_comp

`std::flat_set::value_compare value_comp() const;` (since C++23)

Returns the function object that compares the values. It is the same as `key_comp`.

### Parameters

(none)

### Return value

The value comparison function object.

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
    std::flat_set<int, ModCmp> cont{1, 2, 3, 4, 5};

    // Same behaviour as key_comp()
    auto comp_func = cont.value_comp();

    for (const int val{100}; const int key : cont)
    {
        const bool before = comp_func(key, val);
        const bool after = comp_func(val, key);

        std::cout << "Key (" << key << ") ";
        if (!before && !after)
            std::cout << "equivalent to key (" << val << ")\n";
        else if (before)
            std::cout << "goes before key (" << val << ")\n";
        else if (after)
            std::cout << "goes after key (" << val << ")\n";
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

key_comp returns the function that compares keys (public member function)
