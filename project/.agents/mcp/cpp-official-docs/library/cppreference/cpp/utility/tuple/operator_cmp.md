# operator==,!=,<,<=,>,>=,<=>(std::tuple)

| Defined in header `<tuple>` |  |  |
| --- | --- | --- |
| `template< class... TTypes, class... UTypes > bool operator==( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (1) | (since C++11) (constexpr since C++14) |
| `template< class... TTypes, class... UTypes > bool operator!=( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (2) | (since C++11) (constexpr since C++14) (until C++20) |
| `template< class... TTypes, class... UTypes > bool operator<( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (3) | (since C++11) (constexpr since C++14) (until C++20) |
| `template< class... TTypes, class... UTypes > bool operator<=( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (4) | (since C++11) (constexpr since C++14) (until C++20) |
| `template< class... TTypes, class... UTypes > bool operator>( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (5) | (since C++11) (constexpr since C++14) (until C++20) |
| `template< class... TTypes, class... UTypes > bool operator>=( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (6) | (since C++11) (constexpr since C++14) (until C++20) |
| `template< class... TTypes, class... UTypes > constexpr std::common_comparison_category_t< synth-three-way-result<TTypes, Elems>...> operator<=>( const std::tuple<TTypes...>& lhs, const std::tuple<UTypes...>& rhs );` | (7) | (since C++20) |
| `template< class... TTypes, tuple-like UTuple > constexpr bool operator==( const tuple<TTypes...>& lhs, const UTuple& rhs );` | (8) | (since C++23) |
| `template< class... TTypes, tuple-like UTuple > constexpr std::common_comparison_category_t< synth-three-way-result<TTypes, /* Elems */>...> operator<=>( const tuple<TTypes...>& lhs, const UTuple& rhs );` | (9) | (since C++23) |

1,2) Compares every element of the tuple `lhs` with the corresponding element of the tuple `rhs` by `operator==`.

1) Returns `true` if all pairs of corresponding elements are equal.

2) Returns `!(lhs == rhs)`.

|  |  |
| --- | --- |
| If `sizeof...(TTypes)` does not equal `sizeof...(UTypes)`, or `std::get<i>(lhs) == std::get<i>(rhs)` is not a valid expression for any `i` in `[``​0​``,``sizeof...(Types)``)`, the program is ill-formed. If the type and value category of `std::get<i>(lhs) == std::get<i>(rhs)` do not meet the BooleanTestable requirements for any `i` in `[``​0​``,``sizeof...(Types)``)`, the behavior is undefined. | (until C++26) |
| This overload participates in overload resolution only if `sizeof...(TTypes)` equals `sizeof...(UTypes)`, `std::get<i>(lhs) == std::get<i>(rhs)` is a valid expression and `decltype(std::get<i>(lhs) == std::get<i>(rhs))` model `boolean-testable` for every `i` in `[``​0​``,``sizeof...(Types)``)`. | (since C++26) |

3-6) Compares `lhs` and `rhs` lexicographically by `operator<`, that is, compares the first elements, if they are equivalent, compares the second elements, if those are equivalent, compares the third elements, and so on.

3) For empty tuples, returns `false`. For non-empty tuples, the effect is equivalent to `if (std::get<0>(lhs) < std::get<0>(rhs)) return true; if (std::get<0>(rhs) < std::get<0>(lhs)) return false; if (std::get<1>(lhs) < std::get<1>(rhs)) return true; if (std::get<1>(rhs) < std::get<1>(lhs)) return false; ... return std::get<N - 1>(lhs) < std::get<N - 1>(rhs);`

4) Returns `!(rhs < lhs)`.

5) Returns `rhs < lhs`.

6) Returns `!(lhs < rhs)`.

If `sizeof...(TTypes)` does not equal `sizeof...(UTypes)`, or any of the comparison expression shown in the equivalent-to statements is not a valid expression, the program is ill-formed.

If the type and value category of any of the comparison expression shown in the equivalent-to statements do not meet the BooleanTestable requirements, the behavior is undefined.

7) Compares `lhs` and `rhs` lexicographically by `synth-three-way`, that is, compares the first elements, if they are equivalent, compares the second elements, if those are equivalent, compares the third elements, and so on.

- For empty tuples, returns `std::strong_ordering::equal`.
- For non-empty tuples, the effect is equivalent to

`if (auto c = synth-three-way(std::get<0>(lhs), std::get<0>(rhs)); c != 0) return c; if (auto c = synth-three-way(std::get<1>(lhs), std::get<1>(rhs)); c != 0) return c; ... return synth-three-way(std::get<N - 1>(lhs), std::get<N - 1>(rhs));`

8) Same as (1), except that `rhs` is a `tuple-like` object, and the number of elements of `rhs` is determined by `std::tuple_size_v<UTuple>` instead. This overload can only be found via argument-dependent lookup.

9) Same as (7), except that `rhs` is a `tuple-like` object. `/* Elems */` denotes the pack of types `std::tuple_element_t<i, UTuple>` for each `i` in `[``​0​``,``std::tuple_size_v<UTuple>``)` in increasing order. This overload can only be found via argument-dependent lookup.

All comparison operators are short-circuited; they do not access tuple elements beyond what is necessary to determine the result of the comparison.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively. (since C++20)

### Parameters

lhs, rhs - tuples to compare

### Return value

1,8) `true` if `std::get<i>(lhs) == std::get<i>(rhs)` for all `i` in `[``​0​``,``sizeof...(Types)``)`, otherwise `false`. For two empty tuples returns `true`.

2) `!(lhs == rhs)`

3) `true` if the first non-equivalent element in `lhs` is less than the one in `rhs`, `false` if the first non-equivalent element in `rhs` is less than the one in `lhs` or there is no non-equivalent element. For two empty tuples, returns `false`.

4) `!(rhs < lhs)`

5) `rhs < lhs`

6) `!(lhs < rhs)`

7,9) The relation between the first pair of non-equivalent elements if there is any, `std::strong_ordering::equal` otherwise. For two empty tuples, returns `std::strong_ordering::equal`.

### Notes

|  |  |
| --- | --- |
| The relational operators are defined in terms of each element's `operator<`. | (until C++20) |
| The relational operators are defined in terms of `synth-three-way`, which uses `operator<=>` if possible, or `operator<` otherwise. Notably, if an element type does not itself provide `operator<=>`, but is implicitly convertible to a three-way comparable type, that conversion will be used instead of `operator<`. | (since C++20) |

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_constrained_equality` | `202403L` | (C++26) | Constrained `operator==` for `std::tuple` |

### Example

Because `operator<` is defined for tuples, containers of tuples can be sorted.

```cpp
#include <algorithm>
#include <iostream>
#include <tuple>
#include <vector>

int main()
{
    std::vector<std::tuple<int, std::string, float>> v
    {
        {2, "baz", -0.1},
        {2, "bar", 3.14},
        {1, "foo", 10.1},
        {2, "baz", -1.1},
    };
    std::sort(v.begin(), v.end());

    for (const auto& p: v)
        std::cout << "{ " << get<0>(p)
                  << ", " << get<1>(p)
                  << ", " << get<2>(p)
                  << " }\n";
}
```

Output:

```text
{ 1, foo, 10.1 }
{ 2, bar, 3.14 }
{ 2, baz, -1.1 }
{ 2, baz, -0.1 }
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2114 (P2167R3) | C++11 | type preconditions for boolean operations were missing | added |

### See also

operator==, operator!=, operator<, operator<=, operator>, operator>=, operator<=> (removed in C++20), (removed in C++20), (removed in C++20), (removed in C++20), (removed in C++20), (C++20) lexicographically compares the values in the `pair` (function template)
