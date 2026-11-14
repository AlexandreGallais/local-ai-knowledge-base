# std::flat_multiset<Key,Compare,KeyContainer>::erase

|  |  |  |
| --- | --- | --- |
| `iterator erase( iterator position );` | (1) | (since C++23) |
| `iterator erase( const_iterator pos );` | (2) | (since C++23) |
| `iterator erase( const_iterator first, const_iterator last );` | (3) | (since C++23) |
| `size_type erase( const Key& key );` | (4) | (since C++23) |
| `template< class K > size_type erase( K&& x );` | (5) | (since C++23) |

Removes specified elements from the container. The order of the remaining equivalent elements is preserved.

1,2) Removes the element at `pos`.

3) Removes the elements in the range `[``first``,``last``)`, which must be a valid range in `*this`.

4) Removes all elements with the key equivalent to `key`.

5) Removes all elements with key that compares *equivalent* to the value `x`. This overload participates in overload resolution only if the qualified-id `Compare::is_transparent` is valid and denotes a type, and neither `iterator` nor `const_iterator` is implicitly convertible from `K`. It allows calling this function without constructing an instance of `Key`.

Information on iterator invalidation is copied from here

The iterator `pos` must be valid and dereferenceable. Thus the `end()` iterator (which is valid, but is not dereferenceable) cannot be used as a value for `pos`.

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | iterator to the element to remove |
| first, last | - | range of elements to remove |
| key | - | key value of the elements to remove |
| x | - | a value of any type that can be transparently compared with a key denoting the elements to remove |

### Return value

1-3) Iterator following the last removed element.

4) Number of elements removed.

5) Number of elements removed.

### Exceptions

1-3) Throws nothing.

4,5) Any exceptions thrown by the `Compare` object.

### Complexity

Depends on underlying container. Typically linear.

This section is incomplete Reason: revision required

### Example

```cpp
#include <flat_set>
#include <iostream>

int main()
{
    std::flat_multiset<int> c = {1, 2, 3, 4, 1, 2, 3, 4};

    auto print = [&c]
    {
        std::cout << "c = { ";
        for (int n : c)
            std::cout << n << ' ';
        std::cout << "}\n";
    };
    print();

    std::cout << "Erase all odd numbers:\n";
    for (auto it = c.begin(); it != c.end();)
    {
        if (*it % 2 != 0)
            it = c.erase(it);
        else
            ++it;
    }
    print();

    std::cout << "Erase 1, erased count: " << c.erase(1) << '\n';
    std::cout << "Erase 2, erased count: " << c.erase(2) << '\n';
    std::cout << "Erase 2, erased count: " << c.erase(2) << '\n';
    print();
}
```

Output:

```text
c = { 1 1 2 2 3 3 4 4 }
Erase all odd numbers:
c = { 2 2 4 4 }
Erase 1, erased count: 0
Erase 2, erased count: 2
Erase 2, erased count: 0
c = { 4 4 }
```

### See also

clear clears the contents (public member function)
