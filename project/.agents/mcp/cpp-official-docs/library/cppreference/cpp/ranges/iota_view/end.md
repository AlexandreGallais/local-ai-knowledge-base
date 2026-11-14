# std::ranges::iota_view<W, Bound>::end

|  |  |  |
| --- | --- | --- |
| `constexpr auto end() const;` | (1) | (since C++20) |
| `constexpr /*iterator*/ end() const requires std::same_as<W, Bound>;` | (2) | (since C++20) |

1) Obtains a sentinel representing the sentinel value:

- If `Bound` is `std::unreachable_sentinel_t`, returns `std::unreachable_sentinel`.
- Otherwise, returns `sentinel {bound_ }`.

2) Obtains an iterator to the sentinel value.

### Return value

1) As specified above.

2) `iterator {bound_ }`

### Example

```cpp
#include <iostream>
#include <ranges>

int main()
{
    auto iota{std::views::iota(2, 6)};
    auto end{iota.end()};
    for (auto iter{iota.begin()}; iter != end; ++iter)
        std::cout << *iter << ' ';
    std::cout << '\n';
}
```

Output:

```text
2 3 4 5
```
