# std::sys::io::kernel_copy::linux

This module contains specializations that can offload `io::copy()` operations on file descriptor
containing types (`File`, `TcpStream`, etc.) to more efficient syscalls than `read(2)` and `write(2)`.

Specialization is only applied to wholly std-owned types so that user code can't observe
that the `Read` and `Write` traits are not used.

Since a copy operation involves a reader and writer side where each can consist of different types
and also involve generic wrappers (e.g. `Take`, `BufReader`) it is not practical to specialize
a single method on all possible combinations.

Instead readers and writers are handled separately by the `CopyRead` and `CopyWrite` specialization
traits and then specialized on by the `Copier::copy` method.

`Copier` uses the specialization traits to unpack the underlying file descriptors and
additional prerequisites and constraints imposed by the wrapper types.

Once it has obtained all necessary pieces and brought any wrapper types into a state where they
can be safely bypassed it will attempt to use the `copy_file_range(2)`,
`sendfile(2)` or `splice(2)` syscalls to move data directly between file descriptors.
Since those syscalls have requirements that cannot be fully checked in advance it attempts
to use them one after another (guided by hints) to figure out which one works and
falls back to the generic read-write copy loop if none of them does.
Once a working syscall is found for a pair of file descriptors it will be called in a loop
until the copy operation is completed.

Advantages of using these syscalls:

* fewer context switches since reads and writes are coalesced into a single syscall
  and more bytes are transferred per syscall. This translates to higher throughput
  and fewer CPU cycles, at least for sufficiently large transfers to amortize the initial probing.
* `copy_file_range` creates reflink copies on CoW filesystems, thus moving less data and
  consuming less disk space
* `sendfile` and `splice` can perform zero-copy IO under some circumstances while
  a naive copy loop would move every byte through the CPU.

Drawbacks:

* copy operations smaller than the default buffer size can under some circumstances, especially
  on older kernels, incur more syscalls than the naive approach would. As mentioned above
  the syscall selection is guided by hints to minimize this possibility but they are not perfect.
* optimizations only apply to std types. If a user adds a custom wrapper type, e.g. to report
  progress, they can hit a performance cliff.
* complexity