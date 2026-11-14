# operator==,<=>(std::inplace_vector)

|  |  |  |
| --- | --- | --- |
| `constexpr friend bool operator==( const std::inplace_vector<T, N>& lhs, const std::inplace_vector<T, N>& rhs );` | (1) | (since C++26) |
| `constexpr friend synth-three-way-result<T> operator<=>( const std::inplace_vector<T, N>& lhs, const std::inplace_vector<T, N>& rhs );` | (2) | (since C++26) |

Compares the contents of two `std::inplace_vector`s.

1) Checks if the contents of `lhs` and `rhs` are equal, that is, they have the same number of elements and each element in `lhs` compares equal with the element in `rhs` at the same position.

2) Compares the contents of `lhs` and `rhs` lexicographically. The comparison is performed as if by calling `std::lexicographical_compare_three_way(lhs.begin(), lhs.end(), rhs.begin(), rhs.end(), synth-three-way);`.

The return type is the return type of `synth-three-way` (i.e., `synth-three-way-result` `<T>`).

At least one of the following conditions must be satisfied:

- `T` models `three_way_comparable`.
- `<` is defined for values of type (possibly const-qualified) `T`, and `<` is a total ordering relationship.

Otherwise, the behavior is undefined.

The `<`, `<=`, `>`, `>=`, and `!=` operators are synthesized from `operator<=>` and `operator==` respectively.

### Parameters

|  |  |  |
| --- | --- | --- |
| lhs, rhs | - | `std::inplace_vector`s whose contents to compare |
| - `T` must meet the requirements of EqualityComparable in order to use overloads (1). |  |  |

### Return value

1) `true` if the contents of the `std::inplace_vector`s are equal, `false` otherwise.

2) The relative order of the first pair of non-equivalent elements in `lhs` and `rhs` if there are such elements, `lhs.size() <=> rhs.size()` otherwise.

### Complexity

1) Constant if `lhs` and `rhs` are of different size, otherwise linear in the size of the `std::inplace_vector`.

2) Linear in the size of the `std::inplace_vector`.

### Notes

The relational operators are defined in terms of `synth-three-way`, which uses `operator<=>` if possible, or `operator<` otherwise.

Notably, if the element does not itself provide `operator<=>`, but is implicitly convertible to a three-way comparable type, that conversion will be used instead of `operator<`.

### Example

```cpp
#include <inplace_vector>

int main()
{
    constexpr std::inplace_vector<int, 4>
        a{1, 2, 3},
        b{1, 2, 3},
        c{7, 8, 9, 10};

    static_assert
    (""
        "Compare equal containers:" &&
        (a != b) == false &&
        (a == b) == true &&
        (a < b) == false &&
        (a <= b) == true &&
        (a > b) == false &&
        (a >= b) == true &&
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
        (a <=> c) < 0 &&
        (a <=> c) != 0 &&
        (a <=> c) <= 0 &&
    "");
}
```
