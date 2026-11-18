# fileparts

```octave
function [dir, name, ext] = fileparts (filename)
```

@deftypefn {} {[@var{dir}, @var{name}, @var{ext}] =} fileparts (@var{filename})
Return the directory, name, and extension components of @var{filename}.

The input @var{filename} is a string which is parsed.  There is no attempt
to check whether the filename or directory specified actually exists.
@seealso{fullfile, filesep}
@end deftypefn
