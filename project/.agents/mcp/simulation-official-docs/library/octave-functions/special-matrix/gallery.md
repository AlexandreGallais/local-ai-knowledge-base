# gallery

```octave
function varargout = gallery (name, varargin)
```

@deftypefn  {} {} gallery (@var{name})
@deftypefnx {} {} gallery (@var{name}, @var{args})
Create interesting matrices for testing.

@end deftypefn

@deftypefn  {} {@var{c} =} gallery ("cauchy", @var{x})
@deftypefnx {} {@var{c} =} gallery ("cauchy", @var{x}, @var{y})
Create a Cauchy matrix.

@end deftypefn

@deftypefn  {} {@var{c} =} gallery ("chebspec", @var{n})
@deftypefnx {} {@var{c} =} gallery ("chebspec", @var{n}, @var{k})
Create a Chebyshev spectral differentiation matrix.

@end deftypefn

@deftypefn  {} {@var{c} =} gallery ("chebvand", @var{p})
@deftypefnx {} {@var{c} =} gallery ("chebvand", @var{m}, @var{p})
Create a @nospell{Vandermonde}-like matrix for the Chebyshev polynomials.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("chow", @var{n})
@deftypefnx {} {@var{a} =} gallery ("chow", @var{n}, @var{alpha})
@deftypefnx {} {@var{a} =} gallery ("chow", @var{n}, @var{alpha}, @var{delta})
Create a Chow matrix -- a singular Toeplitz lower Hessenberg matrix.

@end deftypefn

@deftypefn {} {@var{c} =} gallery ("circul", @var{v})
Create a circulant matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("clement", @var{n})
@deftypefnx {} {@var{a} =} gallery ("clement", @var{n}, @var{k})
Create a tridiagonal matrix with zero diagonal entries.

@end deftypefn

@deftypefn  {} {@var{c} =} gallery ("compar", @var{a})
@deftypefnx {} {@var{c} =} gallery ("compar", @var{a}, @var{k})
Create a comparison matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("condex", @var{n})
@deftypefnx {} {@var{a} =} gallery ("condex", @var{n}, @var{k})
@deftypefnx {} {@var{a} =} gallery ("condex", @var{n}, @var{k}, @var{theta})
Create a @nospell{"counterexample"} matrix to a condition estimator.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("cycol", [@var{m} @var{n}])
@deftypefnx {} {@var{a} =} gallery ("cycol", @var{n})
@deftypefnx {} {@var{a} =} gallery (@dots{}, @var{k})
Create a matrix whose columns repeat cyclically.

@end deftypefn

@deftypefn  {} {[@var{c}, @var{d}, @var{e}] =} gallery ("dorr", @var{n})
@deftypefnx {} {[@var{c}, @var{d}, @var{e}] =} gallery ("dorr", @var{n}, @var{theta})
@deftypefnx {} {@var{a} =} gallery ("dorr", @dots{})
Create a diagonally dominant, ill-conditioned, tridiagonal matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("dramadah", @var{n})
@deftypefnx {} {@var{a} =} gallery ("dramadah", @var{n}, @var{k})
Create a (0, 1) matrix whose inverse has large integer entries.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("fiedler", @var{c})
Create a symmetric @nospell{Fiedler} matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("forsythe", @var{n})
@deftypefnx {} {@var{a} =} gallery ("forsythe", @var{n}, @var{alpha})
@deftypefnx {} {@var{a} =} gallery ("forsythe", @var{n}, @var{alpha}, @var{lambda})
Create a @nospell{Forsythe} matrix (a perturbed Jordan block).

@end deftypefn

@deftypefn  {} {@var{f} =} gallery ("frank", @var{n})
@deftypefnx {} {@var{f} =} gallery ("frank", @var{n}, @var{k})
Create a Frank matrix (ill-conditioned eigenvalues).

@end deftypefn

@deftypefn {} {@var{c} =} gallery ("gcdmat", @var{n})
Create a greatest common divisor matrix.

@var{c} is an @var{n}-by-@var{n} matrix whose values correspond to the
greatest common divisor of its coordinate values, i.e., @var{c}(i,j)
correspond @code{gcd (i, j)}.
@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("gearmat", @var{n})
@deftypefnx {} {@var{a} =} gallery ("gearmat", @var{n}, @var{i})
@deftypefnx {} {@var{a} =} gallery ("gearmat", @var{n}, @var{i}, @var{j})
Create a Gear matrix.

@end deftypefn

@deftypefn  {} {@var{g} =} gallery ("grcar", @var{n})
@deftypefnx {} {@var{g} =} gallery ("grcar", @var{n}, @var{k})
Create a Toeplitz matrix with sensitive eigenvalues.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("hanowa", @var{n})
@deftypefnx {} {@var{a} =} gallery ("hanowa", @var{n}, @var{d})
Create a matrix whose eigenvalues lie on a vertical line in the complex
plane.

@end deftypefn

@deftypefn  {} {@var{v} =} gallery ("house", @var{x})
@deftypefnx {} {[@var{v}, @var{beta}] =} gallery ("house", @var{x})
Create a householder matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("integerdata", @var{imax}, [@var{M} @var{N} @dots{}], @var{j})
@deftypefnx {} {@var{a} =} gallery ("integerdata", @var{imax}, @var{M}, @var{N}, @dots{}, @var{j})
@deftypefnx {} {@var{a} =} gallery ("integerdata", [@var{imin}, @var{imax}], [@var{M} @var{N} @dots{}], @var{j})
@deftypefnx {} {@var{a} =} gallery ("integerdata", [@var{imin}, @var{imax}], @var{M}, @var{N}, @dots{}, @var{j})
@deftypefnx {} {@var{a} =} gallery ("integerdata", @dots{}, "@var{class}")
Create a matrix with random integers in the range [1, @var{imax}].
If @var{imin} is given then the integers are in the range
[@var{imin}, @var{imax}].

The second input is a matrix of dimensions describing the size of the
output.  The dimensions can also be input as comma-separated arguments.

The input @var{j} is an integer index in the range [0, 2^32-1].  The values
of the output matrix are always exactly the same (reproducibility) for a
given size input and @var{j} index.

The final optional argument determines the class of the resulting matrix.
Possible values for @var{class}: @qcode{"uint8"}, @qcode{"uint16"},
@qcode{"uint32"}, @qcode{"int8"}, @qcode{"int16"}, int32", @qcode{"single"},
@qcode{"double"}.  The default is @qcode{"double"}.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("invhess", @var{x})
@deftypefnx {} {@var{a} =} gallery ("invhess", @var{x}, @var{y})
Create the inverse of an upper Hessenberg matrix.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("invol", @var{n})
Create an involutory matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("ipjfact", @var{n})
@deftypefnx {} {@var{a} =} gallery ("ipjfact", @var{n}, @var{k})
Create a Hankel matrix with factorial elements.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("jordbloc", @var{n})
@deftypefnx {} {@var{a} =} gallery ("jordbloc", @var{n}, @var{lambda})
Create a Jordan block.

@end deftypefn

@deftypefn  {} {@var{u} =} gallery ("kahan", @var{n})
@deftypefnx {} {@var{u} =} gallery ("kahan", @var{n}, @var{theta})
@deftypefnx {} {@var{u} =} gallery ("kahan", @var{n}, @var{theta}, @var{pert})
Create a @nospell{Kahan} matrix (upper trapezoidal).

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("kms", @var{n})
@deftypefnx {} {@var{a} =} gallery ("kms", @var{n}, @var{rho})
Create a @nospell{Kac-Murdock-Szego} Toeplitz matrix.

@end deftypefn

@deftypefn  {} {@var{b} =} gallery ("krylov", @var{a})
@deftypefnx {} {@var{b} =} gallery ("krylov", @var{a}, @var{x})
@deftypefnx {} {@var{b} =} gallery ("krylov", @var{a}, @var{x}, @var{j})
Create a Krylov matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("lauchli", @var{n})
@deftypefnx {} {@var{a} =} gallery ("lauchli", @var{n}, @var{mu})
Create a @nospell{Lauchli} matrix (rectangular).

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("lehmer", @var{n})
Create a @nospell{Lehmer} matrix (symmetric positive definite).

@end deftypefn

@deftypefn {} {@var{t} =} gallery ("lesp", @var{n})
Create a tridiagonal matrix with real, sensitive eigenvalues.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("lotkin", @var{n})
Create a @nospell{Lotkin} matrix.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("minij", @var{n})
Create a symmetric positive definite matrix MIN(i,j).

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("moler", @var{n})
@deftypefnx {} {@var{a} =} gallery ("moler", @var{n}, @var{alpha})
Create a @nospell{Moler} matrix (symmetric positive definite).

@end deftypefn

@deftypefn {} {[@var{a}, @var{t}] =} gallery ("neumann", @var{n})
Create a singular matrix from the discrete @nospell{Neumann} problem
(sparse).

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("normaldata", [@var{M} @var{N} @dots{}], @var{j})
@deftypefnx {} {@var{a} =} gallery ("normaldata", @var{M}, @var{N}, @dots{}, @var{j})
@deftypefnx {} {@var{a} =} gallery ("normaldata", @dots{}, "@var{class}")
Create a matrix with random samples from the standard normal distribution
(mean = 0, std = 1).

The first input is a matrix of dimensions describing the size of the output.
The dimensions can also be input as comma-separated arguments.

The input @var{j} is an integer index in the range [0, 2^32-1].  The values
of the output matrix are always exactly the same (reproducibility) for a
given size input and @var{j} index.

The final optional argument determines the class of the resulting matrix.
Possible values for @var{class}: @qcode{"single"}, @qcode{"double"}.
The default is @qcode{"double"}.

@end deftypefn

@deftypefn  {} {@var{q} =} gallery ("orthog", @var{n})
@deftypefnx {} {@var{q} =} gallery ("orthog", @var{n}, @var{k})
Create orthogonal and nearly orthogonal matrices.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("parter", @var{n})
Create a @nospell{Parter} matrix (a Toeplitz matrix with singular values
near pi).

@end deftypefn

@deftypefn  {} {@var{p} =} gallery ("pei", @var{n})
@deftypefnx {} {@var{p} =} gallery ("pei", @var{n}, @var{alpha})
Create a Pei matrix.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("poisson", @var{n})
Create a block tridiagonal matrix from Poisson's equation (sparse).

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("prolate", @var{n})
@deftypefnx {} {@var{a} =} gallery ("prolate", @var{n}, @var{w})
Create a prolate matrix (symmetric, ill-conditioned Toeplitz matrix).

@end deftypefn

@deftypefn {} {@var{h} =} gallery ("randhess", @var{x})
Create a random, orthogonal upper Hessenberg matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("rando", @var{n})
@deftypefnx {} {@var{a} =} gallery ("rando", @var{n}, @var{k})
Create a random matrix with elements -1, 0 or 1.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("randsvd", @var{n})
@deftypefnx {} {@var{a} =} gallery ("randsvd", @var{n}, @var{kappa})
@deftypefnx {} {@var{a} =} gallery ("randsvd", @var{n}, @var{kappa}, @var{mode})
@deftypefnx {} {@var{a} =} gallery ("randsvd", @var{n}, @var{kappa}, @var{mode}, @var{kl})
@deftypefnx {} {@var{a} =} gallery ("randsvd", @var{n}, @var{kappa}, @var{mode}, @var{kl}, @var{ku})
Create a random matrix with pre-assigned singular values.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("redheff", @var{n})
Create a zero and ones matrix of @nospell{Redheffer} associated with the
Riemann hypothesis.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("riemann", @var{n})
Create a matrix associated with the Riemann hypothesis.

@end deftypefn

@deftypefn {} {@var{a} =} gallery ("ris", @var{n})
Create a symmetric Hankel matrix.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("smoke", @var{n})
@deftypefnx {} {@var{a} =} gallery ("smoke", @var{n}, @var{k})
Create a complex matrix, with a @nospell{"smoke ring"} pseudospectrum.

@end deftypefn

@deftypefn  {} {@var{t} =} gallery ("toeppd", @var{n})
@deftypefnx {} {@var{t} =} gallery ("toeppd", @var{n}, @var{m})
@deftypefnx {} {@var{t} =} gallery ("toeppd", @var{n}, @var{m}, @var{w})
@deftypefnx {} {@var{t} =} gallery ("toeppd", @var{n}, @var{m}, @var{w}, @var{theta})
Create a symmetric positive definite Toeplitz matrix.

@end deftypefn

@deftypefn  {} {@var{p} =} gallery ("toeppen", @var{n})
@deftypefnx {} {@var{p} =} gallery ("toeppen", @var{n}, @var{a})
@deftypefnx {} {@var{p} =} gallery ("toeppen", @var{n}, @var{a}, @var{b})
@deftypefnx {} {@var{p} =} gallery ("toeppen", @var{n}, @var{a}, @var{b}, @var{c})
@deftypefnx {} {@var{p} =} gallery ("toeppen", @var{n}, @var{a}, @var{b}, @var{c}, @var{d})
@deftypefnx {} {@var{p} =} gallery ("toeppen", @var{n}, @var{a}, @var{b}, @var{c}, @var{d}, @var{e})
Create a pentadiagonal Toeplitz matrix (sparse).

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("tridiag", @var{x}, @var{y}, @var{z})
@deftypefnx {} {@var{a} =} gallery ("tridiag", @var{n})
@deftypefnx {} {@var{a} =} gallery ("tridiag", @var{n}, @var{c}, @var{d}, @var{e})
Create a tridiagonal matrix (sparse).

@end deftypefn

@deftypefn  {} {@var{t} =} gallery ("triw", @var{n})
@deftypefnx {} {@var{t} =} gallery ("triw", @var{n}, @var{alpha})
@deftypefnx {} {@var{t} =} gallery ("triw", @var{n}, @var{alpha}, @var{k})
Create an upper triangular matrix discussed by
@nospell{Kahan, Golub, and Wilkinson}.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("uniformdata", [@var{M} @var{N} @dots{}], @var{j})
@deftypefnx {} {@var{a} =} gallery ("uniformdata", @var{M}, @var{N}, @dots{}, @var{j})
@deftypefnx {} {@var{a} =} gallery ("uniformdata", @dots{}, "@var{class}")
Create a matrix with random samples from the standard uniform distribution
(range [0,1]).

The first input is a matrix of dimensions describing the size of the output.
The dimensions can also be input as comma-separated arguments.

The input @var{j} is an integer index in the range [0, 2^32-1].  The values
of the output matrix are always exactly the same (reproducibility) for a
given size input and @var{j} index.

The final optional argument determines the class of the resulting matrix.
Possible values for @var{class}: @qcode{"single"}, @qcode{"double"}.
The default is @qcode{"double"}.

@end deftypefn

@deftypefn  {} {@var{a} =} gallery ("wathen", @var{nx}, @var{ny})
@deftypefnx {} {@var{a} =} gallery ("wathen", @var{nx}, @var{ny}, @var{k})
Create the @nospell{Wathen} matrix.

@end deftypefn

@deftypefn {} {[@var{a}, @var{b}] =} gallery ("wilk", @var{n})
Create various specific matrices devised/discussed by Wilkinson.

@end deftypefn
