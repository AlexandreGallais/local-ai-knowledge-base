# std::vector<bool,Allocator>::flip

| Defined in header `<vector>` |  |
| --- | --- |
| `void flip();` | (constexpr since C++20) |

Toggles each `bool` (replaces with its opposite value) in the vector.

### Example

```cpp
#include <iostream>
#include <vector>

void print(const std::vector<bool>& vb)
{
    for (const bool b : vb)
        std::cout << b;
    std::cout << '\n';
}

int main()
{
    std::vector<bool> v{0, 1, 0, 1};
    print(v);
    v.flip();
    print(v);
}
```

Output:

```text
0101
1010
```

### See also

|  |  |
| --- | --- |
| operator[] | access specified element (public member function of `std::vector<T,Allocator>`) |
| flip | toggles the values of bits (public member function of `std::bitset<N>`) |
