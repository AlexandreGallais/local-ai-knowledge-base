# std::swap(std::any)

| Defined in header `<any>` |  |
| --- | --- |
| `void swap( any& lhs, any& rhs ) noexcept;` | (since C++17) |

Overloads the `std::swap` algorithm for `std::any`. Swaps the content of two `any` objects by calling `lhs.swap(rhs)`.

### Parameters

lhs, rhs - objects to swap

### Example

```cpp
#include <any>
#include <print>
#include <string>

int main()
{
    std::any p = 42, q = std::string{"Bishop"};
    std::println("p: {}, q: {}", std::any_cast<int>(p), std::any_cast<std::string&>(q));
    std::println("swap(p, q)");
    std::swap(p, q);
    std::println("p: {}, q: {}", std::any_cast<std::string&>(p), std::any_cast<int>(q));
}
```

Output:

```text
p: 42, q: Bishop
swap(p, q)
p: Bishop, q: 42
```

### See also

swap swaps two `any` objects (public member function)
