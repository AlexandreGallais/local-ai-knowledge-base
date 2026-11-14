# forms/src/directives/shared

## SetDisabledStateOption

```ts
export type SetDisabledStateOption = 'whenDisabledForLegacyCode' | 'always'
```

The type for CALL_SET_DISABLED_STATE. If `always`, then ControlValueAccessor will always call
`setDisabledState` when attached, which is the most correct behavior. Otherwise, it will only be
called when disabled, which is the legacy behavior for compatibility.

@publicApi
@see {@link FormsModule#withConfig}