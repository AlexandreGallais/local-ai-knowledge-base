# std::experimental::unique_resource<R, D>::reset

|  |  |  |
| --- | --- | --- |
| `void reset() noexcept;` | (1) | (library fundamentals TS v3) |
| `template< class RR > void reset( RR&& r );` | (2) | (library fundamentals TS v3) |

1) Disposes the resource by calling the deleter with the underlying resource handle if the `unique_resource` owns it. The `unique_resource` does not own the resource after the call.

2) Replaces the resource by calling (1) and then assigns the stored resource handle with `std::forward<RR>(r)` if `std::is_nothrow_assignable_v<RS, RR>` is `true`, otherwise `std::as_const(r)`, where `RS` is the type of stored resource handle. The `unique_resource` owns the resource after the call.

If copy-assignment of the store resource handle throws an exception, calls `del_(r)`, where `del` is the deleter object.

This overload participates in overload resolution only if the selected assignment expression assigning the stored resource handle is well-formed.

The program is ill-formed if `del_(r)` is ill-formed.

The behavior is undefined if `del_(r)` results in undefined behavior or throws an exception.

### Parameters

r - resource handle for a new resource to manage

### Return value

(none)

### Exceptions

2) Any exception thrown in assigning the stored resource handle.

### Notes

The mechanism ensures no leaking of resources.

### Example

This section is incomplete Reason: no example

### See also

reset replaces the managed object (public member function of `std::unique_ptr<T,Deleter>`)
