# spfun

```octave
function y = spfun (f, S)
```

@deftypefn {} {@var{y} =} spfun (@var{f}, @var{S})
Compute @code{f (@var{S})} for the nonzero elements of @var{S}.

The input function @var{f} is applied only to the nonzero elements of
the input matrix @var{S} which is typically sparse.  The function @var{f}
can be passed as a string, function handle, or inline function.

The output @var{y} is a sparse matrix with the same sparsity structure as
the input @var{S}.  @code{spfun} preserves sparsity structure which is
different than simply applying the function @var{f} to the sparse matrix
@var{S} when @code{@var{f} (0) != 0}.

Example

Sparsity preserving @code{spfun} versus normal function application

@example
@group
S = pi * speye (2,2)
S =

Compressed Column Sparse (rows = 2, cols = 2, nnz = 2 [50%])

  (1, 1) -> 3.1416
  (2, 2) -> 3.1416

y = spfun (@@cos, S)
y =

Compressed Column Sparse (rows = 2, cols = 2, nnz = 2 [50%])

  (1, 1) -> -1
  (2, 2) -> -1
@end group

@group
y = cos (S)
y =

Compressed Column Sparse (rows = 2, cols = 2, nnz = 4 [100%])

  (1, 1) -> -1
  (2, 1) -> 1
  (1, 2) -> 1
  (2, 2) -> -1

@end group
@end example
@seealso{arrayfun, cellfun, structfun}
@end deftypefn
