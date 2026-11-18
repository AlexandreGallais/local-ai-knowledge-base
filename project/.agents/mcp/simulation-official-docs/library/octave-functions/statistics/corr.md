# corr

```octave
function r = corr (x, y = [])
```

@deftypefn  {} {@var{r} =} corr (@var{x})
@deftypefnx {} {@var{r} =} corr (@var{x}, @var{y})
Compute matrix of correlation coefficients.

If each row of @var{x} and @var{y} is an observation and each column is
a variable, then the @w{(@var{i}, @var{j})-th}@ entry of
@code{corr (@var{x}, @var{y})} is the correlation between the
@var{i}-th variable in @var{x} and the @var{j}-th variable in @var{y}.
@var{x} and @var{y} must have the same number of rows (observations).  The
correlation coefficient is calculated for two variable vectors @var{A} and
@var{B} (columns of @var{x} and @var{y}) as:
@tex
$$
{\rm corr}(A,B) = {{\rm cov}(A,B) \over {\rm std}(A) \, {\rm std}(B)}
$$
@end tex
@ifnottex

@example
corr (@var{A},@var{B}) = cov (@var{A},@var{B}) / (std (@var{A}) * std (@var{B}))
@end example

The output variable @var{r} will have size n x m, where n and m are the
number of variables (columns) in @var{x} and @var{y}, respectively.  Note
that as the standard deviation of any scalar is zero, the correlation
coefficient will be returned as NaN for any scalar or single-row inputs.

@end ifnottex
If called with one argument, compute @code{corr (@var{x}, @var{x})},
the correlation between the each pair of columns of @var{x}.
@seealso{cov, corrcoef}
@end deftypefn
