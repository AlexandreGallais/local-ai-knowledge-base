---
title: "std::thread::functions (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/thread/functions.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::thread::functions (part 2 of 2)

## fn park_timeout

```rust
pub fn park_timeout(dur: Duration)
```

Blocks unless or until the current thread's token is made available or
the specified duration has been reached (may wake spuriously).

The semantics of this function are equivalent to `park`[park] except
that the thread will be blocked for roughly no longer than `dur`. This
method should not be used for precise timing due to anomalies such as
preemption or platform differences that might not cause the maximum
amount of time waited to be precisely `dur` long.

See the park documentation for more details.

# Platform-specific behavior

Platforms which do not support nanosecond precision for sleeping will have
`dur` rounded up to the nearest granularity of time they can sleep for.

# Examples

Waiting for the complete expiration of the timeout:

```rust
use std::thread::park_timeout;
use std::time::{Instant, Duration};

let timeout = Duration::from_secs(2);
let beginning_park = Instant::now();

let mut timeout_remaining = timeout;
loop {
    park_timeout(timeout_remaining);
    let elapsed = beginning_park.elapsed();
    if elapsed >= timeout {
        break;
    }
    println!("restarting park_timeout after {elapsed:?}");
    timeout_remaining = timeout - elapsed;
}
```

## fn available_parallelism

```rust
pub fn available_parallelism() -> io::Result<NonZero<usize>>
```

Returns an estimate of the default amount of parallelism a program should use.

Parallelism is a resource. A given machine provides a certain capacity for
parallelism, i.e., a bound on the number of computations it can perform
simultaneously. This number often corresponds to the amount of CPUs a
computer has, but it may diverge in various cases.

Host environments such as VMs or container orchestrators may want to
restrict the amount of parallelism made available to programs in them. This
is often done to limit the potential impact of (unintentionally)
resource-intensive programs on other programs running on the same machine.

# Limitations

The purpose of this API is to provide an easy and portable way to query
the default amount of parallelism the program should use. Among other things it
does not expose information on NUMA regions, does not account for
differences in (co)processor capabilities or current system load,
and will not modify the program's global state in order to more accurately
query the amount of available parallelism.

Where both fixed steady-state and burst limits are available the steady-state
capacity will be used to ensure more predictable latencies.

Resource limits can be changed during the runtime of a program, therefore the value is
not cached and instead recomputed every time this function is called. It should not be
called from hot code.

The value returned by this function should be considered a simplified
approximation of the actual amount of parallelism available at any given
time. To get a more detailed or precise overview of the amount of
parallelism available to the program, you may wish to use
platform-specific APIs as well. The following platform limitations currently
apply to `available_parallelism`:

On Windows:
- It may undercount the amount of parallelism available on systems with more
  than 64 logical CPUs, because it reports only the logical CPUs in one
  processor group. Before Windows 11 and Windows Server 2022, a process was by
  default confined to a single processor group, so this count reflected the CPUs
  it could use without explicitly opting into other groups. Starting with Windows
  11 and Windows Server 2022, a process and its threads have affinities that by
  default span all processor groups, so on systems with more than 64 logical CPUs
  this may report fewer CPUs than are available to the program.
- It may overcount the amount of parallelism available on systems limited by
  process-wide affinity masks, or job object limitations.

On Linux:
- It may overcount the amount of parallelism available when limited by a
  process-wide affinity mask or cgroup quotas and `sched_getaffinity()` or cgroup fs can't be
  queried, e.g. due to sandboxing.
- It may undercount the amount of parallelism if the current thread's affinity mask
  does not reflect the process' cpuset, e.g. due to pinned threads.
- If the process is in a cgroup v1 cpu controller, this may need to
  scan mountpoints to find the corresponding cgroup v1 controller,
  which may take time on systems with large numbers of mountpoints.
  (This does not apply to cgroup v2, or to processes not in a
  cgroup.)
- It does not attempt to take `ulimit` into account. If there is a limit set on the number of
  threads, `available_parallelism` cannot know how much of that limit a Rust program should
  take, or know in a reliable and race-free way how much of that limit is already taken.

On all targets:
- It may overcount the amount of parallelism available when running in a VM
with CPU usage limits (e.g. an overcommitted host).

# Errors

This function will, but is not limited to, return errors in the following
cases:

- If the amount of parallelism is not known for the target platform.
- If the program lacks permission to query the amount of parallelism made
  available to it.

# Examples

```rust
use std::thread;

if let Ok(count) = thread::available_parallelism() {
  assert!(count.get() >= 1_usize);
}
```
