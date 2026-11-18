# importdata

```octave
function [output, delimiter, header_rows] = importdata (fname, delimiter = "", header_rows = -1)
```

@deftypefn  {} {@var{A} =} importdata (@var{fname})
@deftypefnx {} {@var{A} =} importdata (@var{fname}, @var{delimiter})
@deftypefnx {} {@var{A} =} importdata (@var{fname}, @var{delimiter}, @var{header_rows})
@deftypefnx {} {[@var{A}, @var{delimiter}] =} importdata (@dots{})
@deftypefnx {} {[@var{A}, @var{delimiter}, @var{header_rows}] =} importdata (@dots{})
Import data from the file @var{fname}.

Input parameters:

@itemize
@item @var{fname}
The name of the file containing data.

@item @var{delimiter}
The character separating columns of data.  Use @code{\t} for tab.
(Only valid for ASCII files)

@item @var{header_rows}
The number of header rows before the data begins.  (Only valid for ASCII
files)
@end itemize

Different file types are supported:

@itemize
@item ASCII table

Import ASCII table using the specified number of header rows and the
specified delimiter.

@item Image file

@item @sc{matlab} file

@item Spreadsheet files (depending on external software)

@item WAV file

@end itemize

@seealso{textscan, dlmread, csvread, load}
@end deftypefn
