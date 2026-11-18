# pagetranspose

```octave
function B = pagetranspose (A)
```

@deftypefn {} {@var{B} =} pagetranspose (@var{A})
Return the page-wise transpose of the N-dimensional array @var{A}.

This is equivalent to @tcode{@var{A}(:,:, @var{k}).@:'} for each page
@var{k}.

@seealso{pagectranspose, transpose, permute}
@end deftypefn
