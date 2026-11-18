# savepath

```octave
function status = savepath (file)
```

@deftypefn  {} {} savepath
@deftypefnx {} {} savepath @var{file}
@deftypefnx {} {@var{status} =} savepath (@dots{})
Save the unique portion of the current function search path to @var{file}.

The list of folders that are saved in @var{file} does @emph{not} include
the folders that are added for Octave's own functions, those that belong to
Octave packages (@pxref{XREFpkg,,pkg load}), and those added via command
line switches.

If @var{file} is omitted, Octave looks in the current directory for a
project-specific @file{.octaverc} file in which to save the path
information.  If no such file is present then the user's configuration file
@file{~/.octaverc} is used.

If successful, @code{savepath} returns 0.

The @code{savepath} function makes it simple to customize a user's
configuration file to restore the working paths necessary for a particular
instance of Octave.  Assuming no filename is specified, Octave will
automatically restore the saved directory paths from the appropriate
@file{.octaverc} file when starting up.  If a filename has been specified
then the paths may be restored manually by calling @code{source @var{file}}.
@seealso{path, addpath, rmpath, genpath, pathdef}
@end deftypefn
