# colperm

```octave
function p = colperm (s)
```

@deftypefn {} {@var{p} =} colperm (@var{s})
Return the column permutations such that the columns of
@code{@var{s}(:, @var{p})} are ordered in terms of increasing number of
nonzero elements.

If @var{s} is symmetric, then @var{p} is chosen such that
@code{@var{s}(@var{p}, @var{p})} orders the rows and columns with
increasing number of nonzero elements.
@end deftypefn
