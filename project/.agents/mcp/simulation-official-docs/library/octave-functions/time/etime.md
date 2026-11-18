# etime

```octave
function secs = etime (t2, t1)
```

@deftypefn {} {@var{secs} =} etime (@var{t2}, @var{t1})
Return the difference in seconds between two time values returned from
@code{clock} (@math{@var{t2} - @var{t1}}).

For example:

@example
@group
t0 = clock ();
# many computations later@dots{}
elapsed_time = etime (clock (), t0);
@end group
@end example

@noindent
will set the variable @code{elapsed_time} to the number of seconds since the
variable @code{t0} was set.
@seealso{tic, toc, clock, cputime, addtodate}
@end deftypefn
