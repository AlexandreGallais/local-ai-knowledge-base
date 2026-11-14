# std::basic_stacktrace<Allocator>::~basic_stacktrace

`~basic_stacktrace();` (since C++23)

Destructs the `basic_stacktrace`. The destructors of the `std::stacktrace_entry` objects it holds are called and the used storage is deallocated.

### Complexity

Linear in the size of the `basic_stacktrace`.
