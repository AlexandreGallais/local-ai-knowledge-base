# std::invoke, std::invoke_r

| Defined in header `<functional>` |  |  |
| --- | --- | --- |
| `template< class F, class... Args > std::invoke_result_t<F, Args...> invoke( F&& f, Args&&... args ) noexcept(/* see below */);` | (1) | (since C++17) (constexpr since C++20) |
| `template< class R, class F, class... Args > constexpr R invoke_r( F&& f, Args&&... args ) noexcept(/* see below */);` | (2) | (since C++23) |

1) Invoke the Callable object `f` with the parameters `args` as by `INVOKE(std::forward<F>(f), std::forward<Args>(args)...)`. This overload participates in overload resolution only if `std::is_invocable_v<F, Args...>` is `true`.

2) Invoke the Callable object `f` with the parameters `args` as by `INVOKE<R>(std::forward<F>(f), std::forward<Args>(args)...)`. This overload participates in overload resolution only if `std::is_invocable_r_v<R, F, Args...>` is `true`.

### Parameters

|  |  |  |
| --- | --- | --- |
| f | - | Callable object to be invoked |
| args | - | arguments to pass to `f` |

### Return value

1) The value returned by `f`.

2) The value returned by `f`, implicitly converted to `R`, if `R` is not (possibly cv-qualified) `void`. None otherwise.

### Exceptions

1)

`noexcept` specification:

`noexcept(std::is_nothrow_invocable_v<F, Args...>)`

2)

`noexcept` specification:

`noexcept(std::is_nothrow_invocable_r_v<R, F, Args...>)`

### Possible implementation

invoke (1)

`namespace detail { template<class> constexpr bool is_reference_wrapper_v = false; template<class U> constexpr bool is_reference_wrapper_v<std::reference_wrapper<U>> = true; template<class T> using remove_cvref_t = std::remove_cv_t<std::remove_reference_t<T>>; template<class C, class Pointed, class Object, class... Args> constexpr decltype(auto) invoke_memptr(Pointed C::* member, Object&& object, Args&&... args) { using object_t = remove_cvref_t<Object>; constexpr bool is_member_function = std::is_function_v<Pointed>; constexpr bool is_wrapped = is_reference_wrapper_v<object_t>; constexpr bool is_derived_object = std::is_same_v<C, object_t> \|\| std::is_base_of_v<C, object_t>; if constexpr (is_member_function) { if constexpr (is_derived_object) return (std::forward<Object>(object) .* member) (std::forward<Args>(args)...); else if constexpr (is_wrapped) return (object.get() .* member)(std::forward<Args>(args)...); else return ((*std::forward<Object>(object)) .* member) (std::forward<Args>(args)...); } else { static_assert(std::is_object_v<Pointed> && sizeof...(args) == 0); if constexpr (is_derived_object) return std::forward<Object>(object) .* member; else if constexpr (is_wrapped) return object.get() .* member; else return (*std::forward<Object>(object)) .* member; } } } // namespace detail template<class F, class... Args> constexpr std::invoke_result_t<F, Args...> invoke(F&& f, Args&&... args) noexcept(std::is_nothrow_invocable_v<F, Args...>) { if constexpr (std::is_member_pointer_v<detail::remove_cvref_t<F>>) return detail::invoke_memptr(f, std::forward<Args>(args)...); else return std::forward<F>(f)(std::forward<Args>(args)...); }`

invoke_r (2)

`template<class R, class F, class... Args> requires std::is_invocable_r_v<R, F, Args...> constexpr R invoke_r(F&& f, Args&&... args) noexcept(std::is_nothrow_invocable_r_v<R, F, Args...>) { if constexpr (std::is_void_v<R>) std::invoke(std::forward<F>(f), std::forward<Args>(args)...); else return std::invoke(std::forward<F>(f), std::forward<Args>(args)...); }`

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_invoke` | `201411L` | (C++17) | `std::invoke`, (1) |
| `__cpp_lib_invoke_r` | `202106L` | (C++23) | `std::invoke_r`, (2) |

### Example

```cpp
#include <functional>
#include <iostream>
#include <type_traits>

struct Foo
{
    Foo(int num) : num_(num) {}
    void print_add(int i) const { std::cout << num_ + i << '\n'; }
    int num_;
};

void print_num(int i)
{
    std::cout << i << '\n';
}

struct PrintNum
{
    void operator()(int i) const
    {
        std::cout << i << '\n';
    }
};

int main()
{
    std::cout << "invoke a free function: ";
    std::invoke(print_num, -9);

    std::cout << "invoke a lambda: ";
    std::invoke([](){ print_num(42); });

    std::cout << "invoke a member function: ";
    const Foo foo(314159);
    std::invoke(&Foo::print_add, foo, 1);

    std::cout << "invoke (i.e., access) a data member num_: "
              << std::invoke(&Foo::num_, foo) << '\n';

    std::cout << "invoke a function object: ";
    std::invoke(PrintNum(), 18);

#if defined(__cpp_lib_invoke_r)
    auto add = [](int x, int y){ return x + y; };
    std::cout << "invoke a lambda converting result to float: ";
    auto ret = std::invoke_r<float>(add, 11, 22);
    static_assert(std::is_same<decltype(ret), float>());
    std::cout << std::fixed << ret << "\ninvoke print_num: ";
    std::invoke_r<void>(print_num, 44);
#endif
}
```

Possible output:

```text
invoke a free function: -9
invoke a lambda: 42
invoke a member function: 314160
invoke (i.e., access) a data member num_: 314159
invoke a function object: 18
invoke a lambda converting result to float: 33.000000
invoke print_num: 44
```

### See also

|  |  |
| --- | --- |
| mem_fn (C++11) | creates a function object out of a pointer to a member (function template) |
| result_of, invoke_result (C++11), (removed in C++20), (C++17) | deduces the result type of invoking a callable object with a set of arguments (class template) |
| is_invocable, is_invocable_r, is_nothrow_invocable, is_nothrow_invocable_r (C++17) | checks if a type can be invoked (as if by `std::invoke`) with the given argument types (class template) |
| apply (C++17) | calls a function with a tuple of arguments (function template) |
