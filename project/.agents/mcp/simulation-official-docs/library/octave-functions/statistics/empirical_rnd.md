# empirical_rnd

```octave
function rnd = empirical_rnd (data, varargin)
```

@deftypefn  {} {@var{rnd} =} empirical_rnd (@var{data})
@deftypefnx {} {@var{rnd} =} empirical_rnd (@var{data}, @var{r})
@deftypefnx {} {@var{rnd} =} empirical_rnd (@var{data}, @var{r}, @var{c}, @dots{})
@deftypefnx {} {@var{rnd} =} empirical_rnd (@var{data}, [@var{sz}])
Return a matrix of random samples from the empirical distribution obtained
from the univariate sample @var{data}.

When called with a single size argument, return a square matrix with
the dimension specified.  When called with more than one scalar argument the
first two arguments are taken as the number of rows and columns and any
further arguments specify additional matrix dimensions.  The size may also
be specified with a vector of dimensions @var{sz}.

If no size arguments are given then the result matrix is a random ordering
of the sample @var{data}.
@end deftypefn
