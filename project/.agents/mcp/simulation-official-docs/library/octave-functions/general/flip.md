# flip

```octave
function B = flip (A, dim)
```

@deftypefn  {} {@var{B} =} flip (@var{A})
@deftypefnx {} {@var{B} =} flip (@var{A}, @var{dim})
Return a copy of array @var{A} flipped across dimension @var{dim}.

If @var{dim} is unspecified it defaults to the first non-singleton
dimension.

Examples:

@example
## row vector
flip ([1  2  3  4])
      @xresult{}  4  3  2  1

## column vector
flip ([1; 2; 3; 4])
      @xresult{}  4
          3
          2
          1

## 2-D matrix along dimension 1
flip ([1 2; 3 4])
      @xresult{}  3  4
          1  2

## 2-D matrix along dimension 2
flip ([1 2; 3 4], 2)
      @xresult{}  2  1
          4  3
@end example

@seealso{fliplr, flipud, rot90, rotdim, permute, transpose}
@end deftypefn
