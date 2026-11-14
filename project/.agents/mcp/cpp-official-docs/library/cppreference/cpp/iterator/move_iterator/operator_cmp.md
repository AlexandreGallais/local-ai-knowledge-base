# operator==,!=,<,<=,>,>=,<=>(std::move_iterator)

| Defined in header `<iterator>` |  |  |
| --- | --- | --- |
| `template< class Iter1, class Iter2 > bool operator==( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (1) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator!=( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (2) | (constexpr since C++17) (until C++20) |
| `template< class Iter1, class Iter2 > bool operator< ( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (3) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator<=( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (4) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator> ( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (5) | (constexpr since C++17) |
| `template< class Iter1, class Iter2 > bool operator>=( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (6) | (constexpr since C++17) |
| `template< class Iter1, std::three_way_comparable_with<Iter1> Iter2 > constexpr std::compare_three_way_result_t<Iter1, Iter2> operator<=>( const std::move_iterator<Iter1>& lhs, const std::move_iterator<Iter2>& rhs );` | (7) | (since C++20) |

Compares the underlying iterators of `lhs` and `rhs`.

1) This overload participates in overload resolution only if `lhs.base() == rhs.base()` is well-formed and convertible to `bool`. 3-6) These overloads participate in overload resolution only if `lhs.base() < rhs.base()` is well-formed and convertible to `bool`. The `!=` operator is synthesized from `operator==`. (since C++20)

### Parameters

lhs, rhs - iterator adaptors to compare

### Return value

1) `lhs.base() == rhs.base()`

2) `!(lhs == rhs)`

3) `lhs.base() < rhs.base()`

4) `!(rhs < lhs)`

5) `rhs < lhs`

6) `!(lhs < rhs)`

7) `lhs.base() <=> rhs.base()`

### Example

```cpp
#include <cassert>
#include <iterator>

int main()
{
    int a[]{9, 8, 7, 6};
    //            │  └───── x, y
    //            └──────── z

    // “x” and “y” are equal, but “x” is greater than “z”
    std::move_iterator<int*>
        x{std::end(a) - 1},
        y{std::end(a) - 1},
        z{std::end(a) - 2};

    // two-way comparisons
    assert(  x == y );
    assert(!(x != y));
    assert(!(x <  y));
    assert(  x <= y );
    assert(!(x == z));
    assert(  x != z );
    assert(!(x <  z));
    assert(!(x <= z));

    // three-way comparisons
    assert(  x <=> y == 0 );
    assert(!(x <=> y <  0));
    assert(!(x <=> y >  0));
    assert(!(x <=> z == 0));
    assert(!(x <=> z <  0));
    assert(  x <=> z >  0 );
}
```

### See also

operator==(std::move_sentinel) (C++20) compares the underlying iterator and the underlying sentinel (function template)
