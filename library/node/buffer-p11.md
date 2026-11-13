---
title: "Buffer (part 11 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer (part 11 of 11)

## `Buffer.from()`, `Buffer.alloc()`, and `Buffer.allocUnsafe()`

In versions of Node.js prior to 6.0.0, `Buffer` instances were created using the
`Buffer` constructor function, which allocates the returned `Buffer`
differently based on what arguments are provided:

* Passing a number as the first argument to `Buffer()` (e.g. `new Buffer(10)`)
  allocates a new `Buffer` object of the specified size. Prior to Node.js 8.0.0,
  the memory allocated for such `Buffer` instances is _not_ initialized and
  _can contain sensitive data_. Such `Buffer` instances _must_ be subsequently
  initialized by using either `buf.fill(0)` or by writing to the
  entire `Buffer` before reading data from the `Buffer`.
  While this behavior is _intentional_ to improve performance,
  development experience has demonstrated that a more explicit distinction is
  required between creating a fast-but-uninitialized `Buffer` versus creating a
  slower-but-safer `Buffer`. Since Node.js 8.0.0, `Buffer(num)` and `new
  Buffer(num)` return a `Buffer` with initialized memory.
* Passing a string, array, or `Buffer` as the first argument copies the
  passed object's data into the `Buffer`.
* Passing an {ArrayBuffer} or a {SharedArrayBuffer} returns a `Buffer`
  that shares allocated memory with the given array buffer.

Because the behavior of `new Buffer()` is different depending on the type of the
first argument, security and reliability issues can be inadvertently introduced
into applications when argument validation or `Buffer` initialization is not
performed.

For example, if an attacker can cause an application to receive a number where
a string is expected, the application may call `new Buffer(100)`
instead of `new Buffer("100")`, leading it to allocate a 100 byte buffer instead
of allocating a 3 byte buffer with content `"100"`. This is commonly possible
using JSON API calls. Since JSON distinguishes between numeric and string types,
it allows injection of numbers where a naively written application that does not
validate its input sufficiently might expect to always receive a string.
Before Node.js 8.0.0, the 100 byte buffer might contain
arbitrary pre-existing in-memory data, so may be used to expose in-memory
secrets to a remote attacker. Since Node.js 8.0.0, exposure of memory cannot
occur because the data is zero-filled. However, other attacks are still
possible, such as causing very large buffers to be allocated by the server,
leading to performance degradation or crashing on memory exhaustion.

To make the creation of `Buffer` instances more reliable and less error-prone,
the various forms of the `new Buffer()` constructor have been **deprecated**
and replaced by separate `Buffer.from()`, `Buffer.alloc()`, and
`Buffer.allocUnsafe()` methods.

_Developers should migrate all existing uses of the `new Buffer()` constructors
to one of these new APIs._

* `Buffer.from(array)` returns a new `Buffer` that _contains a copy_ of the
  provided octets.
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][`Buffer.from(arrayBuf)`]
  returns a new `Buffer` that _shares the same allocated memory_ as the given
  {ArrayBuffer}.
* `Buffer.from(buffer)` returns a new `Buffer` that _contains a copy_ of the
  contents of the given `Buffer`.
* `Buffer.from(string[, encoding])` returns a new
  `Buffer` that _contains a copy_ of the provided string.
* [`Buffer.alloc(size[, fill[, encoding]])`][`Buffer.alloc()`] returns a new
  initialized `Buffer` of the specified size. This method is slower than
  `Buffer.allocUnsafe(size)` but guarantees that newly
  created `Buffer` instances never contain old data that is potentially
  sensitive. A `TypeError` will be thrown if `size` is not a number.
* `Buffer.allocUnsafe(size)` and
  `Buffer.allocUnsafeSlow(size)` each return a
  new uninitialized `Buffer` of the specified `size`. Because the `Buffer` is
  uninitialized, the allocated segment of memory might contain old data that is
  potentially sensitive.

`Buffer` instances returned by `Buffer.allocUnsafe()`, `Buffer.from(string)`,
`Buffer.concat()` and `Buffer.from(array)` _may_ be allocated off a shared
internal memory pool if `size` is less than or equal to half `Buffer.poolSize`.
Instances returned by `Buffer.allocUnsafeSlow()` _never_ use the shared internal
memory pool.

### The `--zero-fill-buffers` command-line option

Node.js can be started using the `--zero-fill-buffers` command-line option to
cause all newly-allocated `Buffer` instances to be zero-filled upon creation by
default. Without the option, buffers created with `Buffer.allocUnsafe()` and
`Buffer.allocUnsafeSlow()` are not zero-filled. Use of this flag can have a
measurable negative impact on performance. Use the `--zero-fill-buffers` option
only when necessary to enforce that newly allocated `Buffer` instances cannot
contain old data that is potentially sensitive.

```console
$ node --zero-fill-buffers
> Buffer.allocUnsafe(5);
<Buffer .. .. .. .. ..>
```

### What makes `Buffer.allocUnsafe()` and `Buffer.allocUnsafeSlow()` "unsafe"?

When calling `Buffer.allocUnsafe()` and `Buffer.allocUnsafeSlow()`, the
segment of allocated memory is _uninitialized_ (it is not zeroed-out). While
this design makes the allocation of memory quite fast, the allocated segment of
memory might contain old data that is potentially sensitive. Using a `Buffer`
created by `Buffer.allocUnsafe()` without _completely_ overwriting the
memory can allow this old data to be leaked when the `Buffer` memory is read.

While there are clear performance advantages to using
`Buffer.allocUnsafe()`, extra care _must_ be taken in order to avoid
introducing security vulnerabilities into an application.

### Aligned allocations

Some operating system interfaces require the memory they operate on to be
aligned, and on some hardware alignment is merely faster. The most common
example of the former is unbuffered ("direct") file I/O, which on Linux requires
the buffer address, the file offset and the transfer length to all be multiples
of the logical block size of the underlying device:

```mjs
import { open } from 'node:fs/promises';
import { constants } from 'node:fs';
import { Buffer } from 'node:buffer';

const blockSize = 4096;

// The buffer address must be block-aligned for O_DIRECT to accept it.
const buf = Buffer.allocUnsafeSlow(blockSize, blockSize);

const file = await open('/dev/sda', constants.O_RDONLY | constants.O_DIRECT);
try {
  await file.read(buf, 0, blockSize, 0);
} finally {
  await file.close();
}
```

```cjs
const fs = require('node:fs');
const { Buffer } = require('node:buffer');

const blockSize = 4096;

// The buffer address must be block-aligned for O_DIRECT to accept it.
const buf = Buffer.allocUnsafeSlow(blockSize, blockSize);

const flags = fs.constants.O_RDONLY | fs.constants.O_DIRECT;
fs.open('/dev/sda', flags, (err, fd) => {
  if (err) throw err;
  fs.read(fd, buf, 0, blockSize, 0, (err) => {
    fs.close(fd, () => {});
    if (err) throw err;
  });
});
```

Alignment can also be worth requesting purely for performance, even when no
interface demands it. Aligning a hot `Buffer` to the cache line size (64 bytes on
most contemporary CPUs) keeps it from straddling one more cache line than it
needs to, so that a small structure is fetched with one cache miss instead of
two, and page-aligned (4096 bytes) allocations similarly help interfaces that map
or pin memory. These are micro-optimizations: measure before reaching for them,
since the extra bytes are not free.

Because the address of a `Buffer`'s memory cannot be chosen directly, extra bytes
have to be allocated or skipped to reach an aligned address.
`Buffer.allocUnsafeSlow()` over-allocates `alignment` bytes, or 8 when
`alignment` is smaller than that, and positions the returned `Buffer` at the
first suitably aligned byte within them.
`Buffer.allocUnsafe()` instead pads its offset into the shared internal pool,
whose start is always aligned to 64 bytes, and only falls back to an allocation
of its own when `alignment` is larger than that. Either way,
`buf.byteOffset` is usually not 0 and `buf.buffer` is larger than `size`,
so code that reaches past the `Buffer` into its underlying `ArrayBuffer` must
take the offset into account, as it must for pooled `Buffer`s.

The alignment is a property of the returned `Buffer` and is preserved for its
whole lifetime, but it is not inherited by other views: `buf.subarray`,
`buf.slice()` and `structuredClone()` may all produce unaligned `Buffer`s.

Alignment also does not survive being captured in a startup snapshot: memory does
not keep its address across serialization, so a `Buffer` allocated while
`--build-snapshot` is in effect is not aligned in the deserialized process.
Allocate inside a `v8.startupSnapshot.setDeserializeMainFunction()` callback,
or after startup, if the alignment has to hold at run time.
