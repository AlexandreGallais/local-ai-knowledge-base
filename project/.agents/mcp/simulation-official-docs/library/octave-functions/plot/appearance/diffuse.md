# diffuse

```octave
function d = diffuse (sx, sy, sz, lv)
```

@deftypefn {} {@var{d} =} diffuse (@var{sx}, @var{sy}, @var{sz}, @var{lv})
Calculate the diffuse reflection strength of a surface defined by the normal
vector elements @var{sx}, @var{sy}, @var{sz}.

The light source location vector @var{lv} can be given as a 2-element vector
[azimuth, elevation] in degrees or as a 3-element vector [x, y, z].
@seealso{specular, surfl}
@end deftypefn
