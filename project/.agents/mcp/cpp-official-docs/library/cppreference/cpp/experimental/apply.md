# std::experimental::apply

| Defined in header `<experimental/tuple>` |  |
| --- | --- |
| `template< class F, class Tuple > constexpr decltype(auto) apply(F&& f, Tuple&& t);` | (library fundamentals TS) |

Invoke the Callable object `f` with a tuple of arguments.

### Parameters

|  |  |  |
| --- | --- | --- |
| f | - | Callable object to be invoked |
| t | - | tuple whose elements to be used as arguments to `f` |

### Return value

What returned by `f`.

### Possible implementation

`namespace detail { template<class F, class Tuple, std::size_t... I> constexpr decltype(auto) apply_impl(F&& f, Tuple&& t, std::index_sequence<I...>) { return std::invoke(std::forward<F>(f), std::get<I>(std::forward<Tuple>(t))...); // Note: std::invoke is a C++17 feature } } // namespace detail template<class F, class Tuple> constexpr decltype(auto) apply(F&& f, Tuple&& t) { return detail::apply_impl(std::forward<F>(f), std::forward<Tuple>(t), std::make_index_sequence<std::tuple_size_v<std::decay_t<Tuple>>>{}); }`

### Example

```cpp
#include <iostream>
#include <tuple>

template<typename... Ts>
void print_tuple(const std::tuple<Ts...> &tuple)
{
    std::apply([](const auto&... elem)
    {
        ((std::cout << elem << '\n'), ...);
    }, tuple);
}

int main()
{
    const std::tuple<int, char> t = std::make_tuple(5, 'a');
    print_tuple(t);
}
```

Output:

```text
5
a
```

### See also

|  |  |
| --- | --- |
| make_tuple (C++11) | creates a `tuple` object of the type defined by the argument types (function template) |
| forward_as_tuple (C++11) | creates a `tuple` of forwarding references (function template) |
