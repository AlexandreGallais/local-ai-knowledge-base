# deduction guides for `std::ranges::iota_view`

| Defined in header `<ranges>` |  |
| --- | --- |
| `template< class W, class Bound > requires (!/*is-integer-like*/<W> \|\| !/*is-integer-like*/<Bound> \|\| /*is-signed-integer-like*/<W> == /*is-signed-integer-like*/<Bound>) iota_view( W, Bound ) -> iota_view<W, Bound>;` | (since C++20) |

This deduction guide is provided for `iota_view` to allow deduction from an initial value and a bounding value.

For the definitions of `/*is-integer-like*/` and `/*is-signed-integer-like*/`, see `is-integer-like` .

Note that the guide protects itself against bugs arising from sign mismatch, like `views::iota(0, v.size())`, where `​0​` is signed and `v.size()` is unsigned.

### Example

```cpp
#include <cassert>
#include <ranges>

int main()
{
    auto io = std::ranges::iota_view(1L, 7L); // deduces W and Bound as “long”
    assert(io.front() == 1L and io.back() == 6L);
}
```
