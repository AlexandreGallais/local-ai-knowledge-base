# brighten

```octave
function rmap = brighten (arg1, beta)
```

@deftypefn  {} {@var{map_out} =} brighten (@var{beta})
@deftypefnx {} {@var{map_out} =} brighten (@var{map}, @var{beta})
@deftypefnx {} {@var{map_out} =} brighten (@var{h}, @var{beta})
@deftypefnx {} {} brighten (@dots{})
Brighten or darken a colormap.

The argument @var{beta} must be a scalar between -1 and 1, where a negative
value darkens and a positive value brightens the colormap.

If the @var{map} argument is omitted, the function is applied to the current
colormap.

The first argument can also be a valid graphics handle @var{h}, in which
case @code{brighten} is applied to the colormap associated with this handle.

If no output is specified then the result is written to the current
colormap.
@seealso{colormap, contrast}
@end deftypefn
