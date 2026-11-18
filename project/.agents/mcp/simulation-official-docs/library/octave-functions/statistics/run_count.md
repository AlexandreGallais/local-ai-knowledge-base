# run_count

```octave
function cnt = run_count (x, n, dim)
```

@deftypefn  {} {@var{cnt} =} run_count (@var{x}, @var{n})
@deftypefnx {} {@var{cnt} =} run_count (@var{x}, @var{n}, @var{dim})
Count the upward runs along the first non-singleton dimension of @var{x}
of length 1, 2, @dots{}, @var{n}-1 and greater than or equal to @var{n}.

If the optional argument @var{dim} is given then operate along this
dimension.
@seealso{runlength}
@end deftypefn
