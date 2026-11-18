# delete

```octave
function delete (varargin)
```

@deftypefn  {} {} delete @var{file}
@deftypefnx {} {} delete @var{file1} @var{file2} @dots{}
@deftypefnx {} {} delete (@var{file})
@deftypefnx {} {} delete (@var{file1}, @var{file2}, @dots{})
@deftypefnx {} {} delete (@var{handle})
Delete the named file or graphics handle.

@var{file} may contain globbing patterns such as @samp{*}.  Multiple files
to be deleted may be specified in the same function call.

@var{handle} may be a scalar or vector of graphic handles to delete.

Programming Note: Deleting graphics objects is the proper way to remove
features from a plot without clearing the entire figure.
@seealso{clf, cla, unlink, rmdir}
@end deftypefn
