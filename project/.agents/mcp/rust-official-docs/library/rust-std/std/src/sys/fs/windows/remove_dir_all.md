---
title: "std::sys::fs::windows::remove_dir_all"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/fs/windows/remove_dir_all.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::fs::windows::remove_dir_all

The Windows implementation of std::fs::remove_dir_all.

This needs to address two issues:

- It must not be possible to trick this into deleting files outside of
  the parent directory (see CVE-2022-21658).
- It should not fail if many threads or processes call `remove_dir_all`
  on the same path.

The first is handled by using the low-level `NtOpenFile` API to open a file
relative to a parent directory.

The second is trickier. Deleting a file works by setting its "disposition"
to delete. However, it isn't actually deleted until the file is closed.
During the gap between these two events, the file is in a kind of limbo
state where it still exists in the filesystem but anything trying to open
it fails with an error.

The mitigations we use here are:

- When attempting to open the file, we treat ERROR_DELETE_PENDING as a
  successful delete.
- If the file still hasn't been removed from the filesystem by the time we
  attempt to delete the parent directory, we try to wait for it to finish.
  We can't wait indefinitely though so after some number of spins, we give
  up and return an error.

In short, we can't guarantee this will always succeed in the event of a
race but we do make a best effort such that it *should* do so.
