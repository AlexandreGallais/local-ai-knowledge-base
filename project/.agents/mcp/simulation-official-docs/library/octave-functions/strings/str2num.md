# str2num

```octave
function [m, state] = str2num (s)
```

@deftypefn  {} {@var{x} =} str2num (@var{s})
@deftypefnx {} {[@var{x}, @var{state}] =} str2num (@var{s})
Convert the string (or character array) @var{s} to a number (or an array).

Examples:

@example
@group
str2num ("3.141596")
      @xresult{} 3.141596

str2num (["1, 2, 3"; "4, 5, 6"])
      @xresult{} 1  2  3
         4  5  6
@end group
@end example

The optional second output, @var{state}, is logically true when the
conversion is successful.  If the conversion fails the numeric output,
@var{x}, is empty and @var{state} is false.

@strong{Caution:} As @code{str2num} uses the @code{eval} function to do the
conversion, @code{str2num} will execute any code contained in the string
@var{s}.  Use @code{str2double} for a safer and faster conversion.

For cell array of strings use @code{str2double}.
@seealso{str2double, eval}
@end deftypefn
