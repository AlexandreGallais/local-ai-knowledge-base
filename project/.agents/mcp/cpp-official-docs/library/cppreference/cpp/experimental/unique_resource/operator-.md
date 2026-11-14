# std::experimental::unique_resource<R, D>::operator=

`unique_resource& operator=( unique_resource&& other ) noexcept(/*see below*/);` (library fundamentals TS v3)

Move assignment operator. Replaces the managed resource and the deleter with `other`'s.

Formally, let `RS` be the type of stored resource handle:

- First, calls `reset()` to dispose the currently owned resource, if any.
- Then assigns the stored resource handle and the deleter with `other`'s. `std::move` is applied to the stored resource handle or the deleter of `other` if `std::is_nothrow_move_assignable_v<RS>` or `std::is_nothrow_move_assignable_v<D>` is `true` respectively. Assignment of the stored resource handle is executed first, unless `std::is_nothrow_move_assignable_v<D>` is `false` and `std::is_nothrow_move_assignable_v<RS>` is `true`.
- Finally, sets `*this` to own the resource if and only if `other` owned it before assignment, and `other` not to own the resource.

If `std::is_nothrow_move_assignable_v<RS>` is `true`, `RS` shall satisfy the MoveAssignable requirements; otherwise `RS` shall satisfy the CopyAssignable requirements. If `std::is_nothrow_move_assignable_v<D>` is `true`, `D` shall satisfy the MoveAssignable requirements; otherwise `D` shall satisfy the CopyAssignable requirements. Failing to satisfy above requirements results in undefined behavior.

### Parameters

other - resource wrapper from which ownership will be transferred

### Return value

`*this`

### Exceptions

Any exception thrown in copy-assignment.

`noexcept` specification:

`noexcept(std::is_nothrow_move_assignable_v<RS> && std::is_nothrow_move_assignable_v<D>)`

### Notes

If a copy of a member throws an exception, this mechanism leaves `other` intact and `*this` in the released state.

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| reset | disposes or replaces the managed resource (public member function) |
| operator= | assigns the `unique_ptr` (public member function of `std::unique_ptr<T,Deleter>`) |
