# svds

```octave
function [u, s, v, flag] = svds (A, k, sigma, opts)
```

@deftypefn  {} {@var{s} =} svds (@var{A})
@deftypefnx {} {@var{s} =} svds (@var{A}, @var{k})
@deftypefnx {} {@var{s} =} svds (@var{A}, @var{k}, @var{sigma})
@deftypefnx {} {@var{s} =} svds (@var{A}, @var{k}, @var{sigma}, @var{opts})
@deftypefnx {} {[@var{u}, @var{s}, @var{v}] =} svds (@dots{})
@deftypefnx {} {[@var{u}, @var{s}, @var{v}, @var{flag}] =} svds (@dots{})

Find a few singular values of the matrix @var{A}.

The singular values are calculated using

@example
@group
[@var{m}, @var{n}] = size (@var{A});
@var{s} = eigs ([sparse(@var{m}, @var{m}), @var{A};
                     @var{A}', sparse(@var{n}, @var{n})])
@end group
@end example

The eigenvalues returned by @code{eigs} correspond to the singular values
of @var{A}.  The number of singular values to calculate is given by @var{k}
and defaults to 6.

The argument @var{sigma} specifies which singular values to find.  When
@var{sigma} is the string @qcode{'L'}, the default, the largest singular
values of @var{A} are found.  Otherwise, @var{sigma} must be a real scalar
and the singular values closest to @var{sigma} are found.  As a corollary,
@code{@var{sigma} = 0} finds the smallest singular values.  Note that for
relatively small values of @var{sigma}, there is a chance that the
requested number of singular values will not be found.  In that case
@var{sigma} should be increased.

@var{opts} is a structure defining options that @code{svds} will pass
to @code{eigs}.  The possible fields of this structure are documented in
@code{eigs}.  By default, @code{svds} sets the following three fields:

@table @code
@item tol
The required convergence tolerance for the singular values.  The default
value is 1e-10.  @code{eigs} is passed @code{@var{tol} / sqrt (2)}.

@item maxit
The maximum number of iterations.  The default is 300.

@item disp
The level of diagnostic printout (0|1|2).  If @code{disp} is 0 then
diagnostics are disabled.  The default value is 0.
@end table

If more than one output is requested then @code{svds} will return an
approximation of the singular value decomposition of @var{A}

@example
@var{A}_approx = @var{u}*@var{s}*@var{v}'
@end example

@noindent
where @var{A}_approx is a matrix of size @var{A} but only rank @var{k}.

@var{flag} returns 0 if the algorithm has successfully converged, and 1
otherwise.  The test for convergence is

@example
@group
norm (@var{A}*@var{v} - @var{u}*@var{s}, 1) <= @var{tol} * norm (@var{A}, 1)
@end group
@end example

@code{svds} is best for finding only a few singular values from a large
sparse matrix.  Otherwise, @code{svd (full (@var{A}))} will likely be more
efficient.
@seealso{svd, eigs}
@end deftypefn
