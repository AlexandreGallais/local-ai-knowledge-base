---
title: "vmMemoryLimit | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/vmmemorylimit.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# vmMemoryLimit

- **Type:** `string | number`
- **Default:** `1 / maxWorkers`

This option affects only `vmForks` and `vmThreads` pools.

Specifies the memory limit for workers before they are recycled.

By default, the total system memory is split evenly between workers. By increasing `maxWorkers`, workers have less memory available, so they're recycled more often.

This value heavily depends on your environment, so it's better to specify it manually instead of relying on the default.

Recycling exists because VM contexts leak memory: a worker's memory usage grows with every test file it runs, so a worker cannot live forever. The limit is a trade-off:

- A low limit recycles workers frequently. In the `vmThreads` pool this is expensive, because destroying a worker thread runs a full garbage collection over the worker's memory and competes with running tests for the process' shared background threads. The `vmForks` pool recycles workers by letting the child process exit, which makes frequent recycling much cheaper there.
- A high limit lets workers accumulate memory. When the combined memory usage of all workers approaches what the machine can hold, every pool slows down.

**Tip:**
The implementation is based on Jest's `workerIdleMemoryLimit`.

The limit can be specified in a number of different ways and whatever the result is `Math.floor` is used to turn it into an integer value:

- `<= 1` - The value is assumed to be a percentage of system memory. So 0.5 sets the memory limit of the worker to half of the total system memory
- `\> 1` - Assumed to be a fixed byte value. Because of the previous rule if you wanted a value of 1 byte (I don't know why) you could use 1.1.
- With units
  - `50%` - As above, a percentage of total system memory
  - `100KB`, `65MB`, etc - With units to denote a fixed memory limit.
    - `K` / `KB` - Kilobytes (x1000)
    - `KiB` - Kibibytes (x1024)
    - `M` / `MB` - Megabytes
    - `MiB` - Mebibytes
    - `G` / `GB` - Gigabytes
    - `GiB` - Gibibytes

**Warning:**
Percentage based memory limit does not work on Linux CircleCI workers due to incorrect system memory being reported.
