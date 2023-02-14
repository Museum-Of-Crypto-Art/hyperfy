'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hyperfy = require('hyperfy');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function app() {
    const world = hyperfy.useWorld();

    return (
        <app>
            <billboard onPointerDownHint={"hallo"}>
                <text value={"hallo2"}>hallo</text>

            </billboard>
        </app>
    )
}

exports["default"] = app;
