# normest1

```octave
function [nest, v, w, iter] = normest1 (A, t = [], x0 = [], varargin)
```

@deftypefn  {} {@var{nest} =} normest1 (@var{A})
@deftypefnx {} {@var{nest} =} normest1 (@var{A}, @var{t})
@deftypefnx {} {@var{nest} =} normest1 (@var{A}, @var{t}, @var{x0})
@deftypefnx {} {@var{nest} =} normest1 (@var{Afcn}, @var{t}, @var{x0}, @var{p1}, @var{p2}, @dots{})
@deftypefnx {} {[@var{nest}, @var{v}] =} normest1 (@var{A}, @dots{})
@deftypefnx {} {[@var{nest}, @var{v}, @var{w}] =} normest1 (@var{A}, @dots{})
@deftypefnx {} {[@var{nest}, @var{v}, @var{w}, @var{iter}] =} normest1 (@var{A}, @dots{})
Estimate the 1-norm of the matrix @var{A} using a block algorithm.

@code{normest1} is best for large sparse matrices where only an estimate of
the norm is required.  For small to medium sized matrices, consider using
@code{norm (@var{A}, 1)}.  In addition, @code{normest1} can be used for the
estimate of the 1-norm of a linear operator @var{A} when matrix-vector
products @code{@var{A} * @var{x}} and @code{@var{A}' * @var{x}} can be
cheaply computed.  In this case, instead of the matrix @var{A}, a function
@code{@var{Afcn} (@var{flag}, @var{x})} is used; it must return:

@itemize @bullet
@item
the dimension @var{n} of @var{A}, if @var{flag} is @qcode{"dim"}

@item
true if @var{A} is a real operator, if @var{flag} is @qcode{"real"}

@item
the result @code{@var{A} * @var{x}}, if @var{flag} is @qcode{"notransp"}

@item
the result @code{@var{A}' * @var{x}}, if @var{flag} is @qcode{"transp"}
@end itemize

A typical case is @var{A} defined by @code{@var{b} ^ @var{m}}, in which the
result @code{@var{A} * @var{x}} can be computed without even forming
explicitly @code{@var{b} ^ @var{m}} by:

@example
@group
@var{y} = @var{x};
for @var{i} = 1:@var{m}
  @var{y} = @var{b} * @var{y};
endfor
@end group
@end example

The parameters @var{p1}, @var{p2}, @dots{} are arguments of
@code{@var{Afcn} (@var{flag}, @var{x}, @var{p1}, @var{p2}, @dots{})}.

The default value for @var{t} is 2.  The algorithm requires matrix-matrix
products with sizes @var{n} x @var{n} and @var{n} x @var{t}.

The initial matrix @var{x0} should have columns of unit 1-norm.  The default
initial matrix @var{x0} has the first column
@code{ones (@var{n}, 1) / @var{n}} and, if @var{t} > 1, the remaining
columns with random elements @code{-1 / @var{n}}, @code{1 / @var{n}},
divided by @var{n}.

On output, @var{nest} is the desired estimate, @var{v} and @var{w}
are vectors such that @code{@var{w} = @var{A} * @var{v}}, with
@code{norm (@var{w}, 1)} = @code{@var{c} * norm (@var{v}, 1)}.  @var{iter}
contains in @code{@var{iter}(1)} the number of iterations (the maximum is
hardcoded to 5) and in @code{@var{iter}(2)} the total number of products
@code{@var{A} * @var{x}} or @code{@var{A}' * @var{x}} performed by the
algorithm.

Algorithm Note: @code{normest1} uses random numbers during evaluation.
Therefore, if consistent results are required, the @qcode{"state"} of the
random generator should be fixed before invoking @code{normest1}.

Reference: @nospell{N. J. Higham and F. Tisseur},
"A block algorithm for matrix 1-norm estimation, with and application to
1-norm @nospell{pseudospectra}",
@cite{@nospell{SIAM J. Matrix Anal.@: Appl.@:}}, @w{Vol.@: 21}, @w{No.@: 4},
@w{pp.@: 1185}--1201, 2000.

@seealso{normest, norm, cond, condest}
@end deftypefn
