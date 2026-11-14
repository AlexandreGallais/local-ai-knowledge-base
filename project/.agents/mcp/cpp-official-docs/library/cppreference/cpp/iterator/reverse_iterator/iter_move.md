# std::iter_move(std::reverse_iterator)

`friend constexpr std::iter_rvalue_reference_t<Iter> iter_move( const std::reverse_iterator& i ) noexcept(/* see below */);` (since C++20)

Casts the result of dereferencing the adjusted underlying iterator to its associated rvalue reference type.

Equivalent to `auto tmp = i.base(); return std::ranges::iter_move(--tmp);`.

This function template is not visible to ordinary unqualified or qualified lookup, and can only be found by argument-dependent lookup when `std::reverse_iterator<Iter>` is an associated class of the arguments.

### Parameters

i - a source reverse iterator

### Return value

An rvalue reference or a prvalue temporary.

### Complexity

Constant.

### Exceptions

`noexcept` specification:

`noexcept( std::is_nothrow_copy_constructible_v<Iter> && noexcept(std::ranges::iter_move(--std::declval<Iter&>())) )`

### Example

```cpp
#include <iomanip>
#include <iostream>
#include <iterator>
#include <string>
#include <vector>

void print(const auto& rem, const auto& v)
{
    std::cout << rem << '[' << size(v) << "] {";
    for (char comma[]{0, 0}; const auto& s : v)
        std::cout << comma << ' ' << std::quoted(s), comma[0] = ',';
    std::cout << " }\n";
}

int main()
{
    std::vector<std::string> p{"Alpha", "Bravo", "Charlie"}, q;

    print("p", p), print("q", q);

    using RI = std::reverse_iterator<std::vector<std::string>::iterator>;

    for (RI iter{p.rbegin()}, rend{p.rend()}; iter != rend; ++iter)
        q.emplace_back(/* ADL */ iter_move(iter));

    print("p", p), print("q", q);
}
```

Possible output:

```text
p[3] { "Alpha", "Bravo", "Charlie" }
q[0] { }
p[3] { "", "", "" }
q[3] { "Charlie", "Bravo", "Alpha" }
```

### See also

|  |  |
| --- | --- |
| iter_move (C++20) | casts the result of dereferencing an object to its associated rvalue reference type (customization point object) |
| iter_move (C++20) | casts the result of dereferencing the underlying iterator to its associated rvalue reference type (function) |
| move (C++11) | converts the argument to an xvalue (function template) |
| move_if_noexcept (C++11) | converts the argument to an xvalue if the move constructor does not throw (function template) |
| forward (C++11) | forwards a function argument and use the type template argument to preserve its value category (function template) |
| ranges::move (C++20) | moves a range of elements to a new location (algorithm function object) |
| ranges::move_backward (C++20) | moves a range of elements to a new location in backwards order (algorithm function object) |
