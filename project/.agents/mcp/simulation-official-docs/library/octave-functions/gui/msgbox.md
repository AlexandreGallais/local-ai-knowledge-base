# msgbox

```octave
function retval = msgbox (msg, varargin)
```

@deftypefn  {} {@var{h} =} msgbox (@var{msg})
@deftypefnx {} {@var{h} =} msgbox (@var{msg}, @var{title})
@deftypefnx {} {@var{h} =} msgbox (@var{msg}, @var{title}, @var{icon})
@deftypefnx {} {@var{h} =} msgbox (@var{msg}, @var{title}, "custom", @var{cdata})
@deftypefnx {} {@var{h} =} msgbox (@var{msg}, @var{title}, "custom", @var{cdata}, @var{colormap})
@deftypefnx {} {@var{h} =} msgbox (@dots{}, @var{opt})
Display @var{msg} using a message dialog box.

The message may have multiple lines separated by newline characters ("\n"),
or it may be a cellstr array with one element for each line.

The optional input @var{title} (character string) can be used to decorate
the dialog caption.

The optional argument @var{icon} selects a dialog icon.
It can be one of @qcode{"none"} (default), @qcode{"error"}, @qcode{"help"},
@qcode{"warn"}, or @qcode{"custom"}.  The latter must be followed by an
image array @var{cdata}, and for indexed images the associated colormap.

The final optional argument @var{opt} controls the behavior of the dialog.
If @var{opt} is a string, it may be one of

@table @asis
@item @qcode{"non-modal"} (default)
The dialog is normal.

@item @qcode{"modal"}
If any dialogs already exist with the same title, the most recent is reused
and all others are closed.  The dialog is displayed @qcode{"modal"} which
means it prevents users from interacting with any other GUI element until
the dialog has been closed.

@item @qcode{"replace"}
If any dialogs already exist with the same title, the most recent is reused
and all others are closed.  The resulting dialog is set @qcode{"non-modal"}.
@end table

If @var{opt} is a structure, it must contain fields @qcode{"WindowStyle"}
and @qcode{"Interpreter"}:

@table @asis
@item @qcode{"WindowStyle"}
The value must be @qcode{"non-modal"}, @qcode{"modal"}, or
@qcode{"replace"}.  See above.

@item @qcode{"Interpreter"}
Controls the @qcode{"interpreter"} property of the text object used for
displaying the message.  The value must be @qcode{"tex"} (default),
@qcode{"none"}, or @qcode{"latex"}.
@end table

The return value @var{h} is a handle to the figure object used for building
the dialog.

Examples:

@example
@group
msgbox ("Some message for the user.");
msgbox ("Some message\nwith two lines.");
msgbox (@{"Some message", "with two lines."@});
msgbox ("Some message for the user.", "Fancy caption");

## A message dialog box with error icon
msgbox ("Some message for the user.", "Fancy caption", "error");
@end group
@end example

@seealso{errordlg, helpdlg, inputdlg, listdlg, questdlg, warndlg}
@end deftypefn
