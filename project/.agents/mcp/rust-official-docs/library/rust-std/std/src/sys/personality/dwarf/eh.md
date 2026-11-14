# std::sys::personality::dwarf::eh

Parsing of GCC-style Language-Specific Data Area (LSDA)
For details see:
 * <https://refspecs.linuxfoundation.org/LSB_3.0.0/LSB-PDA/LSB-PDA/ehframechpt.html>
 * <https://refspecs.linuxfoundation.org/LSB_5.0.0/LSB-Core-generic/LSB-Core-generic/dwarfext.html>
 * <https://itanium-cxx-abi.github.io/cxx-abi/exceptions.pdf>
 * <https://www.airs.com/blog/archives/460>
 * <https://www.airs.com/blog/archives/464>

A reference implementation may be found in the GCC source tree
(`<root>/libgcc/unwind-c.c` as of this writing).

## const USING_SJLJ_EXCEPTIONS

```rust
pub const USING_SJLJ_EXCEPTIONS: bool = cfg!(all(target_vendor = "apple", not(target_os = "watchos"), target_arch = "arm"))
```

32-bit ARM Darwin platforms uses SjLj exceptions.

The exception is watchOS armv7k (specifically that subarchitecture), which
instead uses DWARF Call Frame Information (CFI) unwinding.

<https://github.com/llvm/llvm-project/blob/llvmorg-18.1.4/clang/lib/Driver/ToolChains/Darwin.cpp#L3107-L3119>