# std::inplace_vector<T,N>::assign

|  |  |  |
| --- | --- | --- |
| `constexpr void assign( size_type count, const T& value );` | (1) | (since C++26) |
| `template< class InputIt > constexpr void assign( InputIt first, InputIt last );` | (2) | (since C++26) |
| `constexpr void assign( std::initializer_list<T> ilist );` | (3) | (since C++26) |

Replaces the contents of the container.

1) Replaces the contents with `count` copies of value `value`.

2) Replaces the contents with copies of those in the range `[``first``,``last``)`.

If either argument is an iterator into `*this`, the behavior is undefined. This overload participates in overload resolution only if `InputIt` satisfies LegacyInputIterator.

3) Replaces the contents with the elements from `ilist`.

This section is incomplete

### Parameters

|  |  |  |
| --- | --- | --- |
| count | - | the new size of the container |
| value | - | the value to initialize elements of the container with |
| first, last | - | the range to copy the elements from |
| ilist | - | `std::initializer_list` to copy the values from |

### Complexity

1) Linear in `count`.

2) Linear in distance between `first` and `last`.

3) Linear in `ilist.size()`.

### Exceptions

1) `std::bad_alloc`, if `count > capacity()`.

2) `std::bad_alloc`, if `std::ranges::distance(first, last) > capacity()`.

3) `std::bad_alloc`, if `ilist.size() > capacity()`.

1-3) Any exception thrown by initialization of inserted elements.

### Example

The following code uses `assign` to add several characters to a `std::inplace_vector<char, 5>`:

```cpp
#include <inplace_vector>
#include <iterator>
#include <new>
#include <print>

int main()
{
    std::inplace_vector<char, 5> chars;

    chars.assign(4, 'a'); // overload (1)
    std::println("{}", chars);

    const char extra[3]{'a', 'b', 'c'};
    chars.assign(std::cbegin(extra), std::cend(extra)); // overload (2)
    std::println("{}", chars);

    chars.assign({'C', '+', '+', '2', '6'}); // overload (3)
    std::println("{}", chars);

    try
    {
        chars.assign(8, 'x'); // throws: count > chars.capacity()
    }
    catch(const std::bad_alloc&) { std::println("std::bad_alloc #1"); }

    try
    {
        const char bad[8]{'?'}; // ranges::distance(bad) > chars.capacity()
        chars.assign(std::cbegin(bad), std::cend(bad)); // throws
    }
    catch(const std::bad_alloc&) { std::println("std::bad_alloc #2"); }

    try
    {
        const auto l = {'1', '2', '3', '4', '5', '6'};
        chars.assign(l); // throws: l.size() > chars.capacity()
    }
    catch(const std::bad_alloc&) { std::println("std::bad_alloc #3"); }
}
```

Output:

```text
['a', 'a', 'a', 'a']
['a', 'b', 'c']
['C', '+', '+', '2', '6']
std::bad_alloc #1
std::bad_alloc #2
std::bad_alloc #3
```

### See also

|  |  |
| --- | --- |
| assign_range | assigns a range of values to the container (public member function) |
| operator= | assigns values to the container (public member function) |
