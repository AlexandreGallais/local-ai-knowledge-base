# spinmap

```octave
function spinmap (t = 5, inc = 2)
```

@deftypefn  {} {} spinmap ()
@deftypefnx {} {} spinmap (@var{t})
@deftypefnx {} {} spinmap (@var{t}, @var{inc})
@deftypefnx {} {} spinmap ("inf")
Cycle the colormap for @var{t} seconds with a color increment of @var{inc}.

Both parameters are optional.  The default cycle time is 5 seconds and the
default increment is 2.  If the option @qcode{"inf"} is given then cycle
continuously until @kbd{Control-C} is pressed.

When rotating, the original color 1 becomes color 2, color 2 becomes
color 3, etc.  A positive or negative increment is allowed and a higher
value of @var{inc} will cause faster cycling through the colormap.
@seealso{colormap}
@end deftypefn
