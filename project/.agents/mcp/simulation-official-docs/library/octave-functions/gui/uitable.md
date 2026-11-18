# uitable

```octave
function hui = uitable (varargin)
```

@deftypefn  {} {@var{hui} =} uitable (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uitable (@var{parent}, @var{property}, @var{value}, @dots{})
Create a uitable object and return a handle to it.

A uitable object is used to show tables of data in a figure window.

If @var{parent} is omitted then a uitable for the current figure is
created.  If no figure is available, a new figure is created first.

If @var{parent} is given then a uitable relative to @var{parent} is
created.

Any provided property value pairs will override the default values of the
created uitable object.

The full list of properties is documented at @ref{Uitable Properties}.

Examples:

@smallexample
@group
## Create figure and place a table on it
f = figure ();
m = magic (8);
t = uitable (f, "Data", m, "ColumnWidth", @{ 40 @});
@end group

@group
## Create a table with labeled rows and columns
f = figure ();
d = reshape (1:9, [3, 3]);
row_names = @{ "Row1", "Row2", "Row3" @};
col_names = @{ "Col1", "Col2", "Col3" @};
t = uitable (f, "Data", d, ...
             "RowName", row_names, "ColumnName", col_names);

p = get (t, "Position");
e = get (t, "Extent");
p(3:4) = e(3:4);
set (t, "Position", p);
@end group

## Long demo with callbacks
function uitable_demo ()
  f = figure ("Name", "uitable Demo", "Menu", "none", ...
              "Position", [10 10 1000 680]);

  ## A basic example
  d = @{ "char"   , "A string";
        "double" , 12.3456789;
        "complex", 1+2i;
        "bool"   , true;
        "single" , single(12.3456789);
        "int8"   , int8(-128);
        "uint8"  , uint8(128);
        "int16"  , int16(-32768);
        "uint16" , uint16(32768);
        "int32"  , int32(-2147483648);
        "uint32" , uint32(2147483648);
        "int64"  , int64(-2147483649);
        "uint64" , uint64(2147843649)@};

  popup_options = @{"A", "B", "C", "D", "E"@};

  columnformat_options = @{ "[]", "char", "pop-up", "numeric", ...
                           "short", "short e", "short eng", ...
                           "short g", "long", "long e", ...
                           "long eng", "long g", "bank", "+", ...
                           "rat", "logical"@};
  columnformat_values = columnformat_options;
  columnformat_values@{1@} = "";
  columnformat_values@{3@} = popup_options;

  default_data = repmat (d(:,2), 1, columns (columnformat_options));
  b_add = uicontrol (f, "Position", [285 630 600 50], ...
            "UserData", [rows(d), 1], ...
            "Style", "pushbutton", ...
            "String", "Set data at selected point to selected datatype");

  l_type_table = uicontrol (f, "Position", [ 0 603 120 25 ], ...
      "String", "Datatype Table:", ...
      "Style", "text");
  t_type_table = uitable (f, "Position", [ 0 530 1000 70 ], ...
      "Data", transpose (d(:, 2)), ...
      "ColumnName", transpose (d(:, 1)), ...
      "RowName", "Value", ...
      "CellSelectionCallback", ...
           @@(x, y) set (b_add, "UserData", y.Indices ));

  l_point_table = uicontrol (f, "Position", [ 0 640 60 25 ], ...
      "String", "Point:", ...
      "Style", "text");
  t_point_table = uitable (f, "Position", [ 80 630 160 42 ], ...
      "RowName", [], ...
      "ColumnName", @{"x", "y"@}, ...
      "Data", [ 1, 1 ], ...
      "ColumnEditable", true);

  l_editable_table = uicontrol (f, "Position", [ 0 502 200 25 ], ...
      "Style", "text", ...
      "String", "Set Data Columns Editable:");
  t_editable_table = ...
    uitable (f, "Position", [ 0 434 1000 65 ], ...
                "Data", repmat (false, 1, columns (default_data)), ...
                "ColumnEditable", true);

  l_format_table = uicontrol (f, "Position", [ 0 406 200 25 ], ...
      "Style", "text", ...
      "String", "Set Data Column Format:");
  t_format_table = ...
    uitable (f, "Position", [ 0 338 1000 65 ], ...
                "Data", columnformat_options, ...
                "ColumnEditable", true, ...
                "ColumnFormat", arrayfun (@@(x) @{columnformat_options@}, ...
                                          1:columns (columnformat_options)));

  l_data_table = uicontrol (f, "Style", "text", ...
                               "String", "Data:", ...
                               "Position", [ 0 310 60 25 ]);
  t_data_table = uitable (f, "Position", [ 0 15 1000 290 ], ...
      "Data", default_data, ...
      "ColumnFormat", columnformat_values);

  set (t_format_table, ...
       "CellEditCallback", ...
       @@(x, y) update_column_format (y.NewData, y.Indices, ...
                                      t_data_table, popup_options));
  set (t_point_table, "CellEditCallback", ...
       @@(x, y) validate_point_table (x, y, t_data_table));
  set (t_editable_table, "CellEditCallback", ...
       @@(x,y) set (t_data_table, ...
                    "ColumnEditable", get (t_editable_table, "Data")));
  set (b_add, ...
       "Callback", @@(x, y) update_data (b_add, t_point_table, ...
                                         t_type_table, t_data_table));
  set (t_data_table, "CellSelectionCallback", ...
       @@(x, y) update_point_table (y.Indices, t_point_table));
endfunction

@group
function validate_point_table (h, dat, t_data_table)
  if (! (dat.NewData > 0 && ...
    dat.NewData < size (get (t_data_table, "Data"), dat.Indices(1, 1)) + 1))

    d = get (h, "Data");
    d(dat.Indices) = 1;
    set (h, "Data", d);
  endif
endfunction
@end group

@group
function update_column_format (format, indices, t_data_table, ...
                               popup_options)
  cf = get (t_data_table, "ColumnFormat");
  if (strcmp (format, "[]"))
    format = "";
  elseif (strcmp (format, "pop-up"))
    format = popup_options;
  endif
  cf@{indices(1,2)@} = format;
  set (t_data_table, "ColumnFormat", cf);
endfunction
@end group

@group
function update_point_table (indices, t_point_table)
  if (isempty (indices))
    indices = [1, 1];
  endif
  set (t_point_table, "Data", indices(1,:));
endfunction
@end group

@group
function update_data (b_add, t_point_table, t_type_table, ...
                      t_data_table)
  indices = get (b_add, "UserData");
  if (isempty (indices))
    indices = [1, 1];
  endif
  d = get (t_data_table, "Data");
  t_type_table_data = get (t_type_table, "Data");
  p = get (t_point_table, "Data");
  d(p(1,2), p(1,1)) = t_type_table_data(indices(1,2));
  set (t_data_table, "Data", d);
endfunction
@end group
@end smallexample

@seealso{figure, uicontrol}
@end deftypefn
