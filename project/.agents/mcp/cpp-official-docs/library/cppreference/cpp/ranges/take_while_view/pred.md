# std::ranges::take_while_view<V,Pred>::pred

`constexpr const Pred& pred() const;` (since C++20)

Returns a reference to the stored predicate `pred_`.

If `*this` does not store a predicate (e.g. an exception is thrown on the assignment to `*this`, which copy-constructs or move-constructs a `Pred`), the behavior is undefined.

### Parameters

(none)

### Return value

A reference to the stored predicate.

### Example

```cpp
#include <ranges>

int main()
{
    static constexpr int a[]{1, 2, 3, 4, 5};
    constexpr auto v = a | std::views::take_while([](int x){ return x < 4; });
    const auto pred = v.pred();
    static_assert(pred(3));
}
```

### See also

base returns a copy of the underlying (adapted) view (public member function)
