# core::num::imp::libm

Bindings to math functions provided by the system `libm` or by the `libm` crate, exposed
via `compiler-builtins`.

The functions in the root of this module are "guaranteed" to be available; see the
`full_availability` module in compiler-builtins for details.