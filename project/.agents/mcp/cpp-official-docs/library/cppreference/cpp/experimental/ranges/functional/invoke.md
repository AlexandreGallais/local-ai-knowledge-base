# std::experimental::ranges::invoke

| Defined in header `<experimental/ranges/functional>` |  |
| --- | --- |
| `template< class F, class... Args > std::result_of_t<F&&(Args&&...)> invoke( F&& f, Args&&... args );` | (ranges TS) |

Invoke the Callable object `f` with the parameters `args`, and return the result, as if by `return INVOKE(std::forward<F>(f), std::forward<Args>(args)...);`, where *INVOKE(f, t1, t2, ..., tN)* is defined as follows:

- if `f` is a pointer to member function of class `T`:

- If `std::is_base_of<T, std::decay_t<decltype(t1)>>::value` is `true`, then `INVOKE(f, t1, t2, ..., tN)` is equivalent to `(t1.*f)(t2, ..., tN)`,
- otherwise, `INVOKE(f, t1, t2, ..., tN)` is equivalent to `((*t1).*f)(t2, ..., tN)`.

- otherwise, if N == 1 and `f` is a pointer to data member of class `T`:

- If `std::is_base_of<T, std::decay_t<decltype(t1)>>::value` is `true`, then `INVOKE(f, t1)` is equivalent to `t1.*f`,
- otherwise, then `INVOKE(f, t1)` is equivalent to `(*t1).*f`.

- otherwise, `INVOKE(f, t1, t2, ..., tN)` is equivalent to `f(t1, t2, ..., tN)` (that is, `f` is a FunctionObject).

### Parameters

|  |  |  |
| --- | --- | --- |
| f | - | Callable object to be invoked |
| args | - | arguments to pass to `f` |

### See also

invoke, invoke_r (C++17), (C++23) invokes any Callable object with given arguments and possibility to specify return type(since C++23) (function template)
