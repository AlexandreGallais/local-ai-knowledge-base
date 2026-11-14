---
title: "std::sys::pal::itron::task"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/itron/task.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::itron::task

## fn current_task_id

```rust
pub fn current_task_id() -> abi::ID
```

Gets the ID of the task in Running state. Panics on failure.

## fn current_task_id_aborting

```rust
pub fn current_task_id_aborting() -> abi::ID
```

Gets the ID of the task in Running state. Aborts on failure.

## fn try_current_task_id

```rust
pub fn try_current_task_id() -> Result<abi::ID, ItronError>
```

Gets the ID of the task in Running state.

## fn task_priority

```rust
pub fn task_priority(task: abi::ID) -> abi::PRI
```

Gets the specified task's priority. Panics on failure.

## fn try_task_priority

```rust
pub fn try_task_priority(task: abi::ID) -> Result<abi::PRI, ItronError>
```

Gets the specified task's priority.
