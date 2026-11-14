# std::ranges::views::iota, std::ranges::iota_view

| Defined in header `<ranges>` |  |  |
| --- | --- | --- |
| `template< std::weakly_incrementable W, std::semiregular Bound = std::unreachable_sentinel_t > requires /*weakly-equality-comparable-with*/<W, Bound> && std::copyable<W> class iota_view : public ranges::view_interface<iota_view<W, Bound>>` | (1) | (since C++20) |
| `namespace views { inline constexpr /* unspecified */ iota = /* unspecified */; }` | (2) | (since C++20) |
| Call signature |  |  |
| `template< class W > requires /* see below */ constexpr /* see below */ iota( W&& value );` |  | (since C++20) |
| `template< class W, class Bound > requires /* see below */ constexpr /* see below */ iota( W&& value, Bound&& bound );` |  | (since C++20) |

1) A range factory that generates a sequence of elements by repeatedly incrementing an initial value. Can be either bounded or unbounded (infinite).

2) `views::iota(e)` and `views::iota(e, f)` are expression-equivalent to `iota_view<std::decay_t<decltype((e))>>(e)` and `iota_view(e, f)` respectively for any suitable subexpressions `e` and `f`.

### Customization point objects

The name `views::iota` denotes a *customization point object*, which is a const function object of a literal `semiregular` class type. For exposition purposes, the cv-unqualified version of its type is denoted as `__iota_fn`.

All instances of `__iota_fn` are equal. The effects of invoking different instances of type `__iota_fn` on the same arguments are equivalent, regardless of whether the expression denoting the instance is an lvalue or rvalue, and is const-qualified or not (however, a volatile-qualified instance is not required to be invocable). Thus, `views::iota` can be copied freely and its copies can be used interchangeably.

Given a set of types `Args...`, if `std::declval<Args>()...` meet the requirements for arguments to `views::iota` above, `__iota_fn` models

- `std::invocable<__iota_fn, Args...>`,
- `std::invocable<const __iota_fn, Args...>`,
- `std::invocable<__iota_fn&, Args...>`, and
- `std::invocable<const __iota_fn&, Args...>`.

Otherwise, no function call operator of `__iota_fn` participates in overload resolution.

### Data members

| Member | Definition |
| --- | --- |
| `W` `value_` | the beginning value (exposition-only member object*) |
| `Bound` `bound_` | the sentinel value, may be unreachable (exposition-only member object*) |

### Member functions

|  |  |
| --- | --- |
| (constructor) | creates an `iota_view` (public member function) |
| begin | obtains the beginning iterator of an `iota_view` (public member function) |
| end | obtains the sentinel denoting the end of an `iota_view` (public member function) |
| empty | tests whether the `iota_view` is empty (i.e. the iterator and the sentinel compare equal) (public member function) |
| size (optional) | obtains the size of an `iota_view` (only provided if it is bounded) (public member function) |
| Inherited from `std::ranges::view_interface` |  |
| cbegin (C++23) | returns a constant iterator to the beginning of the range. (public member function of `std::ranges::view_interface<D>`) |
| cend (C++23) | returns a sentinel for the constant iterator of the range. (public member function of `std::ranges::view_interface<D>`) |
| operator bool | returns whether the derived view is not empty. Provided if `ranges::empty` is applicable to it. (public member function of `std::ranges::view_interface<D>`) |
| front | returns the first element in the derived view. Provided if it satisfies `forward_range`. (public member function of `std::ranges::view_interface<D>`) |
| back | returns the last element in the derived view. Provided if it satisfies `bidirectional_range` and `common_range`. (public member function of `std::ranges::view_interface<D>`) |
| operator[] | returns the `n`th element in the derived view. Provided if it satisfies `random_access_range`. (public member function of `std::ranges::view_interface<D>`) |

### Deduction guides

### Nested classes

|  |  |
| --- | --- |
| *iterator* | the iterator type (exposition-only member class*) |
| *sentinel* | the sentinel type used when the `iota_view` is bounded and `Bound` and `W` are not the same type (exposition-only member class*) |

### Helper templates

`template< std::weakly_incrementable W, std::semiregular Bound > constexpr bool ranges::enable_borrowed_range<ranges::iota_view<W, Bound>> = true;` (since C++20)

This specialization of `ranges::enable_borrowed_range` makes `iota_view` satisfy `borrowed_range`.

### Example

```cpp
#include <algorithm>
#include <iostream>
#include <ranges>

struct Bound
{
    int bound;
    bool operator==(int x) const { return x == bound; }
};

int main()
{
    for (int i : std::ranges::iota_view{1, 10})
        std::cout << i << ' ';
    std::cout << '\n';

    for (int i : std::views::iota(1, 10))
        std::cout << i << ' ';
    std::cout << '\n';

    for (int i : std::views::iota(1, Bound{10}))
        std::cout << i << ' ';
    std::cout << '\n';

    for (int i : std::views::iota(1) | std::views::take(9))
        std::cout << i << ' ';
    std::cout << '\n';

    std::ranges::for_each(std::views::iota(1, 10),
                          [](int i){ std::cout << i << ' '; });
    std::cout << '\n';
}
```

Output:

```text
1 2 3 4 5 6 7 8 9
1 2 3 4 5 6 7 8 9
1 2 3 4 5 6 7 8 9
1 2 3 4 5 6 7 8 9
1 2 3 4 5 6 7 8 9
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 4096 | C++20 | `views::iota` could copy an `iota_view` as-is | forbidden |
| P2325R3 | C++20 | `iota_view` required that `W` is `semiregular` as `view` required `default_initializable` | only requires that `W` is `copyable` |

### See also

|  |  |
| --- | --- |
| iota (C++11) | fills a range with successive increments of the starting value (function template) |
| ranges::iota (C++23) | fills a range with successive increments of the starting value (algorithm function object) |
| ranges::repeat_view, views::repeat (C++23) | a `view` consisting of a generated sequence by repeatedly producing the same value (class template) (customization point object) |
