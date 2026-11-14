# C attribute: noreturn, _Noreturn (since C23)

Indicates that the function does not return.

### Syntax

|  |  |
| --- | --- |
| `[[` `noreturn` `]]` `[[` `__noreturn__` `]]` |  |
| `[[` `_Noreturn` `]]` `[[` `___Noreturn__` `]]` | (deprecated) |

### Explanation

Indicates that the function does not return.

This attribute applies to the name of the function and specifies that the function does not return by executing the return statement or by reaching the end of the function body (it may return by executing `longjmp`). The behavior is undefined if the function with this attribute actually returns. A compiler diagnostic is recommended if this can be detected.

It has been previously denoted by the keyword `_Noreturn` until it was deprecated since C23 and replaced by this attribute.

### Standard library

The following standard functions are declared with `noreturn` attribute (they used to be declared with `_Noreturn` specifier until C23):

- `abort()`
- `exit()`
- `_Exit()`
- `quick_exit()`
- `thrd_exit()`
- `longjmp()`

### See also

C documentation for _Noreturn

C++ documentation for `[[noreturn]]`
