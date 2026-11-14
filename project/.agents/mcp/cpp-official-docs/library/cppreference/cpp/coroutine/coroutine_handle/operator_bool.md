# std::coroutine_handle<Promise>::operator bool

`constexpr explicit operator bool() const noexcept;` (since C++20)

Checks whether `*this` is non-null, i.e. the value of `*this` is obtained from the promise object of some coroutine. Equivalent to `return bool(address());`.

If `Promise` is `std::noop_coroutine_promise`, this conversion function always returns `true`.

### Parameters

(none)

### Return value

`bool(address())`, or `true` if `Promise` is `std::noop_coroutine_promise`.

### See also

address exports the underlying address, i.e. the pointer backing the coroutine (public member function)
