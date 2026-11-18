# spstats

```octave
function [count, mean, var] = spstats (S, j)
```

@deftypefn  {} {[@var{count}, @var{mean}, @var{var}] =} spstats (@var{S})
@deftypefnx {} {[@var{count}, @var{mean}, @var{var}] =} spstats (@var{S}, @var{j})
Return the stats for the nonzero elements of the sparse matrix @var{S}.

@var{count} is the number of nonzeros in each column, @var{mean} is the mean
of the nonzeros in each column, and @var{var} is the variance of the
nonzeros in each column.

Called with two input arguments, if @var{S} is the data and @var{j} is the
bin number for the data, compute the stats for each bin.  In this case,
bins can contain data values of zero, whereas with
@code{spstats (@var{S})} the zeros may disappear.
@end deftypefn
