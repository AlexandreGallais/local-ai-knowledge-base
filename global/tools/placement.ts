// Resolves a placement config into positions of SVG elements: the reference resolver of the base.
// A pure function: no DOM, the same config always gives the same positions. Format and errors:
// docs/placement/placement-format.md; schema: docs/placement/placement.schema.json.
// Steps: what each rule writes and reads, one writer per slot, dependency order (Kahn), then run.
import { angleBetweenPoints } from '../kit/geometry/angle-between-points.ts';
import { distributeSizes } from '../kit/geometry/distribute-sizes.ts';
import { formatNumber } from '../kit/geometry/format-number.ts';
import { gridCellRect } from '../kit/geometry/grid-cell-rect.ts';
import { polarToCartesian } from '../kit/geometry/polar-to-cartesian.ts';
import { stackSizes } from '../kit/geometry/stack-sizes.ts';

export interface LocalPoint {
  readonly x: number;
  readonly y: number;
}

export interface ElementSpec {
  readonly width: number;
  readonly height: number;
  readonly anchors?: Readonly<Record<string, LocalPoint>>;
}

export type PointRef = string | LocalPoint;
export type ScalarRef = string | number;
export type Edge = 'left' | 'center-x' | 'right' | 'top' | 'center-y' | 'bottom';

export type Rule = | {
  readonly type: 'fixed';
  readonly element: string;
  readonly anchor?: string;
  readonly x: number;
  readonly y: number;
} | {
  readonly type: 'attach';
  readonly element: string;
  readonly anchor?: string;
  readonly to: string;
  readonly dx?: number;
  readonly dy?: number;
} | {
  readonly type: 'align';
  readonly elements: readonly string[];
  readonly edge: Edge;
  readonly to: string;
  readonly offset?: number;
} | {
  readonly type: 'distribute';
  readonly elements: readonly string[];
  readonly axis: 'x' | 'y';
  readonly mode: 'space-between' | 'space-around' | 'space-evenly' | 'gap';
  readonly start: ScalarRef;
  readonly end?: ScalarRef;
  readonly gap?: number;
} | {
  readonly type: 'circle';
  readonly elements: readonly string[];
  readonly around: PointRef;
  readonly radius: number;
  readonly startAngle?: number;
  readonly endAngle?: number;
  readonly rotate?: 'none' | 'radial' | 'tangent';
} | {
  readonly type: 'grid';
  readonly elements: readonly string[];
  readonly origin: PointRef;
  readonly columns: number;
  readonly cellWidth: number;
  readonly cellHeight: number;
  readonly gapX?: number;
  readonly gapY?: number;
} | {
  readonly type: 'rotate';
  readonly element: string;
  readonly angle?: number;
  readonly toward?: string;
};

export interface PlacementConfig {
  readonly version: 1;
  readonly canvas?: {
    readonly width: number;
    readonly height: number;
  };
  readonly elements: Readonly<Record<string, ElementSpec>>;
  readonly rules: readonly Rule[];
}

export interface PlacedElement {
  readonly x: number;
  readonly y: number;
  readonly rotation: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly transform: string;
}

export interface PlacementIssue {
  readonly code: 'UNKNOWN_ELEMENT' | 'UNKNOWN_ANCHOR' | 'CONFLICT' | 'UNPLACED' | 'CYCLE' | 'DOES_NOT_FIT' | 'INVALID_VALUE';
  readonly message: string;
}

export type PlacementResult = | {
  readonly ok: true;
  readonly order: readonly number[];
  readonly elements: Readonly<Record<string, PlacedElement>>;
} | {
  readonly ok: false;
  readonly errors: readonly PlacementIssue[];
};

type RuleOf<K extends Rule['type']> = Extract<Rule, { readonly type: K }>;

interface ParsedRef {
  readonly element: string;
  readonly anchor: string;
}

interface RuleAccess {
  readonly writes: readonly string[];
  readonly reads: readonly string[];
}

// What the checks share: the sizes of the elements, and the issues found so far.
interface Checks {
  readonly specs: ReadonlyMap<string, ElementSpec>;
  readonly errors: PlacementIssue[];
}

interface Predecessor {
  readonly from: number;
  readonly element: string;
}

interface Graph {
  readonly predecessors: readonly (readonly Predecessor[])[];
  readonly successors: readonly (readonly number[])[];
}

// Positions found so far while the rules run.
interface State {
  readonly specs: ReadonlyMap<string, ElementSpec>;
  readonly x: Map<string, number>;
  readonly y: Map<string, number>;
  readonly rotation: Map<string, number>;
}

const BOX_ANCHORS: readonly string[] = [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];
const CANVAS = 'canvas';
const START_EDGES = new Set<Edge>([
  'left',
  'top',
]);
const END_EDGES = new Set<Edge>([
  'right',
  'bottom',
]);

// ---------------------------------------------------------------- references and anchors
function parseRef(ref: string): ParsedRef {
  const dot = ref.indexOf('.');

  return dot === -1 ? {
    element: ref,
    anchor: 'center',
  } : {
    element: ref.slice(0, dot),
    anchor: ref.slice(dot + 1),
  };
}

function edgeAxis(edge: Edge): 'x' | 'y' {
  return edge === 'left' || edge === 'center-x' || edge === 'right' ? 'x' : 'y';
}

function label(index: number, rule: Rule): string {
  return `rule #${String(index + 1)} (${rule.type})`;
}

// 0 at the start of the box, 1 at the end, 0.5 in the middle.
function share(anchor: string, start: string, end: string): number {
  if (anchor.includes(start)) {
    return 0;
  }
  return anchor.includes(end) ? 1 : 0.5;
}

function anchorOffset(specs: ReadonlyMap<string, ElementSpec>, element: string, anchor: string): LocalPoint | undefined {
  const spec = specs.get(element);
  const custom = spec?.anchors?.[anchor];

  if (spec === undefined || custom !== undefined) {
    return custom;
  }
  if (!BOX_ANCHORS.includes(anchor)) {
    return undefined;
  }
  return {
    x: spec.width * share(anchor, 'left', 'right'),
    y: spec.height * share(anchor, 'top', 'bottom'),
  };
}

function unknownAnchor(index: number, rule: Rule, element: string, anchor: string): PlacementIssue {
  return {
    code: 'UNKNOWN_ANCHOR',
    message: `${label(index, rule)} uses anchor "${anchor}" on "${element}". Use one of ${BOX_ANCHORS.join(', ')}, or an anchor declared on the element.`,
  };
}

function checkElement(checks: Checks, index: number, rule: Rule, element: string, mayBeCanvas: boolean): boolean {
  if (element === CANVAS && !mayBeCanvas) {
    checks.errors.push({
      code: 'INVALID_VALUE',
      message: `${label(index, rule)} cannot place "canvas".`,
    });
    return false;
  }
  if (checks.specs.has(element)) {
    return true;
  }
  const hint = element === CANVAS ? ' Declare "canvas" with a width and a height.' : '';

  checks.errors.push({
    code: 'UNKNOWN_ELEMENT',
    message: `${label(index, rule)} refers to "${element}", which is not in "elements".${hint}`,
  });
  return false;
}

function checkRef(checks: Checks, index: number, rule: Rule, ref: string): ParsedRef | undefined {
  const parsed = parseRef(ref);

  if (!checkElement(checks, index, rule, parsed.element, true)) {
    return undefined;
  }
  if (anchorOffset(checks.specs, parsed.element, parsed.anchor) === undefined) {
    checks.errors.push(unknownAnchor(index, rule, parsed.element, parsed.anchor));
    return undefined;
  }
  return parsed;
}

// ---------------------------------------------------------------- what each rule writes and reads
// The slots a reference reads on some axes; the canvas never moves, so it is read from nowhere.
function refReads(checks: Checks, index: number, rule: Rule, ref: PointRef | ScalarRef | undefined, axes: readonly string[]): readonly string[] {
  if (typeof ref !== 'string') {
    return [];
  }
  const parsed = checkRef(checks, index, rule, ref);

  return parsed === undefined || parsed.element === CANVAS ? [] : axes.map((axis) => `${parsed.element}.${axis}`);
}

function elementWrites(checks: Checks, index: number, rule: Rule, elements: readonly string[], axes: readonly string[]): readonly string[] {
  return elements
    .filter((element) => checkElement(checks, index, rule, element, false))
    .flatMap((element) => axes.map((axis) => `${element}.${axis}`));
}

function ownAnchorCheck(checks: Checks, index: number, rule: RuleOf<'attach' | 'fixed'>): void {
  if (checks.specs.has(rule.element) && rule.anchor !== undefined && anchorOffset(checks.specs, rule.element, rule.anchor) === undefined) {
    checks.errors.push(unknownAnchor(index, rule, rule.element, rule.anchor));
  }
}

function invalidUnless(checks: Checks, condition: boolean, index: number, rule: Rule, need: string): void {
  if (!condition) {
    checks.errors.push({
      code: 'INVALID_VALUE',
      message: `${label(index, rule)} needs ${need}.`,
    });
  }
}

function placeAccess(checks: Checks, index: number, rule: RuleOf<'attach' | 'fixed'>): RuleAccess {
  const writes = elementWrites(checks, index, rule, [rule.element], [
    'x',
    'y',
  ]);

  ownAnchorCheck(checks, index, rule);
  return {
    writes,
    reads: rule.type === 'attach' ? refReads(checks, index, rule, rule.to, [
      'x',
      'y',
    ]) : [],
  };
}

function alignAccess(checks: Checks, index: number, rule: RuleOf<'align'>): RuleAccess {
  const axis = edgeAxis(rule.edge);
  const writes = elementWrites(checks, index, rule, rule.elements, [axis]);
  const readsTarget = checkElement(checks, index, rule, rule.to, true) && rule.to !== CANVAS;

  return {
    writes,
    reads: readsTarget ? [`${rule.to}.${axis}`] : [],
  };
}

function distributeAccess(checks: Checks, index: number, rule: RuleOf<'distribute'>): RuleAccess {
  const writes = elementWrites(checks, index, rule, rule.elements, [rule.axis]);
  const reads = [
    rule.start,
    rule.end,
  ].flatMap((bound) => refReads(checks, index, rule, bound, [rule.axis]));

  invalidUnless(checks, rule.mode !== 'gap' || rule.gap !== undefined, index, rule, '"gap" when mode is "gap"');
  invalidUnless(checks, rule.mode === 'gap' || rule.end !== undefined, index, rule, `"end" when mode is "${rule.mode}"`);
  return {
    writes,
    reads,
  };
}

function circleAccess(checks: Checks, index: number, rule: RuleOf<'circle'>): RuleAccess {
  const axes = rule.rotate === undefined || rule.rotate === 'none' ? [
    'x',
    'y',
  ] : [
    'x',
    'y',
    'r',
  ];
  const writes = elementWrites(checks, index, rule, rule.elements, axes);
  const reads = refReads(checks, index, rule, rule.around, [
    'x',
    'y',
  ]);

  invalidUnless(checks, rule.radius >= 0, index, rule, 'a radius >= 0');
  return {
    writes,
    reads,
  };
}

function gridAccess(checks: Checks, index: number, rule: RuleOf<'grid'>): RuleAccess {
  const writes = elementWrites(checks, index, rule, rule.elements, [
    'x',
    'y',
  ]);
  const reads = refReads(checks, index, rule, rule.origin, [
    'x',
    'y',
  ]);

  invalidUnless(checks, Number.isInteger(rule.columns) && rule.columns >= 1, index, rule, 'an integer "columns" >= 1');
  return {
    writes,
    reads,
  };
}

function rotateAccess(checks: Checks, index: number, rule: RuleOf<'rotate'>): RuleAccess {
  const writes = elementWrites(checks, index, rule, [rule.element], ['r']);
  const towardReads = rule.toward === undefined ? [] : [
    `${rule.element}.x`,
    `${rule.element}.y`,
    ...refReads(checks, index, rule, rule.toward, [
      'x',
      'y',
    ]),
  ];

  invalidUnless(checks, (rule.angle === undefined) !== (rule.toward === undefined), index, rule, 'exactly one of "angle" or "toward"');
  return {
    writes,
    reads: towardReads,
  };
}

function accessOf(checks: Checks, index: number, rule: Rule): RuleAccess {
  switch (rule.type) {
    case 'fixed':
    case 'attach': {
      return placeAccess(checks, index, rule);
    }
    case 'align': {
      return alignAccess(checks, index, rule);
    }
    case 'distribute': {
      return distributeAccess(checks, index, rule);
    }
    case 'circle': {
      return circleAccess(checks, index, rule);
    }
    case 'grid': {
      return gridAccess(checks, index, rule);
    }
    case 'rotate': {
      return rotateAccess(checks, index, rule);
    }
  }
}

// ---------------------------------------------------------------- one writer per slot
function conflictIssue(config: PlacementConfig, slot: string, first: number, second: number): PlacementIssue {
  const [
    element = '',
    axis = '',
  ] = slot.split('.');
  const what = axis === 'r' ? 'rotation' : axis;
  const firstRule = config.rules[first];
  const secondRule = config.rules[second];
  const names = firstRule === undefined || secondRule === undefined ? '' : `${label(first, firstRule)} and by ${label(second, secondRule)}`;

  return {
    code: 'CONFLICT',
    message: `"${element}" ${what} is set by ${names}. Keep one.`,
  };
}

function writersOf(config: PlacementConfig, accesses: readonly RuleAccess[], errors: PlacementIssue[]): ReadonlyMap<string, number> {
  const writerOf = new Map<string, number>();

  accesses.forEach((access, index) => {
    for (const slot of access.writes) {
      const previous = writerOf.get(slot);

      if (previous === undefined) {
        writerOf.set(slot, index);
      } else {
        errors.push(conflictIssue(config, slot, previous, index));
      }
    }
  });
  return writerOf;
}

function unplacedIssues(config: PlacementConfig, writerOf: ReadonlyMap<string, number>): readonly PlacementIssue[] {
  return Object
    .keys(config.elements)
    .flatMap((element) => [
      'x',
      'y',
    ]
      .filter((axis) => !writerOf.has(`${element}.${axis}`))
      .map((axis): PlacementIssue => ({
        code: 'UNPLACED',
        message: `"${element}" has no rule for ${axis}. Add a rule that sets it.`,
      })));
}

// ---------------------------------------------------------------- dependency order
function graphOf(accesses: readonly RuleAccess[], writerOf: ReadonlyMap<string, number>): Graph {
  const predecessors = accesses.map((access) => {
    const byWriter = new Map<number, Predecessor>();

    for (const slot of access.reads) {
      const writer = writerOf.get(slot);

      if (writer !== undefined && !byWriter.has(writer)) {
        byWriter.set(writer, {
          from: writer,
          element: slot.slice(0, slot.indexOf('.')),
        });
      }
    }
    return [...byWriter.values()];
  });
  const successors = accesses.map((_access, index) => predecessors.flatMap((list, reader) => (list.some((item) => item.from === index) ? [reader] : [])));

  return {
    predecessors,
    successors,
  };
}

// Kahn's algorithm; among the rules that are ready, the lowest index first.
function kahnOrder(graph: Graph): readonly number[] {
  const pending = graph.predecessors.map((list) => list.length);
  const order: number[] = [];

  for (let next = pending.indexOf(0); next !== -1; next = pending.findIndex((value, index) => value === 0 && !order.includes(index))) {
    order.push(next);
    for (const successor of graph.successors[next] ?? []) {
      pending[successor] = (pending[successor] ?? 0) - 1;
    }
  }
  return order;
}

// Walks back from the lowest rule left until a rule repeats, and names the elements of the loop.
function cycleIssue(graph: Graph, order: readonly number[]): PlacementIssue {
  const isDone = (index: number): boolean => order.includes(index);
  const path: number[] = [];
  const via: string[] = [];
  let current = graph.predecessors.findIndex((_list, index) => !isDone(index));

  while (!path.includes(current)) {
    path.push(current);
    const step = (graph.predecessors[current] ?? [])
      .filter((item) => !isDone(item.from))
      .toSorted((a, b) => a.from - b.from)[0];

    via.push(step?.element ?? '');
    current = step?.from ?? current;
  }
  const loop = path.slice(path.indexOf(current));
  const names = via
    .slice(path.indexOf(current))
    .toReversed();
  const rules = names.map((_name, position) => `#${String((loop[(loop.length - position) % loop.length] ?? 0) + 1)}`);

  return {
    code: 'CYCLE',
    message: `${[...names, names[0] ?? ''].join(' -> ')} (rules ${rules.join(', ')}). Each element is placed from the one before it. Break the loop with a "fixed" rule.`,
  };
}

// ---------------------------------------------------------------- run the rules
function offset(state: State, element: string, anchor: string): LocalPoint {
  return anchorOffset(state.specs, element, anchor) ?? {
    x: 0,
    y: 0,
  };
}

function sizeOf(state: State, element: string): ElementSpec {
  return state.specs.get(element) ?? {
    width: 0,
    height: 0,
  };
}

function refPoint(state: State, ref: PointRef): LocalPoint {
  if (typeof ref !== 'string') {
    return ref;
  }
  const parsed = parseRef(ref);
  const local = offset(state, parsed.element, parsed.anchor);

  return {
    x: (state.x.get(parsed.element) ?? 0) + local.x,
    y: (state.y.get(parsed.element) ?? 0) + local.y,
  };
}

function refScalar(state: State, ref: ScalarRef, axis: 'x' | 'y'): number {
  return typeof ref === 'number' ? ref : refPoint(state, ref)[axis];
}

function setPosition(state: State, element: string, point: LocalPoint): void {
  state.x.set(element, point.x);
  state.y.set(element, point.y);
}

function runPlace(state: State, rule: RuleOf<'attach' | 'fixed'>): void {
  const local = offset(state, rule.element, rule.anchor ?? (rule.type === 'fixed' ? 'top-left' : 'center'));
  const target = rule.type === 'fixed' ? {
    x: rule.x,
    y: rule.y,
  } : refPoint(state, rule.to);
  const moved = rule.type === 'fixed' ? target : {
    x: target.x + (rule.dx ?? 0),
    y: target.y + (rule.dy ?? 0),
  };

  setPosition(state, rule.element, {
    x: moved.x - local.x,
    y: moved.y - local.y,
  });
}

function runAlign(state: State, rule: RuleOf<'align'>): void {
  const axis = edgeAxis(rule.edge);
  const length = (element: string): number => (axis === 'x' ? sizeOf(state, element).width : sizeOf(state, element).height);
  const targetStart = (axis === 'x' ? state.x : state.y).get(rule.to) ?? 0;
  const factor = START_EDGES.has(rule.edge) ? 0 : (END_EDGES.has(rule.edge) ? 1 : 0.5);

  for (const element of rule.elements) {
    (axis === 'x' ? state.x : state.y).set(element, targetStart + (length(rule.to) - length(element)) * factor + (rule.offset ?? 0));
  }
}

function runDistribute(state: State, index: number, rule: RuleOf<'distribute'>): PlacementIssue | undefined {
  const sizes = rule.elements.map((element) => (rule.axis === 'x' ? sizeOf(state, element).width : sizeOf(state, element).height));
  const start = refScalar(state, rule.start, rule.axis);
  const end = rule.end === undefined ? start : refScalar(state, rule.end, rule.axis);
  const needed = sizes.reduce((sum, value) => sum + value, 0);

  if (rule.mode !== 'gap' && needed > end - start) {
    return {
      code: 'DOES_NOT_FIT',
      message: `${label(index, rule)}: the elements need ${formatNumber(needed, 3)} but only ${formatNumber(end - start, 3)} is available.`,
    };
  }
  const positions = rule.mode === 'gap' ? stackSizes(sizes, start, rule.gap ?? 0) : distributeSizes(
    sizes,
    {
      start,
      end,
    },
    rule.mode,
  );

  rule.elements.forEach((element, position) => {
    (rule.axis === 'x' ? state.x : state.y).set(element, positions[position] ?? start);
  });
  return undefined;
}

// The angle of each element on the circle: a full circle, or from startAngle to endAngle.
function circleAngles(rule: RuleOf<'circle'>): readonly number[] {
  const startAngle = rule.startAngle ?? 0;
  const total = rule.elements.length;

  if (rule.endAngle === undefined) {
    return rule.elements.map((_element, position) => startAngle + (position * 360) / total);
  }
  if (total === 1) {
    return [(startAngle + rule.endAngle) / 2];
  }
  const step = (rule.endAngle - startAngle) / (total - 1);

  return rule.elements.map((_element, position) => startAngle + position * step);
}

function runCircle(state: State, rule: RuleOf<'circle'>): void {
  const center = refPoint(state, rule.around);
  const angles = circleAngles(rule);
  const turn = {
    none: undefined,
    radial: 0,
    tangent: 90,
  }[rule.rotate ?? 'none'];

  rule.elements.forEach((element, position) => {
    const angle = angles[position] ?? 0;
    const point = polarToCartesian(center, rule.radius, angle);

    setPosition(state, element, {
      x: point.x - sizeOf(state, element).width / 2,
      y: point.y - sizeOf(state, element).height / 2,
    });
    if (turn !== undefined) {
      state.rotation.set(element, angle + turn);
    }
  });
}

function runGrid(state: State, rule: RuleOf<'grid'>): void {
  const grid = {
    origin: refPoint(state, rule.origin),
    columns: rule.columns,
    cellWidth: rule.cellWidth,
    cellHeight: rule.cellHeight,
    gapX: rule.gapX ?? 0,
    gapY: rule.gapY ?? 0,
  };

  rule.elements.forEach((element, position) => {
    const cell = gridCellRect(grid, position);

    setPosition(state, element, {
      x: cell.x + (cell.width - sizeOf(state, element).width) / 2,
      y: cell.y + (cell.height - sizeOf(state, element).height) / 2,
    });
  });
}

function runRotate(state: State, rule: RuleOf<'rotate'>): void {
  const angle = rule.angle ?? angleBetweenPoints(refPoint(state, `${rule.element}.center`), refPoint(state, rule.toward ?? rule.element));

  state.rotation.set(rule.element, angle);
}

function runRule(state: State, index: number, rule: Rule): PlacementIssue | undefined {
  switch (rule.type) {
    case 'fixed':
    case 'attach': {
      runPlace(state, rule);
      return undefined;
    }
    case 'align': {
      runAlign(state, rule);
      return undefined;
    }
    case 'distribute': {
      return runDistribute(state, index, rule);
    }
    case 'circle': {
      runCircle(state, rule);
      return undefined;
    }
    case 'grid': {
      runGrid(state, rule);
      return undefined;
    }
    case 'rotate': {
      runRotate(state, rule);
      return undefined;
    }
  }
}

function placed(state: State, element: string, spec: ElementSpec): PlacedElement {
  const left = state.x.get(element) ?? 0;
  const top = state.y.get(element) ?? 0;
  const angle = state.rotation.get(element) ?? 0;
  const n = (value: number): string => formatNumber(value, 3);
  const rotate = angle === 0 ? '' : ` rotate(${n(angle)} ${n(spec.width / 2)} ${n(spec.height / 2)})`;

  return {
    x: left,
    y: top,
    rotation: angle,
    centerX: left + spec.width / 2,
    centerY: top + spec.height / 2,
    transform: `translate(${n(left)} ${n(top)})${rotate}`,
  };
}

function run(config: PlacementConfig, specs: ReadonlyMap<string, ElementSpec>, order: readonly number[]): PlacementResult {
  const state: State = {
    specs,
    x: new Map([[CANVAS, 0]]),
    y: new Map([[CANVAS, 0]]),
    rotation: new Map(),
  };

  for (const index of order) {
    const rule = config.rules[index];
    const issue = rule === undefined ? undefined : runRule(state, index, rule);

    if (issue !== undefined) {
      return {
        ok: false,
        errors: [issue],
      };
    }
  }
  const elements = Object.fromEntries(Object
    .entries(config.elements)
    .map(([
      element,
      spec,
    ]) => [
      element,
      placed(state, element, spec),
    ]));

  return {
    ok: true,
    order: order.map((index) => index + 1),
    elements,
  };
}

/**
 * Places the elements of a config: the position, rotation, center and SVG transform of each one,
 * or every error found, each with its code and a one-line message.
 * @param config - The elements with their sizes and anchors, and the rules that place them.
 * @returns The placed elements and the order the rules ran in, or the errors.
 */
export function resolvePlacement(config: PlacementConfig): PlacementResult {
  const specs = new Map<string, ElementSpec>(Object.entries(config.elements));

  if (config.canvas !== undefined) {
    specs.set(CANVAS, {
      width: config.canvas.width,
      height: config.canvas.height,
    });
  }
  const checks: Checks = {
    specs,
    errors: [],
  };
  const accesses = config.rules.map((rule, index) => accessOf(checks, index, rule));
  const writerOf = writersOf(config, accesses, checks.errors);
  const errors = [
    ...checks.errors,
    ...unplacedIssues(config, writerOf),
  ];

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
    };
  }
  const graph = graphOf(accesses, writerOf);
  const order = kahnOrder(graph);

  return order.length < config.rules.length ? {
    ok: false,
    errors: [cycleIssue(graph, order)],
  } : run(config, specs, order);
}
