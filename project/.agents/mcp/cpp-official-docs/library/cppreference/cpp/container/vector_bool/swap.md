# std::vector<bool,Allocator>::swap

| Defined in header `<vector>` |  |
| --- | --- |
| `static void swap( reference x, reference y );` | (constexpr since C++20) |

Swaps the contents of `x` and `y` as if by `bool b = x; x = y; y = b;`.

### Parameters

|  |  |  |
| --- | --- | --- |
| x | - | `std::vector``<bool>::``reference` value to swap with `y` |
| y | - | `std::vector``<bool>::``reference` value to swap with `x` |

### Return value

(none)

### Complexity

Constant.

### Example

```cpp
#include <iostream>
#include <vector>

void println(std::string_view fmt, std::vector<bool> const& vb = {})
{
    for (std::cout << fmt; bool const e : vb)
        std::cout << e << ' ';
    std::cout << '\n';
}

int main()
{
    println("swap elements of the same vector:");
    std::vector<bool> x{1, 0};
    println("before swap, x: ", x);
    x.swap(x[0], x[1]); // same as std::vector<bool>::swap(x[0], x[1]);
    println("after swap,  x: ", x);

    println("swap elements of two different vectors:");
    std::vector<bool> y{0, 0, 1};
    println("before swap, x: ", x);
    println("before swap, y: ", y);
    y.swap(x[0], y[2]); // same as std::vector<bool>::swap(x[0], y[2]);
    println("after swap,  x: ", x);
    println("after swap,  y: ", y);
}
```

Output:

```text
swap elements of the same vector:
before swap, x: 1 0
after swap,  x: 0 1
swap elements of two different vectors:
before swap, x: 0 1
before swap, y: 0 0 1
after swap,  x: 1 1
after swap,  y: 0 0 0
```

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 814 | C++98 | the description of this member function was missing | added |

### See also

|  |  |
| --- | --- |
| reference | proxy class representing a reference to a single `bool` (class) |
| swap | swaps the contents (public member function of `std::vector<T,Allocator>`) |
| std::swap(std::vector) | specializes the `std::swap` algorithm (function template) |
