---
title: "multiprocessing --- Process-based parallelism (part 3 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/multiprocessing.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# multiprocessing --- Process-based parallelism (part 3 of 10)

### Using a pool of workers

The `Pool` class represents a pool of worker
processes.  It has methods which allows tasks to be offloaded to the worker
processes in a few different ways.

For example:

```
from multiprocessing import Pool, TimeoutError
import time
import os

def f(x):
    return x*x

if __name__ == '__main__':
    # start 4 worker processes
    with Pool(processes=4) as pool:

        # print "[0, 1, 4,..., 81]"
        print(pool.map(f, range(10)))

        # print same numbers in arbitrary order
        for i in pool.imap_unordered(f, range(10)):
            print(i)

        # evaluate "f(20)" asynchronously
        res = pool.apply_async(f, (20,))      # runs in *only* one process
        print(res.get(timeout=1))             # prints "400"

        # evaluate "os.getpid()" asynchronously
        res = pool.apply_async(os.getpid, ()) # runs in *only* one process
        print(res.get(timeout=1))             # prints the PID of that process

        # launching multiple evaluations asynchronously *may* use more processes
        multiple_results = [pool.apply_async(os.getpid, ()) for i in range(4)]
        print([res.get(timeout=1) for res in multiple_results])

        # make a single worker sleep for 10 seconds
        res = pool.apply_async(time.sleep, (10,))
        try:
            print(res.get(timeout=1))
        except TimeoutError:
            print("We lacked patience and got a multiprocessing.TimeoutError")

        print("For the moment, the pool remains available for more work")

    # exiting the 'with'-block has stopped the pool
    print("Now the pool is closed and no longer available")
```

Note that the methods of a pool should only ever be used by the
process which created it.

> **Note:** Functionality within this package requires that the `__main__` module be
> importable by the children. This is covered in multiprocessing-programming
> however it is worth pointing out here. This means that some examples, such
> as the `multiprocessing.pool.Pool` examples will not work in the
> interactive interpreter. For example:
>
>
> ```
> >>> from multiprocessing import Pool
> >>> p = Pool(5)
> >>> def f(x):
> ...     return x*x
> ...
> >>> with p:
> ...     p.map(f, [1,2,3])
> Process PoolWorker-1:
> Process PoolWorker-2:
> Process PoolWorker-3:
> Traceback (most recent call last):
> Traceback (most recent call last):
> Traceback (most recent call last):
> AttributeError: Can't get attribute 'f' on <module '__main__' (<class '_frozen_importlib.BuiltinImporter'>)>
> AttributeError: Can't get attribute 'f' on <module '__main__' (<class '_frozen_importlib.BuiltinImporter'>)>
> AttributeError: Can't get attribute 'f' on <module '__main__' (<class '_frozen_importlib.BuiltinImporter'>)>
> ```
>
>
> (If you try this it will actually output three full tracebacks
> interleaved in a semi-random fashion, and then you may have to
> stop the parent process somehow.)
