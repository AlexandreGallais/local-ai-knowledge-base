# smooth3

```octave
function smoothed_data = smooth3 (data, method = "box", sz = 3, std_dev = 0.65)
```

@deftypefn  {} {@var{smoothed_data} =} smooth3 (@var{data})
@deftypefnx {} {@var{smoothed_data} =} smooth3 (@var{data}, @var{method})
@deftypefnx {} {@var{smoothed_data} =} smooth3 (@var{data}, @var{method}, @var{sz})
@deftypefnx {} {@var{smoothed_data} =} smooth3 (@var{data}, @var{method}, @var{sz}, @var{std_dev})
Smooth values of 3-dimensional matrix @var{data}.

This function may be used, for example, to reduce the impact of noise in
@var{data} before calculating isosurfaces.

@var{data} must be a non-singleton 3-dimensional matrix.  The output
@var{smoothed_data} is a matrix of the same size as @var{data}.

The option input @var{method} determines which convolution kernel is used
for the smoothing process.  Possible choices:

@table @asis
@item @qcode{"box"}, @qcode{"b"} (default)
a convolution kernel with sharp edges.

@item @qcode{"gaussian"}, @qcode{"g"}
a convolution kernel that is represented by a non-correlated trivariate
normal distribution function.
@end table

@var{sz} is either a 3-element vector specifying the size of the
convolution kernel in the x-, y- and z-directions, or a scalar.  In the
scalar case the same size is used for all three dimensions
(@code{[@var{sz}, @var{sz}, @var{sz}]}).  The default value is 3.

If @var{method} is @qcode{"gaussian"} then the optional input @var{std_dev}
defines the standard deviation of the trivariate normal distribution
function.  @var{std_dev} is either a 3-element vector specifying the
standard deviation of the Gaussian convolution kernel in x-, y- and
z-directions, or a scalar.  In the scalar case the same value is used for
all three dimensions.  The default value is 0.65.

@seealso{isosurface, isonormals, patch}
@end deftypefn
