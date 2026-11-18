# fileread

```octave
function str = fileread (filename, varargin)
```

@deftypefn  {} {@var{str} =} fileread (@var{filename})
@deftypefnx {} {@var{str} =} fileread (@var{filename}, @var{param}, @var{value}, @dots{})
Read the contents of @var{filename} and return it as a string.

@var{param}, @var{value} are optional pairs of parameters and values.  Valid
options are:

@table @asis
@item @qcode{"Encoding"}
Specify encoding used when reading from the file.  This is a character
string of a valid encoding identifier.  The default is
@nospell{@qcode{"utf-8"}}.
@end table

@seealso{fopen, fread, fscanf, importdata, textscan, type}
@end deftypefn
