# std::minmax

| Defined in header `<algorithm>` |  |  |
| --- | --- | --- |
| `template< class T > std::pair<const T&, const T&> minmax( const T& a, const T& b );` | (1) | (since C++11) (constexpr since C++14) |
| `template< class T, class Compare > std::pair<const T&, const T&> minmax( const T& a, const T& b, Compare comp );` | (2) | (since C++11) (constexpr since C++14) |
| `template< class T > std::pair<T, T> minmax( std::initializer_list<T> ilist );` | (3) | (since C++11) (constexpr since C++14) |
| `template< class T, class Compare > std::pair<T, T> minmax( std::initializer_list<T> ilist, Compare comp );` | (4) | (since C++11) (constexpr since C++14) |

Returns the lowest and the greatest of the given values.

1,2) Returns references to the smaller and the greater of `a` and `b`.

1) Uses `operator<` to compare the values.

If `T` is not LessThanComparable, the behavior is undefined.

2) Use the comparison function `comp` to compare the values.

3,4) Returns the smallest and the greatest of the values in initializer list `ilist`.

If `ilist.size()` is zero, or `T` is not CopyConstructible, the behavior is undefined.

3) Uses `operator<` to compare the values.

If `T` is not LessThanComparable, the behavior is undefined.

4) Use the comparison function `comp` to compare the values.

### Parameters

|  |  |  |
| --- | --- | --- |
| a, b | - | the values to compare |
| ilist | - | initializer list with the values to compare |
| comp | - | comparison function object (i.e. an object that satisfies the requirements of Compare) which returns `true` if the first argument is *less* than the second. The signature of the comparison function should be equivalent to the following: `bool cmp(const Type1& a, const Type2& b);` While the signature does not need to have `const&`, the function must not modify the objects passed to it and must be able to accept all values of type (possibly const) `Type1` and `Type2` regardless of value category (thus, `Type1&` is not allowed, nor is `Type1` unless for `Type1` a move is equivalent to a copy(since C++11)). The types `Type1` and `Type2` must be such that an object of type `T` can be implicitly converted to both of them. |

### Return value

1,2) Returns the result of `std::pair<const T&, const T&>(a, b)` if `a < b` or if `a` is equivalent to `b`. Returns the result of `std::pair<const T&, const T&>(b, a)` if `b < a`.

3,4) A pair with the smallest value in `ilist` as the first element and the greatest as the second. If several elements are equivalent to the smallest, the leftmost such element is returned. If several elements are equivalent to the largest, the rightmost such element is returned.

### Complexity

1) Exactly one comparison using `operator<`.

2) Exactly one application of the comparison function `comp`.

3,4) Given \(\scriptsize N\)N as `ilist.size()`:

3) At most \(\scriptsize \frac{3N}{2}\) 3N 2 comparisons using `operator<`.

4) At most \(\scriptsize \frac{3N}{2}\) 3N 2 applications of the comparison function `comp`.

### Possible implementation

minmax (1)

`template<class T> constexpr std::pair<const T&, const T&> minmax(const T& a, const T& b) { return (b < a) ? std::pair<const T&, const T&>(b, a) : std::pair<const T&, const T&>(a, b); }`

minmax (2)

`template<class T, class Compare> constexpr std::pair<const T&, const T&> minmax(const T& a, const T& b, Compare comp) { return comp(b, a) ? std::pair<const T&, const T&>(b, a) : std::pair<const T&, const T&>(a, b); }`

minmax (3)

`template<class T> constexpr std::pair<T, T> minmax(std::initializer_list<T> ilist) { auto p = std::minmax_element(ilist.begin(), ilist.end()); return std::pair(*p.first, *p.second); }`

minmax (4)

`template<class T, class Compare> constexpr std::pair<T, T> minmax(std::initializer_list<T> ilist, Compare comp) { auto p = std::minmax_element(ilist.begin(), ilist.end(), comp); return std::pair(*p.first, *p.second); }`

### Notes

For overloads (1,2), if one of the parameters is a temporary, the reference returned becomes a dangling reference at the end of the full expression that contains the call to `minmax`:

```cpp
int n = 1;
auto p = std::minmax(n, n + 1);
int m = p.first; // ok
int x = p.second; // undefined behavior

// Note that structured bindings have the same issue
auto [mm, xx] = std::minmax(n, n + 1);
xx; // undefined behavior
```

### Example

```cpp
#include <algorithm>
#include <cstdlib>
#include <ctime>
#include <iostream>
#include <vector>

int main()
{
    std::vector<int> v{3, 1, 4, 1, 5, 9, 2, 6};
    std::srand(std::time(0));
    std::pair<int, int> bounds = std::minmax(std::rand() % v.size(),
                                             std::rand() % v.size());

    std::cout << "v[" << bounds.first << "," << bounds.second << "]: ";
    for (int i = bounds.first; i < bounds.second; ++i)
        std::cout << v[i] << ' ';
    std::cout << '\n';
}
```

Possible output:

```text
v[2,7]: 4 1 5 9 2
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2239 | C++11 | `T` was required to be LessThanComparable for overloads (2,4) | not required |

### See also

|  |  |
| --- | --- |
| min | returns the smaller of the given values (function template) |
| max | returns the greater of the given values (function template) |
| minmax_element (C++11) | returns the smallest and the largest elements in a range (function template) |
| ranges::minmax (C++20) | returns the smaller and larger of two elements (algorithm function object) |
