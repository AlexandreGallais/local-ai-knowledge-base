# std::flat_map<Key,T,Compare,KeyContainer,MappedContainer>::erase

|  |  |  |
| --- | --- | --- |
| `iterator erase( iterator position );` | (1) | (since C++23) |
| `iterator erase( const_iterator pos );` | (2) | (since C++23) |
| `iterator erase( const_iterator first, const_iterator last );` | (3) | (since C++23) |
| `size_type erase( const Key& key );` | (4) | (since C++23) |
| `template< class K > size_type erase( K&& x );` | (5) | (since C++23) |

Removes specified elements from the container.

1,2) Removes the element at `pos`.

3) Removes the elements in the range `[``first``,``last``)`, which must be a valid range in `*this`.

4) Removes the element (if one exists) with the key equivalent to `key`.

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

4) Number of elements removed (0 or 1).

5) Number of elements removed.

### Exceptions

1-3) Throws nothing.

4,5) Any exceptions thrown by the `Compare` object.

### Complexity

Depends on underlying containers. Typically linear.

This section is incomplete Reason: revision required

### Example

```cpp
#include <flat_map>
#include <iostream>

int main()
{
    std::flat_map<int, std::string> c =
    {
        {1, "one"}, {2, "two"}, {3, "three"},
        {4, "four"}, {5, "five"}, {6, "six"}
    };

    // erase all odd numbers from c
    for (auto it = c.begin(); it != c.end();)
    {
        if (it->first % 2 != 0)
            it = c.erase(it);
        else
            ++it;
    }

    for (auto& p : c)
        std::cout << p.second << ' ';
    std::cout << '\n';
}
```

Output:

```text
two four six
```

### See also

clear clears the contents (public member function)
