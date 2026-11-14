# Experimental library header <experimental/ranges/functional>

This header is part of the ranges library.

### Function objects

| Defined in namespace `std::experimental::ranges` |  |
| --- | --- |
| invoke | invokes a Callable object with the given arguments (function template) |
| equal_to | function object implementing `x == y` (class template) |
| not_equal_to | function object implementing `x != y` (class template) |
| greater | function object implementing `x > y` (class template) |
| less | function object implementing `x < y` (class template) |
| greater_equal | function object implementing `x >= y` (class template) |
| less_equal | function object implementing `x <= y` (class template) |
| identity | function object that returns its argument unchanged (class) |

### Synopsis

```cpp
namespace std { namespace experimental { namespace ranges { inline namespace v1 {

template <class F, class... Args>
std::result_of_t<F&&(Args&&...)> invoke(F&& f, Args&&... args);

template <class T = void>
  requires /* see definition */
struct equal_to;

template <class T = void>
  requires /* see definition */
struct not_equal_to;

template <class T = void>
  requires /* see definition */
struct greater;

template <class T = void>
  requires /* see definition */
struct less;

template <class T = void>
  requires /* see definition */
struct greater_equal;

template <class T = void>
  requires /* see definition */
struct less_equal;

template <> struct equal_to<void>;
template <> struct not_equal_to<void>;
template <> struct greater<void>;
template <> struct less<void>;
template <> struct greater_equal<void>;
template <> struct less_equal<void>;

struct identity;

}}}}
```
