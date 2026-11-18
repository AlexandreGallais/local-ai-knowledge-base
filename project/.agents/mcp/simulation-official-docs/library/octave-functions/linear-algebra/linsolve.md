# linsolve

```octave
function [x, R] = linsolve (A, b, opts)
```

@deftypefn  {} {@var{x} =} linsolve (@var{A}, @var{b})
@deftypefnx {} {@var{x} =} linsolve (@var{A}, @var{b}, @var{opts})
@deftypefnx {} {[@var{x}, @var{R}] =} linsolve (@dots{})
Solve the linear system @code{A*x = b}.

With no options, this function is equivalent to the left division operator
@w{(@code{x = A \ b})}@ or the matrix-left-divide function
@w{(@code{x = mldivide (A, b)})}.

Octave ordinarily examines the properties of the matrix @var{A} and chooses
a solver that best matches the matrix.  By passing a structure @var{opts}
to @code{linsolve} you can inform Octave directly about the matrix @var{A}.
In this case Octave will skip the matrix examination and proceed directly
to solving the linear system producing a small speedup.

@strong{Warning:} If the matrix @var{A} does not have the properties listed
in the @var{opts} structure then the result will not be accurate AND no
warning will be given.  When in doubt, let Octave examine the matrix and
choose the appropriate solver as this step takes little time and the result
is cached so that it is done just once per linear system.  Benchmarking
with @w{Octave 12} and square matrices of 10,000 rows shows just 300
milliseconds for this step.

Possible @var{opts} fields (set value to @code{true}/@code{false}):

@table @code
@item LT
  @var{A} is lower triangular

@item UT
  @var{A} is upper triangular

@item UHESS
  @var{A} is upper Hessenberg (currently makes no difference)

@item SYM
  @var{A} is symmetric or complex Hermitian (currently makes no difference)

@item POSDEF
  @var{A} is positive definite

@item RECT
  @var{A} is general rectangular (currently makes no difference)

@item TRANSA
  Solve @code{A'*x = b} if true rather than @code{A*x = b}
@end table

The optional second output @var{R} is the reciprocal condition number of
@var{A} for square matrices or @code{0} for rectangular matrices.
@seealso{mldivide, matrix_type, rcond}
@end deftypefn
