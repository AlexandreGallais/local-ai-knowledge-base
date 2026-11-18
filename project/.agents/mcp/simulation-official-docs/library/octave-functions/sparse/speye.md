# speye

```octave
function s = speye (m, n)
```

@deftypefn  {} {@var{s} =} speye ()
@deftypefnx {} {@var{s} =} speye (@var{n})
@deftypefnx {} {@var{s} =} speye (@var{m}, @var{n})
@deftypefnx {} {@var{s} =} speye ([@var{m}, @var{n}])
Return a sparse identity matrix of size @var{m}x@var{n}.

If called with no arguments, return the sparse scalar value @code{1}.

If invoked with a single scalar argument @var{n}, return a sparse square
@nospell{NxN} identity matrix.

If supplied two scalar arguments (@var{m}, @var{n}), or a 2-element vector
@w{@code{[@var{m}, @var{n}]}}, return a sparse @nospell{MxN} identity matrix
with @var{m} rows and @var{n} columns.

Programming Note: The implementation is significantly more efficient than
@w{@code{sparse (eye (@dots{}))}}@ as the full matrix is not constructed.
@seealso{sparse, spdiags, eye}
@end deftypefn
