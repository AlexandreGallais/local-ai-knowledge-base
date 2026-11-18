# uisetfont

```octave
function varargout = uisetfont (varargin)
```

@deftypefn  {} { } uisetfont ()
@deftypefnx {} { } uisetfont (@var{h})
@deftypefnx {} { } uisetfont (@var{fontstruct})
@deftypefnx {} { } uisetfont (@dots{}, @var{title})
@deftypefnx {} {@var{fontstruct} =} uisetfont (@dots{})
Open a font selection dialog.

If the first argument is a handle to a text, axes, or uicontrol object,
pressing the OK button will change the font properties of the object.

The first argument may also be a structure with fields @code{FontName},
@code{FontWeight}, @code{FontAngle}, @code{FontUnits}, and @code{FontSize},
indicating the initially selected font.

The title of the dialog window can be specified by using the last argument
@var{title}.

If an output argument @var{fontstruct} is requested, the selected font
structure is returned.  Otherwise, the font information is displayed
onscreen.

Programming Note: On systems that don't use FontConfig natively (all but
Linux), the font cache is built when Octave is installed.  You will need to
run @code{system ("fc-cache -fv")} manually after installing new fonts.

@seealso{listfonts, text, axes, uicontrol}
@end deftypefn
