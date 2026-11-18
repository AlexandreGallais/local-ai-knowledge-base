# discrete_rnd

```octave
function rnd = discrete_rnd (v, p, varargin)
```

@deftypefn  {} {@var{rnd} =} discrete_rnd (@var{v}, @var{p})
@deftypefnx {} {@var{rnd} =} discrete_rnd (@var{v}, @var{p}, @var{r})
@deftypefnx {} {@var{rnd} =} discrete_rnd (@var{v}, @var{p}, @var{r}, @var{c}, @dots{})
@deftypefnx {} {@var{rnd} =} discrete_rnd (@var{v}, @var{p}, [@var{sz}])
Return a matrix of random samples from the univariate distribution which
assumes the values in @var{v} with probabilities @var{p}.

When called with a single size argument, return a square matrix with
the dimension specified.  When called with more than one scalar argument the
first two arguments are taken as the number of rows and columns and any
further arguments specify additional matrix dimensions.  The size may also
be specified with a vector of dimensions @var{sz}.

If no size arguments are given then the result matrix is the common size of
@var{v} and @var{p}.
@end deftypefn
