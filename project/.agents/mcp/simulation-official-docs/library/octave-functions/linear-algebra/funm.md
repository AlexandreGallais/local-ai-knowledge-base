# funm

```octave
function [F, exitflag, output] = funm (A, fun, varargin)
```

@deftypefn  {} {@var{F} =} funm (@var{A}, @var{fun})
@deftypefnx {} {@var{F} =} funm (@var{A}, @var{fun}, @var{options})
@deftypefnx {} {@var{F} =} funm (@var{A}, @var{fun}, @var{options}, @var{p1}, @dots{})
@deftypefnx {} {[@var{F}, @var{exitflag}] =} funm (@dots{})
@deftypefnx {} {[@var{F}, @var{exitflag}, @var{output}] =} funm (@dots{})

Evaluate a general matrix function.

@code{funm (@var{A}, @var{fun})} evaluates the function @var{fun} at the
square matrix @var{A}.  The input @w{@code{@var{fun} (@var{x}, @var{k})}}
must return the @var{k}'th derivative of the function represented by
@var{fun} evaluated at the vector @var{x}.  The function @var{fun} must have
a Taylor series representation with an infinite radius of convergence.

The special functions @code{exp}, @code{log}, @code{sin}, @code{cos},
@code{sinh}, and @code{cosh} can be passed by function handle; for example
@w{@code{funm (@var{A}, @@cos)}}.

For matrix square roots, use @code{sqrtm} instead.  For matrix exponentials,
either @code{expm} or @w{@code{funm (@var{A}, @@exp)}} may be faster or more
accurate, depending on @var{A}.

An optional third input in the form of an options struct @var{options} can
be used to specify verbosity of the function and to influence certain of the
algorithms.  See the references below for more details on the latter.

@var{options} can have the following fields:

@table @code
@item Display
Specify what information will be printed to the screen during the course of
calculations.  It can be either a string value of @qcode{"off"} (no info,
the default), @qcode{"on"} (some info), @qcode{"verbose"} (maximum info); or
a scalar value between @code{0} (no info, the default) and @code{5} (maximum
info).  When @code{Display} is @qcode{"verbose"} or a scalar value @geq{}
@code{3}, a plot of the eigenvalues and groups will also be shown.

@item TolBlk
Tolerance used in determining the blocking (positive scalar, default:
@code{0.1}).

@item TolTay
Tolerance used in the convergence test for evaluating the Taylor series
(positive scalar, default: @code{eps}).

@item MaxTerms
The maximum number of Taylor series terms (positive integer, default:
@code{250}).

@item MaxSqrt
The maximum number of square roots evaluated in the course of inverse
scaling and squaring (positive integer, default: @code{100}).  This option
is only used when computing a logarithm where it functions similarly to
@code{MaxTerms}.

@item Ord
Define a custom blocking pattern in the form of a vector whose length equals
the order of the matrix @var{A}.

@end table

Octave accepts any case for these fieldnames.

All inputs beyond @var{options} will be passed as positional arguments to
the function @var{fun}.

Optional outputs:

@table @var
@item exitflag
Scalar exit flag that describes the exit condition:

@itemize @w{}
@item @code{0} --- The algorithm was successful.

@item @code{1} --- One or more Taylor series evaluations did not converge,
but the computed value of @var{F} might still be accurate.
@end itemize

@item output
Structure with the following fields:

@table @code
@item terms
Vector for which @code{output.terms(i)} is the number of Taylor series terms
used when evaluating the @nospell{i'th} block, or, in the case of the
logarithm, the number of square roots of matrices of dimension greater than
2.

@item ind
Cell array for which the (i,j) block of the reordered Schur factor @var{T}
is @code{@var{T}(output.ind@{i@}, output.ind@{j@})}.

@item ord
Ordering of the Schur form, as passed to @code{ordschur}.

@item T
Reordered Schur form.
@end table

If the Schur form is diagonal then
@code{output = struct ("terms", ones (n, 1), "ind", @{1:n@}, "ord", [],
"T", @var{T})}.
@end table

Example:

@example
@group
F = funm (magic (3), @@sin);
@result{} F =
   -0.3850    1.0191    0.0162
    0.6179    0.2168   -0.1844
    0.4173   -0.5856    0.8185
@end group
@end example

The code

@example
@group
S = funm (X, @@sin);
C = funm (X, @@cos);
@end group
@end example

@noindent
will produce the same results (within possible rounding error) as

@example
@group
E = expm (i*X);
C = real (E);
S = imag (E);
@end group
@end example

References:

@nospell{Philip I. Davies and Nicholas J. Higham},
"A @nospell{Schur-Parlett} algorithm for computing matrix functions",
@cite{SIAM Journal on Matrix Analysis and Applications}, @w{Vol.@: 25(2)},
@w{pp.@: 464}--485, 2003.

@nospell{Nicholas J. Higham}, @cite{Functions of Matrices: Theory and
Computation}, SIAM, @w{pp.@: 425}, 2008, ISBN 978-0-898716-46-7.

@seealso{expm, logm, sqrtm}
@end deftypefn
