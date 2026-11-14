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