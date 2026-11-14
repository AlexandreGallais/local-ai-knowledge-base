---
title: "threading --- Thread-based parallelism (part 5 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/threading.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# threading --- Thread-based parallelism (part 5 of 5)

## Iterator synchronization

By default, Python iterators do not support concurrent access. Most iterators make
no guarantees when accessed simultaneously from multiple threads. Generator
iterators, for example, raise `ValueError` if one of their iterator methods
is called while the generator is already executing. The tools in this section
allow reliable concurrency support to be added to ordinary iterators and
iterator-producing callables.

The `serialize_iterator` wrapper lets multiple threads share a single iterator and
take turns consuming from it. While one thread is running `__next__()`, the
others block until the iterator becomes available. Each value produced by the
underlying iterator is delivered to exactly one caller.

The `concurrent_tee()` function lets multiple threads each receive the full
stream of values from one underlying iterator. It creates independent iterators
that all draw from the same source. Values are buffered until consumed by all
of the derived iterators.

### class `serialize_iterator(iterable)`

Return an iterator wrapper that serializes concurrent calls to
`__next__()` using a lock.

If the wrapped iterator also defines `send()`,
`throw()`, or `close()`, those calls
are serialized as well.

This makes it possible to share a single iterator, including a generator
iterator, between multiple threads. A lock ensures that calls are handled
one at a time. No values are duplicated or skipped by the wrapper itself.
Each item from the underlying iterator is given to exactly one caller.

This wrapper does not copy or buffer values. Threads that call
`next()` while another thread is already advancing the iterator will
block until the active call completes.

Example:

```python
import threading

def squares(n):
    for x in range(n):
        yield x * x

def consume(name, iterable):
    for item in iterable:
        print(name, item)

source = threading.serialize_iterator(squares(5))

t1 = threading.Thread(target=consume, args=("left", source))
t2 = threading.Thread(target=consume, args=("right", source))
t1.start()
t2.start()
t1.join()
t2.join()
```

In this example, each number is printed exactly once, but the work is shared
between the two threads.

> *Added in version 3.15.*

### `synchronized_iterator(func)`

Wrap an iterator-producing callable so that each iterator it returns is
automatically passed through `serialize_iterator`.

This is especially useful as a decorator for generator functions,
allowing their generator-iterators to be consumed from multiple threads.

Example:

```python
import threading

@threading.synchronized_iterator
def squares(n):
    for x in range(n):
        yield x * x

def consume(name, iterable):
    for item in iterable:
        print(name, item)

source = squares(5)

t1 = threading.Thread(target=consume, args=("left", source))
t2 = threading.Thread(target=consume, args=("right", source))
t1.start()
t2.start()
t1.join()
t2.join()
```

The returned wrapper preserves the metadata of *func*, such as its name and
wrapped function reference.

> *Added in version 3.15.*

### `concurrent_tee(iterable, n=2)`

Return *n* independent iterators from a single input *iterable*, with
guaranteed behavior when the derived iterators are consumed concurrently.

This function is similar to `itertools.tee()`, but is intended for cases
where the source iterator may feed consumers running in different threads.
Each returned iterator yields every value from the underlying iterable, in
the same order.

Internally, values are buffered until every derived iterator has consumed
them.

The returned iterators share the same underlying synchronization lock. Each
individual derived iterator is intended to be consumed by one thread at a
time. If a single derived iterator must itself be shared by multiple
threads, wrap it with `serialize_iterator`.

If *n* is `0`, return an empty tuple. If *n* is negative, raise
`ValueError`.

Example:

```python
import threading

def squares(n):
    for x in range(n):
        yield x * x

def consume(name, iterable):
    for item in iterable:
        print(name, item)

source = squares(5)
left, right = threading.concurrent_tee(source)

t1 = threading.Thread(target=consume, args=("left", left))
t2 = threading.Thread(target=consume, args=("right", right))
t1.start()
t2.start()
t1.join()
t2.join()
```

In this example, both consumer threads see the full sequence of squares
from a single generator expression.

> *Added in version 3.15.*
