# operator+,-(ranges::enumerate_view::*iterator*)

|  |  |  |
| --- | --- | --- |
| `friend constexpr /* iterator */ operator+( const /* iterator */& i, difference_type n ) requires ranges::random_access_range</* Base */>;` | (1) | (since C++23) |
| `friend constexpr /* iterator */ operator+( difference_type n, const /* iterator */& i ) requires ranges::random_access_range</* Base */>;` | (2) | (since C++23) |
| `friend constexpr /* iterator */ operator-( const /* iterator */& i, difference_type n ) requires ranges::random_access_range</* Base */>;` | (3) | (since C++23) |
| `friend constexpr difference_type operator-( const /* iterator */& i, const /* iterator */& j ) noexcept;` | (4) | (since C++23) |

Performs iterator arithmetic or calculates the distance.

`pos_` is the underlying index, and `Base` is the (possibly const-qualified) type of underlying view.

Equivalent to:

1) `auto temp = i; temp += n; return temp;`

2) `return i + n;`

3) `auto temp = i; temp -= n; return temp;`

4) `return i.pos_ - j.pos_;`

These functions are not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `enumerate_view::iterator<Const>` is an associated class of the arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| i, j | - | the iterators |
| n | - | position relative to current location |

### Return value

1,2) An incremented iterator.

3) A decremented iterator.

4) A distance between given iterators.

### Example

This section is incomplete Reason: no example

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3912 | C++23 | overload (4) was not `noexcept` | it is `noexcept` |

### See also

operator++, operator++(int), operator--, operator--(int), operator+=, operator-= advances or decrements the underlying iterator (public member function)
