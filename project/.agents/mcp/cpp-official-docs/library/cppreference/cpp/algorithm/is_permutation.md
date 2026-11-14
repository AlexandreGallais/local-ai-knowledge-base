# std::is_permutation

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class ForwardIt1, class ForwardIt2 > bool is_permutation( ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2 );` | (1) | (since C++11) (constexpr since C++20) |
| `template< class ForwardIt1, class ForwardIt2, class BinaryPredicate > bool is_permutation( ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, BinaryPredicate p );` | (2) | (since C++11) (constexpr since C++20) |
| `template< class ForwardIt1, class ForwardIt2 > bool is_permutation( ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, ForwardIt2 last2 );` | (3) | (since C++14) (constexpr since C++20) |
| `template< class ForwardIt1, class ForwardIt2, class BinaryPredicate > bool is_permutation( ForwardIt1 first1, ForwardIt1 last1, ForwardIt2 first2, ForwardIt2 last2, BinaryPredicate p );` | (4) | (since C++14) (constexpr since C++20) |

Checks whether `[``first1``,``last1``)` is a permutation of a range starting from `first2`:

- For overloads (1,2), the second range has `std::distance(first1, last1)` elements.
- For overloads (3,4), the second range is `[``first2``,``last2``)`.

1,3) Elements are compared using `operator==`.

2,4) Elements are compared using the given binary predicate `p`.

If `ForwardIt1` and `ForwardIt2` have different value types, the program is ill-formed.

If the comparison function is not an equivalence relation, the behavior is undefined.

### Parameters

|  |  |  |
| --- | --- | --- |
| first1, last1 | - | the range of elements to compare |
| first2, last2 | - | the second range to compare |
| p | - | binary predicate which returns ​`true` if the elements should be treated as equal. The signature of the predicate function should be equivalent to the following: `bool pred(const Type1 &a, const Type2 &b);` While the signature does not need to have `const &`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1 &` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that objects of types `InputIt1` and `InputIt2` can be dereferenced and then implicitly converted to `Type1` and `Type2` respectively. ​ |
| Type requirements |  |  |
| - `ForwardIt1, ForwardIt2` must meet the requirements of LegacyForwardIterator. |  |  |

### Return value

`true` if the range `[``first1``,``last1``)` is a permutation of the range `[``first2``,``last2``)`, `false` otherwise.

### Complexity

Given \(\scriptsize N\)N as `std::distance(first1, last1)`:

1) Exactly \(\scriptsize N\)N comparisons using `operator==` if the two ranges are equal, otherwise \(\scriptsize O(N^2)\)O(N2 ) comparisons in the worst case.

2) Exactly \(\scriptsize N\)N applications of the predicate `p` if the two ranges are equal, otherwise \(\scriptsize O(N^2)\)O(N2 ) applications in the worst case.

3,4) If `ForwardIt1` and `ForwardIt2` are both LegacyRandomAccessIterator, and `last1 - first1 != last2 - first2` is `true`, no comparison will be made.

Otherwise:

3) Exactly \(\scriptsize N\)N comparisons using `operator==` if the two ranges are equal, otherwise \(\scriptsize O(N^2)\)O(N2 ) comparisons in the worst case.

4) Exactly \(\scriptsize N\)N applications of the predicate `p` if the two ranges are equal, otherwise \(\scriptsize O(N^2)\)O(N2 ) applications in the worst case.

### Possible implementation

`template<class ForwardIt1, class ForwardIt2> bool is_permutation(ForwardIt1 first, ForwardIt1 last, ForwardIt2 d_first) { // skip common prefix std::tie(first, d_first) = std::mismatch(first, last, d_first); // iterate over the rest, counting how many times each element // from [first, last) appears in [d_first, d_last) if (first != last) { ForwardIt2 d_last = std::next(d_first, std::distance(first, last)); for (ForwardIt1 i = first; i != last; ++i) { if (i != std::find(first, i, *i)) continue; // this *i has been checked auto m = std::count(d_first, d_last, *i); if (m == 0 \|\| std::count(i, last, *i) != m) return false; } } return true; }`

### Note

The `std::is_permutation` can be used in *testing*, namely to check the correctness of rearranging algorithms (e.g. sorting, shuffling, partitioning). If `x` is an original range and `y` is a *permuted* range then `std::is_permutation(x, y) == true` means that `y` consist of *"the same"* elements, maybe staying at other positions.

### Example

```cpp
#include <algorithm>
#include <iostream>

template<typename Os, typename V>
Os& operator<<(Os& os, const V& v)
{
    os << "{ ";
    for (const auto& e : v)
        os << e << ' ';
    return os << '}';
}

int main()
{
    static constexpr auto v1 = {1, 2, 3, 4, 5};
    static constexpr auto v2 = {3, 5, 4, 1, 2};
    static constexpr auto v3 = {3, 5, 4, 1, 1};

    std::cout << v2 << " is a permutation of " << v1 << ": " << std::boolalpha
              << std::is_permutation(v1.begin(), v1.end(), v2.begin()) << '\n'
              << v3 << " is a permutation of " << v1 << ": "
              << std::is_permutation(v1.begin(), v1.end(), v3.begin()) << '\n';
}
```

Output:

```text
{ 3 5 4 1 2 } is a permutation of { 1 2 3 4 5 }: true
{ 3 5 4 1 1 } is a permutation of { 1 2 3 4 5 }: false
```

### See also

|  |  |
| --- | --- |
| next_permutation | generates the next greater lexicographic permutation of a range of elements (function template) |
| prev_permutation | generates the next smaller lexicographic permutation of a range of elements (function template) |
| equivalence_relation (C++20) | specifies that a `relation` imposes an equivalence relation (concept) |
| ranges::is_permutation (C++20) | determines if a sequence is a permutation of another sequence (algorithm function object) |
