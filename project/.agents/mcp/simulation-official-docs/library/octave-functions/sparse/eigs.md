# eigs

```octave
function varargout = eigs (varargin)
```

@deftypefn  {} {@var{d} =} eigs (@var{A})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{k})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{k}, @var{sigma})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{k}, @var{sigma}, @var{opts})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{B})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{B}, @var{k})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{B}, @var{k}, @var{sigma})
@deftypefnx {} {@var{d} =} eigs (@var{A}, @var{B}, @var{k}, @var{sigma}, @var{opts})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{k})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{k}, @var{sigma})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{k}, @var{sigma}, @var{opts})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{B})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{B}, @var{k})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{B}, @var{k}, @var{sigma})
@deftypefnx {} {@var{d} =} eigs (@var{Af}, @var{n}, @var{B}, @var{k}, @var{sigma}, @var{opts})
@deftypefnx {} {[@var{V}, @var{D}] =} eigs (@dots{})
@deftypefnx {} {[@var{V}, @var{D}, @var{flag}] =} eigs (@dots{})
Calculate a limited number of eigenvalues and eigenvectors based on a
selection criteria.

By default, @code{eigs} solve the equation
@tex
$A \nu = \lambda \nu$,
@end tex
@ifinfo
@code{A * v = lambda * v},
@end ifinfo
where
@tex
$\lambda$ is a scalar representing one of the eigenvalues, and $\nu$
@end tex
@ifinfo
@code{lambda} is a scalar representing one of the eigenvalues, and @code{v}
@end ifinfo
is the corresponding eigenvector.  If given the positive definite matrix
@var{B} then @code{eigs} solves the general eigenvalue equation
@tex
$A \nu = \lambda B \nu$.
@end tex
@ifinfo
@code{A * v = lambda * B * v}.
@end ifinfo

The input @var{A} is a square matrix of dimension @var{n}-by-@var{n}.
Typically, @var{A} is also large and sparse.

The input @var{B} for the generalized eigenvalue problem is a square matrix
with the same size as @var{A} (@var{n}-by-@var{n}).  Typically, @var{B} is
also large and sparse.

The number of eigenvalues and eigenvectors to calculate is given by @var{k}
and defaults to 6.

The argument @var{sigma} determines which eigenvalues are returned.
@var{sigma} can be either a scalar or a string.  When @var{sigma} is a
scalar, the @var{k} eigenvalues closest to @var{sigma} are returned.  If
@var{sigma} is a string, it must be one of the following values.

@table @asis
@item @nospell{@qcode{"lm"}}
Largest Magnitude (default).

@item @nospell{@qcode{"sm"}}
Smallest Magnitude.

@item @nospell{@qcode{"la"}}
Largest Algebraic (valid only for real symmetric problems).

@item @nospell{@qcode{"sa"}}
Smallest Algebraic (valid only for real symmetric problems).

@item @nospell{@qcode{"be"}}
Both Ends, with one more from the high-end if @var{k} is odd (valid only for
real symmetric problems).

@item @nospell{@qcode{"lr"}}
Largest Real part (valid only for complex or unsymmetric problems).

@item @nospell{@qcode{"sr"}}
Smallest Real part (valid only for complex or unsymmetric problems).

@item @nospell{@qcode{"li"}}
Largest Imaginary part (valid only for complex or unsymmetric problems).

@item @nospell{@qcode{"si"}}
Smallest Imaginary part (valid only for complex or unsymmetric problems).
@end table

If @var{opts} is given, it is a structure defining possible options that
@code{eigs} should use.  The fields of the @var{opts} structure are:

@table @code
@item issym
If @var{Af} is given then this flag (true/false) determines whether the
function @var{Af} defines a symmetric problem.  It is ignored if a matrix
@var{A} is given.  The default is false.

@item isreal
If @var{Af} is given then this flag (true/false) determines whether the
function @var{Af} defines a real problem.  It is ignored if a matrix @var{A}
is given.  The default is true.

@item tol
Defines the required convergence tolerance, calculated as
@code{tol * norm (A)}.  The default is @code{eps}.

@item maxit
The maximum number of iterations.  The default is 300.

@item p
The number of @nospell{Lanczos} basis vectors to use.  More vectors will
result in faster convergence, but a greater use of memory.  The optimal
value of @code{p} is problem dependent and should be in the range
@code{@var{k} + 1} to @var{n}.  The default value is @code{2 * @var{k}}.

@item v0
The starting vector for the algorithm.  An initial vector close to the final
vector will speed up convergence.  The default is for @sc{arpack} to
randomly generate a starting vector.  If specified, @code{v0} must be
an @var{n}-by-1 vector where @code{@var{n} = rows (@var{A})}.

@item disp
The level of diagnostic printout (0|1|2).  If @code{disp} is 0 then
diagnostics are disabled.  The default value is 0.

@item cholB
If the generalized eigenvalue problem is being calculated, this flag
(true/false) specifies whether the @var{B} input represents
@code{chol (@var{B})} or simply the matrix @var{B}.  The default is false.

@item permB
The permutation vector of the Cholesky@tie{}factorization for @var{B} if
@code{cholB} is true.  It is obtained by
@code{[R, ~, permB] = chol (@var{B}, @qcode{"vector"})}.  The default is
@code{1:@var{n}}.

@end table

It is also possible to represent @var{A} by a function denoted @var{Af}.
@var{Af} must be followed by a scalar argument @var{n} defining the length
of the vector argument accepted by @var{Af}.  @var{Af} can be a function
handle, an inline function, or a string.  When @var{Af} is a string it
holds the name of the function to use.

@var{Af} is a function of the form @code{y = Af (x)} where the required
return value of @var{Af} is determined by the value of @var{sigma}.
The four possible forms are

@table @code
@item A * x
if @var{sigma} is not given or is a string other than "sm".

@item A \ x
if @var{sigma} is 0 or "sm".

@item (A - sigma * I) \ x
if @var{sigma} is a scalar not equal to 0; @code{I} is the identity matrix
of the same size as @var{A}.

@item (A - sigma * B) \ x
for the general eigenvalue problem.
@end table

The return arguments and their form depend on the number of return arguments
requested.  For a single return argument, a column vector @var{d} of length
@var{k} is returned containing the @var{k} eigenvalues that have been
found.  For two return arguments, @var{V} is an @var{n}-by-@var{k} matrix
whose columns are the @var{k} eigenvectors corresponding to the returned
eigenvalues.  The eigenvalues themselves are returned in @var{D} in the
form of a @var{k}-by-@var{k} matrix, where the elements on the diagonal
are the eigenvalues.

The third return argument @var{flag} returns the status of the convergence.
If @var{flag} is 0 then all eigenvalues have converged.  Any other value
indicates a failure to converge.

Programming Notes: For small problems, @var{n} < 500, consider using
@code{eig (full (@var{A}))}.

If @sc{arpack} fails to converge consider increasing the number of
@nospell{Lanczos} vectors (@var{opt}.p), increasing the number of iterations
(@var{opt}.maxiter), or decreasing the tolerance (@var{opt}.tol).

Reference:
This function is based on the @sc{arpack} package, written by
@nospell{R. Lehoucq, K. Maschhoff, D. Sorensen, and C. Yang}.  For more
information see @url{http://www.caam.rice.edu/software/ARPACK/}.

@seealso{eig, svds}
@end deftypefn
