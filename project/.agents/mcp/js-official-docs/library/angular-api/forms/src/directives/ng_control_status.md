# forms/src/directives/ng_control_status

## NgControlStatus

```ts
export class NgControlStatus extends AbstractControlStatus
```

@description
Directive automatically applied to Angular form controls that sets CSS classes
based on control status.

@usageNotes

### CSS classes applied

The following classes are applied as the properties become true:

* ng-valid
* ng-invalid
* ng-pending
* ng-pristine
* ng-dirty
* ng-untouched
* ng-touched

@ngModule ReactiveFormsModule
@ngModule FormsModule
@publicApi