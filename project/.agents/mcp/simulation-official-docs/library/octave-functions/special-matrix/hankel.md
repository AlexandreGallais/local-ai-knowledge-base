# hankel

```octave
function h = hankel (c, r)
```

@deftypefn  {} {@var{h} =} hankel (@var{c})
@deftypefnx {} {@var{h} =} hankel (@var{c}, @var{r})
Return the Hankel matrix constructed from the first column @var{c}, and
(optionally) the last row @var{r}.

If the last element of @var{c} is not the same as the first element of
@var{r}, the last element of @var{c} is used.  If the second argument is
omitted, it is assumed to be a vector of zeros with the same size as
@var{c}.

A Hankel matrix formed from an m-vector @var{c}, and an n-vector @var{r},
has the elements
@tex
$$
H(i, j) = \cases{c_{i+j-1},&$i+j-1\le m$;\cr r_{i+j-m},&otherwise.\cr}
$$
@end tex
@ifnottex

@example
@group
H(i,j) = c(i+j-1),  i+j-1 <= m;
H(i,j) = r(i+j-m),  otherwise
@end group
@end example

@end ifnottex
@seealso{hadamard, toeplitz}
@end deftypefn
