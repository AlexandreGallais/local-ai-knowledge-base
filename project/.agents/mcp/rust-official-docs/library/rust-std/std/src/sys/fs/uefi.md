---
title: "std::sys::fs::uefi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/fs/uefi.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::fs::uefi

## fn rename

```rust
pub fn rename(old: &Path, new: &Path) -> io::Result<()>
```

The implementation mirrors `mv` implementation in UEFI shell:
https://github.com/tianocore/edk2/blob/66346d5edeac2a00d3cf2f2f3b5f66d423c07b3e/ShellPkg/Library/UefiShellLevel2CommandsLib/Mv.c#L455

In a nutshell we do the following:
1. Convert both old and new paths to absolute paths.
2. Check that both lie in the same disk.
3. Construct the target path relative to the current disk root.
4. Set this target path as the file_name in the file_info structure.
