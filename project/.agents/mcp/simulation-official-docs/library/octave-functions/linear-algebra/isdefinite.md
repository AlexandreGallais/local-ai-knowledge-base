# isdefinite

```octave
function tf = isdefinite (A, tol)
```

@deftypefn  {} {@var{tf} =} isdefinite (@var{A})
@deftypefnx {} {@var{tf} =} isdefinite (@var{A}, @var{tol})
Return true if @var{A} is symmetric positive definite numeric matrix within
the tolerance specified by @var{tol}.

If @var{tol} is omitted, use a tolerance of
@code{100 * eps * norm (@var{A}, "fro")}.

Background: A positive definite matrix has eigenvalues which are all
greater than zero.  A positive semi-definite matrix has eigenvalues which
are all greater than or equal to zero.  The matrix @var{A} is very likely to
be positive semi-definite if the following two conditions hold for a
suitably small tolerance @var{tol}.

@example
@group
isdefinite (@var{A}) @xresult{} 0
isdefinite (@var{A} + 5*@var{tol}, @var{tol}) @xresult{} 1
@end group
@end example
@seealso{issymmetric, ishermitian}
@end deftypefn
