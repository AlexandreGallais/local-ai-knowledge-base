# std::ranges::subrange<I,S,K>::size

`constexpr /*make-unsigned-like-t*/<std::iter_difference_t<I>> size() const requires (K == ranges::subrange_kind::sized);` (since C++20)

Obtains the number of elements in the `subrange`:

- If `StoreSize` is `true`, returns `size_`.
- Otherwise, returns `to-unsigned-like (end_ - begin_ )`.

For the definition of `/*make-unsigned-like-t*/`, see `make-unsigned-like-t` .

### Return value

As described above.

### Example

```cpp
#include <functional>
#include <iostream>
#include <ranges>
#include <utility>

int main()
{
    const auto v = {2, 2, 2, 7, 1, 1, 1, 1, 8, 2, 2, 2, 2, 2};

    // the value type of views::chunk_by is the ranges::subrange

    auto to_pair = [](auto sub) { return std::make_pair(sub[0], sub.size()); };
                                                                 /* ^^^^ */
    auto pairs = v | std::views::chunk_by(std::equal_to{})
                   | std::views::transform(to_pair);

    for (auto x : pairs bitor std::views::keys)
        std::cout << x << ' ';
    std::cout << '\n';
    for (auto x : pairs bitor std::views::values)
        std::cout << x << ' ';
    std::cout << '\n';
}
```

Output:

```text
2 7 1 8 2
3 1 4 1 5
```

### See also

|  |  |
| --- | --- |
| empty | checks whether the `subrange` is empty (public member function) |
| size, ssize (C++17), (C++20) | returns the size of a container or array (function template) |
| ranges::size (C++20) | returns an integer equal to the size of a range (customization point object) |
