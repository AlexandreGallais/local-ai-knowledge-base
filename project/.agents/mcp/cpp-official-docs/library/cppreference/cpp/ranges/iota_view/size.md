# std::ranges::iota_view<W, Bound>::size

`constexpr auto size() const requires (std::same_as<W, Bound> && /*advanceable*/<W>) \|\| (/*is-integer-like*/<W> && /*is-integer-like*/<Bound>) \|\| std::sized_sentinel_for<Bound, W>;` (since C++20)

Returns the size of the view if the view is bounded.

For the definitions of `/*advanceable*/` and `/*is-integer-like*/`, see `advanceable` and `is-integer-like` respectively.

### Return value

If any of `W` and `Bound` is not a integer-like type, returns `to-unsigned-like (bound_ - value_ )`.

Otherwise, returns `(value_ < 0) ? ( (bound_ < 0) ? to-unsigned-like (-value_ ) - to-unsigned-like (-bound_ ) : to-unsigned-like (bound_ ) + to-unsigned-like (-value_ ) ) : to-unsigned-like (bound_ ) - to-unsigned-like (value_ )`.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    unsigned initial_value{1}, bound{5};
    auto i{std::views::iota(initial_value, bound)};
    assert(i.size() == bound - initial_value and i.size() == 4);

    auto u{std::views::iota(8)};
    // assert(u.size()); // Error: size() is not present since “u” is unbounded
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3610 | C++20 | `size` might reject integer-class types | accept if possible |

### See also

|  |  |
| --- | --- |
| ranges::size (C++20) | returns an integer equal to the size of a range (customization point object) |
| ranges::ssize (C++20) | returns a signed integer equal to the size of a range (customization point object) |
