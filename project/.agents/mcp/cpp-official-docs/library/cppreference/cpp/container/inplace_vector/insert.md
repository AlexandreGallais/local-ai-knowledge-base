# std::inplace_vector<T,N>::insert

|  |  |  |
| --- | --- | --- |
| `constexpr iterator insert( const_iterator pos, const T& value );` | (1) | (since C++26) |
| `constexpr iterator insert( const_iterator pos, T&& value );` | (2) | (since C++26) |
| `constexpr iterator insert( const_iterator pos, size_type count, const T& value );` | (3) | (since C++26) |
| `template< class InputIt > constexpr iterator insert( const_iterator pos, InputIt first, InputIt last );` | (4) | (since C++26) |
| `constexpr iterator insert( const_iterator pos, std::initializer_list<T> ilist );` | (5) | (since C++26) |

Inserts elements at the specified location in the container.

1) Inserts a copy of `value` before `pos`.

2) Inserts `value` before `pos`, possibly using move semantics.

3) Inserts `count` copies of the `value` before `pos`.

4) Inserts elements from range `[``first``,``last``)` before `pos`. This overload participates in overload resolution only if `InputIt` is LegacyInputIterator (to avoid ambiguity with the overload (3)).

Each iterator in `[``first``,``last``)` is dereferenced once.

If `first` and `last` are iterators into `*this`, the behavior is undefined.

5) Inserts elements from initializer list `ilist` before `pos`. Equivalent to: `insert(pos, ilist.begin(), ilist.end());`.

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | iterator before which the content will be inserted (`pos` may be the `end()` iterator) |
| value | - | element value to insert |
| count | - | number of elements to insert |
| first, last | - | the range of elements to insert |
| ilist | - | `std::initializer_list` to insert the values from |
| Type requirements |  |  |
| - `T` must meet the requirements of CopyInsertable in order to use overload (1). |  |  |
| - `T` must meet the requirements of MoveInsertable in order to use overload (2). |  |  |
| - `T` must meet the requirements of CopyAssignable and CopyInsertable in order to use overload (3). |  |  |
| - `T` must meet the requirements of EmplaceConstructible in order to use overloads (4,5). |  |  |

### Return value

1,2) Iterator pointing to the inserted `value`.

3) Iterator pointing to the first element inserted, or `pos` if `count == 0`.

4) Iterator pointing to the first element inserted, or `pos` if `first == last`.

5) Iterator pointing to the first element inserted, or `pos` if `ilist` is empty.

### Complexity

Linear in the number of elements inserted plus the distance between `pos` and `end()` of the container.

### Exceptions

- Throws `std::bad_alloc` if before invocation `size() == capacity()`. The function has no effects (strong exception safety guarantee).
- Any exception thrown by initialization of inserted element or by any LegacyInputIterator operation. Elements in `[``​0​``,``pos``)` are not modified.

### Example

```cpp
#include <initializer_list>
#include <inplace_vector>
#include <iterator>
#include <new>
#include <print>

int main()
{
    std::inplace_vector<int, 14> v(3, 100);
    std::println("1. {}", v);

    auto pos = v.begin();
    pos = v.insert(pos, 200); // overload (1)
    std::println("2. {}", v);

    v.insert(pos, 2, 300); // overload (3)
    std::println("3. {}", v);

    int arr[] = {501, 502, 503};
    v.insert(v.begin(), arr, arr + std::size(arr)); // overload (4)
    std::println("4. {}", v);

    v.insert(v.end(), {601, 602, 603}); // overload (5)
    std::println("5. {}", v);

    const auto list = {-13, -12, -11};
    try
    {
        v.insert(v.begin(), list); // throws: no space
    }
    catch(const std::bad_alloc&)
    {
        std::println("bad_alloc: v.capacity()={} < v.size()={} + list.size()={}",
                     v.capacity(), v.size(), list.size());
    }
}
```

Output:

```text
1. [100, 100, 100]
2. [200, 100, 100, 100]
3. [300, 300, 200, 100, 100, 100]
4. [501, 502, 503, 300, 300, 200, 100, 100, 100]
5. [501, 502, 503, 300, 300, 200, 100, 100, 100, 601, 602, 603]
bad_alloc: v.capacity()=14 < v.size()=12 + list.size()=3
```

### See also

|  |  |
| --- | --- |
| emplace | constructs element in-place (public member function) |
| insert_range | inserts a range of elements (public member function) |
