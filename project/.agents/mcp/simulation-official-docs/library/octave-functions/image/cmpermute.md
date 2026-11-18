# cmpermute

```octave
function [Y, newmap] = cmpermute (X, map, index)
```

@deftypefn  {} {[@var{Y}, @var{newmap}] =} cmpermute (@var{X}, @var{map})
@deftypefnx {} {[@var{Y}, @var{newmap}] =} cmpermute (@var{X}, @var{map}, @var{index})
Reorder colors in a colormap.

When called with only two arguments, @code{cmpermute} randomly rearranges
the colormap @var{map} and returns a new colormap @var{newmap}.  It also
returns the indexed image @var{Y} which is the equivalent of the original
input image @var{X} when displayed using @var{newmap}.

When called with an optional third argument the order of colors in the new
colormap is defined by @var{index}.

@strong{Caution:} @var{index} should not have repeated elements or the
function will fail.

@end deftypefn
