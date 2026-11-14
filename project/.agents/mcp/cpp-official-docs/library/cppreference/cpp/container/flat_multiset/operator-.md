# std::flat_multiset<Key,Compare,KeyContainer>::operator=

|  |  |  |
| --- | --- | --- |
| `flat_multiset& operator=( const flat_multiset& other );` | (1) | (since C++23) (implicitly declared) |
| `flat_multiset& operator=( flat_multiset&& other );` | (2) | (since C++23) (implicitly declared) |
| `flat_multiset& operator=( std::initializer_list<key_type> ilist );` | (3) | (since C++23) |

Replaces the contents of the container adaptor with the contents of given argument.

1) Copy assignment operator. Replaces the contents with a copy of the contents of `other`. Effectively calls `c = other.c; comp = other.comp;`.

2) Move assignment operator. Replaces the contents with those of `other` using move semantics. Effectively calls `c = std::move(other.c); comp = std::move(other.comp);`.

3) Replaces the contents with those identified by initializer list `ilist`.

### Parameters

|  |  |  |
| --- | --- | --- |
| other | - | another container adaptor to be used as source |
| ilist | - | initializer list to be used as source |

### Return value

`*this`

### Complexity

1,2) Equivalent to that of `operator=` of the underlying container.

3) Linear in the size of `*this` and `ilist`.

### Example

```cpp
#include <flat_set>
#include <initializer_list>
#include <print>

int main()
{
    std::flat_multiset<int> x{1, 2, 3}, y, z;
    const auto w = {4, 5, 6, 7};

    std::println("Initially:");
    std::println("x = {}", x);
    std::println("y = {}", y);
    std::println("z = {}", z);

    y = x; // overload (1)
    std::println("Copy assignment copies data from x to y:");
    std::println("x = {}", x);
    std::println("y = {}", y);

    z = std::move(x); // overload (2)
    std::println("Move assignment moves data from x to z, modifying both x and z:");
    std::println("x = {}", x);
    std::println("z = {}", z);

    z = w; // overload (3)
    std::println("Assignment of initializer_list w to z:");
    std::println("w = {}", w);
    std::println("z = {}", z);
}
```

Output:

```text
Initially:
x = {1, 2, 3}
y = {}
z = {}
Copy assignment copies data from x to y:
x = {1, 2, 3}
y = {1, 2, 3}
Move assignment moves data from x to z, modifying both x and z:
x = {}
z = {1, 2, 3}
Assignment of initializer_list w to z:
w = {4, 5, 6, 7}
z = {4, 5, 6, 7}
```

### See also

|  |  |
| --- | --- |
| (constructor) | constructs the `flat_multiset` (public member function) |
| replace | replaces the underlying container (public member function) |
