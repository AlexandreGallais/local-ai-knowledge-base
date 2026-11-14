---
title: "Toolbar (part 7 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/toolbar.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Toolbar (part 7 of 7)

## Testing

Angular Aria provides component harnesses for testing toolbar components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ToolbarHarness} from '@angular/aria/toolbar/testing';
import {MyToolbarComponent} from './my-toolbar'; // Your component

describe('MyToolbarComponent', () => {
  let fixture: ComponentFixture<MyToolbarComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyToolbarComponent],
    });

    fixture = TestBed.createComponent(MyToolbarComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should have widgets and update toggle state on click', async () => {
    // Load the toolbar harness
    const toolbar = await loader.getHarness(ToolbarHarness);

    // Get all widgets
    const widgets = await toolbar.getWidgets();
    expect(widgets.length).toBe(3);

    // Click the first widget
    await widgets[0].click();

    // Verify pressed state updated via click handler
    expect(await widgets[0].isSelected()).toBe(true);
  });
});
```

## API reference

For detailed API documentation, inspect the following API references:

- `Toolbar`
- `ToolbarWidget`
- `ToolbarWidgetGroup`
