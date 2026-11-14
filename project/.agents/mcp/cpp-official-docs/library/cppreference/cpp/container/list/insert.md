# std::list<T,Allocator>::insert

|  |  |  |
| --- | --- | --- |
| `iterator insert( const_iterator pos, const T& value );` | (1) |  |
| `iterator insert( const_iterator pos, T&& value );` | (2) | (since C++11) |
| `iterator insert( const_iterator pos, size_type count, const T& value );` | (3) |  |
| `template< class InputIt > iterator insert( const_iterator pos, InputIt first, InputIt last );` | (4) |  |
| `iterator insert( const_iterator pos, std::initializer_list<T> ilist );` | (5) | (since C++11) |

Inserts elements at the specified location in the container.

1) Inserts a copy of `value` before `pos`.

2) Inserts `value` before `pos`, possibly using move semantics.

3) Inserts `count` copies of the `value` before `pos`.

4) Inserts elements from range `[``first``,``last``)` before `pos`.

|  |  |
| --- | --- |
| This overload has the same effect as overload (3) if `InputIt` is an integral type. | (until C++11) |
| This overload participates in overload resolution only if `InputIt` qualifies as LegacyInputIterator, to avoid ambiguity with the overload (3). | (since C++11) |

If `first` and `last` are iterators into `*this`, the behavior is undefined.

5) Inserts elements from initializer list `ilist` before `pos`.

No iterators or references are invalidated.

### Parameters

|  |  |  |
| --- | --- | --- |
| pos | - | iterator before which the content will be inserted (`pos` may be the `end()` iterator) |
| value | - | element value to insert |
| count | - | number of elements to insert |
| first, last | - | the range of elements to insert, cannot be iterators into container for which insert is called |
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

1,2) Constant.

3) Linear in `count`.

4) Linear in `std::distance(first, last)`.

5) Linear in `ilist.size()`.

### Exceptions

If an exception is thrown for any reason, these functions have no effect (strong exception safety guarantee).

### Example

```cpp
#include <iostream>
#include <iterator>
#include <string_view>
#include <list>

namespace stq {
void println(std::string_view rem, const std::list<int>& container)
{
    std::cout << rem.substr(0, rem.size() - 2) << '[';
    bool first{true};
    for (const int x : container)
        std::cout << (first ? first = false, "" : ", ") << x;
    std::cout << "]\n";
}
}

int main()
{
    std::list<int> c1(3, 100);
    stq::println("1. {}", c1);

    auto pos = c1.begin();
    pos = c1.insert(pos, 200); // overload (1)
    stq::println("2. {}", c1);

    c1.insert(pos, 2, 300); // overload (3)
    stq::println("3. {}", c1);

    // reset pos to the begin:
    pos = c1.begin();

    std::list<int> c2(2, 400);
    c1.insert(std::next(pos, 2), c2.begin(), c2.end()); // overload (4)
    stq::println("4. {}", c1);

    int arr[] = {501, 502, 503};
    c1.insert(c1.begin(), arr, arr + std::size(arr)); // overload (4)
    stq::println("5. {}", c1);

    c1.insert(c1.end(), {601, 602, 603}); // overload (5)
    stq::println("6. {}", c1);
}
```

Output:

```text
1. [100, 100, 100]
2. [200, 100, 100, 100]
3. [300, 300, 200, 100, 100, 100]
4. [300, 300, 400, 400, 200, 100, 100, 100]
5. [501, 502, 503, 300, 300, 400, 400, 200, 100, 100, 100]
6. [501, 502, 503, 300, 300, 400, 400, 200, 100, 100, 100, 601, 602, 603]
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 149 | C++98 | overloads (3) and (4) returned nothing | returns an iterator |

### See also

|  |  |
| --- | --- |
| emplace (C++11) | constructs element in-place (public member function) |
| push_front | inserts an element to the beginning (public member function) |
| push_back | adds an element to the end (public member function) |
| inserter | creates a `std::insert_iterator` of type inferred from the argument (function template) |
