# memoize

```octave
function mem_fcn_handle = memoize (fcn_handle)
```

@deftypefn {} {@var{mem_fcn_handle} =} memoize (@var{fcn_handle})

Create a memoized version @var{mem_fcn_handle} of function @var{fcn_handle}.

Each call to the memoized version @var{mem_fcn_handle} checks the inputs
against an internally maintained table, and if the inputs have occurred
previously, then the result of the function call is returned from the table
itself instead of evaluating the full function again.  This speeds up the
execution of functions that are called with the same inputs multiple times.

For example, here we take a slow user-written function named @code{slow_fcn}
and memoize it to a new handle @code{cyc}.  The first executions of both
versions take the same time, but the subsequent executions of the memoized
version returns the previously computed value, thus reducing 2.4 seconds of
runtime to only 2.4 milliseconds.  The final check verifies that the same
result was returned from both versions.

@example
@group
>> tic; @var{p} = slow_fcn (5040); toc
Elapsed time is 2.41244 seconds.
>> tic; @var{p} = slow_fcn (5040); toc
Elapsed time is 2.41542 seconds.

>> cyc = memoize (@@slow_fcn);
>> tic; @var{r} = cyc (5040); toc
Elapsed time is 2.42609 seconds.
>> tic; @var{r} = cyc (5040); toc
Elapsed time is 0.00236511 seconds.

>> all (@var{p} == @var{r})
ans = 1
@end group
@end example

@seealso{clearAllMemoizedCaches}
@end deftypefn
