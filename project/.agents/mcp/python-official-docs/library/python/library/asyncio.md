---
title: "asyncio --- Asynchronous I/O"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/asyncio.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `asyncio` --- Asynchronous I/O

Module `asyncio`.

Hello World!

```
import asyncio

async def main():
    print('Hello ...')
    await asyncio.sleep(1)
    print('... World!')

asyncio.run(main())
```

asyncio is a library to write **concurrent** code using
the **async/await** syntax.

asyncio is used as a foundation for multiple Python asynchronous
frameworks that provide high-performance network and web-servers,
database connection libraries, distributed task queues, etc.

asyncio is often a perfect fit for IO-bound and high-level
**structured** network code.

> **See also:** a-conceptual-overview-of-asyncio
> Explanation of the fundamentals of asyncio.

asyncio provides a set of **high-level** APIs to:

- run Python coroutines concurrently and
have full control over their execution;

- perform network IO and IPC;

- control subprocesses;

- distribute tasks via queues;

- synchronize concurrent code;

For **introspection**, asyncio provides APIs and tools for:

- inspecting the async call graph of tasks and futures;

- inspecting tasks in another running Python process with
command-line tools;

Additionally, there are **low-level** APIs for
*library and framework developers* to:

- create and manage event loops, which
provide asynchronous APIs for networking,
running subprocesses,
handling OS signals, etc;

- implement efficient protocols using
transports;

- bridge callback-based libraries and code
with async/await syntax.

**asyncio REPL**

You can experiment with an `asyncio` concurrent context in the REPL:

```pycon
$ python -m asyncio
asyncio REPL ...
Use "await" directly instead of "asyncio.run()".
Type "help", "copyright", "credits" or "license" for more information.
>>> import asyncio
>>> await asyncio.sleep(10, result='hello')
'hello'
```

This REPL provides limited compatibility with `PYTHON_BASIC_REPL`.
It is recommended that the default REPL is used
for full functionality and the latest features.

> *Changed in version 3.12.5.*
> Emits audit events.

> *Changed in version 3.13.*
> Uses PyREPL if possible, in which case `PYTHONSTARTUP` is
> also executed. Emits audit events.

**Reference**

> **Note:** The source code for asyncio can be found in Lib/asyncio/.
