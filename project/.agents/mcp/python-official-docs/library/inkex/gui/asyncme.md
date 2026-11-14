# inkex.gui.asyncme

Convenience library for concurrency

GUI apps frequently need concurrency, for example to avoid blocking UI while
doing some long running computation. This module provides helpers for doing
this kind of thing.

The functions/methods here which spawn callables asynchronously
don't supply a direct way to provide arguments. Instead, the user is
expected to use a lambda, e.g::

    holding(lck, lambda: do_stuff(1,2,3, x='hello'))

This is because the calling function may have additional arguments which
could obscure the user's ability to pass arguments expected by the called
function. For example, in the call::

    holding(lck, lambda: run_task(blocking=True), blocking=False)

the blocking argument to holding might otherwise conflict with the
blocking argument to run_task.

## class Future

```python
class Future
```

A deferred result

A `Future` is a result-to-be; it can be used to deliver a result
asynchronously. Typical usage:

    >>> def background_task(task):
    ...     ret = Future()
    ...     def _task(x):
    ...         return x - 4 + 2
    ...     thread = threading.Thread(target=lambda: ret.run(lambda: _task(7)))
    ...     thread.start()
    ...     return ret
    >>> # Do other stuff
    >>> print(ret.wait())
    5

:func:`run` will also propagate exceptions; see its docstring for details.

## Future.is_ready

```python
def is_ready(self)
```

Return whether the result is ready

## Future.wait

```python
def wait(self)
```

Wait for the result.

`wait` blocks until the result is ready (either :func:`result` or
:func:`exception` has been called), and then returns it (in the case
of :func:`result`), or raises it (in the case of :func:`exception`).

## Future.result

```python
def result(self, value)
```

Supply the result as a return value.

``value`` is the result to supply; it will be returned when
:func:`wait` is called.

## Future.exception

```python
def exception(self, err)
```

Supply an exception as the result.

Args:
    err (Exception): an exception, which will be raised when :func:`wait`
        is called.

## Future.run

```python
def run(self, task)
```

Calls task(), and supplies the result.

If ``task`` raises an exception, pass it to :func:`exception`.
Otherwise, pass the return value to :func:`result`.

## class DebouncedSyncVar

```python
class DebouncedSyncVar
```

A synchronized variable, which debounces its value

:class:`DebouncedSyncVar` supports three operations: put, replace, and get.
get will only retrieve a value once it has "settled," i.e. at least
a certain amount of time has passed since the last time the value
was modified.

## DebouncedSyncVar.__init__

```python
def __init__(self, delay_seconds=0)
```

Create a new dsv with the supplied delay, and no initial value.

## DebouncedSyncVar.set_delay

```python
def set_delay(self, delay_seconds)
```

Set the delay in seconds of the debounce.

## DebouncedSyncVar.get

```python
def get(self, blocking=True, remove=True) -> Tuple[Any, bool]
```

Retrieve a value.

Args:
    blocking (bool, optional): if True, block until (1) the dsv has a value
        and (2) the value has been unchanged for an amount of time greater
        than or equal to the dsv's delay. Otherwise, if these conditions
        are not met, return ``(None, False)`` immediately. Defaults to True.
    remove (bool, optional): if True, remove the value when returning it.
        Otherwise, leave it where it is.. Defaults to True.

Returns:
    Tuple[Any, bool]: Tuple (value, ok). ``value`` is the value of the variable
    (if successful, see above), and ok indicates whether or not a value was
    successfully retrieved.

## DebouncedSyncVar.replace

```python
def replace(self, value)
```

Replace the current value of the dsv (if any) with ``value``.

replace never blocks (except briefly to acquire the lock). It does not
wait for any unit of time to pass (though it does reset the timer on
completion), nor does it wait for the dsv's value to appear or
disappear.

## DebouncedSyncVar.put

```python
def put(self, value)
```

Set the dsv's value to ``value``.

If the dsv already has a value, this blocks until the value is removed.
Upon completion, this resets the timer.

## spawn_thread

```python
def spawn_thread(func)
```

Call ``func()`` in a separate thread

Returns the corresponding :class:`threading.Thread` object.

## in_mainloop

```python
def in_mainloop(func)
```

Run f() in the gtk main loop

Returns a :class:`Future` object which can be used to retrieve the return
value of the function call.

:func:`in_mainloop` exists because Gtk isn't threadsafe, and therefore cannot be
manipulated except in the thread running the Gtk main loop. :func:`in_mainloop`
can be used by other threads to manipulate Gtk safely.

## mainloop_only

```python
def mainloop_only(f)
```

A decorator which forces a function to only be run in Gtk's main loop.

Invoking a decorated function as ``f(*args, **kwargs)`` is equivalent to
using the undecorated function (from a thread other than the one running
the Gtk main loop) as::

    in_mainloop(lambda: f(*args, **kwargs)).wait()

:func:`mainloop_only` should be used to decorate functions which are unsafe
to run outside of the Gtk main loop.

## holding

```python
def holding(lock, task, blocking=True)
```

Run task() while holding ``lock``.

Args:
    blocking (bool, optional): if True, wait for the lock before running.
        Otherwise, if the lock is busy, return None immediately, and don't
        spawn `task`. Defaults to True.

Returns:
    Union[Future, None]: The return value is a future which can be used to retrieve
    the result of running task (or None if the task was not run).

## run_or_wait

```python
def run_or_wait(func)
```

A decorator which runs the function using :func:`holding`

This function creates a single lock for this function and
waits for the lock to release before returning.

See :func:`holding` above, with ``blocking=True``

## run_or_none

```python
def run_or_none(func)
```

A decorator which runs the function using :func:`holding`

This function creates a single lock for this function and
returns None if the process is already running (locked)

See :func:`holding` above with ``blocking=True``