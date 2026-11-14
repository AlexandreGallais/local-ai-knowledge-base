# core::io::error::repr_unpacked

This is a fairly simple unpacked error representation that's used on
non-64bit targets, where the packed 64 bit representation wouldn't work, and
would have no benefit.