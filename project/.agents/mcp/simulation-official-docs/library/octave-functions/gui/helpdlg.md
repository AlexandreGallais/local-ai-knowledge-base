# helpdlg

```octave
function h = helpdlg (varargin)
```

@deftypefn  {} {} helpdlg ()
@deftypefnx {} {} helpdlg (@var{msg})
@deftypefnx {} {} helpdlg (@var{msg}, @var{title})
@deftypefnx {} {@var{h} =} helpdlg (@dots{})
Display a help dialog box with help message @var{msg} and caption
@var{title}.

The default help message is @qcode{"This is the default help string.@:"}
and the default caption is @qcode{"Help Dialog"}.

The help message may have multiple lines separated by newline characters
("\n"), or it may be a cellstr array with one element for each line.

The return value @var{h} is a handle to the figure object used for
building the dialog.

Examples:

@example
@group
helpdlg ("Some helpful text for the user.");
helpdlg ("Some helpful text\nwith two lines.");
helpdlg (@{"Some helpful text", "with two lines."@});
helpdlg ("Some helpful text for the user.", "Fancy caption");
@end group
@end example

@seealso{errordlg, warndlg, msgbox, inputdlg, listdlg, questdlg}
@end deftypefn
