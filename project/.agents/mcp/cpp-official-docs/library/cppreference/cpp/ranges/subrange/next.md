# std::ranges::subrange<I,S,K>::next

|  |  |  |
| --- | --- | --- |
| `constexpr subrange next( std::iter_difference_t<I> n = 1 ) const& requires std::forward_iterator<I>;` | (1) | (since C++20) |
| `constexpr subrange next( std::iter_difference_t<I> n = 1 ) &&;` | (2) | (since C++20) |

Returns a `subrange` whose `begin_` is incremented (or decremented if `n` is negative). The actual increment (or decrement) operation is performed by `advance()`.

1) Returns a copy of `*this`.

Equivalent to: `auto tmp = *this; tmp.advance(n); return tmp;`.

2) Returns a `subrange` moved from `*this`.

Equivalent to: `advance(n); return std::move(*this);`.

### Parameter

n - number of maximal increments of the iterator

### Return value

As described above.

### Notes

The difference between this function and `advance()` is that the latter performs the increment (or decrement) in place.

### Example

```cpp
#include <array>
#include <iterator>
#include <print>
#include <ranges>

int main()
{
    std::array arr{1, 2, 3, 4, 5, 6, 7};
    std::ranges::subrange sub{std::next(arr.begin(), 2), std::prev(arr.end(), 2)};
    std::println("1) sub: {}", sub);
    std::println("2) sub: {}", sub.next());
    std::println("3) sub: {}", sub.next(2));
}
```

Output:

```text
1) sub: [3, 4, 5]
2) sub: [4, 5]
3) sub: [5]
```

### See also

|  |  |
| --- | --- |
| prev | obtains a copy of the `subrange` with its iterator decremented by a given distance (public member function) |
| advance | advances the iterator by given distance (public member function) |
| next (C++11) | increment an iterator (function template) |
| ranges::next (C++20) | increment an iterator by a given distance or to a bound (algorithm function object) |
