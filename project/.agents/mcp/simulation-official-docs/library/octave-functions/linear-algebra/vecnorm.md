# vecnorm

```octave
function n = vecnorm (A, p = 2, dim)
```

@deftypefn  {} {@var{n} =} vecnorm (@var{A})
@deftypefnx {} {@var{n} =} vecnorm (@var{A}, @var{p})
@deftypefnx {} {@var{n} =} vecnorm (@var{A}, @var{p}, @var{dim})
Return the vector p-norm of the elements of array @var{A} along dimension
@var{dim}.

The p-norm of a vector is defined as
@tex
$$ {\Vert A \Vert}_p  = \left[ \sum_{i=1}^N {| A_i |}^p \right] ^ {1/p} $$
@end tex
@ifnottex

@example
@var{p-norm} (@var{A}, @var{p}) = (sum (abs (@var{A}) .^ @var{p})) ^ (1/@var{p})
@end example

@end ifnottex
The input @var{p} must be a positive scalar.  If omitted it defaults to 2
(Euclidean norm or distance).  Other special values of @var{p} are 1
(Manhattan norm, sum of absolute values) and @code{Inf} (absolute value of
largest element).

The input @var{dim} specifies the dimension of the array on which the
function operates and must be a positive integer.  If omitted the first
non-singleton dimension is used.

@seealso{norm}
@end deftypefn
