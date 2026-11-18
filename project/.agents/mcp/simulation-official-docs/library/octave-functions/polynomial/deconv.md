# deconv

```octave
function [b, r] = deconv (y, a)
```

@deftypefn  {} {@var{b} =} deconv (@var{y}, @var{a})
@deftypefnx {} {[@var{b}, @var{r}] =} deconv (@var{y}, @var{a})
Deconvolve two vectors (polynomial division).

@code{[@var{b}, @var{r}] = deconv (@var{y}, @var{a})} solves for @var{b} and
@var{r} such that @code{@var{y} = conv (@var{a}, @var{b}) + @var{r}}.

If @var{y} and @var{a} are polynomial coefficient vectors, @var{b} will
contain the coefficients of the polynomial quotient and @var{r} will be
a remainder polynomial of lowest order.
@seealso{conv, residue}
@end deftypefn
