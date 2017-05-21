/*
* Alt is a library that facilitates the managing of state within Javascript apps. It is modeled after flux.
*
* Flux model:
* It eschews MVC in favor of unidirectional data flow:
*
* 1. Data enters through a single place (your actions),
* 2. then flows outward through its state manager (the store),
* 3. and then finally into the View.
* 4. The View can then restart the flow by calling other actions in response to user input.
*
* VIEW -> {DATA} -> ACTIONS -> STORE -> VIEW (updated)
* */

import Alt from 'alt/lib';
const alt = new Alt();

import chromeDebug from 'alt/utils/chromeDebug';
chromeDebug(alt);

export default alt;
