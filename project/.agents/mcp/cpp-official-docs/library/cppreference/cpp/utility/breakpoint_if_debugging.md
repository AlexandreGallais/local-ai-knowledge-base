# std::breakpoint_if_debugging

| Defined in header `<debugging>` |  |
| --- | --- |
| `void breakpoint_if_debugging() noexcept;` | (since C++26) |

Conditional breakpoint: attempts to temporarily halt the execution of the program and transfer control to the debugger if it were able to determine that the debugger is present. Acts as a no-op otherwise.

Formally, the behavior of this function is completely implementation-defined. Equivalent to `if (std::is_debugger_present()) std::breakpoint();`.

### Notes

| Feature-test macro | Value | Std | Feature |
| --- | --- | --- | --- |
| `__cpp_lib_debugging` | `202311L` | (C++26) | Debugging support library |
| `202403L` | (C++26) | Replaceable `std::is_debugger_present` |  |

### Example

This section is incomplete Reason: no example

### See also

|  |  |
| --- | --- |
| is_debugger_present (C++26) | checks whether a program is running under the control of a debugger (function) |
| breakpoint (C++26) | pauses the running program when called (function) |
