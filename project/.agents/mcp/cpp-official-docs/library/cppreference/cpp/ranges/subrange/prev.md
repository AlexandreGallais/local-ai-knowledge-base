# std::ranges::subrange<I,S,K>::prev

`constexpr subrange prev( std::iter_difference_t<I> n = 1 ) const requires std::bidirectional_iterator<I>;` (since C++20)

Returns a copy of `*this` whose `begin_` is decremented (or incremented if `n` is negative). The actual decrement (or increment) operation is performed by `advance()`.

Equivalent to:`auto tmp = *this; tmp.advance(-n); return tmp;`.

### Parameters

n - number of decrements of the iterator

### Return value

As described above.

### Notes

The difference between this function and `advance()` is that the latter performs the decrement (or increment) in place.

### Example

```cpp
#include <iterator>
#include <list>
#include <print>
#include <ranges>

int main()
{
    std::list list{1, 2, 3, 4, 5};
    std::ranges::subrange sub{std::next(list.begin(), 2), std::prev(list.end(), 2)};
    std::println("{} {} {}", sub, sub.prev(), sub.prev(2));
}
```

Output:

```text
[3] [2, 3] [1, 2, 3]
```

### See also

|  |  |
| --- | --- |
| next | obtains a copy of the `subrange` with its iterator advanced by a given distance (public member function) |
| advance | advances the iterator by given distance (public member function) |
| prev (C++11) | decrement an iterator (function template) |
| ranges::prev (C++20) | decrement an iterator by a given distance or to a bound (algorithm function object) |
