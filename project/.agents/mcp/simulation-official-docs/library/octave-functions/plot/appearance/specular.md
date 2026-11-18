# specular

```octave
function refl = specular (sx, sy, sz, lv, vv, se)
```

@deftypefn  {} {@var{refl} =} specular (@var{sx}, @var{sy}, @var{sz}, @var{lv}, @var{vv})
@deftypefnx {} {@var{refl} =} specular (@var{sx}, @var{sy}, @var{sz}, @var{lv}, @var{vv}, @var{se})
Calculate the specular reflection strength of a surface defined by the
normal vector elements @var{sx}, @var{sy}, @var{sz} using Phong's
approximation.

The light source location and viewer location vectors are specified using
parameters @var{lv} and @var{vv} respectively.  The location vectors can
given as 2-element vectors [azimuth, elevation] in degrees or as 3-element
vectors [x, y, z].

An optional sixth argument specifies the specular exponent (spread)
@var{se}.  If not given, @var{se} defaults to 10.
@seealso{diffuse, surfl}
@end deftypefn
