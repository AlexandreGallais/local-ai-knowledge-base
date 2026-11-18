# rref

```octave
function [A, k] = rref (A, tol)
```

@deftypefn  {} {@var{r} =} rref (@var{A})
@deftypefnx {} {@var{r} =} rref (@var{A}, @var{tol})
@deftypefnx {} {[@var{r}, @var{k}] =} rref (@dots{})
Return the reduced row echelon form of @var{A}.

@var{tol} defaults to
@code{eps * max (size (@var{A})) * norm (@var{A}, inf)}.

The optional return argument @var{k} contains the vector of
"bound variables", which are those columns on which elimination has been
performed.

@end deftypefn
