# ellipke

```octave
function [k, e] = ellipke (m, tol = [])
```

@deftypefn  {} {@var{k} =} ellipke (@var{m})
@deftypefnx {} {@var{k} =} ellipke (@var{m}, @var{tol})
@deftypefnx {} {[@var{k}, @var{e}] =} ellipke (@dots{})
Compute complete elliptic integrals of the first K(@var{m}) and second
E(@var{m}) kind.

@var{m} must be a scalar or real array with -Inf @leq{} @var{m} @leq{} 1.

The optional input @var{tol} controls the stopping tolerance of the
algorithm and defaults to @code{eps (class (@var{m}))}.  The tolerance can
be increased to compute a faster, less accurate approximation.

When called with one output only elliptic integrals of the first kind are
returned.

Mathematical Note:

Elliptic integrals of the first kind are defined as
@tex
$$
{\rm K} (m) = \int_0^1 {dt \over \sqrt{(1 - t^2) (1 - m t^2)}}
$$
@end tex
@ifnottex

@example
@group
         1
        /               dt
K (m) = | ------------------------------
        / sqrt ((1 - t^2)*(1 - m*t^2))
       0
@end group
@end example

@end ifnottex

Elliptic integrals of the second kind are defined as
@tex
$$
{\rm E} (m) = \int_0^1 {\sqrt{1 - m t^2} \over \sqrt{1 - t^2}} dt
$$
@end tex
@ifnottex

@example
@group
         1
        /  sqrt (1 - m*t^2)
E (m) = |  ------------------ dt
        /  sqrt (1 - t^2)
       0
@end group
@end example

@end ifnottex

Reference: @nospell{Milton Abramowitz and Irene A. Stegun},
@cite{Handbook of Mathematical Functions}, Chapter 17, Dover, 1965.
@seealso{ellipj}
@end deftypefn
