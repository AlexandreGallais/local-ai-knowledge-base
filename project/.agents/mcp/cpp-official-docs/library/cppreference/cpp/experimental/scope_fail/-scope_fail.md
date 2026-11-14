# std::experimental::scope_fail<EF>::~scope_fail

`~scope_fail() noexcept;` (library fundamentals TS v3)

Calls the exit function if the result of `std::uncaught_exceptions()` is greater than the counter of uncaught exceptions (typically on stack unwinding) and the `scope_fail` is active, then destroys the stored `EF` (if it is a function object) and any other non-static data members.

### Notes

Whether the destructor is called on stack unwinding can be detected by the comparison of the result of `std::uncaught_exceptions()` and the counter of uncaught exceptions in the `scope_fail`.

### See also

release makes the `scope_fail` inactive (public member function)
