# std::scoped_allocator_adaptor<OuterAlloc,InnerAlloc...>::construct

| Defined in header `<scoped_allocator>` |  |  |
| --- | --- | --- |
| `template< class T, class... Args > void construct( T* p, Args&&... args );` | (1) |  |
| `template< class T1, class T2, class... Args1, class... Args2 > void construct( std::pair<T1, T2>* p, std::piecewise_construct_t, std::tuple<Args1...> x, std::tuple<Args2...> y );` | (2) | (until C++20) |
| `template< class T1, class T2 > void construct( std::pair<T1, T2>* p );` | (3) | (until C++20) |
| `template< class T1, class T2, class U, class V > void construct( std::pair<T1, T2>* p, U&& x, V&& y );` | (4) | (until C++20) |
| `template< class T1, class T2, class U, class V > void construct( std::pair<T1, T2>* p, const std::pair<U, V>& xy );` | (5) | (until C++20) |
| `template< class T1, class T2, class U, class V > void construct( std::pair<T1, T2>* p, std::pair<U, V>&& xy );` | (6) | (until C++20) |
| Helper function templates |  |  |
| `template < class T, class... Args > std::tuple</* see below */> /*concat-args*/( std::tuple<Args...>&& tup );` | (7) | (exposition only*) (until C++20) |

Constructs an object in allocated, but not initialized storage pointed to by `p` using the outer allocator and the provided constructor arguments. If the object is of a type that itself uses allocators, or if it is `std::pair`(until C++20), passes the inner allocator down to the constructed object.

1) Constructs an object of type `T` by uses-allocator construction at the uninitialized memory location indicated by `p` using the outermost allocator.

|  |  |
| --- | --- |
| Given `std::uses_allocator<T, inner_allocator_type>::value` as `uses_inner`: If `uses_inner` is `false` and `std::is_constructible<T, Args...>::value` is `true`, calls `outermost-construct (p, std::forward<Args>(args)...)`. Otherwise, if `uses_inner` and `std::is_constructible<T, std::allocator_arg_t, inner_allocator_type&, Args...>::value` are both `true`, calls `outermost-construct (p, std::allocator_arg, inner_allocator(), std::forward<Args>(args)...)`. Otherwise, if `uses_inner` and `std::is_constructible<T, Args..., inner_allocator_type&>::value` are both `true`, calls `outermost-construct (p, std::forward<Args>(args)..., inner_allocator())`. Otherwise, the program is ill-formed. This overload participates in overload resolution only if `T` is not a specialization of `std::pair`. | (until C++20) |
| Equivalent to `std::apply ( [p, this](auto&&... newargs) { outermost-construct (p, std::forward<decltype(newargs)>(newargs)...); }, std::uses_allocator_construction_args (inner_allocator(), std::forward<Args>(args)...) );`. | (since C++20) |

2-6) Constructs a `std::pair` object by uses-allocator construction at the uninitialized memory location indicated by `p` using the outermost allocator.

2) Let `xprime` be `concat-args <T1>(std::move(x))`, `yprime` be `concat-args <T2>(std::move(y))`, calls `outermost-construct (p, std::piecewise_construct, std::move(xprime), std::move(yprime))`.

3) Equivalent to `construct(p, std::piecewise_construct, std::tuple<>(), std::tuple<>());`.

4-6) Equivalent to `construct(p, std::piecewise_construct, std::forward_as_tuple(xarg), std::forward_as_tuple(yarg));`, where `xarg` and `yarg` are defined as follows:

| Overload | `xarg` | `yarg` |
| --- | --- | --- |
| (4) | `std::forward<U>(x)` | `std::forward<V>(y)` |
| (5) | `xy.first` | `xy.second` |
| (6) | `std::forward<U>(xy.first)` | `std::forward<V>(xy.second)` |

7) Merges the arguments contained in `tup` and additional arguments required by uses-allocator construction of an object of type `T`.

Given `std::uses_allocator<T, inner_allocator_type>::value` as `uses_inner`:

- If `uses_inner` is `false` and `std::is_constructible<T, Args...>::value` is `true`, returns `std::tuple<Args&&...>(std::move(tup))`.
- Otherwise, if `uses_inner` and `std::is_constructible<T, std::allocator_arg_t, inner_allocator_type&, Args...>::value` are both `true`, returns `std::tuple_cat(std::tuple<std::allocator_arg_t, inner_allocator_type&> (std::allocator_arg, inner_allocator()), std::tuple<Args&&...>(std::move(tup)))`.
- Otherwise, if `uses_inner` and `std::is_constructible<T, Args..., inner_allocator_type&>::value` are both `true`, returns `std::tuple_cat(std::tuple<Args&&...>(std::move(tup)), std::tuple<inner_allocator_type&>(inner_allocator())`.
- Otherwise, the program is ill-formed.

### Parameters

|  |  |  |
| --- | --- | --- |
| p | - | pointer to allocated, but not initialized storage |
| args | - | the constructor arguments to pass to the constructor of `T` |
| x | - | the constructor arguments to pass to the constructor of `T1` |
| y | - | the constructor arguments to pass to the constructor of `T2` |
| xy | - | the pair whose two members are the constructor arguments for `T1` and `T2` |
| tup | - | the arguments to be merged |

### Notes

This function is called (through `std::allocator_traits`) by any allocator-aware object, such as `std::vector`, that was given a `std::scoped_allocator_adaptor` as the allocator to use. Since `inner_allocator_type` is itself a specialization of `std::scoped_allocator_adaptor`, this function will also be called when the allocator-aware objects constructed through this function start constructing their own members.

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 2203 | C++11 | inner allocators were obtained by value-initializing an `inner_allocator_type` object | obtained by calling `inner_allocator()` |
| LWG 2511 (P0475R1) | C++11 | `concat-args` might copy elements of `std::tuple`s | eliminated all element copy operations |
| LWG 2586 | C++11 | only constructions from `inner_allocator_type` rvalues were checked | checks constructions from non-const `inner_allocator_type` lvalues instead |
| LWG 2975 | C++11 | overload (1) was not constrained | constrained to refuse `std::pair` |

### See also

|  |  |
| --- | --- |
| construct [static] | constructs an object in the allocated storage (function template) |
| construct (until C++20) | constructs an object in allocated storage (public member function of `std::allocator<T>`) |
