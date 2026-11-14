# std::reverse_iterator<Iter>::operator*,->

|  |  |  |
| --- | --- | --- |
| `reference operator*() const;` | (1) | (constexpr since C++17) |
|  | (2) |  |
| `pointer operator->() const;` |  | (constexpr since C++17) (until C++20) |
| `constexpr pointer operator->() const requires (std::is_pointer_v<Iter> \|\| requires (const Iter i) { i.operator->(); });` |  | (since C++20) |

Returns a reference or pointer to the element previous to `current`.

| Member function | Equivalent to |
| --- | --- |
| `operator*` | `Iter tmp = current; return *--tmp;` |
| `operator->` | `return &(operator*());` (until C++11) `return std::addressof(operator*());` (since C++11) (until C++20) `return current - 1;` if `Iter` is a pointer type `return std::prev(current).operator->();` otherwise (since C++20) |

### Return value

As described above.

### Example

```cpp
#include <complex>
#include <iostream>
#include <iterator>
#include <vector>

int main()
{
    using RI0 = std::reverse_iterator<int*>;
    int a[]{0, 1, 2, 3};
    RI0 r0{std::rbegin(a)};
    std::cout << "*r0 = " << *r0 << '\n';
    *r0 = 42;
    std::cout << "a[3] = " << a[3] << '\n';

    using RI1 = std::reverse_iterator<std::vector<int>::iterator>;
    std::vector<int> vi{0, 1, 2, 3};
    RI1 r1{vi.rend() - 2};
    std::cout << "*r1 = " << *r1 << '\n';

    using RI2 = std::reverse_iterator<std::vector<std::complex<double>>::iterator>;
    std::vector<std::complex<double>> vc{{1, 2}, {3, 4}, {5, 6}, {7, 8}};
    RI2 r2{vc.rbegin() + 1};
    std::cout << "vc[2] = (" << r2->real() << ',' << r2->imag() << ")\n";
}
```

Output:

```text
*r0 = 3
a[3] = 42
*r1 = 1
vc[2] = (5,6)
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2188 | C++11 | `operator->` used `&` to take address | uses `std::addressof` instead |

### See also

operator[] accesses an element by index (public member function)
