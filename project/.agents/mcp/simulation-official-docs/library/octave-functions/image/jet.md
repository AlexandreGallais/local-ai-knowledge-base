# jet

```octave
function map = jet (n)
```

@deftypefn  {} {@var{map} =} jet ()
@deftypefnx {} {@var{map} =} jet (@var{n})
Create color colormap.  This colormap ranges from dark blue through blue,
cyan, green, yellow, red, to dark red.

The argument @var{n} must be a scalar.
If @var{n} is not specified the length of the current colormap is used.  If
there is no current colormap the default value of 256 is used.

Programming Note: The @code{jet} colormap is not perceptually uniform.
Try the @code{viridis} colormap if that is important.  For a drop-in
replacement for @code{jet} with better perceptual characteristics try
the @code{turbo} colormap.
@seealso{colormap, turbo}
@end deftypefn
