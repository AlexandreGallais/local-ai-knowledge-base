# std::equal_to, not_equal_to, less, greater, less_equal, greater_equal(std::experimental::propagate_const)

| Defined in header `<experimental/propagate_const>` |  |
| --- | --- |
| `template< class T > struct equal_to<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |
| `template< class T > struct not_equal_to<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |
| `template< class T > struct less<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |
| `template< class T > struct greater<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |
| `template< class T > struct less_equal<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |
| `template< class T > struct greater_equal<std::experimental::propagate_const<T>>;` | (library fundamentals TS v2) |

The standard comparison function objects are partially specialized for `std::experimental::propagate_const<T>`.

Let `p.t_` denote the pointer-like object wrapped by a `std::experimental::propagate_const<T> p`, then given objects `p` and `q` of type `std::experimental::propagate_const<T>`, the following shall hold:

- `std::equal_to<std::experimental::propagate_const<T>>()(p, q) == std::equal_to<T>()(p.t_, q.t_)`
- `std::not_equal_to<std::experimental::propagate_const<T>>()(p, q) == std::not_equal_to<T>()(p.t_, q.t_)`
- `std::less<std::experimental::propagate_const<T>>()(p, q) == std::less<T>()(p.t_, q.t_)`
- `std::greater<std::experimental::propagate_const<T>>()(p, q) == std::greater<T>()(p.t_, q.t_)`
- `std::less_equal<std::experimental::propagate_const<T>>()(p, q) == std::less_equal<T>()(p.t_, q.t_)`
- `std::greater_equal<std::experimental::propagate_const<T>>()(p, q) == std::greater_equal<T>()(p.t_, q.t_)`

### Notes

These specializations ensure that when `T` is a pointer type, specializations of these class templates for `std::experimental::propagate_const<T>` yield a total order, even if the corresponding built-in operators do not.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| equal_to | function object implementing `x == y` (class template) |
| not_equal_to | function object implementing `x != y` (class template) |
| less | function object implementing `x < y` (class template) |
| greater | function object implementing `x > y` (class template) |
| less_equal | function object implementing `x <= y` (class template) |
| greater_equal | function object implementing `x >= y` (class template) |
