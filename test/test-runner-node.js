#!/usr/bin/env node

require.paths.unshift('.');
require.paths.unshift('../src');
global.namespace = require('namespace.js').namespace;

require('types.js');
require('funcs.js');
require('qunit.js');

var funcs = namespace.lookup('org.startpad.funcs');
var types = namespace.lookup('org.startpad.types');

var ut = namespace.lookup('com.jquery.qunit');
var moduleInfo, testInfo;
var testNumber = 1;

types.extend(ut.QUnit, {
    moduleStart: function (info) {
        moduleInfo = info;
    },

    testStart: function (info) {
        testInfo = info;
    },

    testDone: function (info) {
        console.log(moduleInfo.name + ': ' + info.name +
                    '(' + info.passed + '/' + info.total + ' pass)');
    },

    log: function (info) {
        if (!info.result) {
            console.log(moduleInfo.name + ': ' + testInfo.name + " FAIL: " + ': ' + info.message);
        }
    }
});

require('test-namespace.js');
require('test-types.js');
require('test-funcs.js');
