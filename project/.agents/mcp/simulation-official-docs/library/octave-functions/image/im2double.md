# im2double

```octave
function dimg = im2double (img, im_type)
```

@deftypefn  {} {@var{dimg} =} im2double (@var{img})
@deftypefnx {} {@var{dimg} =} im2double (@var{img}, "indexed")
Convert image to double precision.

The conversion of @var{img} to double precision, is dependent on the type of
input image.  The following input classes are supported:

@table @samp
@item uint8, uint16, and int16
The range of values from the class is scaled to the interval [0 1].

@item logical
True and false values are assigned a value of 1 and 0 respectively.

@item single
Values are cast to double.

@item double
Returns the same image.

@end table

If @var{img} is an indexed image, then the second argument should be the
string @qcode{"indexed"}.  If so, then @var{img} must either be of floating
point class, or unsigned integer class and it will simply be cast to double.
If it is an integer class, an offset of +1 is applied.

@seealso{double}
@end deftypefn
