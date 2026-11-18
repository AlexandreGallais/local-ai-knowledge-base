# profshow

```octave
function profshow (data, n = 20)
```

@deftypefn  {} {} profshow (@var{data})
@deftypefnx {} {} profshow (@var{data}, @var{n})
@deftypefnx {} {} profshow ()
@deftypefnx {} {} profshow (@var{n})
Display flat per-function profiler results.

Print out profiler data (execution time, number of calls) for the most
critical @var{n} functions.  The results are sorted in descending order by
the total time spent in each function.  If @var{n} is unspecified it
defaults to 20.

The input @var{data} is the structure returned by @code{profile ("info")}.
If unspecified, @code{profshow} will use the current profile dataset.

The attribute column displays @samp{R} for recursive functions, and is blank
for all other function types.
@seealso{profexplore, profile}
@end deftypefn
