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
const initialState = {// ...
};
function getStore() {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    return {
        state,
        actions: {
            load(state, time) {
                if (state.action === 'play') return;
                state.time = time;
                state.action = 'play';
            }
        },
        // legacy non-uniform scale
        fields:  [{
            key: 'roomId',
            label: 'ROOM id',
            type: 'text',
            instant: false
        },{
            key: 'ccz',
            label: 'ROOMs',
            type: 'switch',
            options: [{
                label: 'CC0',
                value: true
            }, {
                label: 'My ROOMs',
                value: false
            }],
            initial: true
        },{
            key: 'room',
            label: 'ROOM',
            type: 'dropdown',
            options: options,
        },{
            key: 'collision',
            label: 'Collision',
            type: 'switch',
            options: [{
                label: 'On',
                value: true
            }, {
                label: 'Off',
                value: false
            }],
            initial: false
        },{
            key: '__lockedScale',
            type: 'vec3',
            hidden: true
        }]
    };
}

exports["default"] = app;
exports.getStore = getStore;

