# warndlg

```octave
function h = warndlg (varargin)
```

@deftypefn  {} {} warndlg ()
@deftypefnx {} {} warndlg (@var{msg})
@deftypefnx {} {} warndlg (@var{msg}, @var{title})
@deftypefnx {} {} warndlg (@var{msg}, @var{title}, @var{opt})
@deftypefnx {} {@var{h} =} warndlg (@dots{})
Display a warning dialog box with warning message @var{msg} and caption
@var{title}.

The default warning message is
@qcode{"This is the default warning string.@:"} and the default caption is
@qcode{"Warning Dialog"}.

The warning message may have multiple lines separated by newline characters
("\n"), or it may be a cellstr array with one element for each line.

The third optional argument @var{opt} controls the behavior of the dialog.
For details, @pxref{XREFmsgbox,,@code{msgbox}}.

The return value @var{h} is a handle to the figure object used for
building the dialog.

Examples:

@example
@group
warndlg ("Some warning text for the user.");
warndlg ("Some warning text\nwith two lines.");
warndlg (@{"Some warning text", "with two lines."@});
warndlg ("Some warning text for the user.", "Fancy caption");
@end group
@end example

@seealso{errordlg, helpdlg, msgbox, inputdlg, listdlg, questdlg}
@end deftypefn
