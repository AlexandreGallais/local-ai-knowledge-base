# condest

```octave
function [cest, v] = condest (varargin)
```

@deftypefn  {} {@var{cest} =} condest (@var{A})
@deftypefnx {} {@var{cest} =} condest (@var{A}, @var{t})
@deftypefnx {} {@var{cest} =} condest (@var{A}, @var{Ainvfcn})
@deftypefnx {} {@var{cest} =} condest (@var{A}, @var{Ainvfcn}, @var{t})
@deftypefnx {} {@var{cest} =} condest (@var{A}, @var{Ainvfcn}, @var{t}, @var{p1}, @var{p2}, @dots{})
@deftypefnx {} {@var{cest} =} condest (@var{Afcn}, @var{Ainvfcn})
@deftypefnx {} {@var{cest} =} condest (@var{Afcn}, @var{Ainvfcn}, @var{t})
@deftypefnx {} {@var{cest} =} condest (@var{Afcn}, @var{Ainvfcn}, @var{t}, @var{p1}, @var{p2}, @dots{})
@deftypefnx {} {[@var{cest}, @var{v}] =} condest (@dots{})

Estimate the 1-norm condition number of a square matrix @var{A} using
@var{t} test vectors and a randomized 1-norm estimator.

The optional input @var{t} specifies the number of test vectors (default 5).

The input may be a matrix @var{A} (the algorithm is particularly
appropriate for large, sparse matrices).  Alternatively, the behavior of
the matrix can be defined implicitly by functions.  When using an implicit
definition, @code{condest} requires the following functions:

@itemize @minus
@item @code{@var{Afcn} (@var{flag}, @var{x})} which must return

@itemize @bullet
@item
the dimension @var{n} of @var{A}, if @var{flag} is @qcode{"dim"}

@item
true if @var{A} is a real operator, if @var{flag} is @qcode{"real"}

@item
the result @code{@var{A} * @var{x}}, if @var{flag} is "notransp"

@item
the result @code{@var{A}' * @var{x}}, if @var{flag} is "transp"
@end itemize

@item @code{@var{Ainvfcn} (@var{flag}, @var{x})} which must return

@itemize @bullet
@item
the dimension @var{n} of @code{inv (@var{A})}, if @var{flag} is
@qcode{"dim"}

@item
true if @code{inv (@var{A})} is a real operator, if @var{flag} is
@qcode{"real"}

@item
the result @code{inv (@var{A}) * @var{x}}, if @var{flag} is "notransp"

@item
the result @code{inv (@var{A})' * @var{x}}, if @var{flag} is "transp"
@end itemize
@end itemize

Any parameters @var{p1}, @var{p2}, @dots{} are additional arguments of
@code{@var{Afcn} (@var{flag}, @var{x}, @var{p1}, @var{p2}, @dots{})}
and @code{@var{Ainvfcn} (@var{flag}, @var{x}, @var{p1}, @var{p2}, @dots{})}.

The principal output is the 1-norm condition number estimate @var{cest}.

The optional second output @var{v} is an approximate null vector; it
satisfies the equation @code{norm (@var{A}*@var{v}, 1) ==
norm (@var{A}, 1) * norm (@var{v}, 1) / @var{cest}}.

Algorithm Note: @code{condest} uses a randomized algorithm to approximate
the 1-norms.  Therefore, if consistent results are required, the
@qcode{"state"} of the random generator should be fixed before invoking
@code{condest}.

References:

@itemize
@item
@nospell{N.J. Higham and F. Tisseur}, "A Block Algorithm for Matrix 1-Norm
Estimation, with an Application to 1-Norm Pseudospectra",
@cite{SIAM Journal on Matrix Analysis and Applications}, @w{Vol.@: 21},
@nospell{@w{Iss.@: 4}}, @w{pp.@: 1185}--1201, 2000,
@url{https://dx.doi.org/10.1137/S0895479899356080}.

@item
@nospell{N.J. Higham and F. Tisseur}, @cite{A Block Algorithm for Matrix
1-Norm Estimation, with an Application to 1-Norm Pseudospectra},
@url{https://citeseer.ist.psu.edu/223007.html}.
@end itemize

@seealso{cond, rcond, norm, normest1, normest}
@end deftypefn
