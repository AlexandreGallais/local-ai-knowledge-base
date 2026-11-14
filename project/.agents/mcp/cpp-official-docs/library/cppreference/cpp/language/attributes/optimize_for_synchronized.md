# C++ attribute: optimize_for_synchronized (TM TS)

Indicates that the function definition should be optimized for invocation from a synchronized statement.

### Syntax

`[[optimize_for_synchronized]]`

### Explanation

Applies to the name being declared in a function declaration, which must be the first declaration of the function.

Indicates that the function definition should be optimized for invocation from a synchronized statement. In particular, it avoids serializing synchronized blocks that make a call to a function that is transaction-safe for the majority of calls, but not for all calls.

### Example

This section is incomplete Reason: no example

### References

- Transactional Memory TS (ISO/IEC TS 19841:2015):

- 7.6.6 Attribute for optimization in synchronized blocks [dcl.attr.sync]
