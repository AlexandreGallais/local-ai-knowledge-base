---
title: "std::sys::time::uefi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/time/uefi.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::time::uefi

## struct SystemTime

```rust
pub struct SystemTime(Duration)
```

When a Timezone is specified, the stored Duration is in UTC. If timezone is unspecified, then
the timezone is assumed to be in UTC.

UEFI SystemTime is stored as Duration from 1900-01-01-00:00:00 with timezone -1440 as anchor
