# uigetdir

```octave
function dirname = uigetdir (init_path = pwd, dialog_name = "Select Directory to Open")
```

@deftypefn  {} {@var{dirname} =} uigetdir ()
@deftypefnx {} {@var{dirname} =} uigetdir (@var{init_path})
@deftypefnx {} {@var{dirname} =} uigetdir (@var{init_path}, @var{dialog_name})
Open a GUI dialog for selecting a directory.

If @var{init_path} is not given the current working directory is used.

@var{dialog_name} may be used to customize the dialog title.

The output @var{dirname} is a character string with the name of the selected
directory.  However, if the @samp{Cancel} button is clicked the output is of
type double with the value @code{0}.
@seealso{uigetfile, uiputfile}
@end deftypefn
