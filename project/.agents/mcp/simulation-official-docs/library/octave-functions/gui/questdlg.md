# questdlg

```octave
function btn = questdlg (msg, title = "Question Dialog", varargin)
```

@deftypefn  {} {@var{btn} =} questdlg (@var{msg})
@deftypefnx {} {@var{btn} =} questdlg (@var{msg}, @var{title})
@deftypefnx {} {@var{btn} =} questdlg (@var{msg}, @var{title}, @var{default})
@deftypefnx {} {@var{btn} =} questdlg (@var{msg}, @var{title}, @var{btn1}, @var{btn2}, @var{default})
@deftypefnx {} {@var{btn} =} questdlg (@var{msg}, @var{title}, @var{btn1}, @var{btn2}, @var{btn3}, @var{default})
Display @var{msg} using a question dialog box and return the caption of
the activated button.

The message may have multiple lines separated by newline characters ("\n"),
or it may be a cellstr array with one element for each line.

The optional @var{title} (character string) can be used to specify the
dialog caption.  It defaults to @qcode{"Question Dialog"}.

The dialog may contain two or three buttons which will all close the dialog.

The string @var{default} identifies the default button, which is activated
by pressing the @key{ENTER} key.  It must match one of the strings given
in @var{btn1}, @var{btn2}, or @var{btn3}.

If only @var{msg} and @var{title} are specified, three buttons with the
default captions @qcode{"Yes"}, @qcode{"No"}, and @qcode{"Cancel"} are used.

If only two button captions, @var{btn1} and @var{btn2}, are specified the
dialog will have only these two buttons.

Examples:

@example
@group
btn = questdlg ("Close Octave?", "Some fancy title", ...
                "Yes", "No", "No");
if (strcmp (btn, "Yes"))
  exit ();
endif
@end group
@end example

@seealso{errordlg, helpdlg, inputdlg, listdlg, msgbox, warndlg}
@end deftypefn
