# operator==,!=,<,<=,>,>=,<=>(std::forward_list)

| Defined in header `<forward_list>` |  |  |
| --- | --- | --- |
| `template< class T, class Alloc > bool operator==( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (1) | (since C++11) |
| `template< class T, class Alloc > bool operator!=( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (2) | (since C++11) (until C++20) |
| `template< class T, class Alloc > bool operator<( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (3) | (since C++11) (until C++20) |
| `template< class T, class Alloc > bool operator<=( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (4) | (since C++11) (until C++20) |
| `template< class T, class Alloc > bool operator>( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (5) | (since C++11) (until C++20) |
| `template< class T, class Alloc > bool operator>=( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (6) | (since C++11) (until C++20) |
| `template< class T, class Alloc > synth-three-way-result<T> operator<=>( const std::forward_list<T, Alloc>& lhs, const std::forward_list<T, Alloc>& rhs );` | (7) | (since C++20) |

Compares the contents of two `forward_list`s.

1,2) Checks if the contents of `lhs` and `rhs` are equal, that is, they have the same number of elements and each element in `lhs` compares equal with the element in `rhs` at the same position.

3-6) Compares the contents of `lhs` and `rhs` lexicographically. The comparison is performed by a function equivalent to `std::lexicographical_compare`.

7) Compares the contents of `lhs` and `rhs` lexicographically. The comparison is performed as if by calling `std::lexicographical_compare_three_way(lhs.begin(), lhs.end(), rhs.begin(), rhs.end(), synth-three-way)`.

The return type is the return type of `synth-three-way` (i.e., `synth-three-way-result` `<T>`).

If none of the following conditions is satisfied, the behavior is undefined:

- `T` models `three_way_comparable`.
- `<` is defined for values of type (possibly const-qualified) `T`, and `<` is a total ordering relationship.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively. (since C++20)

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | `forward_list`s whose contents to compare |
| - `T` must meet the requirements of EqualityComparable in order to use overloads (1,2). |  |  |
| - `T` must meet the requirements of LessThanComparable in order to use overloads (3-6). The ordering relation must establish total order. |  |  |

### Return value

1) `true` if the contents of the `forward_list`s are equal, `false` otherwise.

2) `true` if the contents of the `forward_list`s are not equal, `false` otherwise.

3) `true` if the contents of the `lhs` are lexicographically *less* than the contents of `rhs`, `false` otherwise.

4) `true` if the contents of the `lhs` are lexicographically *less* than or *equal* to the contents of `rhs`, `false` otherwise.

5) `true` if the contents of the `lhs` are lexicographically *greater* than the contents of `rhs`, `false` otherwise.

6) `true` if the contents of the `lhs` are lexicographically *greater* than or *equal* to the contents of `rhs`, `false` otherwise.

7) The relative order of the first pair of non-equivalent elements in `lhs` and `rhs` if there are such elements, `lhs.size() <=> rhs.size()` otherwise.

### Complexity

Linear in the size of the `forward_list`.

### Notes

|  |  |
| --- | --- |
| The relational operators are defined in terms of the element type's `operator<`. | (until C++20) |
| The relational operators are defined in terms of `synth-three-way`, which uses `operator<=>` if possible, or `operator<` otherwise. Notably, if the element does not itself provide `operator<=>`, but is implicitly convertible to a three-way comparable type, that conversion will be used instead of `operator<`. | (since C++20) |

### Example

```cpp
#include <cassert>
#include <compare>
#include <forward_list>

int main()
{
    const std::forward_list
        a{1, 2, 3},
        b{1, 2, 3},
        c{7, 8, 9, 10};

    assert
    (""
        "Compare equal containers:" &&
        (a != b) == false &&
        (a == b) == true &&
        (a < b) == false &&
        (a <= b) == true &&
        (a > b) == false &&
        (a >= b) == true &&
        (a <=> b) != std::weak_ordering::less &&
        (a <=> b) != std::weak_ordering::greater &&
        (a <=> b) == std::weak_ordering::equivalent &&
        (a <=> b) >= 0 &&
        (a <=> b) <= 0 &&
        (a <=> b) == 0 &&

        "Compare non equal containers:" &&
        (a != c) == true &&
        (a == c) == false &&
        (a < c) == true &&
        (a <= c) == true &&
        (a > c) == false &&
        (a >= c) == false &&
        (a <=> c) == std::weak_ordering::less &&
        (a <=> c) != std::weak_ordering::equivalent &&
        (a <=> c) != std::weak_ordering::greater &&
        (a <=> c) < 0 &&
        (a <=> c) != 0 &&
        (a <=> c) <= 0 &&
    "");
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3431 | C++20 | `operator<=>` did not require `T` to model `three_way_comparable` | requires |
