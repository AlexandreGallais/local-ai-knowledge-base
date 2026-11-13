---
title: "Accordion (part 5 of 5)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/accordion.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Accordion (part 5 of 5)

## Testing

Angular Aria provides component harnesses for testing accordion components.
Here is an example of how to use the harnesses in a component test:

```typescript
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {AccordionGroupHarness} from '@angular/aria/accordion/testing';
import {MyAccordionComponent} from './my-accordion'; // Your component

describe('MyAccordionComponent', () => {
  let fixture: ComponentFixture<MyAccordionComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MyAccordionComponent],
    });

    fixture = TestBed.createComponent(MyAccordionComponent);
    await fixture.whenStable();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should allow expanding panels', async () => {
    // Load the accordion group harness
    const group = await loader.getHarness(AccordionGroupHarness);

    // Get all individual accordions (items) in the group
    const accordions = await group.getAccordions();
    expect(accordions.length).toBe(3);

    // Verify initial state (first expanded, others collapsed)
    expect(await accordions[0].isExpanded()).toBe(true);
    expect(await accordions[1].isExpanded()).toBe(false);

    // Expand the second panel
    await accordions[1].expand();

    // Verify updated state
    expect(await accordions[1].isExpanded()).toBe(true);
    // If multiExpandable is false, the first one should now be collapsed
    expect(await accordions[0].isExpanded()).toBe(false);
  });
});
```

## API reference

For detailed API documentation, inspect the following API references:

- `AccordionGroup`
- `AccordionTrigger`
- `AccordionPanel`
- `AccordionContent`
