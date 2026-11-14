# std::experimental::where_expression

| Defined in header `<experimental/simd>` |  |
| --- | --- |
| `template< class M, class V > class where_expression;` | (parallelism TS v2) |

The class template `where_expression` abstracts the notion of selected elements of a given lvalue of arithmetic or data-parallel type. Selected elements are the elements of the lvalue (of type `V`) for which the corresponding element of the mask (of type `M`) is true. Operators applied to objects of type `where_expression<M, V>` are applied only to selected elements. All other elements are left unchanged.

Use the `where` function to construct `where_expression` objects.

### Template parameters

|  |  |  |
| --- | --- | --- |
| M | - | The mask type |
| V | - | The value type M applies on |

Valid combinations of `(``M``,``V``)` are:

- `(``simd_mask<T, Abi>``,``simd<T, Abi>``)`,
- `(``simd_mask<T, Abi>``,``simd_mask<T, Abi>``)`,
- `(``bool``,``T``)`.

### Member functions

|  |  |
| --- | --- |
| operator= | assigns to selected positions (public member function) |
| operator+=, operator-=, operator*=, operator/=, operator%=, operator&=, operator\|=, operator^=, operator<<=, operator>>= | compound operators (public member function) |
| operator++, operator-- | increment and decrement operators (public member function) |
| copy_from | loads from address to selected positions (public member function) |

### Example

```cpp
#include <cstddef>
#include <experimental/simd>
#include <iostream>
namespace stdx = std::experimental;

void print(auto const& a)
{
    for (std::size_t i{}; i != std::size(a); ++i)
        std::cout << a[i] << ' ';
    std::cout << '\n';
}

template<class A>
stdx::simd<int, A> my_abs(stdx::simd<int, A> x)
{
    where(x < 0, x) = -x;
    return x;
}

int main()
{
    const stdx::native_simd<int> a([](int i) { return i - 2; });
    print(a);
    const auto b = my_abs(a);
    print(b);
}
```

Possible output:

```text
-2 -1 0 1
2 1 0 1
```
