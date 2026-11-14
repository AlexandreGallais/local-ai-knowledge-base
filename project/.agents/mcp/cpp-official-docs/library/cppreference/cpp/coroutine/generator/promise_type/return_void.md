# std::generator<Ref,V,Allocator>::promise_type::return_void

`void return_void() const noexcept {}` (since C++23)

No-op. A user provided coroutine that uses the generator cannot issue a value via `co_return` operator or reaching the end of the coroutine body.
