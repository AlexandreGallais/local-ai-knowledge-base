# fullfile

```octave
function filename = fullfile (varargin)
```

@deftypefn {} {@var{filename} =} fullfile (@var{dir1}, @var{dir2}, @dots{}, @var{file})
Build complete filename from separate parts.

The function joins any number of path components intelligently.  The return
value is the concatenation of each component with exactly one file separator
between each part of the path and at most one leading and/or trailing file
separator.

The input arguments might be strings or cell strings.  Any input arguments
that are cell strings must contain one single string or must be equal in
size.  In that case, the function returns a cell string of filepaths of the
same dimensions as the input cell strings, e.g.:

@example
@group
fullfile ("/home/username", "data", @{"f1.csv", "f2.csv", "f3.csv"@})
  @xresult{}
      @{
        [1,1] = /home/username/data/f1.csv
        [1,2] = /home/username/data/f2.csv
        [1,3] = /home/username/data/f3.csv
      @}
@end group
@end example

On Windows systems, while forward slash file separators do work, they are
replaced by backslashes.  In addition, drive letters are stripped of leading
file separators to obtain a valid file path.

Note: @code{fullfile} does not perform any validation of the resulting full
filename.
@seealso{fileparts, filesep}
@end deftypefn
