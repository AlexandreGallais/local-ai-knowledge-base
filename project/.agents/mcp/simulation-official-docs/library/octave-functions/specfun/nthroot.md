# nthroot

```octave
function y = nthroot (x, n)
```

@deftypefn {} {@var{y} =} nthroot (@var{x}, @var{n})

Compute the real (non-complex) @var{n}-th root of @var{x}.

@var{x} must have all real entries and @var{n} must be a scalar.
If @var{n} is an even integer and @var{x} has negative entries then
@code{nthroot} aborts and issues an error.

Example:

@example
@group
nthroot (-1, 3)
@xresult{} -1
(-1) ^ (1 / 3)
@xresult{} 0.50000 - 0.86603i
@end group
@end example
@seealso{realsqrt, sqrt, cbrt}
@end deftypefn
