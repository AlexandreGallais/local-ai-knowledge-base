# gray2ind

```octave
function [I, map] = gray2ind (I, n = 64)
```

@deftypefn  {} {@var{img} =} gray2ind (@var{I})
@deftypefnx {} {@var{img} =} gray2ind (@var{I}, @var{n})
@deftypefnx {} {@var{img} =} gray2ind (@var{BW})
@deftypefnx {} {@var{img} =} gray2ind (@var{BW}, @var{n})
@deftypefnx {} {[@var{img}, @var{map}] =} gray2ind (@dots{})
Convert a grayscale or binary intensity image to an indexed image.

The indexed image will consist of @var{n} different intensity values.
If not given @var{n} defaults to 64 for grayscale images or 2 for binary
black and white images.

The output @var{img} is of class uint8 if @var{n} is less than or equal to
256; Otherwise the return class is uint16.
@seealso{ind2gray, rgb2ind}
@end deftypefn
