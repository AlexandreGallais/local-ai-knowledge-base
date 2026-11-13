# synoptics index

One line per document. Open only the documents your task needs. The TypeScript type of each card's
properties is in `kit/symbols/<card-name>.ts` of the global base (for example `push-pull-button.ts`),
generated from the cards: never edit it by hand.

- [Synoptic display rules](synoptic-rules.md): Rules to lay out a synoptic view and to show equipment states, alerts and flashing.
- [Symbol property naming](symbol-property-naming.md): Naming rules for the properties of a synoptic symbol and of its equipment model, with wrong and right examples.
- [Symbol component](symbol-component.md): How to code a reusable SVG symbol, with typed inputs, data attributes, CSS variables and one flash clock.
- [Fluid equipment property sets](fluid-common.md): The seven shared property sets of fluid equipment, their roles, and the rules that derive valve and drive states.
- [Fluid model laws and levels of detail](fluid-model-laws.md): Four laws and two relations that animate a fluid synoptic, and the three levels of model detail to choose from.
- [Hydraulic symbols catalog](catalog-hydraulics.md): Fourteen hydraulic components with their ISO 1219-1 symbol, real working, states, property names and simple model.
- [Compressed air symbols catalog](catalog-compressed-air.md): Six compressed air components with pressure levels, symbol, real working, states, property names and simple model.
- [Piping valves catalog](catalog-piping-valves.md): Eight hand and self-acting piping valves with symbol, real working, states, property names and simple model.
- [Actuated valves and piping parts catalog](catalog-actuated-valves.md): Motor, hydraulic, solenoid and control valves, three-way valve, strainers and manifold, with properties and simple model.
- [Ship fluid equipment catalog](catalog-ship-equipment.md): Ten common ship fluid components, from pumps to steam trap, with symbol, real working, states, properties and model.
- [Ship fluid circuits and submarine tanks catalog](catalog-ship-circuits.md): Five surface ship circuits and four public submarine ballast, trim and air cards, with properties and simple models.
- [Ventilation and air conditioning catalog](catalog-hvac.md): Seven ventilation and air conditioning components, fan to fan coil, with symbol, real working, states, properties and model.
- [French to English index, fluid circuits](index-fr-en-fluids.md): The English name of each French term of the fluid circuit catalogs, with the document that describes it.
- [Electrical generation and distribution catalog](catalog-electrical-power.md): Generator set to converter, nine electrical cards with symbol, real working, states, property names and simple model.
- [Electrical storage, loads and power functions catalog](catalog-electrical-loads.md): Battery, charger, motor and starter, shore connection, load shedding and synchronizing, with properties and simple model.
- [Fire control plan symbols and fire detection catalog](catalog-fire-detection.md): Fire control plan symbols and codes, then detectors, call point, sounder and fire detection panel, with properties and model.
- [Fire extinguishing systems and fire doors catalog](catalog-fire-extinguishing.md): CO2, water mist, foam and sprinkler systems and fire doors, with fire plan symbols, real working, properties and model.
- [Propulsion and steering catalog](catalog-propulsion.md): Engines, turbines, propulsion motor, shaft, gear, propellers, steering gear, bow thruster and a public submarine plant card.
- [Sensors and instrumentation catalog](catalog-instrumentation.md): Instrument tags, six transmitters, switches, the 4 to 20 mA loop, alarm limits and device health, with properties and model.
- [French to English index, ship systems](index-fr-en-systems.md): The English name of each French term of the electrical, fire, propulsion and instrumentation catalogs, with its document.
- [More pumps, valves and piping parts catalog](catalog-pumps-valves-piping.md): Multi-speed and attached pumps, two-way, four-way and isolation valves, bypass damper, pipe, suction inlet, reducer, heat exchanger, heater and sprinkler head.
- [More tanks and mechanical drive parts catalog](catalog-tanks-mechanical.md): Silo, two-stage accumulator, two-compartment and twin tanks, tank cylinder, propeller thrust direction, gear wheel and clutch, with the readings to confirm.
- [More switchgear, power supplies and sensors catalog](catalog-switchgear-sensors.md): Diesel generator with rectifier, UPS, transfer switch, withdrawable breaker, switch-disconnector, changeover switch with off, sensor, detector, leak detector, earth fault monitor.
- [French to English index, more equipment](index-fr-en-equipment.md): The English name of each French term of the added equipment cards, the names to keep among synonyms, and the document of each card.
- [Symbol term aliases](term-aliases.md): Everyday English names of symbols that differ from the card name, each with its card and the property or subtype that tells them apart.
- [Console controls and displays: what they share](console-common.md): How a console symbol talks to the simulation (event out, state in), the four common property sets, the cross-cutting states (fault, lamp test, unavailable), colours, direction of action, and the names to keep.
- [Console catalog: buttons and switches](catalog-console-buttons.md): Cards of the command button, the momentary, latching, push-pull and illuminated push-buttons, the rotary switch, the selector switches and the key switch: subtypes, states, properties, events, model.
- [Console catalog: levers and equipment commands](catalog-console-levers.md): Cards of the joystick, the analog joystick, the throttle lever, the pump command, the two-valve command and the turning gear command: subtypes, states, properties, events, model.
- [Console catalog: indicators, displays and text](catalog-console-displays.md): Cards of the indicator light, the indicator, the legend light, the analog gauge, the segment display, the bargraph, the dual bargraph, the text field, the number field, the paragraph and the text screen.
- [French to English index, console](index-fr-en-console.md): The English name of each console control and display, and of the console words around them, with the document of its card.
