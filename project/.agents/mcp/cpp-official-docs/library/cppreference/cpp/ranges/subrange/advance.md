# std::ranges::subrange<I,S,K>::advance

`constexpr subrange& advance( std::iter_difference_t<I> n );` (since C++20)

Increments or decrements `begin_` :

- If `I` models `bidirectional_iterator` and `n < 0` is `true`, decrements `begin_` by `-n` elements.

Equivalent to: `ranges::advance(begin_ , n); if constexpr (StoreSize ) size_ += to-unsigned-like (-n); return *this;`.

- Otherwise, increments `begin_` by `n` elements, or until `end_` is reached.

Equivalent to: `auto d = n - ranges::advance(begin_ , n, end_ ); if constexpr (StoreSize ) size_ -= to-unsigned-like (d); return *this;`.

According to the preconditions of `ranges::advance`, if `n < 0` is `true` and `begin_` cannot be decremented by `-n` elements, the behavior is undefined.

### Parameters

n - number of maximal increments of the iterator

### Return value

`*this`

### Example

```cpp
#include <algorithm>
#include <array>
#include <iostream>
#include <iterator>
#include <ranges>

void print(auto name, auto const sub)
{
    std::cout << name << ".size() == " << sub.size() << "; { ";
    std::ranges::for_each(sub, [](int x) { std::cout << x << ' '; });
    std::cout << "}\n";
};

int main()
{
    std::array arr{1, 2, 3, 4, 5, 6, 7};
    std::ranges::subrange sub{std::next(arr.begin()), std::prev(arr.end())};
    print("1) sub", sub);
    print("2) sub", sub.advance(3));
    print("3) sub", sub.advance(-2));
}
```

Output:

```text
1) sub.size() == 5; { 2 3 4 5 6 }
2) sub.size() == 2; { 5 6 }
3) sub.size() == 4; { 3 4 5 6 }
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3433 | C++20 | the behavior was undefined if `n < 0` | made well-defined if `begin_` can be decremented |

### See also

|  |  |
| --- | --- |
| next | obtains a copy of the `subrange` with its iterator advanced by a given distance (public member function) |
| prev | obtains a copy of the `subrange` with its iterator decremented by a given distance (public member function) |
| advance | advances an iterator by given distance (function template) |
| ranges::advance (C++20) | advances an iterator by given distance or to a given bound (algorithm function object) |
