# std::reverse_iterator<Iter>::operator++,+,+=,--,-,-=

|  |  |  |
| --- | --- | --- |
| `reverse_iterator& operator++();` | (1) | (constexpr since C++17) |
| `reverse_iterator& operator--();` | (2) | (constexpr since C++17) |
| `reverse_iterator operator++( int );` | (3) | (constexpr since C++17) |
| `reverse_iterator operator--( int );` | (4) | (constexpr since C++17) |
| `reverse_iterator operator+( difference_type n ) const;` | (5) | (constexpr since C++17) |
| `reverse_iterator operator-( difference_type n ) const;` | (6) | (constexpr since C++17) |
| `reverse_iterator& operator+=( difference_type n );` | (7) | (constexpr since C++17) |
| `reverse_iterator& operator-=( difference_type n );` | (8) | (constexpr since C++17) |

Increments or decrements the underlying iterator reversely.

| Overload | Equivalent to |
| --- | --- |
| (1) | `--current; return *this;` |
| (2) | `++current; return *this;` |
| (3) | `reverse_iterator tmp = *this; --current; return tmp;` |
| (4) | `reverse_iterator tmp = *this; ++current; return tmp;` |
| (5) | `return reverse_iterator(current - n);` |
| (6) | `return reverse_iterator(current + n);` |
| (7) | `current -= n; return *this;` |
| (8) | `current += n; return *this;` |

### Parameters

n - position relative to current location

### Return value

As described above.

### Example

```cpp
#include <iostream>
#include <iterator>
#include <list>
#include <vector>

int main()
{
    std::vector v{0, 1, 2, 3, 4};
    auto rv = std::reverse_iterator{v.rbegin()};
    std::cout << *(++rv) << ' '; // 3
    std::cout << *(--rv) << ' '; // 4
    std::cout << *(rv + 3) << ' '; // 1
    rv += 3;
    std::cout << rv[0] << ' '; // 1
    rv -= 3;
    std::cout << rv[0] << '\n'; // 4

    std::list l{5, 6, 7, 8};
    auto rl = std::reverse_iterator{l.rbegin()};
    std::cout << *(++rl) << ' '; // OK: 3
    std::cout << *(--rl) << '\n'; // OK: 4
    // The following statements raise compilation error because the
    // underlying iterator does not model the random access iterator:
//  *(rl + 3) = 13;
//  rl += 3;
//  rl -= 3;
}
```

Output:

```text
3 4 1 1 4
7 8
```

### See also

|  |  |
| --- | --- |
| operator+ | advances the iterator (function template) |
| operator- | computes the distance between two iterator adaptors (function template) |
