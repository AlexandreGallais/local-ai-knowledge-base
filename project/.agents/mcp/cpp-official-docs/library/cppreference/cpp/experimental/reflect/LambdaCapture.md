# std::experimental::reflect::LambdaCapture

| Defined in header `<experimental/reflect>` |  |
| --- | --- |
| `template< class T > concept LambdaCapture = Variable<T> && /* see below */;` | (reflection TS) |

The `LambdaCapture` concept is satisfied if and only if T reflects a lambda capture as introduced by the capture list or by capture defaults. (Note: The `Scope` of a `LambdaCapture` is its immediately enclosing `Lambda`).

### Example

This section is incomplete Reason: examples

### See also

This section is incomplete Reason: templatization
