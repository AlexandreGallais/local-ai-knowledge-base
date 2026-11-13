---
title: "Designing your form model (part 2 of 2)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/forms/signals/designing-your-form-model.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Designing your form model (part 2 of 2)

## Translating between form model and domain model

Given that the form model and domain model represent the same concept differently, we need to have a way to translate between these different representations. When we want to present some existing data in the system to the user in a form, we need to transform it from the domain model representation to the form model representation. Conversely when we want to save a user's changes, we need to transform the data from the form model representation to the domain model representation.

Let's imagine that we have a domain model and a form model and we've written some functions to convert between them.

```ts
interface MyDomainModel { ... }

interface MyFormModel { ... }

// Instance of `MyFormModel` populated with empty input (e.g. `''` for string inputs, etc.)
const EMPTY_MY_FORM_MODEL: MyFormModel = { ... };

function domainModelToFormModel(domainModel: MyDomainModel): MyFormModel { ... }

function formModelToDomainModel(formModel: MyFormModel): MyDomainModel { ... }
```

### Domain model to form model

When we're creating a form to edit some existing domain model in the system, we'll typically receive that domain model either as an `input()` to our form component or from a backend (e.g. via a resource). In either case, `linkedSignal` provides an excellent way to apply our transform.

In the case where we receive the domain model as an `input()`, we can use `linkedSignal` to create a writable form model from the input signal.

```ts
@Component(...)
class MyForm {
  // The domain model to initialize the form with, if not given we start with an empty form.
  readonly domainModel = input<MyDomainModel>();

  private readonly formModel = linkedSignal({
    // Linked signal based on the domain model
    source: this.domainModel,
    // If domain model is defined convert it to a form model, otherwise use an empty form model.
    computation: (domainModel) => domainModel
      ? domainModelToFormModel(domainModel)
      : EMPTY_MY_FORM_MODEL
  });

  protected readonly myForm = form(this.formModel);
}
```

Similarly, when we receive the domain model from the backend via a resource, we can create a `linkedSignal` based on its value to create our `formModel`. In this scenario, the domain model may take some time to fetch, and we should disable the form until the data is loaded.

```ts
@Component(...)
class MyForm {
  // Fetch the domain model from the backend.
  readonly domainModelResource: ResourceRef<MyDomainModel | undefined> = httpResource(...);

  private readonly formModel = linkedSignal({
    // Linked signal based on the domain model resource
    source: this.domainModelResource.value,
    // Convert the domain model once it loads, use an empty form model while loading.
    computation: (domainModel) => domainModel
      ? domainModelToFormModel(domainModel)
      : EMPTY_MY_FORM_MODEL
  });

  protected readonly myForm = form(this.formModel, (root) => {
    // Disable the entire form when the resource is loading.
    disabled(root, {when: () => this.domainModelResource.isLoading()});
  });
}
```

The examples above show a pure derivation of the form model, directly from the domain model. However, in some cases you may wish to do a more advanced diff operation between the new domain model value and the previous domain model and form model values. This can be implemented based on the `linkedSignal` previous state.

### Form model to domain model

When we're ready to save the user's input back to the system, we need to convert it to the domain model representation. This would typically happen when the user submits the form, or continuously as the user edits for an auto-saving form.

To save on submit, we can handle the conversion in the `submit` function.

```ts
@Component(...)
class MyForm {
  private readonly myDataService = inject(MyDataService);

  protected readonly myForm = form<MyFormModel>(...);

  handleSubmit() {
    submit(this.myForm, async () => {
      await this.myDataService.update(formModelToDomainModel(this.myForm().value()));
    });
  };
}
```

Alternatively, you could also send the form model directly to the server and do the conversion from
form model to domain model on the server.

For continuous saving, update the domain model in an `effect`.

```ts
@Component(...)
class MyForm {
  readonly domainModel = model.required<MyDomainModel>()

  protected readonly myForm = form(...);

  constructor() {
    effect(() => {
      // When the form model changes to a valid value, update the domain model.
      if (this.myForm().valid()) {
        this.domainModel.set(formModelToDomainModel(this.myForm().value()));
      }
    });
  };
}
```

The examples above show a pure conversion from the form model to the domain model. However, it is perfectly acceptable to consider the full form state in addition to just the form model value. For example, to save bytes we might want to only send partial updates to the server based on what the user changed. In this case our conversion function could be designed to take the entire form state and return a sparse domain model based on the form's values and dirtiness.

```ts
type Sparse<T> = T extends object ? {
    [P in keyof T]?: Sparse<T[P]>;
} : T;

function formStateToPartialDomainModel(
  formState: FieldState<MyFormModel>
): Sparse<MyDomainModel> { ... }
```
