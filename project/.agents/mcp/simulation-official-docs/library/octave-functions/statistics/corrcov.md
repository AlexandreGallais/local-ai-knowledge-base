# corrcov

```octave
function [R, s] = corrcov (c)
```

@deftypefn  {} {@var{r} =} corrcov (@var{c})
@deftypefnx {} {[@var{r}, @var{s}] =} corrcov (@var{c})
Convert matrix of covariance coefficients to a matrix of correlation
coefficients.

Given a numeric, square, symmetric, and positive semi-definite matrix of
covariance coefficients, @var{c}, calculate the corresponding linear
correlation coefficient matrix, @var{r}, that would be produced from the
same variables that produced @var{c}.

The correlation and covariance coefficients for two vectors, @var{A} and
@var{B}, are related by:

@tex
$$
{\rm corr}(A,B) = {{\rm cov}(A,B) \over \sqrt{{\rm cov}(A,A) \cdot  {\rm cov}(B,B)}}
$$
@end tex
@ifnottex

@example
corr (@var{A},@var{B}) = cov (@var{A},@var{B}) / sqrt (cov (@var{A},@var{A}) * cov (@var{B},@var{B}))
@end example

@end ifnottex

The output @var{r} will be the same shape and type as the input, @var{c},
where each element @var{r}(@var{i},@var{j}) contains the correlation
coefficient calculated using @var{c}(@var{i},@var{j}) as described above.

If the optional output @var{s} is requested, it will contain a column vector
of the standard deviations of the variables that produced the covariance
matrix @var{c}.  Noting that the variances of the variables are contained in
the main diagonal of @var{c}, this is equivalent output to
@w{@code{sqrt (diag ( @var{c}))}}.

Implementation Note: A proper covariance matrix as produced by @code{cov} is
square, symmetric, and positive semi-definite.  @code{corrcov} only uses an
approximate check for the latter that may pass improper inputs with small
negative eigenvalues.

@seealso{cov, corr, corrcoef}
@end deftypefn
