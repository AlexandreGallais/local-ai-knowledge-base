# std::reverse_iterator<Iter>::operator=

`template< class U > reverse_iterator& operator=( const reverse_iterator<U>& other );` (constexpr since C++17)

Assigns `other.current` to `current`.

This overload participates in overload resolution only if `std::is_same_v<U, Iter>` is `false` and both `std::convertible_to<const U&, Iter>` and `std::assignable_from<Iter&, const U&>` are modeled. (since C++20)

### Parameters

other - iterator adaptor to assign

### Return value

`*this`

### Example

```cpp
#include <iostream>
#include <iterator>

int main()
{
    const int a1[]{0, 1, 2};
    int a2[]{0, 1, 2, 3};
    short a3[]{40, 41, 42};

    std::reverse_iterator<const int*> it1{std::crbegin(a1)};
    it1 = std::reverse_iterator<int*>{std::rbegin(a2)};   // OK
//  it1 = std::reverse_iterator<short*>{std::rbegin(a3)}; // Compilation error:
                                                          // incompatible pointer types
    std::reverse_iterator<const short*> it2{nullptr};
    it2 = std::rbegin(a3); // OK
//  it2 = std::begin(a3);  // Compilation error: no viable operator= overload
    std::cout << *it2 << '\n';
}
```

Output:

```text
42
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 280 | C++98 | heterogeneous assignment was not allowed | allowed |
| LWG 3435 | C++20 | the converting assignment operator was not constrained | constrained |

### See also

(constructor) constructs a new iterator adaptor (public member function)
