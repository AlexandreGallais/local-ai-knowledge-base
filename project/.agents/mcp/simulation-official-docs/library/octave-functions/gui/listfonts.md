# listfonts

```octave
function fonts = listfonts (h)
```

@deftypefn  {} {fonts =} listfonts ()
@deftypefnx {} {fonts =} listfonts (@var{h})
List system fonts.

If a handle to a graphics object @var{h} is provided, also include the
font from the object's @qcode{"FontName"} property in the list.

Programming Note: On systems that don't use FontConfig natively (all but
Linux), the font cache is built when Octave is installed.  You will need to
run @code{system ("fc-cache -fv")} manually after installing new fonts.

@seealso{uisetfont, text, axes, uicontrol}
@end deftypefn
