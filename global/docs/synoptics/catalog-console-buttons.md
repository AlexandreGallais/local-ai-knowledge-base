---
id: catalog-console-buttons
title: "Console catalog: buttons and switches"
topic: synoptics
summary: "Cards of the command button, the momentary, latching, push-pull and illuminated push-buttons, the rotary switch, the selector switches and the key switch: subtypes, states, properties, events, model."
checked: 2026-11-13
sources: [S3, S4, S5, S7, S8, S9, S15, S16, S17, S28, S31, S32, S33]
license: MIT, written for this base; facts summarized from the sources below
---

# Console catalog: buttons and switches

Contents: Buttons · Switches · Sources

Common sets, roles (P, C, M, D, X) and front sides (R read, W written): `console-common.md`. Every card
also has the set `panelDevice`.

## Buttons

### Command button (bouton de commande)

- Symbol: code name `commandButton`; `button` is the family. A screen button with its legend.
- Subtypes: momentary action; toggle; with a confirmation step. ISO 9241-161 lists "button" and "toggle button and switch" as two elements. [S28]
- Real working: a software element. Momentary: one value on press, another on release, with a hold time. Toggle: switches between two values at each press. Latched: keeps its value until the controller acknowledges it. A command that touches the safety of the ship asks for a confirmation. [S31] [S32] [S33]
- States: `idle`, `pressed`, waiting for feedback; unavailable.
- Properties: set `panelDevice`; `isPressed` (boolean, C, R); `isCommandPending` (boolean, M, R); `hasConfirmationStep` (boolean, P, R).
- Events: `pressed`, `released`, `commandRequested`.
- Model: the event goes to the executive; `isCommandPending` stays true until the model answers. Never a screen button for an emergency stop. [S31]

### Momentary push-button (bouton-poussoir momentané)

- Symbol: code name `momentaryPushButton`; a round head, its legend under it.
- Subtypes: flush, projecting, booted or mushroom head; double or triple head; with a cover guard; normally open or normally closed contact. [S15] [S16] [S17]
- Real working: the contact changes only while pressed; a spring brings the head back. A normally open contact is open at rest, a normally closed one closed at rest. [S4] [S8]
- States: `released`, `pressed`. Fault: contact stuck or cut.
- Properties: sets `panelDevice` and `contact`; `isPressed` (boolean, C, R and W); `headType` (enum `flush`, `projecting`, `booted`, `mushroom`; P, R); `hasCoverGuard` (boolean, P, R).
- Events: `pressed`, `released`.
- Model: the contact is closed when `isPressed` differs from `isNormallyClosed`. Hold the press for at least one model step.

### Latching push-button (bouton-poussoir à accrochage)

- Symbol: code name `latchingPushButton`; the push-button symbol with a mark of the latched state.
- Subtypes: push-push (one press latches, the next one releases); mechanically interlocked buttons. [S15] [S16]
- Real working: the circuit stays closed after release. When the state of the function shows only by the button position, double it with a light or a word. [S4] [S9]
- States: `released`, `latched`. Fault: contact.
- Properties: sets `panelDevice` and `contact`; `isLatched` (boolean, C, R and W); `isPressed` (boolean, C, R).
- Events: `pressed`, `released`, `latchChanged`.
- Model: toggles at each full press; `isLatched` is part of the saved state.

### Push-pull button (bouton-poussoir à tirer pour réarmer)

- Symbol: code name `pushPullButton`; for an emergency stop, a red mushroom head on a yellow background. [S3] [S5]
- Subtypes: 2 positions; 3 positions (out, centre, in); released by pull, twist or key; lit or not; snap action for the emergency stop. [S5] [S15] [S16]
- Real working: push, the head latches in; pull, it releases. As an emergency stop, the stop order is held until reset, and the opening contacts are opened mechanically (direct opening action). [S5] [S7]
- States: `out` (reset), `in` (latched), `center` for 3 positions. Fault: contact. Lamp test: when lit.
- Properties: sets `panelDevice` and `contact`; `plungerPosition` (enum `out`, `center`, `in`; C, R and W); `positionCount` (integer, 2 or 3, P, R); `resetMethod` (enum `pull`, `twist`, `key`; P, R); `isEmergencyStop` (boolean, P, R).
- Events: `plungerMoved`.
- Model: `in` holds without action. Resetting starts nothing again.

### Illuminated push-button (bouton-poussoir lumineux)

- Symbol: code name `illuminatedPushButton`; the push-button symbol, its head filled with the lamp colour when lit.
- Subtypes: momentary or latching; same or different colour lit and unlit; legend switch with three lines of legend at most. [S9]
- Real working: a button and a light in one head. The lamp invites an action then goes out, or the press lights it as a confirmation; the light shows the answer of the equipment, not the position of the button. [S4] [S9]
- States: button state crossed with `off`, `on`, `flashing`. Lamp test: lit. Fault: lamp blown, contact.
- Properties: sets `panelDevice`, `contact` and `lamp`; `actionType` (enum `momentary`, `latching`; P, R); `isPressed` (boolean, C, R and W); `isLatched` (boolean, C, R and W).
- Events: `pressed`, `released`, `latchChanged`.
- Model: the lamp follows an output of the model, never the press, unless wired as a confirmation.

## Switches

### Rotary switch (commutateur rotatif)

- Symbol: code name `rotarySwitch`; a knob with a pointer over a fixed scale of positions.
- Subtypes: N detented positions, with or without end stops.
- Real working: a manual control switch covered by IEC 60947-5-1. A rotary selector suits three detented positions or more; clockwise means increase. [S7] [S9]
- States: one position among N. Fault: contact.
- Properties: sets `panelDevice` and `contact`; `selectedPosition` (integer, index from 0, C, R and W); `positionCount` (integer, P, R); `positionLabels` (string[], P, R); `stepAngleDeg` (number, °, P, R); `hasEndStops` (boolean, P, R).
- Events: `positionChanged`.
- Model: one detent per event; a table from position to closed contacts.

### Selector switch (sélecteur)

- Symbol: code name `selectorSwitch`; a lever over two to four position labels.
- Subtypes: 2, 3 or 4 positions; stay put, or spring return to the left, the right or the centre; standard, long or knurled handle. [S15] [S16] [S17]
- Real working: one turning handle gives several orders, often for a maintained command. Two positions only when a quick look matters. [S4] [S9]
- States: position; with spring return, held by hand then back.
- Properties: sets `panelDevice` and `contact`; `selectedPosition`, `positionCount` (integer, P or C, R); `positionLabels` (string[], P, R); `returnMode` (enum `stayPut`, `springReturnToLeft`, `springReturnToRight`, `springReturnToCenter`; P, R).
- Events: `positionChanged`, on the way and on the return.
- Model: with spring return, the position comes back by itself on release: two events.

### Illuminated selector switch (sélecteur lumineux)

- Symbol: code name `illuminatedSelectorSwitch`; the selector symbol, its handle filled with the lamp colour when lit.
- Subtypes: 2 or 3 positions, stay put or spring return. [S15] [S16] [S17]
- Real working: a selector whose handle holds a lamp; the lamp is driven apart, as on the illuminated push-button. [S9]
- States: position crossed with `off`, `on`, `flashing`. Lamp test: lit.
- Properties: sets `panelDevice`, `contact` and `lamp`; `selectedPosition` (integer, C, R and W); `positionCount` (integer, P, R); `positionLabels` (string[], P, R); `returnMode` (enum, P, R).
- Events: `positionChanged`.
- Model: as the selector switch; the lamp follows the model.

### Selector push-button (sélecteur à pousser)

- Symbol: code name `selectorPushButton`; a push-button inside a selector ring.
- Subtypes: by the number of positions of the ring.
- Real working: a push-button with a selection by cam: the position of the ring chooses what the press operates. Single source; the other reading is a selector to push before it turns: confirm with the user. [S15]
- States: position crossed with `released`, `pressed`.
- Properties: sets `panelDevice` and `contact`; `selectedPosition` (integer, C, R and W); `positionLabels` (string[], P, R); `isPressed` (boolean, C, R and W).
- Events: `positionChanged`, `pressed`, `released`.
- Model: the effect of the press depends on `selectedPosition`.

### Key switch (commutateur à clé)

- Symbol: code name `keySwitch`; a selector with a key in it; for a pump, labels `OFF` and `ON`.
- Subtypes: 2 or 3 positions, stay put or spring return; key removal positions set by the model of switch; pump on/off key switch. [S15] [S16] [S17]
- Real working: a selector operated by a key, to stop an unauthorised operation or to lock out a machine. Key vertical at off, clockwise toward run, usually removable at off only. [S4] [S9]
- States: position; key in or out.
- Properties: sets `panelDevice` and `contact`; `selectedPosition` (integer, C, R and W); `positionLabels` (string[], P, R); `isKeyInserted` (boolean, C, R and W); `keyRemovalPositions` (integer[], P, R).
- Events: `keyInserted`, `keyRemoved`, `positionChanged`.
- Model: without key, no position change; removal refused outside the allowed positions. The pump key drives `isRunCommanded` of the set `drive`.

## Sources

- [S3] Schneider Electric, FAQ FA28043 on button colours under IEC 60204-1.
- [S4] ABB, "Training Manual No. 1: Pilot Devices 101".
- [S5] ABB, "Training Guide No. 2: Emergency Stops".
- [S7] IEC, 2024, IEC 60947-5-1 ed. 5.0, bilingual preview.
- [S8] IEC, Electropedia, IEV 441-14-53 "push-button".
- [S9] Federal Aviation Administration, 2003, "Human Factors Design Standard", chapter 6.
- [S15] Rockwell Automation, 2022, "30 mm Push Button Specifications".
- [S16] Schneider Electric, 2024, catalogue "Easy Harmony XB2".
- [S17] Schneider Electric, catalogue "Harmony XB4".
- [S28] ISO, 2025, ISO/FDIS 9241-161, sample.
- [S31] [S32] [S33] Rockwell Automation, FactoryTalk View ME 16.00, momentary, maintained and latched push buttons.
