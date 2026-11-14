# operator==,!=,<,<=,>,>=,<=>(std::reverse_iterator)

| Defined in header `<iterator>` |  |  |
| --- | --- | --- |
| `template< class Iter1, class Iter2 > bool operator==( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (1) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator!=( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (2) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator< ( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (3) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator<=( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (4) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator> ( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (5) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator>=( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (6) | (constexpr since C++17) |
| `template< class Iter1, std::three_way_comparable_with<Iter1> Iter2 > constexpr std::compare_three_way_result_t<Iter1, Iter2> operator<=>( const std::reverse_iterator<Iter1>& lhs, const std::reverse_iterator<Iter2>& rhs );` | (7) | (since C++20) |

Compares the underlying iterators of `lhs` and `rhs`.

- The result of equality comparisons are preserved (i.e. equal underlying iterators imply equal reverse iterators).
- The result of relational comparisons are reversed (i.e. a greater underlying iterator implies a lesser reverse iterator).

1) This overload participates in overload resolution only if `lhs.base() == rhs.base()` is well-formed and convertible to `bool`. 2) This overload participates in overload resolution only if `lhs.base() != rhs.base()` is well-formed and convertible to `bool`. 3) This overload participates in overload resolution only if `lhs.base() > rhs.base()` is well-formed and convertible to `bool`. 4) This overload participates in overload resolution only if `lhs.base() >= rhs.base()` is well-formed and convertible to `bool`. 5) This overload participates in overload resolution only if `lhs.base() < rhs.base()` is well-formed and convertible to `bool`. 6) This overload participates in overload resolution only if `lhs.base() <= rhs.base()` is well-formed and convertible to `bool`. (since C++20)

### Parameters

lhs, rhs - iterator adaptors to compare

### Return value

1) `lhs.base() == rhs.base()`

2) `lhs.base() != rhs.base()`

3) `lhs.base() > rhs.base()`

4) `lhs.base() >= rhs.base()`

5) `lhs.base() < rhs.base()`

6) `lhs.base() <= rhs.base()`

7) `rhs.base() <=> lhs.base()`

### Notes

`operator<=>` returns `rhs.base() <=> lhs.base()` rather than `lhs.base() <=> rhs.base()` because this is a reverse iterator.

### Example

```cpp
#include <cassert>
#include <iterator>

int main()
{
    int a[]{0, 1, 2, 3};
    //            ↑  └───── x, y
    //            └──────── z
    // “x” and “y” are equal, but “x” is less than “z” (reversely)
    std::reverse_iterator<int*>
        x{std::rend(a) - std::size(a)},
        y{std::rend(a) - std::size(a)},
        z{std::rbegin(a) + 1};

    // two-way comparisons
    assert(  x == y );
    assert(!(x != y));
    assert(!(x <  y));
    assert(  x <= y );
    assert(!(x == z));
    assert(  x != z );
    assert(  x <  z );
    assert(  x <= z );

    // three-way comparisons
    assert(  x <=> y == 0 );
    assert(!(x <=> y <  0));
    assert(!(x <=> y >  0));
    assert(!(x <=> z == 0));
    assert(  x <=> z <  0 );
    assert(!(x <=> z >  0));
}
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 280 | C++98 | heterogeneous assignment was not allowed | allowed |
