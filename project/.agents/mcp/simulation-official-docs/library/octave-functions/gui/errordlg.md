# errordlg

```octave
function h = errordlg (varargin)
```

@deftypefn  {} {} errordlg ()
@deftypefnx {} {} errordlg (@var{msg})
@deftypefnx {} {} errordlg (@var{msg}, @var{title})
@deftypefnx {} {} errordlg (@var{msg}, @var{title}, @var{opt})
@deftypefnx {} {@var{h} =} errordlg (@dots{})
Display an error dialog box with error message @var{msg} and caption
@var{title}.

The default error message is @qcode{"This is the default error string.@:"}
and the default caption is @qcode{"Error Dialog"}.

The error message may have multiple lines separated by newline characters
("\n"), or it may be a cellstr array with one element for each line.

The third optional argument @var{opt} controls the behavior of the dialog.
For details, @pxref{XREFmsgbox,,@code{msgbox}}.

The return value @var{h} is a handle to the figure object used for
building the dialog.

Examples:

@example
@group
errordlg ("Some fancy error occurred.");
errordlg ("Some fancy error\nwith two lines.");
errordlg (@{"Some fancy error", "with two lines."@});
errordlg ("Some fancy error occurred.", "Fancy caption");
@end group
@end example

@seealso{helpdlg, warndlg, msgbox, inputdlg, listdlg, questdlg}
@end deftypefn
