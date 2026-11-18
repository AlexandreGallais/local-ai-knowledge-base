# cell2mat

```octave
function m = cell2mat (c)
```

@deftypefn {} {@var{m} =} cell2mat (@var{c})
Convert the cell array @var{c} into a matrix by concatenating all
elements of @var{c} into a hyperrectangle.

Elements of @var{c} must be numeric, logical, or char matrices; or cell
arrays; or structs; and @code{cat} must be able to concatenate them
together.
@seealso{mat2cell, num2cell}
@end deftypefn
