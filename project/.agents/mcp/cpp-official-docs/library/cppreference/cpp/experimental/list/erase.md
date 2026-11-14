# std::experimental::erase (std::list)

| Defined in header `<experimental/list>` |  |
| --- | --- |
| `template< class T, class A, class U > void erase( std::list<T, A>& c, const U& value );` | (library fundamentals TS v2) |

Erases all elements that compare equal to `value` from the container. Equivalent to `c.remove_if([&](auto& elem) { return elem == value; });`.

### Parameters

|  |  |  |
| --- | --- | --- |
| c | - | container from which to erase |
| value | - | value to be removed |

### Complexity

Linear.

### Example

```cpp
#include <experimental/list>
#include <iostream>

auto show = [](const auto& container)
{
    for (auto e : container)
        std::cout << e;
    std::cout << '\n';
};

int main()
{
    std::list<int> data{1, 1, 1, 4, 1, 1, 1, 2, 1, 1, 1};
    show(data);
    std::experimental::erase(data, 1);
    show(data);
}
```

Output:

```text
11141112111
42
```

### Notes

Unlike `std::list::remove`, this function template accepts heterogeneous types and does not force a conversion to the container's value type before invoking the `==` operator.

### See also

|  |  |
| --- | --- |
| remove, remove_if | removes elements satisfying specific criteria (function template) |
| remove, remove_if | removes elements satisfying specific criteria (public member function of `std::list<T,Allocator>`) |
| erase_if (std::list) (library fundamentals 2 TS) | erases all elements satisfying a predicate from a `std::list` (function template) |
