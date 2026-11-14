# core::fmt::rt

All types and methods in this file are used by the compiler in
the expansion/lowering of format_args!().

Do not modify them without understanding the consequences for the format_args!() macro.

## struct Argument

```rust
pub struct Argument<'a>
```

This struct represents a generic "argument" which is taken by format_args!().

This can be either a placeholder argument or a count argument.
* A placeholder argument contains a function to format the given value. At
  compile time it is ensured that the function and the value have the correct
  types, and then this struct is used to canonicalize arguments to one type.
  Placeholder arguments are essentially an optimized partially applied formatting
  function, equivalent to `exists T.(&T, fn(&T, &mut Formatter<'_>) -> Result`.
* A count argument contains a count for dynamic formatting parameters like
  precision and width.