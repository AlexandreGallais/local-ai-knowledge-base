# std::experimental::propagate_const<T>::swap

`constexpr void swap( propagate_const & pt ) noexcept(/* see below */);` (library fundamentals TS v2)

Swaps the wrapped pointer with that of `pt`. Let `t_` designate the private data member that is the wrapped pointer-like object, then this function is equivalent to `swap(t_, pt.t_)`, where the overload resolution for `swap` is performed among `std::swap` and any declaration found by the usual lookup rules, as described in Swappable.

The behavior is undefined if lvalues of `T` do not satisfy Swappable.

### Parameters

pt - another `propagate_const` object to swap with

### Exceptions

|  |  |
| --- | --- |
| `noexcept` specification: `noexcept(noexcept(swap(t_, pt.t_)))` The lookup for the identifier `swap` in the exception specification finds overloads described above, and does not find the member function itself, making the exception specification equivalent to C++17 `std::is_nothrow_swappable`. | (library fundamentals TS v2) |
| `noexcept` specification: `noexcept(std::is_nothrow_swappable_v<T>)` | (library fundamentals TS v3) |

### Defect reports

The following behavior-changing defect reports were applied retroactively to previously published C++ standards.

| DR | Applied to | Behavior as published | Correct behavior |
| --- | --- | --- | --- |
| LWG 3413 | LFTSv2 | the exception specification was ill-formed | made well-formed |
