# pagectranspose

```octave
function B = pagectranspose (A)
```

@deftypefn {} {@var{y} =} pagectranspose (@var{A})
Return the page-wise complex conjugate transpose of the N-dimensional array
@var{A}.

This is equivalent to @tcode{@var{A}(:,:, @var{k})'} for each page @var{k}.

@seealso{pagetranspose, ctranspose, permute}
@end deftypefn
