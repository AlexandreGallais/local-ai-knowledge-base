# alloc::io::buffered::bufreader::buffer

An encapsulation of `BufReader`'s buffer management logic.

This module factors out the basic functionality of `BufReader` in order to protect two core
invariants:
* `filled` bytes of `buf` are always initialized
* `pos` is always <= `filled`
Since this module encapsulates the buffer management logic, we can ensure that the range
`pos..filled` is always a valid index into the initialized region of the buffer. This means
that user code which wants to do reads from a `BufReader` via `buffer` + `consume` can do so
without encountering any runtime bounds checks.