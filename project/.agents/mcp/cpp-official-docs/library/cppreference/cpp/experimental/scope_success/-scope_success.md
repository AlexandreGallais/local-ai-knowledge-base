# std::experimental::scope_success<EF>::~scope_success

`~scope_success() noexcept(noexcept(std::declval<EF&>()()));` (library fundamentals TS v3)

Calls the exit function if the result of `std::uncaught_exceptions()` is less than or equal to the counter of uncaught exceptions (typically on normal exit) and the `scope_success` is active, then destroys the stored `EF` (if it is a function object) and any other non-static data members.

### Exceptions

Throws any exception thrown by calling the exit function.

### Notes

Whether the destructor is called on stack unwinding can be detected by the comparison of the result of `std::uncaught_exceptions()` and the counter of uncaught exceptions in the `scope_success`.

Unlike other classes or class template specializations in the C++ standard library and other C++ TR/TS's, `scope_success`'s destructor is permitted to throw an exception.

### See also

release makes the `scope_success` inactive (public member function)
