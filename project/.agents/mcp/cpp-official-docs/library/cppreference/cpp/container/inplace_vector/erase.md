# std::inplace_vector<T,N>::erase

|  |  |  |
| --- | --- | --- |
| `constexpr iterator erase( const_iterator pos );` | (1) | (since C++26) |
| `constexpr iterator erase( const_iterator first, const_iterator last );` | (2) | (since C++26) |

Erases the specified elements from the container.

1) Removes the element at `pos`.

2) Removes the elements in the range `[``first``,``last``)`.

Iterators (including the `end()` iterator) and references to the elements at or after the point of the erase are invalidated.

The iterator `pos` must be valid and dereferenceable. Thus the `end()` iterator (which is valid, but is not dereferenceable) cannot be used as a value for `pos`.

The iterator `first` does not need to be dereferenceable if `first == last`: erasing an empty range is a no-op.

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | iterator to the element to remove |
| first, last | - | range of elements to remove |

### Return value

Iterator following the last removed element.

1) If `pos` refers to the last element, then the `end()` iterator is returned.

2) If `last == end()` prior to removal, then the updated `end()` iterator is returned.

If `[``first``,``last``)` is an empty range, then `last` is returned.

### Exceptions

Does not throw unless an exception is thrown by the assignment operator of `T`.

### Complexity

Linear: the number of calls to the destructor of `T` is the same as the number of elements erased, the assignment operator of `T` is called the number of times equal to the number of elements in the vector after the erased elements.

### Notes

When container elements need to be erased based on a predicate, rather than iterating the container and calling unary `erase`, the iterator range overload is generally used with `std::remove()/std::remove_if()` to minimise the number of moves of the remaining (non-removed) elements, — this is the erase-remove idiom. `std::erase_if()` replaces the erase-remove idiom.

### Example

```cpp
#include <inplace_vector>
#include <print>

int main()
{
    std::inplace_vector<int, 10> v{0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    std::println("{}", v);

    v.erase(v.begin());
    std::println("{}", v);

    v.erase(v.begin() + 2, v.begin() + 5);
    std::println("{}", v);

    // Erase all even numbers
    for (std::inplace_vector<int, 10>::iterator it{v.begin()}; it != v.end();)
        if (*it % 2 == 0)
            it = v.erase(it);
        else
            ++it;
    std::println("{}", v);
}
```

Output:

```text
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
[1, 2, 6, 7, 8, 9]
[1, 7, 9]
```

### See also

|  |  |
| --- | --- |
| erase(std::inplace_vector), erase_if(std::inplace_vector) (C++26) | erases all elements satisfying specific criteria (function template) |
| clear | clears the contents (public member function) |
