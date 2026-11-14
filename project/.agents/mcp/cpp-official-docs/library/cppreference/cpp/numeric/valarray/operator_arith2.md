# std::valarray<T>::operator+=,-=,*=,/=,%=,&=,|=,<<=,>>=

|  |  |
| --- | --- |
| `valarray<T>& operator+=( const valarray<T>& v ); valarray<T>& operator-=( const valarray<T>& v ); valarray<T>& operator*=( const valarray<T>& v ); valarray<T>& operator/=( const valarray<T>& v ); valarray<T>& operator%=( const valarray<T>& v ); valarray<T>& operator&=( const valarray<T>& v ); valarray<T>& operator\|=( const valarray<T>& v ); valarray<T>& operator^=( const valarray<T>& v ); valarray<T>& operator<<=( const valarray<T>& v ); valarray<T>& operator>>=( const valarray<T>& v );` | (1) |
| `valarray<T>& operator+=( const T& val ); valarray<T>& operator-=( const T& val ); valarray<T>& operator*=( const T& val ); valarray<T>& operator/=( const T& val ); valarray<T>& operator%=( const T& val ); valarray<T>& operator&=( const T& val ); valarray<T>& operator\|=( const T& val ); valarray<T>& operator^=( const T& val ); valarray<T>& operator<<=( const T& val ); valarray<T>& operator>>=( const T& val );` | (2) |

Applies compound assignment operators to each element in the numeric array.

1) Each element is assigned value obtained by applying the corresponding operator to the previous value of the element and corresponding element from `v`.

The behavior is undefined if `size() != v.size()`.

The behavior is undefined if any of the values in `v` is computed during the assignment and depends on any of the values in `*this`, that is, the expression on the right side of the assignment refers to a variable in the left side of the assignment.

2) Each element is assigned value obtained by applying the corresponding operator to the previous value of the element and the value of `val`.

### Parameters

|  |  |  |
| --- | --- | --- |
| v | - | another numeric array |
| val | - | a value |

### Return value

`*this`

### Exceptions

May throw implementation-defined exceptions.

### Notes

Each of the operators can only be instantiated if the following requirements are met:

- The indicated operator can be applied to type `T`.
- The result value can be unambiguously converted to `T`.

### Example

```cpp
#include <iostream>
#include <string_view>
#include <type_traits>
#include <valarray>

void o(std::string_view rem, auto const& v, bool nl = false)
{
    if constexpr (std::is_scalar_v<std::decay_t<decltype(v)>>)
        std::cout << rem << " : " << v;
    else
    {
        for (std::cout << rem << " : { "; auto const e : v)
            std::cout << e << ' ';
        std::cout << '}';
    }
    std::cout << (nl ? "\n" : ";  ");
}

int main()
{
    std::valarray<int> x, y;

    o("x", x = {1, 2, 3, 4}), o("y", y = {4, 3, 2, 1}), o("x += y", x += y, 1);
    o("x", x = {4, 3, 2, 1}), o("y", y = {3, 2, 1, 0}), o("x -= y", x -= y, 1);
    o("x", x = {1, 2, 3, 4}), o("y", y = {5, 4, 3, 2}), o("x *= y", x *= y, 1);
    o("x", x = {1, 3, 4, 7}), o("y", y = {1, 1, 3, 5}), o("x &= y", x &= y, 1);
    o("x", x = {0, 1, 2, 4}), o("y", y = {4, 3, 2, 1}), o("x <<=y", x <<=y, 1);

    std::cout << '\n';

    o("x", x = {1, 2, 3, 4}), o("x += 5", x += 5, 1);
    o("x", x = {1, 2, 3, 4}), o("x *= 2", x *= 2, 1);
    o("x", x = {8, 6, 4, 2}), o("x /= 2", x /= 2, 1);
    o("x", x = {8, 4, 2, 1}), o("x >>=1", x >>=1, 1);
}
```

Output:

```text
x : { 1 2 3 4 };  y : { 4 3 2 1 };  x += y : { 5 5 5 5 }
x : { 4 3 2 1 };  y : { 3 2 1 0 };  x -= y : { 1 1 1 1 }
x : { 1 2 3 4 };  y : { 5 4 3 2 };  x *= y : { 5 8 9 8 }
x : { 1 3 4 7 };  y : { 1 1 3 5 };  x &= y : { 1 1 0 5 }
x : { 0 1 2 4 };  y : { 4 3 2 1 };  x <<=y : { 0 8 8 8 }

x : { 1 2 3 4 };  x += 5 : { 6 7 8 9 }
x : { 1 2 3 4 };  x *= 2 : { 2 4 6 8 }
x : { 8 6 4 2 };  x /= 2 : { 4 3 2 1 }
x : { 8 4 2 1 };  x >>=1 : { 4 2 1 0 }
```

### See also

|  |  |
| --- | --- |
| operator+, operator-, operator~, operator! | applies a unary arithmetic operator to each element of the valarray (public member function) |
| operator+, operator-, operator*, operator/, operator%, operator&, operator\|, operator^, operator<<, operator>>, operator&&, operator\|\| | applies binary operators to each element of two valarrays, or a valarray and a value (function template) |
