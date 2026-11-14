# std::experimental::not_fn

| Defined in header `<experimental/functional>` |  |
| --- | --- |
| `template< class F> /*unspecified*/ not_fn( F&& f );` | (library fundamentals TS v2) |

Creates a forwarding call wrapper that returns the complement of the callable object it holds.

### Parameters

f - the object from which the Callable object held by the wrapper is constructed

### Return value

Let `FD` be `std::decay_t<F>` and `fd` be an lvalue of type `FD` constructed from `std::forward<F>(f)`.

`not_fn` returns a forwarding call wrapper `fn` of unspecified type such that `fn(a1, a2, ..., aN)` is equivalent to `!INVOKE(fd, a1, ..., aN)`, where `INVOKE` is the operation described in Callable.

The returned call wrapper is always MoveConstructible, and is CopyConstructible if FD is CopyConstructible.

### Remarks

If `fd` is not Callable, or `std::is_constructible<FD, F>::value` is not `true`, the behavior is undefined.

### Exceptions

Throws no exceptions, unless the construction of `fd` throws.

### Possible implementation

`namespace detail { template<class F> struct not_fn_t { F f; template<class... Args> auto operator()(Args&&... args) noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...))) -> decltype(!std::invoke(f, std::forward<Args>(args)...)) { return !std::invoke(f, std::forward<Args>(args)...); } // cv-qualified overload for QoI template<class... Args> auto operator()(Args&&... args) const noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...))) -> decltype(!std::invoke(f, std::forward<Args>(args)...)) { return !std::invoke(f, std::forward<Args>(args)...); } template<class... Args> auto operator()(Args&&... args) volatile noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...))) -> decltype(!std::invoke(f, std::forward<Args>(args)...)) { return !std::invoke(f, std::forward<Args>(args)...); } template<class... Args> auto operator()(Args&&... args) const volatile noexcept(noexcept(!std::invoke(f, std::forward<Args>(args)...))) -> decltype(!std::invoke(f, std::forward<Args>(args)...)) { return !std::invoke(f, std::forward<Args>(args)...); } }; } template<class F> detail::not_fn_t<std::decay_t<F>> not_fn(F&& f) { return { std::forward<F>(f) }; }`

### Notes

`not_fn` is intended to replace the C++03-era negators `std::not1` and `std::not2`.

### See also

not_fn (C++17) creates a function object that returns the complement of the result of the function object it holds (function template)
