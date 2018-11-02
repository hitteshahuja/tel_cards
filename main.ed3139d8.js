// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({35:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function noop() {}

function assign(tar, src) {
	for (var k in src) tar[k] = src[k];
	return tar;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachBetween(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function detachBefore(after) {
	while (after.previousSibling) {
		after.parentNode.removeChild(after.previousSibling);
	}
}

function detachAfter(before) {
	while (before.nextSibling) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function reinsertBetween(before, after, target) {
	while (before.nextSibling && before.nextSibling !== after) {
		target.appendChild(before.parentNode.removeChild(before.nextSibling));
	}
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function reinsertAfter(before, target) {
	while (before.nextSibling) target.appendChild(before.nextSibling);
}

function reinsertBefore(after, target) {
	var parent = after.parentNode;
	while (parent.firstChild !== after) target.appendChild(parent.firstChild);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createFragment() {
	return document.createDocumentFragment();
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setAttributes(node, attributes) {
	for (var key in attributes) {
		if (key in node) {
			node[key] = attributes[key];
		} else {
			if (attributes[key] === undefined) removeAttribute(node, key);else setAttribute(node, key, attributes[key]);
		}
	}
}

function removeAttribute(node, attribute) {
	node.removeAttribute(attribute);
}

function setXlinkAttribute(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

function getBindingGroupValue(group) {
	var value = [];
	for (var i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.push(group[i].__value);
	}
	return value;
}

function toNumber(value) {
	return value === '' ? undefined : +value;
}

function timeRangesToArray(ranges) {
	var array = [];
	for (var i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

function children(element) {
	return Array.from(element.childNodes);
}

function claimElement(nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText(nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function setInputType(input, type) {
	try {
		input.type = type;
	} catch (e) {}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function selectOption(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];

		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
}

function selectOptions(select, value) {
	for (var i = 0; i < select.options.length; i += 1) {
		var option = select.options[i];
		option.selected = ~value.indexOf(option.__value);
	}
}

function selectValue(select) {
	var selectedOption = select.querySelector(':checked') || select.options[0];
	return selectedOption && selectedOption.__value;
}

function selectMultipleValue(select) {
	return [].map.call(select.querySelectorAll(':checked'), function (option) {
		return option.__value;
	});
}

function destroyBlock(block, lookup) {
	block.u();
	block.d();
	lookup[block.key] = null;
}

function outroAndDestroyBlock(block, lookup) {
	block.o(function () {
		destroyBlock(block, lookup);
	});
}

function updateKeyedEach(old_blocks, component, changed, key_prop, dynamic, list, lookup, node, has_outro, create_each_block, intro_method, next, get_context) {
	var o = old_blocks.length;
	var n = list.length;

	var i = o;
	var old_indexes = {};
	while (i--) old_indexes[old_blocks[i].key] = i;

	var new_blocks = [];
	var new_lookup = {};
	var deltas = {};

	var i = n;
	while (i--) {
		var key = list[i][key_prop];
		var block = lookup[key];

		if (!block) {
			block = create_each_block(component, key, get_context(i));
			block.c();
		} else if (dynamic) {
			block.p(changed, get_context(i));
		}

		new_blocks[i] = new_lookup[key] = block;

		if (key in old_indexes) deltas[key] = Math.abs(i - old_indexes[key]);
	}

	var will_move = {};
	var did_move = {};

	var destroy = has_outro ? outroAndDestroyBlock : destroyBlock;

	function insert(block) {
		block[intro_method](node, next);
		lookup[block.key] = block;
		next = block.first;
		n--;
	}

	while (o && n) {
		var new_block = new_blocks[n - 1];
		var old_block = old_blocks[o - 1];
		var new_key = new_block.key;
		var old_key = old_block.key;

		if (new_block === old_block) {
			// do nothing
			next = new_block.first;
			o--;
			n--;
		} else if (!new_lookup[old_key]) {
			// remove old block
			destroy(old_block, lookup);
			o--;
		} else if (!lookup[new_key] || will_move[new_key]) {
			insert(new_block);
		} else if (did_move[old_key]) {
			o--;
		} else if (deltas[new_key] > deltas[old_key]) {
			did_move[new_key] = true;
			insert(new_block);
		} else {
			will_move[old_key] = true;
			o--;
		}
	}

	while (o--) {
		var old_block = old_blocks[o];
		if (!new_lookup[old_block.key]) destroy(old_block, lookup);
	}

	while (n) insert(new_blocks[n - 1]);

	return new_blocks;
}

function getSpreadUpdate(levels, updates) {
	var update = {};

	var to_null_out = {};
	var accounted_for = {};

	var i = levels.length;
	while (i--) {
		var o = levels[i];
		var n = updates[i];

		if (n) {
			for (var key in o) {
				if (!(key in n)) to_null_out[key] = 1;
			}

			for (var key in n) {
				if (!accounted_for[key]) {
					update[key] = n[key];
					accounted_for[key] = 1;
				}
			}

			levels[i] = n;
		} else {
			for (var key in o) {
				accounted_for[key] = 1;
			}
		}
	}

	for (var key in to_null_out) {
		if (!(key in update)) update[key] = undefined;
	}

	return update;
}

function linear(t) {
	return t;
}

function generateRule(a, b, delta, duration, ease, fn) {
	var keyframes = '{\n';

	for (var p = 0; p <= 1; p += 16.666 / duration) {
		var t = a + delta * ease(p);
		keyframes += p * 100 + '%{' + fn(t) + '}\n';
	}

	return keyframes + '100% {' + fn(b) + '}\n}';
}

// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
	var hash = 5381;
	var i = str.length;

	while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);
	return hash >>> 0;
}

function wrapTransition(component, node, fn, params, intro, outgroup) {
	var obj = fn(node, params);
	var duration = obj.duration || 300;
	var ease = obj.easing || linear;
	var cssText;

	// TODO share <style> tag between all transitions?
	if (obj.css && !transitionManager.stylesheet) {
		var style = createElement('style');
		document.head.appendChild(style);
		transitionManager.stylesheet = style.sheet;
	}

	if (intro) {
		if (obj.css && obj.delay) {
			cssText = node.style.cssText;
			node.style.cssText += obj.css(0);
		}

		if (obj.tick) obj.tick(0);
	}

	return {
		t: intro ? 0 : 1,
		running: false,
		program: null,
		pending: null,
		run: function (intro, callback) {
			var program = {
				start: window.performance.now() + (obj.delay || 0),
				intro: intro,
				callback: callback
			};

			if (obj.delay) {
				this.pending = program;
			} else {
				this.start(program);
			}

			if (!this.running) {
				this.running = true;
				transitionManager.add(this);
			}
		},
		start: function (program) {
			component.fire(program.intro ? 'intro.start' : 'outro.start', { node: node });

			program.a = this.t;
			program.b = program.intro ? 1 : 0;
			program.delta = program.b - program.a;
			program.duration = duration * Math.abs(program.b - program.a);
			program.end = program.start + program.duration;

			if (obj.css) {
				if (obj.delay) node.style.cssText = cssText;

				program.rule = generateRule(program.a, program.b, program.delta, program.duration, ease, obj.css);

				transitionManager.addRule(program.rule, program.name = '__svelte_' + hash(program.rule));

				node.style.animation = (node.style.animation || '').split(', ').filter(function (anim) {
					// when introing, discard old animations if there are any
					return anim && (program.delta < 0 || !/__svelte/.test(anim));
				}).concat(program.name + ' ' + program.duration + 'ms linear 1 forwards').join(', ');
			}

			this.program = program;
			this.pending = null;
		},
		update: function (now) {
			var program = this.program;
			if (!program) return;

			var p = now - program.start;
			this.t = program.a + program.delta * ease(p / program.duration);
			if (obj.tick) obj.tick(this.t);
		},
		done: function () {
			var program = this.program;
			this.t = program.b;
			if (obj.tick) obj.tick(this.t);
			if (obj.css) transitionManager.deleteRule(node, program.name);
			program.callback();
			program = null;
			this.running = !!this.pending;
		},
		abort: function () {
			if (obj.tick) obj.tick(1);
			if (obj.css) transitionManager.deleteRule(node, this.program.name);
			this.program = this.pending = null;
			this.running = false;
		}
	};
}

var transitionManager = {
	running: false,
	transitions: [],
	bound: null,
	stylesheet: null,
	activeRules: {},

	add: function (transition) {
		this.transitions.push(transition);

		if (!this.running) {
			this.running = true;
			requestAnimationFrame(this.bound || (this.bound = this.next.bind(this)));
		}
	},

	addRule: function (rule, name) {
		if (!this.activeRules[name]) {
			this.activeRules[name] = true;
			this.stylesheet.insertRule('@keyframes ' + name + ' ' + rule, this.stylesheet.cssRules.length);
		}
	},

	next: function () {
		this.running = false;

		var now = window.performance.now();
		var i = this.transitions.length;

		while (i--) {
			var transition = this.transitions[i];

			if (transition.program && now >= transition.program.end) {
				transition.done();
			}

			if (transition.pending && now >= transition.pending.start) {
				transition.start(transition.pending);
			}

			if (transition.running) {
				transition.update(now);
				this.running = true;
			} else if (!transition.pending) {
				this.transitions.splice(i, 1);
			}
		}

		if (this.running) {
			requestAnimationFrame(this.bound);
		} else if (this.stylesheet) {
			var i = this.stylesheet.cssRules.length;
			while (i--) this.stylesheet.deleteRule(i);
			this.activeRules = {};
		}
	},

	deleteRule: function (node, name) {
		node.style.animation = node.style.animation.split(', ').filter(function (anim) {
			return anim.indexOf(name) === -1;
		}).join(', ');
	}
};

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function destroyDev(detach) {
	destroy.call(this, detach);
	this.destroy = function () {
		console.warn('Component was already destroyed');
	};
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

function _differsImmutable(a, b) {
	return a != a ? b == b : a !== b;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function getDev(key) {
	if (key) console.warn("`let x = component.get('x')` is deprecated. Use `let { x } = component.get()` instead");
	return get.call(this, key);
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function observe(key, callback, options) {
	var fn = callback.bind(this);

	if (!options || options.init !== false) {
		fn(this.get()[key], undefined);
	}

	return this.on(options && options.defer ? 'update' : 'state', function (event) {
		if (event.changed[key]) fn(event.current[key], event.previous && event.previous[key]);
	});
}

function observeDev(key, callback, options) {
	console.warn("this.observe(key, (newValue, oldValue) => {...}) is deprecated. Use\n\n  // runs before DOM updates\n  this.on('state', ({ changed, current, previous }) => {...});\n\n  // runs after DOM updates\n  this.on('update', ...);\n\n...or add the observe method from the svelte-extras package");

	var c = (key = '' + key).search(/[.[]/);
	if (c > -1) {
		var message = 'The first argument to component.observe(...) must be the name of a top-level property';
		if (c > 0) message += ", i.e. '" + key.slice(0, c) + "' rather than '" + key + "'";

		throw new Error(message);
	}

	return observe.call(this, key, callback, options);
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function () {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function onDev(eventName, handler) {
	if (eventName === 'teardown') {
		console.warn("Use component.on('destroy', ...) instead of component.on('teardown', ...) which has been deprecated and will be unsupported in Svelte 2");
		return this.on('destroy', handler);
	}

	return on.call(this, eventName, handler);
}

function run(fn) {
	fn();
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function setDev(newState) {
	if (typeof newState !== 'object') {
		throw new Error(this._debugName + '.set was called without an object of data key-values to update.');
	}

	this._checkReadOnly(newState);
	set.call(this, newState);
}

function callAll(fns) {
	while (fns && fns.length) fns.shift()();
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function isPromise(value) {
	return value && typeof value.then === 'function';
}

var PENDING = {};
var SUCCESS = {};
var FAILURE = {};

function removeFromStore() {
	this.store._remove(this);
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
};

var protoDev = {
	destroy: destroyDev,
	get: getDev,
	fire: fire,
	observe: observeDev,
	on: onDev,
	set: setDev,
	teardown: destroyDev,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
};

exports.blankObject = blankObject;
exports.destroy = destroy;
exports.destroyDev = destroyDev;
exports._differs = _differs;
exports._differsImmutable = _differsImmutable;
exports.fire = fire;
exports.getDev = getDev;
exports.get = get;
exports.init = init;
exports.observe = observe;
exports.observeDev = observeDev;
exports.on = on;
exports.onDev = onDev;
exports.run = run;
exports.set = set;
exports._set = _set;
exports.setDev = setDev;
exports.callAll = callAll;
exports._mount = _mount;
exports._unmount = _unmount;
exports.isPromise = isPromise;
exports.PENDING = PENDING;
exports.SUCCESS = SUCCESS;
exports.FAILURE = FAILURE;
exports.removeFromStore = removeFromStore;
exports.proto = proto;
exports.protoDev = protoDev;
exports.appendNode = appendNode;
exports.insertNode = insertNode;
exports.detachNode = detachNode;
exports.detachBetween = detachBetween;
exports.detachBefore = detachBefore;
exports.detachAfter = detachAfter;
exports.reinsertBetween = reinsertBetween;
exports.reinsertChildren = reinsertChildren;
exports.reinsertAfter = reinsertAfter;
exports.reinsertBefore = reinsertBefore;
exports.destroyEach = destroyEach;
exports.createFragment = createFragment;
exports.createElement = createElement;
exports.createSvgElement = createSvgElement;
exports.createText = createText;
exports.createComment = createComment;
exports.addListener = addListener;
exports.removeListener = removeListener;
exports.setAttribute = setAttribute;
exports.setAttributes = setAttributes;
exports.removeAttribute = removeAttribute;
exports.setXlinkAttribute = setXlinkAttribute;
exports.getBindingGroupValue = getBindingGroupValue;
exports.toNumber = toNumber;
exports.timeRangesToArray = timeRangesToArray;
exports.children = children;
exports.claimElement = claimElement;
exports.claimText = claimText;
exports.setInputType = setInputType;
exports.setStyle = setStyle;
exports.selectOption = selectOption;
exports.selectOptions = selectOptions;
exports.selectValue = selectValue;
exports.selectMultipleValue = selectMultipleValue;
exports.destroyBlock = destroyBlock;
exports.outroAndDestroyBlock = outroAndDestroyBlock;
exports.updateKeyedEach = updateKeyedEach;
exports.getSpreadUpdate = getSpreadUpdate;
exports.linear = linear;
exports.generateRule = generateRule;
exports.hash = hash;
exports.wrapTransition = wrapTransition;
exports.transitionManager = transitionManager;
exports.noop = noop;
exports.assign = assign;
},{}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Store = undefined;

var _shared = require('./shared.js');

function Store(state, options) {
	this._observers = { pre: (0, _shared.blankObject)(), post: (0, _shared.blankObject)() };
	this._handlers = {};
	this._dependents = [];

	this._computed = (0, _shared.blankObject)();
	this._sortedComputedProperties = [];

	this._state = (0, _shared.assign)({}, state);
	this._differs = options && options.immutable ? _shared._differsImmutable : _shared._differs;
}

(0, _shared.assign)(Store.prototype, {
	_add: function (component, props) {
		this._dependents.push({
			component: component,
			props: props
		});
	},

	_init: function (props) {
		var state = {};
		for (var i = 0; i < props.length; i += 1) {
			var prop = props[i];
			state['$' + prop] = this._state[prop];
		}
		return state;
	},

	_remove: function (component) {
		var i = this._dependents.length;
		while (i--) {
			if (this._dependents[i].component === component) {
				this._dependents.splice(i, 1);
				return;
			}
		}
	},

	_sortComputedProperties: function () {
		var computed = this._computed;
		var sorted = this._sortedComputedProperties = [];
		var cycles;
		var visited = (0, _shared.blankObject)();

		function visit(key) {
			if (cycles[key]) {
				throw new Error('Cyclical dependency detected');
			}

			if (visited[key]) return;
			visited[key] = true;

			var c = computed[key];

			if (c) {
				cycles[key] = true;
				c.deps.forEach(visit);
				sorted.push(c);
			}
		}

		for (var key in this._computed) {
			cycles = (0, _shared.blankObject)();
			visit(key);
		}
	},

	compute: function (key, deps, fn) {
		var store = this;
		var value;

		var c = {
			deps: deps,
			update: function (state, changed, dirty) {
				var values = deps.map(function (dep) {
					if (dep in changed) dirty = true;
					return state[dep];
				});

				if (dirty) {
					var newValue = fn.apply(null, values);
					if (store._differs(newValue, value)) {
						value = newValue;
						changed[key] = true;
						state[key] = value;
					}
				}
			}
		};

		c.update(this._state, {}, true);

		this._computed[key] = c;
		this._sortComputedProperties();
	},

	fire: _shared.fire,

	get: _shared.get,

	// TODO remove this method
	observe: _shared.observe,

	on: _shared.on,

	onchange: function (callback) {
		// TODO remove this method
		console.warn("store.onchange is deprecated in favour of store.on('state', event => {...})");

		return this.on('state', function (event) {
			callback(event.current, event.changed);
		});
	},

	set: function (newState) {
		var oldState = this._state,
		    changed = this._changed = {},
		    dirty = false;

		for (var key in newState) {
			if (this._computed[key]) throw new Error("'" + key + "' is a read-only property");
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = (0, _shared.assign)((0, _shared.assign)({}, oldState), newState);

		for (var i = 0; i < this._sortedComputedProperties.length; i += 1) {
			this._sortedComputedProperties[i].update(this._state, changed);
		}

		this.fire('state', {
			changed: changed,
			current: this._state,
			previous: oldState
		});

		var dependents = this._dependents.slice(); // guard against mutations
		for (var i = 0; i < dependents.length; i += 1) {
			var dependent = dependents[i];
			var componentState = {};
			dirty = false;

			for (var j = 0; j < dependent.props.length; j += 1) {
				var prop = dependent.props[j];
				if (prop in changed) {
					componentState['$' + prop] = this._state[prop];
					dirty = true;
				}
			}

			if (dirty) dependent.component.set(componentState);
		}

		this.fire('update', {
			changed: changed,
			current: this._state,
			previous: oldState
		});
	}
});

exports.Store = Store;
},{"./shared.js":35}],40:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],38:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":40}],28:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./..\\img\\icons\\down-arrow-white.png":[["down-arrow-white.8428a5fe.png",36],36],"_css_loader":38}],29:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":38}],37:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./..\\img\\congruent_outline.png":[["congruent_outline.60d9791e.png",39],39],"_css_loader":38}],30:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* generated by Svelte v1.64.1 */


require('../css/card.css');

function data() {
	return {
		// Set the card to unflipped state by default
		flipped: false
	};
};

var methods = {
	rotateCard: function rotateCard() {
		this.set({ flipped: !this.get('flipped') });
	}
};

function oncreate() {
	var _this = this;

	// What the currentCard variable for changes
	this.store.observe('currentCard', function (res) {
		// Child is positioned absolutely, so this forces container to fill height of child on re-render
		setTimeout(function () {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip();
			});
		}, 20);

		// When the current card changes make sure the card is in the unflipped state
		_this.set({ flipped: false });
	});
};

function create_main_fragment(component, state) {
	var div,
	    style,
	    text,
	    text_1_value = state.card.colour,
	    text_1,
	    text_2,
	    text_3_value = state.card.assets.cover.image,
	    text_3,
	    text_4,
	    text_5_value = state.card.assets.cover.styles,
	    text_5,
	    text_6,
	    text_7_value = state.card.assets.logo.image,
	    text_7,
	    text_8,
	    text_9_value = state.card.assets.logo.styles,
	    text_9,
	    text_10,
	    text_11,
	    div_1,
	    div_2,
	    div_3,
	    div_4,
	    text_13,
	    div_5,
	    a,
	    a_href_value,
	    text_14,
	    div_6,
	    h5,
	    text_15_value = state.card.name,
	    text_15,
	    text_16,
	    h6,
	    text_17_value = state.card.tagline,
	    text_17,
	    text_20,
	    div_7,
	    p,
	    text_21_value = state.card.description,
	    text_21,
	    text_22,
	    a_1,
	    text_23_value = state.card.url,
	    text_23,
	    a_1_href_value,
	    text_25,
	    div_8,
	    div_9,
	    h5_1,
	    text_26,
	    i_1,
	    text_29,
	    div_10,
	    text_30,
	    i_2,
	    text_32,
	    div_11,
	    div_12,
	    text_34,
	    div_13,
	    p_1,
	    b,
	    br,
	    text_36_value = state.card.submitter.name,
	    text_36,
	    span,
	    text_37,
	    text_38_value = state.card.submitter.title,
	    text_38,
	    text_42,
	    div_14,
	    text_45,
	    div_15,
	    div_16,
	    text_47,
	    div_17,
	    div_18,
	    div_19,
	    iframe,
	    iframe_src_value,
	    text_51,
	    div_20,
	    text_58,
	    div_23,
	    div_24,
	    text_62,
	    div_25,
	    p_5,
	    text_63_value = state.card.framework.enhance,
	    text_63,
	    text_65,
	    div_26,
	    text_69,
	    div_27,
	    p_7,
	    text_70_value = state.card.framework.empower,
	    text_70,
	    text_72,
	    div_28,
	    text_76,
	    div_29,
	    p_9,
	    text_77_value = state.card.framework.extend,
	    text_77,
	    text_80,
	    div_30,
	    div_class_value;

	function click_handler(event) {
		component.rotateCard();
	}

	var each_value = state.card.activities;

	var each_blocks = [];

	for (var i_10 = 0; i_10 < each_value.length; i_10 += 1) {
		each_blocks[i_10] = create_each_block(component, assign(assign({}, state), {
			each_value: each_value,
			activity: each_value[i_10],
			activity_index: i_10
		}));
	}

	var each_value_1 = state.card.uses;

	var each_1_blocks = [];

	for (var i_10 = 0; i_10 < each_value_1.length; i_10 += 1) {
		each_1_blocks[i_10] = create_each_block_1(component, assign(assign({}, state), {
			each_value_1: each_value_1,
			use: each_value_1[i_10],
			use_index: i_10
		}));
	}

	function click_handler_1(event) {
		var state = component.get();
		component.store.loadRandomCard(state.card.id);
	}

	function click_handler_2(event) {
		component.rotateCard();
	}

	function click_handler_3(event) {
		var state = component.get();
		component.store.loadRandomCard(state.card.id);
	}

	return {
		c: function create() {
			div = createElement("div");
			style = createElement("style");
			text = createText(".cardflipper, .nextcard:hover {\r\n            background-color: ");
			text_1 = createText(text_1_value);
			text_2 = createText(";\r\n        }\r\n        .titlebarfront {\r\n            background: linear-gradient(\r\n                rgba(52, 58, 64, 0.9) 0%, \r\n                rgba(52, 58, 64, 0.9) 95%\r\n            ), url(");
			text_3 = createText(text_3_value);
			text_4 = createText(");\r\n            ");
			text_5 = createText(text_5_value);
			text_6 = createText("\r\n        }\r\n        .smalllogo {\r\n            background-image: url(");
			text_7 = createText(text_7_value);
			text_8 = createText(");\r\n            ");
			text_9 = createText(text_9_value);
			text_10 = createText("\r\n        }");
			text_11 = createText("\r\n    ");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_3 = createElement("div");
			div_4 = createElement("div");
			div_4.innerHTML = "<i class=\"fa faa-spin fa-repeat\" aria-hidden=\"true\"></i> Flip card";
			text_13 = createText("\r\n                ");
			div_5 = createElement("div");
			a = createElement("a");
			text_14 = createText("\r\n                    ");
			div_6 = createElement("div");
			h5 = createElement("h5");
			text_15 = createText(text_15_value);
			text_16 = createText("\r\n                    ");
			h6 = createElement("h6");
			text_17 = createText(text_17_value);
			text_20 = createText("\r\n                ");
			div_7 = createElement("div");
			p = createElement("p");
			text_21 = createText(text_21_value);
			text_22 = createText("\r\n                    ");
			a_1 = createElement("a");
			text_23 = createText(text_23_value);
			text_25 = createText("\r\n                ");
			div_8 = createElement("div");
			div_9 = createElement("div");
			h5_1 = createElement("h5");

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].c();
			}

			text_26 = createText("\r\n                            ");
			i_1 = createElement("i");
			text_29 = createText("\r\n                    ");
			div_10 = createElement("div");

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].c();
			}

			text_30 = createText(" \r\n                        ");
			i_2 = createElement("i");
			text_32 = createText("\r\n                    ");
			div_11 = createElement("div");
			div_12 = createElement("div");
			div_12.innerHTML = "<i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>";
			text_34 = createText("\r\n                        ");
			div_13 = createElement("div");
			p_1 = createElement("p");
			b = createElement("b");
			b.textContent = "Submitted by";
			br = createElement("br");
			text_36 = createText(text_36_value);
			span = createElement("span");
			text_37 = createText(" | ");
			text_38 = createText(text_38_value);
			text_42 = createText("\r\n                ");
			div_14 = createElement("div");
			div_14.innerHTML = "<i class=\"fa fa-magic faa-shake\" aria-hidden=\"true\"></i>  Try another app";
			text_45 = createText("\r\n\r\n            ");
			div_15 = createElement("div");
			div_16 = createElement("div");
			div_16.innerHTML = "<i class=\"fa faa-spin fa-repeat\" aria-hidden=\"true\"></i> Flip back";
			text_47 = createText("\r\n                ");
			div_17 = createElement("div");
			div_18 = createElement("div");
			div_19 = createElement("div");
			iframe = createElement("iframe");
			text_51 = createText("\r\n                ");
			div_20 = createElement("div");
			div_20.innerHTML = "<div class=\"frameworktext1\"><p><strong>Level</strong></p></div>\r\n                    <div class=\"frameworktext2\"><p><strong>Example Activities</strong></p></div>";
			text_58 = createText("\r\n                ");
			div_23 = createElement("div");
			div_24 = createElement("div");
			div_24.innerHTML = "<h2><i class=\"fa fa-thermometer-0 usesimage\" aria-hidden=\"true\"></i></h2>\r\n                        <p><strong>Enhance</strong></p>";
			text_62 = createText("\r\n                    ");
			div_25 = createElement("div");
			p_5 = createElement("p");
			text_63 = createText(text_63_value);
			text_65 = createText("\r\n                    ");
			div_26 = createElement("div");
			div_26.innerHTML = "<h2><i class=\"fa fa-thermometer-2\" aria-hidden=\"true\"></i></h2>\r\n                        <p><strong>Empower</strong></p>";
			text_69 = createText("\r\n                    ");
			div_27 = createElement("div");
			p_7 = createElement("p");
			text_70 = createText(text_70_value);
			text_72 = createText("\r\n                    ");
			div_28 = createElement("div");
			div_28.innerHTML = "<h2><i class=\"fa fa-thermometer-4 usesimage\" aria-hidden=\"true\"></i></h2>\r\n                        <p><strong>Extend</strong></p>";
			text_76 = createText("\r\n                    ");
			div_29 = createElement("div");
			p_9 = createElement("p");
			text_77 = createText(text_77_value);
			text_80 = createText("\r\n                ");
			div_30 = createElement("div");
			div_30.innerHTML = "<i class=\"fa fa-magic faa-shake\" aria-hidden=\"true\"></i>  Try another app";
			this.h();
		},

		h: function hydrate() {
			style.type = "text/css";
			addListener(div_4, "click", click_handler);
			div_4.className = "cardflipper faa-parent animated-hover";
			setAttribute(div_4, "role", "button");
			a.className = "smalllogo faa-tada animated-hover";
			a.href = a_href_value = state.card.url;
			a.target = "_blank";
			div_6.className = "apptitle";
			div_5.className = "titlebarfront";
			p.className = "card-text";
			a_1.className = "tool-link";
			a_1.href = a_1_href_value = state.card.url;
			a_1.target = "_blank";
			div_7.className = "card-body";
			i_1.className = "fa fa-question-circle-o";
			i_1.dataset.toggle = "tooltip";
			i_1.dataset.placement = "top";
			i_1.title = "Activities this app can support";
			setAttribute(i_1, "aria-hidden", "true");
			div_9.className = "blooms-pills-main";
			i_2.className = "fa fa-question-circle-o";
			i_2.dataset.toggle = "tooltip";
			i_2.dataset.placement = "top";
			i_2.title = "Examples of how this app can be used";
			setAttribute(i_2, "aria-hidden", "true");
			div_10.className = "blooms-pills-sub";
			div_12.className = "submitterimg";
			span.className = "submitterschool";
			p_1.className = "small";
			div_13.className = "submitterinfo";
			div_11.className = "submitter";
			div_8.className = "details";
			addListener(div_14, "click", click_handler_1);
			div_14.className = "nextcard faa-parent animated-hover";
			setAttribute(div_14, "role", "button");
			div_3.className = "front face";
			addListener(div_16, "click", click_handler_2);
			div_16.className = "cardflipper faa-parent animated-hover";
			setAttribute(div_16, "role", "button");
			iframe.className = "embed-responsive-item youtube";
			iframe.src = iframe_src_value = state.card.videoURL;
			setAttribute(iframe, "frameborder", "0");
			iframe.allowFullscreen = true;
			div_19.className = "embed-responsive embed-responsive-16by9";
			div_18.className = "videocontainer";
			div_17.className = "mediabackground";
			div_20.className = "frameworkheading";
			div_24.className = "thermometer thermometer1";
			div_25.className = "usestext usestext1";
			div_26.className = "thermometer thermometer2";
			div_27.className = "usestext usestext2";
			div_28.className = "thermometer thermometer3";
			div_29.className = "usestext usestext3";
			div_23.className = "card-body framework";
			addListener(div_30, "click", click_handler_3);
			div_30.className = "nextcard faa-parent animated-hover";
			setAttribute(div_30, "role", "button");
			div_15.className = "back face";
			div_2.className = "app-card card noborder";
			div_1.className = "col-md-12";
			div.className = div_class_value = "card-container manual-flip " + (state.flipped ? 'hover' : '');
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(style, div);
			appendNode(text, style);
			appendNode(text_1, style);
			appendNode(text_2, style);
			appendNode(text_3, style);
			appendNode(text_4, style);
			appendNode(text_5, style);
			appendNode(text_6, style);
			appendNode(text_7, style);
			appendNode(text_8, style);
			appendNode(text_9, style);
			appendNode(text_10, style);
			appendNode(text_11, div);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(div_3, div_2);
			appendNode(div_4, div_3);
			appendNode(text_13, div_3);
			appendNode(div_5, div_3);
			appendNode(a, div_5);
			appendNode(text_14, div_5);
			appendNode(div_6, div_5);
			appendNode(h5, div_6);
			appendNode(text_15, h5);
			appendNode(text_16, div_6);
			appendNode(h6, div_6);
			appendNode(text_17, h6);
			appendNode(text_20, div_3);
			appendNode(div_7, div_3);
			appendNode(p, div_7);
			appendNode(text_21, p);
			appendNode(text_22, div_7);
			appendNode(a_1, div_7);
			appendNode(text_23, a_1);
			appendNode(text_25, div_3);
			appendNode(div_8, div_3);
			appendNode(div_9, div_8);
			appendNode(h5_1, div_9);

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].m(h5_1, null);
			}

			appendNode(text_26, h5_1);
			appendNode(i_1, h5_1);
			appendNode(text_29, div_8);
			appendNode(div_10, div_8);

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].m(div_10, null);
			}

			appendNode(text_30, div_10);
			appendNode(i_2, div_10);
			appendNode(text_32, div_8);
			appendNode(div_11, div_8);
			appendNode(div_12, div_11);
			appendNode(text_34, div_11);
			appendNode(div_13, div_11);
			appendNode(p_1, div_13);
			appendNode(b, p_1);
			appendNode(br, p_1);
			appendNode(text_36, p_1);
			appendNode(span, p_1);
			appendNode(text_37, span);
			appendNode(text_38, span);
			appendNode(text_42, div_3);
			appendNode(div_14, div_3);
			appendNode(text_45, div_2);
			appendNode(div_15, div_2);
			appendNode(div_16, div_15);
			appendNode(text_47, div_15);
			appendNode(div_17, div_15);
			appendNode(div_18, div_17);
			appendNode(div_19, div_18);
			appendNode(iframe, div_19);
			appendNode(text_51, div_15);
			appendNode(div_20, div_15);
			appendNode(text_58, div_15);
			appendNode(div_23, div_15);
			appendNode(div_24, div_23);
			appendNode(text_62, div_23);
			appendNode(div_25, div_23);
			appendNode(p_5, div_25);
			appendNode(text_63, p_5);
			appendNode(text_65, div_23);
			appendNode(div_26, div_23);
			appendNode(text_69, div_23);
			appendNode(div_27, div_23);
			appendNode(p_7, div_27);
			appendNode(text_70, p_7);
			appendNode(text_72, div_23);
			appendNode(div_28, div_23);
			appendNode(text_76, div_23);
			appendNode(div_29, div_23);
			appendNode(p_9, div_29);
			appendNode(text_77, p_9);
			appendNode(text_80, div_15);
			appendNode(div_30, div_15);
		},

		p: function update(changed, state) {
			if (changed.card && text_1_value !== (text_1_value = state.card.colour)) {
				text_1.data = text_1_value;
			}

			if (changed.card && text_3_value !== (text_3_value = state.card.assets.cover.image)) {
				text_3.data = text_3_value;
			}

			if (changed.card && text_5_value !== (text_5_value = state.card.assets.cover.styles)) {
				text_5.data = text_5_value;
			}

			if (changed.card && text_7_value !== (text_7_value = state.card.assets.logo.image)) {
				text_7.data = text_7_value;
			}

			if (changed.card && text_9_value !== (text_9_value = state.card.assets.logo.styles)) {
				text_9.data = text_9_value;
			}

			if (changed.card && a_href_value !== (a_href_value = state.card.url)) {
				a.href = a_href_value;
			}

			if (changed.card && text_15_value !== (text_15_value = state.card.name)) {
				text_15.data = text_15_value;
			}

			if (changed.card && text_17_value !== (text_17_value = state.card.tagline)) {
				text_17.data = text_17_value;
			}

			if (changed.card && text_21_value !== (text_21_value = state.card.description)) {
				text_21.data = text_21_value;
			}

			if (changed.card && text_23_value !== (text_23_value = state.card.url)) {
				text_23.data = text_23_value;
			}

			if (changed.card && a_1_href_value !== (a_1_href_value = state.card.url)) {
				a_1.href = a_1_href_value;
			}

			var each_value = state.card.activities;

			if (changed.card) {
				for (var i_10 = 0; i_10 < each_value.length; i_10 += 1) {
					var each_context = assign(assign({}, state), {
						each_value: each_value,
						activity: each_value[i_10],
						activity_index: i_10
					});

					if (each_blocks[i_10]) {
						each_blocks[i_10].p(changed, each_context);
					} else {
						each_blocks[i_10] = create_each_block(component, each_context);
						each_blocks[i_10].c();
						each_blocks[i_10].m(h5_1, text_26);
					}
				}

				for (; i_10 < each_blocks.length; i_10 += 1) {
					each_blocks[i_10].u();
					each_blocks[i_10].d();
				}
				each_blocks.length = each_value.length;
			}

			var each_value_1 = state.card.uses;

			if (changed.card) {
				for (var i_10 = 0; i_10 < each_value_1.length; i_10 += 1) {
					var each_1_context = assign(assign({}, state), {
						each_value_1: each_value_1,
						use: each_value_1[i_10],
						use_index: i_10
					});

					if (each_1_blocks[i_10]) {
						each_1_blocks[i_10].p(changed, each_1_context);
					} else {
						each_1_blocks[i_10] = create_each_block_1(component, each_1_context);
						each_1_blocks[i_10].c();
						each_1_blocks[i_10].m(div_10, text_30);
					}
				}

				for (; i_10 < each_1_blocks.length; i_10 += 1) {
					each_1_blocks[i_10].u();
					each_1_blocks[i_10].d();
				}
				each_1_blocks.length = each_value_1.length;
			}

			if (changed.card && text_36_value !== (text_36_value = state.card.submitter.name)) {
				text_36.data = text_36_value;
			}

			if (changed.card && text_38_value !== (text_38_value = state.card.submitter.title)) {
				text_38.data = text_38_value;
			}

			if (changed.card && iframe_src_value !== (iframe_src_value = state.card.videoURL)) {
				iframe.src = iframe_src_value;
			}

			if (changed.card && text_63_value !== (text_63_value = state.card.framework.enhance)) {
				text_63.data = text_63_value;
			}

			if (changed.card && text_70_value !== (text_70_value = state.card.framework.empower)) {
				text_70.data = text_70_value;
			}

			if (changed.card && text_77_value !== (text_77_value = state.card.framework.extend)) {
				text_77.data = text_77_value;
			}

			if (changed.flipped && div_class_value !== (div_class_value = "card-container manual-flip " + (state.flipped ? 'hover' : ''))) {
				div.className = div_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i_10 = 0; i_10 < each_blocks.length; i_10 += 1) {
				each_blocks[i_10].u();
			}

			for (var i_10 = 0; i_10 < each_1_blocks.length; i_10 += 1) {
				each_1_blocks[i_10].u();
			}
		},

		d: function destroy() {
			removeListener(div_4, "click", click_handler);

			destroyEach(each_blocks);

			destroyEach(each_1_blocks);

			removeListener(div_14, "click", click_handler_1);
			removeListener(div_16, "click", click_handler_2);
			removeListener(div_30, "click", click_handler_3);
		}
	};
}

// (39:28) {{#each card.activities as activity}}
function create_each_block(component, state) {
	var activity = state.activity,
	    each_value = state.each_value,
	    activity_index = state.activity_index;
	var span,
	    text_value = activity.name,
	    text,
	    span_class_value,
	    span_title_value,
	    text_1;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_1 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.className = span_class_value = "badge activity " + activity.name;
			span.dataset.toggle = "tooltip";
			span.dataset.placement = "top";
			span.title = span_title_value = activity.description;
			setAttribute(span, "aria-hidden", "true");
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_1, target, anchor);
		},

		p: function update(changed, state) {
			activity = state.activity;
			each_value = state.each_value;
			activity_index = state.activity_index;
			if (changed.card && text_value !== (text_value = activity.name)) {
				text.data = text_value;
			}

			if (changed.card && span_class_value !== (span_class_value = "badge activity " + activity.name)) {
				span.className = span_class_value;
			}

			if (changed.card && span_title_value !== (span_title_value = activity.description)) {
				span.title = span_title_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_1);
		},

		d: noop
	};
}

// (46:24) {{#each card.uses as use}}
function create_each_block_1(component, state) {
	var use = state.use,
	    each_value_1 = state.each_value_1,
	    use_index = state.use_index;
	var span,
	    text_value = use,
	    text,
	    text_2;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_2 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.className = "badge sub";
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_2, target, anchor);
		},

		p: function update(changed, state) {
			use = state.use;
			each_value_1 = state.each_value_1;
			use_index = state.use_index;
			if (changed.card && text_value !== (text_value = use)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_2);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	var self = this;
	var _oncreate = function _oncreate() {
		var changed = { flipped: 1, card: 1 };
		oncreate.call(self);
		self.fire("update", { changed: changed, current: self._state });
	};

	if (!options.root) {
		this._oncreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		callAll(this._oncreate);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});
assign(SvelteComponent.prototype, methods);

SvelteComponent.prototype._recompute = noop;

function assign(tar, src) {
	for (var k in src) {
		tar[k] = src[k];
	}return tar;
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function noop() {}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function observe(key, callback, options) {
	var fn = callback.bind(this);

	if (!options || options.init !== false) {
		fn(this.get()[key], undefined);
	}

	return this.on(options && options.defer ? 'update' : 'state', function (event) {
		if (event.changed[key]) fn(event.current[key], event.previous && event.previous[key]);
	});
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}
exports.default = SvelteComponent;
},{"../css/card.css":37}],31:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.64.1 */

function filteredCards($cards, filter) {
	if (filter === 'all') return $cards;

	return $cards.filter(function (card) {
		return card.activities.map(function (a) {
			return a.name;
		}).indexOf(filter) !== -1;
	});
}

function data() {
	return {
		filter: 'all'
	};
};

function create_main_fragment(component, state) {
	var div, div_1, div_2, text_6, div_4, select, option, text_7, option_1, text_8, option_2, text_9, option_3, text_10, option_4, text_11, option_5, text_12, option_6, text_13, option_7, text_14, option_8, text_15, text_17, div_5, div_6, ul;

	function change_handler(event) {
		component.set({ filter: event.target.value });
	}

	var each_value = state.filteredCards;

	var each_blocks = [];

	for (var i_1 = 0; i_1 < each_value.length; i_1 += 1) {
		each_blocks[i_1] = create_each_block(component, assign(assign({}, state), {
			each_value: each_value,
			card: each_value[i_1],
			card_index: i_1
		}));
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_2.innerHTML = "<div class=\"icon\"><i class=\"fa fa-bookmark-o\" aria-hidden=\"true\"></i></div>\r\n            <h4>Catalogue</h4>\r\n            <p>Browse the list or use the dropdown filter to find an application that supports a specific activity.</p>";
			text_6 = createText("\r\n        ");
			div_4 = createElement("div");
			select = createElement("select");
			option = createElement("option");
			text_7 = createText("Find an app to...");
			option_1 = createElement("option");
			text_8 = createText("...create learning resources");
			option_2 = createElement("option");
			text_9 = createText("...communicate with students electronically");
			option_3 = createElement("option");
			text_10 = createText("...act as a platform for collaboration");
			option_4 = createElement("option");
			text_11 = createText("...collect, organise and share content");
			option_5 = createElement("option");
			text_12 = createText("...record an event or artefact");
			option_6 = createElement("option");
			text_13 = createText("...create interactive learning opportunities");
			option_7 = createElement("option");
			text_14 = createText("...gauge students understanding");
			option_8 = createElement("option");
			text_15 = createText("All apps");
			text_17 = createText("\r\n        ");
			div_5 = createElement("div");
			div_6 = createElement("div");
			ul = createElement("ul");

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].c();
			}
			this.h();
		},

		h: function hydrate() {
			div_2.className = "bs-callout bs-callout-catalogue clearfix";
			option.selected = true;
			option.__value = "all";
			option.value = option.__value;
			option_1.__value = "create";
			option_1.value = option_1.__value;
			option_2.__value = "connect";
			option_2.value = option_2.__value;
			option_3.__value = "collaborate";
			option_3.value = option_3.__value;
			option_4.__value = "curate";
			option_4.value = option_4.__value;
			option_5.__value = "capture";
			option_5.value = option_5.__value;
			option_6.__value = "captivate";
			option_6.value = option_6.__value;
			option_7.__value = "check";
			option_7.value = option_7.__value;
			option_8.__value = "all";
			option_8.value = option_8.__value;
			addListener(select, "change", change_handler);
			select.id = "filterText";
			select.className = "btn btn-secondary dropdown-toggle btn-block";
			div_4.className = "dropdown";
			ul.className = "list-group list-group-flush";
			div_6.className = "front";
			div_5.className = "card cataloguepane";
			div_5.dataset.spy = "scroll";
			div_1.className = "col-md-12";
			div.className = "card-container manual-flip";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(text_6, div_1);
			appendNode(div_4, div_1);
			appendNode(select, div_4);
			appendNode(option, select);
			appendNode(text_7, option);
			appendNode(option_1, select);
			appendNode(text_8, option_1);
			appendNode(option_2, select);
			appendNode(text_9, option_2);
			appendNode(option_3, select);
			appendNode(text_10, option_3);
			appendNode(option_4, select);
			appendNode(text_11, option_4);
			appendNode(option_5, select);
			appendNode(text_12, option_5);
			appendNode(option_6, select);
			appendNode(text_13, option_6);
			appendNode(option_7, select);
			appendNode(text_14, option_7);
			appendNode(option_8, select);
			appendNode(text_15, option_8);
			appendNode(text_17, div_1);
			appendNode(div_5, div_1);
			appendNode(div_6, div_5);
			appendNode(ul, div_6);

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].m(ul, null);
			}
		},

		p: function update(changed, state) {
			var each_value = state.filteredCards;

			if (changed.filteredCards) {
				for (var i_1 = 0; i_1 < each_value.length; i_1 += 1) {
					var each_context = assign(assign({}, state), {
						each_value: each_value,
						card: each_value[i_1],
						card_index: i_1
					});

					if (each_blocks[i_1]) {
						each_blocks[i_1].p(changed, each_context);
					} else {
						each_blocks[i_1] = create_each_block(component, each_context);
						each_blocks[i_1].c();
						each_blocks[i_1].m(ul, null);
					}
				}

				for (; i_1 < each_blocks.length; i_1 += 1) {
					each_blocks[i_1].u();
					each_blocks[i_1].d();
				}
				each_blocks.length = each_value.length;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i_1 = 0; i_1 < each_blocks.length; i_1 += 1) {
				each_blocks[i_1].u();
			}
		},

		d: function destroy() {
			removeListener(select, "change", change_handler);

			destroyEach(each_blocks);
		}
	};
}

// (26:20) {{#each filteredCards as card}}
function create_each_block(component, state) {
	var card = state.card,
	    each_value = state.each_value,
	    card_index = state.card_index;
	var a,
	    div,
	    h5,
	    img,
	    img_src_value,
	    text,
	    text_1_value = card.name,
	    text_1,
	    text_2,
	    p,
	    text_4,
	    p_1,
	    small,
	    text_5,
	    text_6_value = card.submitter.name,
	    text_6,
	    text_7,
	    text_8_value = card.submitter.title,
	    text_8,
	    text_9,
	    p_2,
	    text_10_value = card.tagline,
	    text_10;

	var each_value_1 = card.activities;

	var each_blocks = [];

	for (var i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(component, assign(assign({}, state), {
			each_value_1: each_value_1,
			activity: each_value_1[i],
			activity_index: i
		}));
	}

	return {
		c: function create() {
			a = createElement("a");
			div = createElement("div");
			h5 = createElement("h5");
			img = createElement("img");
			text = createText(" ");
			text_1 = createText(text_1_value);
			text_2 = createText("\r\n                            ");
			p = createElement("p");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text_4 = createText("\r\n                            ");
			p_1 = createElement("p");
			small = createElement("small");
			text_5 = createText("Submitted by ");
			text_6 = createText(text_6_value);
			text_7 = createText(" | ");
			text_8 = createText(text_8_value);
			text_9 = createText("\r\n                            ");
			p_2 = createElement("p");
			text_10 = createText(text_10_value);
			this.h();
		},

		h: function hydrate() {
			setStyle(img, "display", "inline");
			setStyle(img, "height", "1em");
			setStyle(img, "vertical-align", "top");
			img.src = img_src_value = card.assets.logo.image;
			p.className = "categories";
			p_1.className = "submitter";
			p_2.className = "appinfo";
			div.className = "applist";
			addListener(a, "click", click_handler);
			a.href = "#";
			a.className = "list-group-item list-group-item-action";

			a._svelte = {
				component: component,
				each_value: state.each_value,
				card_index: state.card_index
			};
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(div, a);
			appendNode(h5, div);
			appendNode(img, h5);
			appendNode(text, h5);
			appendNode(text_1, h5);
			appendNode(text_2, div);
			appendNode(p, div);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(p, null);
			}

			appendNode(text_4, div);
			appendNode(p_1, div);
			appendNode(small, p_1);
			appendNode(text_5, small);
			appendNode(text_6, small);
			appendNode(text_7, small);
			appendNode(text_8, small);
			appendNode(text_9, div);
			appendNode(p_2, div);
			appendNode(text_10, p_2);
		},

		p: function update(changed, state) {
			card = state.card;
			each_value = state.each_value;
			card_index = state.card_index;
			if (changed.filteredCards && img_src_value !== (img_src_value = card.assets.logo.image)) {
				img.src = img_src_value;
			}

			if (changed.filteredCards && text_1_value !== (text_1_value = card.name)) {
				text_1.data = text_1_value;
			}

			var each_value_1 = card.activities;

			if (changed.filteredCards) {
				for (var i = 0; i < each_value_1.length; i += 1) {
					var each_context = assign(assign({}, state), {
						each_value_1: each_value_1,
						activity: each_value_1[i],
						activity_index: i
					});

					if (each_blocks[i]) {
						each_blocks[i].p(changed, each_context);
					} else {
						each_blocks[i] = create_each_block_1(component, each_context);
						each_blocks[i].c();
						each_blocks[i].m(p, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = each_value_1.length;
			}

			if (changed.filteredCards && text_6_value !== (text_6_value = card.submitter.name)) {
				text_6.data = text_6_value;
			}

			if (changed.filteredCards && text_8_value !== (text_8_value = card.submitter.title)) {
				text_8.data = text_8_value;
			}

			if (changed.filteredCards && text_10_value !== (text_10_value = card.tagline)) {
				text_10.data = text_10_value;
			}

			a._svelte.each_value = state.each_value;
			a._svelte.card_index = state.card_index;
		},

		u: function unmount() {
			detachNode(a);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}
		},

		d: function destroy() {
			destroyEach(each_blocks);

			removeListener(a, "click", click_handler);
		}
	};
}

// (31:32) {{#each card.activities as activity}}
function create_each_block_1(component, state) {
	var card = state.card,
	    each_value = state.each_value,
	    card_index = state.card_index,
	    activity = state.activity,
	    each_value_1 = state.each_value_1,
	    activity_index = state.activity_index;
	var span,
	    text_value = activity.name,
	    text,
	    span_class_value,
	    text_1;

	return {
		c: function create() {
			span = createElement("span");
			text = createText(text_value);
			text_1 = createText(" ");
			this.h();
		},

		h: function hydrate() {
			span.className = span_class_value = "badge activity " + activity.name;
		},

		m: function mount(target, anchor) {
			insertNode(span, target, anchor);
			appendNode(text, span);
			insertNode(text_1, target, anchor);
		},

		p: function update(changed, state) {
			card = state.card;
			each_value = state.each_value;
			card_index = state.card_index;
			activity = state.activity;
			each_value_1 = state.each_value_1;
			activity_index = state.activity_index;
			if (changed.filteredCards && text_value !== (text_value = activity.name)) {
				text.data = text_value;
			}

			if (changed.filteredCards && span_class_value !== (span_class_value = "badge activity " + activity.name)) {
				span.className = span_class_value;
			}
		},

		u: function unmount() {
			detachNode(span);
			detachNode(text_1);
		},

		d: noop
	};
}

function click_handler(event) {
	var component = this._svelte.component;
	var each_value = this._svelte.each_value,
	    card_index = this._svelte.card_index,
	    card = each_value[card_index];
	component.store.set({ currentPage: 'card', currentCard: card.id });
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(assign(this.store._init(["cards"]), data()), options.data);
	this.store._add(this, ["cards"]);
	this._recompute({ $cards: 1, filter: 1 }, this._state);

	this._handlers.destroy = [removeFromStore];

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = function _recompute(changed, state) {
	if (changed.$cards || changed.filter) {
		if (this._differs(state.filteredCards, state.filteredCards = filteredCards(state.$cards, state.filter))) changed.filteredCards = true;
	}
};

function assign(tar, src) {
	for (var k in src) {
		tar[k] = src[k];
	}return tar;
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function noop() {}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function removeFromStore() {
	this.store._remove(this);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function observe(key, callback, options) {
	var fn = callback.bind(this);

	if (!options || options.init !== false) {
		fn(this.get()[key], undefined);
	}

	return this.on(options && options.defer ? 'update' : 'state', function (event) {
		if (event.changed[key]) fn(event.current[key], event.previous && event.previous[key]);
	});
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}
exports.default = SvelteComponent;
},{}],32:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.64.1 */

var methods = {

	// Resets the form to a fresh state
	resetForm: function resetForm() {
		document.getElementById('gform').style.display = 'block'; // show form
		document.getElementById('thankyou_message').style.display = 'none'; // hide thank you message
		document.getElementById('gform').reset(); // resets form
	},


	// Submits the form data to be captured by google doc
	submitForm: function submitForm(event) {
		var remoteURL = "https://docs.google.com/forms/d/1IImCyszQvScFu0T2KxquFwVeGhTFdgENQDoEWDIu3rQ/formResponse";

		var isValidEmail = function isValidEmail(email) {
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return re.test(email);
		};

		var isBot = function isBot(honeypot) {
			return honeypot;
		};

		var getFormData = function getFormData() {
			var elements = document.getElementById("gform").elements; // all form elements
			console.log(elements);
			var fields = Object.keys(elements).map(function (k) {
				if (elements[k].name !== undefined) {
					return elements[k].name;
					// special case for Edge's html collection
				} else if (elements[k].length > 0) {
					return elements[k].item(0).name;
				}
			}).filter(function (item, pos, self) {
				return self.indexOf(item) == pos && item;
			});

			var data = {};
			fields.forEach(function (k) {
				data[k] = elements[k].value;
				var str = ""; // declare empty string outside of loop to allow
				// it to be appended to for each item in the loop
				if (elements[k].type === "checkbox") {
					// special case for Edge's html collection
					str = str + elements[k].checked + ", "; // take the string and append 
					// the current checked value to 
					// the end of it, along with 
					// a comma and a space
					data[k] = str.slice(0, -2); // remove the last comma and space 
					// from the  string to make the output 
					// prettier in the spreadsheet
				} else if (elements[k].length) {
					for (var i = 0; i < elements[k].length; i++) {
						if (elements[k].item(i).checked) {
							str = str + elements[k].item(i).value + ", "; // same as above
							data[k] = str.slice(0, -2);
						}
					}
				}
			});

			return data;
		};

		var handleFormSubmission = function handleFormSubmission(event) {
			event.preventDefault(); // we are submitting via xhr below
			var data = getFormData(); // get the values submitted in the form

			if (isBot(data.honeypot)) return false; //if honeypot field is filled, form will not be submitted

			if (!isValidEmail(data.email)) {
				// if email is not valid show error
				document.getElementById("email").style.display = 'block';
				return false;
			} else {
				var xhr = new XMLHttpRequest();
				xhr.open('POST', remoteURL, true);
				// xhr.withCredentials = true
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onreadystatechange = function () {
					//console.log(xhr.status, xhr.statusText)
					//console.log(xhr.responseText);
					document.getElementById('gform').style.display = 'none'; // hide form
					document.getElementById('thankyou_message').style.display = 'block';
					return;
				};
				// url encode form data for sending as post data
				var encoded = Object.keys(data).map(function (k) {
					return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
				}).join('&');
				xhr.send(encoded);
			}
		};

		handleFormSubmission(event);
	}
};

function create_main_fragment(component, state) {
	var div, div_1, div_2, text_8, div_4, div_5, text_10, p_2, strong, text_12, a, text_15, iframe;

	function click_handler(event) {
		component.resetForm();
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			div_2.innerHTML = "<div class=\"icon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></div>\r\n            <h4>Contribute</h4>\r\n            <p>Help others discover new technologies by telling us about the apps you use.</p>\r\n            <p class=\"instruction\">Complete the form below and we'll be in touch to discuss creating a custom card for your suggestion.</p>";
			text_8 = createText("\r\n        ");
			div_4 = createElement("div");
			div_5 = createElement("div");
			div_5.innerHTML = "<i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i>";
			text_10 = createText("\r\n            ");
			p_2 = createElement("p");
			strong = createElement("strong");
			strong.textContent = "Alright! ";
			text_12 = createText("Thanks for making a suggestion. ");
			a = createElement("a");
			a.textContent = "Click here to make another.";
			text_15 = createText("\r\n            ");
			iframe = createElement("iframe");
			iframe.textContent = "Loading...";
			this.h();
		},

		h: function hydrate() {
			div_2.className = "bs-callout bs-callout-contribute clearfix";
			div_5.className = "icon";
			addListener(a, "click", click_handler);
			a.href = "#";
			div_4.className = "bs-callout bs-thanks clearfix";
			div_4.id = "thankyou_message";
			iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSfmavP82pvKKd-drfGB-ZvPhvkdVrPnDIA2IAVwWZuRdkK8ew/viewform?embedded=true";
			iframe.width = "700";
			iframe.height = "900";
			setAttribute(iframe, "frameborder", "0");
			setAttribute(iframe, "marginheight", "0");
			setAttribute(iframe, "marginwidth", "0");
			div_1.className = "col-md-12";
			div.className = "card-container manual-flip";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(text_8, div_1);
			appendNode(div_4, div_1);
			appendNode(div_5, div_4);
			appendNode(text_10, div_4);
			appendNode(p_2, div_4);
			appendNode(strong, p_2);
			appendNode(text_12, p_2);
			appendNode(a, p_2);
			appendNode(text_15, div_1);
			appendNode(iframe, div_1);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy() {
			removeListener(a, "click", click_handler);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});
assign(SvelteComponent.prototype, methods);

SvelteComponent.prototype._recompute = noop;

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function noop() {}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(tar, src) {
	for (var k in src) {
		tar[k] = src[k];
	}return tar;
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function observe(key, callback, options) {
	var fn = callback.bind(this);

	if (!options || options.init !== false) {
		fn(this.get()[key], undefined);
	}

	return this.on(options && options.defer ? 'update' : 'state', function (event) {
		if (event.changed[key]) fn(event.current[key], event.previous && event.previous[key]);
	});
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}
exports.default = SvelteComponent;
},{}],33:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* generated by Svelte v1.64.1 */

function create_main_fragment(component, state) {
	var div;

	return {
		c: function create() {
			div = createElement("div");
			div.innerHTML = "<div class=\"col-md-12\"><div class=\"bs-callout bs-callout-about clearfix\"><div class=\"icon\"><i class=\"fa fa-info\" aria-hidden=\"true\"></i></div>\r\n\r\n            <h4>About</h4>\r\n            <p>This work is licensed under a <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\">Creative Commons Attribution-NonCommercial 4.0 International License</a>.</p>\r\n            <p>All resources are freely available via <a href=\"https://github.com/danieladamharding/tel_cards\" target=\"_blank\">this GitHub repository</a>.</p>\r\n            <p>Produced by <a href=\"https://www.twitter.com/danielharding\" target=\"_blank\">Dan Harding</a>, <a href=\"https://www.twitter.com/Matthew_Street\" target=\"_blank\">Matthew Street</a> and <a href=\"https://www.twitter.com/confusedmatrix\" target=\"_blank\">Chris Briggs</a> at <a href=\"https://www.keele.ac.uk\" target=\"_blank\">Keele University</a>, UK.</p>\r\n            <a rel=\"license\" href=\"http://creativecommons.org/licenses/by-nc/4.0/\" target=\"_blank\"><img alt=\"Creative Commons License\" class=\"creativecommons\" style=\"border-width: 0\" src=\"https://i.creativecommons.org/l/by-nc/4.0/88x31.png\"></a><br></div></div>";
			this.h();
		},

		h: function hydrate() {
			div.className = "card-container manual-flip";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
		},

		p: noop,

		u: function unmount() {
			detachNode(div);
		},

		d: noop
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment(this, this._state);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = noop;

function createElement(name) {
	return document.createElement(name);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function noop() {}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(tar, src) {
	for (var k in src) {
		tar[k] = src[k];
	}return tar;
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function observe(key, callback, options) {
	var fn = callback.bind(this);

	if (!options || options.init !== false) {
		fn(this.get()[key], undefined);
	}

	return this.on(options && options.defer ? 'update' : 'state', function (event) {
		if (event.changed[key]) fn(event.current[key], event.previous && event.previous[key]);
	});
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}
exports.default = SvelteComponent;
},{}],4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* generated by Svelte v1.64.1 */


require("../css/mainmenu.css");

require("../css/font-awesome-animation.min.css");

var _Card = require("./Card.svelte");

var _Card2 = _interopRequireDefault(_Card);

var _Catalogue = require("./Catalogue.svelte");

var _Catalogue2 = _interopRequireDefault(_Catalogue);

var _Contribute = require("./Contribute.svelte");

var _Contribute2 = _interopRequireDefault(_Contribute);

var _About = require("./About.svelte");

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function card($cards, $currentCard) {
	return $cards.find(function (card) {
		return card.id === $currentCard;
	});
}

function oncreate() {
	// Child is positioned absolutely, so this forces container to fill height of child
	var childHeight = document.querySelector('.card').scrollHeight;
	document.querySelector('#appgenerator').style.height = childHeight + "px";
};

function create_main_fragment(component, state) {
	var div, div_1, div_2, ul, li, a, a_class_value, li_1, a_1, a_1_class_value, li_2, a_2, a_2_class_value, li_3, a_3, a_3_class_value, text_5, div_3, div_4, div_4_class_value, text_7, div_5, div_5_class_value, text_9, div_6, div_6_class_value, text_11, div_7, div_7_class_value;

	function click_handler(event) {
		component.store.set({ currentPage: 'card' });
	}

	function click_handler_1(event) {
		component.store.set({ currentPage: 'catalogue' });
	}

	function click_handler_2(event) {
		component.store.set({ currentPage: 'contribute' });
	}

	function click_handler_3(event) {
		component.store.set({ currentPage: 'about' });
	}

	var card_1_initial_data = { card: state.card };
	var card_1 = new _Card2.default({
		root: component.root,
		data: card_1_initial_data
	});

	var catalogue = new _Catalogue2.default({
		root: component.root
	});

	var contribute = new _Contribute2.default({
		root: component.root
	});

	var about = new _About2.default({
		root: component.root
	});

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			div_2 = createElement("div");
			ul = createElement("ul");
			li = createElement("li");
			a = createElement("a");
			a.innerHTML = "<i class=\"fa fa-magic\" aria-hidden=\"true\"></i>";
			li_1 = createElement("li");
			a_1 = createElement("a");
			a_1.innerHTML = "<i class=\"fa fa-bookmark-o\" aria-hidden=\"true\"></i>";
			li_2 = createElement("li");
			a_2 = createElement("a");
			a_2.innerHTML = "<i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i>";
			li_3 = createElement("li");
			a_3 = createElement("a");
			a_3.innerHTML = "<i class=\"fa fa-info\" aria-hidden=\"true\"></i>";
			text_5 = createText("\r\n\t\t");
			div_3 = createElement("div");
			div_4 = createElement("div");
			card_1._fragment.c();
			text_7 = createText("\r\n\t\t\t");
			div_5 = createElement("div");
			catalogue._fragment.c();
			text_9 = createText("\r\n\t\t\t");
			div_6 = createElement("div");
			contribute._fragment.c();
			text_11 = createText("\r\n\t\t\t");
			div_7 = createElement("div");
			about._fragment.c();
			this.h();
		},

		h: function hydrate() {
			addListener(a, "click", click_handler);
			a.className = a_class_value = "nav-link " + (state.$currentPage === 'card' ? 'active' : '');
			a.id = "app-tab";
			a.href = "#appgenerator";
			li.className = "nav-item";
			addListener(a_1, "click", click_handler_1);
			a_1.className = a_1_class_value = "nav-link " + (state.$currentPage === 'catalogue' ? 'active show' : '');
			a_1.id = "catalogue-tab";
			a_1.href = "#catalogue";
			li_1.className = "nav-item";
			addListener(a_2, "click", click_handler_2);
			a_2.className = a_2_class_value = "nav-link " + (state.$currentPage === 'contribute' ? 'active show' : '');
			a_2.id = "contribute-tab";
			a_2.href = "#contribute";
			li_2.className = "nav-item";
			addListener(a_3, "click", click_handler_3);
			a_3.className = a_3_class_value = "nav-link " + (state.$currentPage === 'about' ? 'active show' : '');
			a_3.id = "about-tab";
			a_3.href = "#about";
			li_3.className = "nav-item";
			ul.className = "nav nav-tabs card-header-tabs justify-content-center";
			div_2.className = "card-header";
			setAttribute(div_2, "role", "navigation");
			div_4.className = div_4_class_value = "tab-pane fade " + (state.$currentPage === 'card' ? 'active show' : '');
			div_4.id = "appgenerator";
			setAttribute(div_4, "role", "tabpanel");
			setAttribute(div_4, "aria-labelledby", "app-tab");
			div_5.className = div_5_class_value = "tab-pane fade " + (state.$currentPage === 'catalogue' ? 'active show' : '');
			div_5.id = "catalogue";
			setAttribute(div_5, "role", "tabpanel");
			setAttribute(div_5, "aria-labelledby", "catalogue-tab");
			div_6.className = div_6_class_value = "tab-pane fade " + (state.$currentPage === 'contribute' ? 'active show' : '');
			div_6.id = "contribute";
			setAttribute(div_6, "role", "tabpanel");
			setAttribute(div_6, "aria-labelledby", "contribute-tab");
			div_7.className = div_7_class_value = "tab-pane fade " + (state.$currentPage === 'about' ? 'active show' : '');
			div_7.id = "about";
			setAttribute(div_7, "role", "tabpanel");
			setAttribute(div_7, "aria-labelledby", "about-tab");
			div_3.className = "tab-content";
			div_3.id = "myTabContent";
			div_1.className = "card mainCard";
			div.className = "col-md-12";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(div_2, div_1);
			appendNode(ul, div_2);
			appendNode(li, ul);
			appendNode(a, li);
			appendNode(li_1, ul);
			appendNode(a_1, li_1);
			appendNode(li_2, ul);
			appendNode(a_2, li_2);
			appendNode(li_3, ul);
			appendNode(a_3, li_3);
			appendNode(text_5, div_1);
			appendNode(div_3, div_1);
			appendNode(div_4, div_3);
			card_1._mount(div_4, null);
			appendNode(text_7, div_3);
			appendNode(div_5, div_3);
			catalogue._mount(div_5, null);
			appendNode(text_9, div_3);
			appendNode(div_6, div_3);
			contribute._mount(div_6, null);
			appendNode(text_11, div_3);
			appendNode(div_7, div_3);
			about._mount(div_7, null);
		},

		p: function update(changed, state) {
			if (changed.$currentPage && a_class_value !== (a_class_value = "nav-link " + (state.$currentPage === 'card' ? 'active' : ''))) {
				a.className = a_class_value;
			}

			if (changed.$currentPage && a_1_class_value !== (a_1_class_value = "nav-link " + (state.$currentPage === 'catalogue' ? 'active show' : ''))) {
				a_1.className = a_1_class_value;
			}

			if (changed.$currentPage && a_2_class_value !== (a_2_class_value = "nav-link " + (state.$currentPage === 'contribute' ? 'active show' : ''))) {
				a_2.className = a_2_class_value;
			}

			if (changed.$currentPage && a_3_class_value !== (a_3_class_value = "nav-link " + (state.$currentPage === 'about' ? 'active show' : ''))) {
				a_3.className = a_3_class_value;
			}

			var card_1_changes = {};
			if (changed.card) card_1_changes.card = state.card;
			card_1._set(card_1_changes);

			if (changed.$currentPage && div_4_class_value !== (div_4_class_value = "tab-pane fade " + (state.$currentPage === 'card' ? 'active show' : ''))) {
				div_4.className = div_4_class_value;
			}

			if (changed.$currentPage && div_5_class_value !== (div_5_class_value = "tab-pane fade " + (state.$currentPage === 'catalogue' ? 'active show' : ''))) {
				div_5.className = div_5_class_value;
			}

			if (changed.$currentPage && div_6_class_value !== (div_6_class_value = "tab-pane fade " + (state.$currentPage === 'contribute' ? 'active show' : ''))) {
				div_6.className = div_6_class_value;
			}

			if (changed.$currentPage && div_7_class_value !== (div_7_class_value = "tab-pane fade " + (state.$currentPage === 'about' ? 'active show' : ''))) {
				div_7.className = div_7_class_value;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy() {
			removeListener(a, "click", click_handler);
			removeListener(a_1, "click", click_handler_1);
			removeListener(a_2, "click", click_handler_2);
			removeListener(a_3, "click", click_handler_3);
			card_1.destroy(false);
			catalogue.destroy(false);
			contribute.destroy(false);
			about.destroy(false);
		}
	};
}

function SvelteComponent(options) {
	init(this, options);
	this._state = assign(this.store._init(["cards", "currentCard", "currentPage"]), options.data);
	this.store._add(this, ["cards", "currentCard", "currentPage"]);
	this._recompute({ $cards: 1, $currentCard: 1 }, this._state);

	this._handlers.destroy = [removeFromStore];

	var self = this;
	var _oncreate = function _oncreate() {
		var changed = { $cards: 1, $currentCard: 1, $currentPage: 1, card: 1 };
		oncreate.call(self);
		self.fire("update", { changed: changed, current: self._state });
	};

	if (!options.root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this, this._state);

	this.root._oncreate.push(_oncreate);

	if (options.target) {
		this._fragment.c();
		this._mount(options.target, options.anchor);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(SvelteComponent.prototype, {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount,
	_differs: _differs
});

SvelteComponent.prototype._recompute = function _recompute(changed, state) {
	if (changed.$cards || changed.$currentCard) {
		if (this._differs(state.card, state.card = card(state.$cards, state.$currentCard))) changed.card = true;
	}
};

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function appendNode(node, target) {
	target.appendChild(node);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function init(component, options) {
	component._handlers = blankObject();
	component._bind = options._bind;

	component.options = options;
	component.root = options.root || component;
	component.store = component.root.store || options.store;
}

function assign(tar, src) {
	for (var k in src) {
		tar[k] = src[k];
	}return tar;
}

function removeFromStore() {
	this.store._remove(this);
}

function callAll(fns) {
	while (fns && fns.length) {
		fns.shift()();
	}
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers = eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		var handler = handlers[i];

		if (!handler.__calling) {
			handler.__calling = true;
			handler.call(this, data);
			handler.__calling = false;
		}
	}
}

function observe(key, callback, options) {
	var fn = callback.bind(this);

	if (!options || options.init !== false) {
		fn(this.get()[key], undefined);
	}

	return this.on(options && options.defer ? 'update' : 'state', function (event) {
		if (event.changed[key]) fn(event.current[key], event.previous && event.previous[key]);
	});
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function cancel() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this.root._lock) return;
	this.root._lock = true;
	callAll(this.root._beforecreate);
	callAll(this.root._oncreate);
	callAll(this.root._aftercreate);
	this.root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
	    changed = {},
	    dirty = false;

	for (var key in newState) {
		if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign(assign({}, oldState), newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		this.fire("state", { changed: changed, current: this._state, previous: oldState });
		this._fragment.p(changed, this._state);
		this.fire("update", { changed: changed, current: this._state, previous: oldState });
	}
}

function _mount(target, anchor) {
	this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
}

function _unmount() {
	if (this._fragment) this._fragment.u();
}

function _differs(a, b) {
	return a != a ? b == b : a !== b || a && (typeof a === "undefined" ? "undefined" : _typeof(a)) === 'object' || typeof a === 'function';
}

function blankObject() {
	return Object.create(null);
}

function noop() {}
exports.default = SvelteComponent;
},{"../css/mainmenu.css":28,"../css/font-awesome-animation.min.css":29,"./Card.svelte":30,"./Catalogue.svelte":31,"./Contribute.svelte":32,"./About.svelte":33}],7:[function(require,module,exports) {
module.exports="/google_classroom.d0601fb7.png";
},{}],6:[function(require,module,exports) {
module.exports="/classroom_screenshot.0d207fc6.jpg";
},{}],8:[function(require,module,exports) {
module.exports="/docs.bd4d9ce6.png";
},{}],9:[function(require,module,exports) {
module.exports="/docs_background.cf7021c4.png";
},{}],10:[function(require,module,exports) {
module.exports="/medium.f0367c2c.png";
},{}],11:[function(require,module,exports) {
module.exports="/medium_logo.eaea7ee3.png";
},{}],13:[function(require,module,exports) {
module.exports="/mentimeter.5e811d4b.png";
},{}],12:[function(require,module,exports) {
module.exports="/mentimeter_logo.009fc8ad.jpg";
},{}],14:[function(require,module,exports) {
module.exports="/officelens.8ff5bb72.jpg";
},{}],15:[function(require,module,exports) {
module.exports="/officelens_background.95c014fc.jpg";
},{}],16:[function(require,module,exports) {
module.exports="/padlet.45602b9e.jpg";
},{}],17:[function(require,module,exports) {
module.exports="/padlet_logo.faa14337.png";
},{}],18:[function(require,module,exports) {
module.exports="/pinterest.88855c2b.png";
},{}],27:[function(require,module,exports) {
module.exports="/pinterest_logo.047c0165.jpg";
},{}],19:[function(require,module,exports) {
module.exports="/pocket.8dc65ef8.png";
},{}],20:[function(require,module,exports) {
module.exports="/pocket_logo.8dd0d34c.png";
},{}],21:[function(require,module,exports) {
module.exports="/snagit.711eddd6.png";
},{}],22:[function(require,module,exports) {
module.exports="/snagit_logo.ec03dc8e.jpg";
},{}],23:[function(require,module,exports) {
module.exports="/socrative.05525d21.png";
},{}],24:[function(require,module,exports) {
module.exports="/socrative_logo.91bebfa3.png";
},{}],25:[function(require,module,exports) {
module.exports="/zeetings.3fb96211.svg";
},{}],26:[function(require,module,exports) {
module.exports="/zeetings_logo.2e3c4e06.svg";
},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [{
    id: "google-classroom",
    name: "Google Classroom",
    url: "https://classroom.google.com",
    tagline: "Classroom allows educators to manage classes, set assignments and interact with students all in one place.",
    description: "Classroom connects students and instructors using tools such as Google Docs, Calendar, Drive, and Forms to build a streamlined platform for learning. Teachers can create classes, distribute assignments, communicate and stay organized whilst students can see their assignments on their To-Do page, share resources and interact in the class stream.",
    colour: "#FDBC45",
    assets: {
        logo: {
            styles: "",
            image: require('./img/google_classroom.png')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/classroom_screenshot.jpg')
        }
    },
    activities: ["connect", "collaborate", "curate"],
    uses: ["Assessment", "Discussion", "Feedback"],
    submitter: {
        name: "A Rhead",
        title: "Learning Developer"
    },
    videoURL: "https://www.youtube.com/embed/UPgnim0Q5cs?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Set up a class and keep it organised by applying topics to posts. Structure materials by week, lesson, theme or assignment.",
        empower: "Add learning resources in Google formats, amending sharing settings for students to edit or add comments.",
        extend: "Use the Classroom stream to set up discussion topics or create quick polls that engage students inbetween lessons."
    }
}, {
    id: "gdocs",
    name: "Google Docs",
    url: "https://www.google.com/docs/about",
    tagline: "An online word processor that allows you to write, edit and collaborate wherever you are.",
    description: "As part of GSuite (formerly Google Apps for Education), Google Docs is a simple but powerful word processing application that helps to create documents from any device. As well as familiar features for formatting and styling, Docs makes it possible to work together in real-time. Sharing files is easy too, with adjustable security settings that make emailing multiple copies of the same document a thing of the past.",
    colour: "#5793EF",
    assets: {
        logo: {
            styles: "background-color: #343A40; background-size: 20px; background-position: 50% 50%;",
            image: require('./img/docs.png')
        },
        cover: {
            styles: "background-color: #fff;",
            image: require('./img/docs_background.png')
        }
    },
    activities: ["create", "collaborate"],
    uses: ["Collaborative writing", "Feedback", "Workbooks"],
    submitter: {
        name: "M Davys",
        title: "Senior Teaching Fellow in Law"
    },
    videoURL: "https://www.youtube.com/embed/ns0U3zkHG7w?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Convert a resource that would normally be given to students in a paper or static electronic format into a Google Doc and share it for students to annotate and make their own.",
        empower: "Organise an 'edit-a-thon' where groups of students are encouraged to collaborate in real-time on a Google Doc to demonstrate their knowledge of a particular topic.",
        extend: "Ask students to share their Google Doc and provide feedback by annotating and inserting comments that prompt further discussion or revisions to their original work."
    }
}, {
    id: "medium",
    name: "Medium",
    url: "https://medium.com/",
    tagline: "A blogging platform that makes writing and sharing posts simple.",
    description: "Medium simplifies the writing process, producing great looking articles that can easily be shared online. Author your own or show your appreciation for other posts by using the applaud feature, or bookmark articles to read later. Medium allows anybody to read, write and respond to stories, with licensing options to allow others to remix and reuse your posts. Found an article that needs more discussion? Write a reponse underneath or highlight specific text and add comments inline.",
    colour: "#000",
    assets: {
        logo: {
            styles: "background-color: #000; background-size: 30px; background-position: 50% 60%; border: 3px solid #000;",
            image: require('./img/medium.png')
        },
        cover: {
            styles: "",
            image: require('./img/medium_logo.png')
        }
    },
    activities: ["create", "check"],

    uses: ["Blogging", "Discussion", "Portfolios", "Reflection"],
    submitter: {
        name: "T Maurice",
        title: "Digital Communications Officer"
    },
    videoURL: "https://www.youtube.com/embed/U0QOonYmDuU?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Start a module blog, writing occasional articles that summarise topics or respond to a related post from another source or Medium author.",
        empower: "Encourage students to respond to your article, asking questions inline or offering their own thoughts. Responses do not have to made public.",
        extend: "Set a reflective task that asks students to write their own posts, either keeping to the same topic or setting a new theme. Add their posts to a class publication."
    }
}, {
    id: "mentimeter",
    name: "Mentimeter",
    url: "https://www.mentimeter.com",
    tagline: "An online polling tool that encourages audience participation.",
    description: "Energise presentations and make lectures more interactive by building informal quizzes and polls that students can respond to using any Internet connected device. Live results are displayed on-screen or hidden until the presenter chooses to reveal them. Great for formative feedback and to monitor understanding.",
    colour: "#00a5bd",
    assets: {
        logo: {
            styles: "background-color: #00a5bd",
            image: require('./img/mentimeter.png')
        },
        cover: {
            styles: "",
            image: require('./img/mentimeter_logo.jpg')
        }
    },
    activities: ["create", "captivate", "check"],
    uses: ["Assessment", "Polls", "Quizzes", "Feedback"],
    submitter: {
        name: "Dr C Little",
        title: "Learning Developer"
    },
    videoURL: "https://www.youtube.com/embed/f1s7UhcIA7I?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Plan an icebreaker activity that poses a quick quiz to help gauge students prior knowledge and to introduce topics that are due to be covered.",
        empower: "Integrate your slides with Mentimeter and use Reactions to help indicate when students are ready to move on or don't understand.",
        extend: "Create a short answer question that asks students to suggest revision topics. Turn the answers into a poll and use it to inform the next session's content."
    }
}, {
    id: "office-lens",
    name: "Office Lens",
    url: "https://twitter.com/msofficelens",
    tagline: "Capture images of whiteboards and documents to make them into readable learning resources.",
    description: "Simply put, Office Lens puts a scanner in your pocket. Frame your shot, shoot from any angle, and like magic, it digitises notes from whiteboards or physical documents for you to easily tidy up. Office Lens uses optical character recognition (OCR) to recognise and convert static images into searchable, editable documents such as Word or PDF. Never lose your sticky notes again!",
    colour: "#D83C18",
    assets: {
        logo: {
            styles: "background-size: 40px; background-position: 50% 20%;",
            image: require('./img/officelens.jpg')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/officelens_background.jpg')
        }
    },
    activities: ["create", "capture"],
    uses: ["Notetaking", "Annotating", "Documenting"],
    submitter: {
        name: "K Beaumont",
        title: "Learning Developer"
    },
    videoURL: "https://www.youtube.com/embed/s5_giVIUWr4?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Share images of whiteboard notes with students after class, or encourage them to capture their own and use as a revision resource later on.",
        empower: "Encourage students to take pictures of their written notes and use them as a starting point for wider research and to add to more detailed, typed notes.",
        extend: "Using their captured notes, ask students to create quizzes and test each other's knowledge and understanding of topics covered in class."
    }
}, {
    id: "padlet",
    name: "Padlet",
    url: "https://www.padlet.com",
    tagline: "Padlet creates digital noticeboards that make sharing and collaborating easy.",
    description: "Padlet provides a flexible digital canvas to add a variety of content. Drag in a video, snap a picture, write text posts or upload documents! Make it even more individual by choosing custom wallpapers and themes. Padlets can be selectively shared and edited among multiple contributors, in real time.",
    colour: "#FF4A76",
    assets: {
        logo: {
            styles: "background-color: #202338;",
            image: require('./img/padlet.jpg')
        },
        cover: {
            styles: "",
            image: require('./img/padlet_logo.png')
        }
    },
    activities: ["create", "collaborate", "curate"],
    uses: ["Mindmapping", "Presentation", "Discussion"],
    submitter: {
        name: "T Hinchcliffe",
        title: "Head of Student Learning & Development"
    },
    videoURL: "https://www.youtube.com/embed/P9CJauuNw8c?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Ask students to engage with a lecture topic by adding their thoughts and questions onto a Padlet wall, forming the basis for a discussion.",
        empower: "Pre-load a collection of resources onto a Padlet wall and ask students to critique them, sharing their responses as comments underneath.",
        extend: "Collect feedback and take questions from students by maintaining a Padlet wall throughout the semester. Tidy and share it with future cohorts."
    }
}, {
    id: "pinterest",
    name: "Pinterest",
    url: "https://www.pinterest.com",
    tagline: "Upload, save and manage visual content (e.g. images and video) via collections known as pinboards.",
    description: "Pinterest is a visual bookmarking tool that helps to discover and save creative ideas. Known as pins, images and videos can be uploaded, saved and categorised into collections  (pinboards) that can be kept private or shared online. Pinboards can be split into sections and made collaborative, allowing others to add content. Pinterest's bookmarking tool can also be used to quickly save content from around the web.",
    colour: "#BD081C",
    assets: {
        logo: {
            styles: "background-color: #BD081C; background-size: 30px; background-position: 50% 25%;",
            image: require('./img/pinterest.png')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/pinterest_logo.jpg')
        }
    },
    activities: ["create", "collaborate", "curate"],
    uses: ["Bookmarking", "Collating", "Researching"],
    submitter: {
        name: "Dr E de Quincey",
        title: "Senior Lecturer in Computing"
    },
    videoURL: "https://www.youtube.com/embed/qFdxRkYldT8?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Use a pinboard to curate and share visual content with students. Collate media relevant to the module/topic being taught.",
        empower: "Open up the module pinboard for contributions and ask students to pin media they think relevant. Ask them to discuss/critique their choices.",
        extend: "In groups, encourage students to create a collaborative pinboard. Assess it as a virtual poster, requiring a narrative that explains their choices and how it relates to a particular topic."
    }
}, {
    id: "pocket",
    name: "Pocket",
    url: "https://www.getpocket.com",
    tagline: "A social bookmarking tool that saves web content across all of your devices.",
    description: "Pocket saves and organises interesting articles, videos and other web content so you can return to it later. Once saved, your personalised library is available on any device, from anywhere — even offline. Easily share items via email or post them to Twitter and Facebook for others to discover.",
    colour: "#EF3E56",
    assets: {
        logo: {
            styles: "background-size: 40px; background-position: 50% 30%; border: solid 3px #fff;",
            image: require('./img/pocket.png')
        },
        cover: {
            styles: "",
            image: require('./img/pocket_logo.png')
        }
    },
    activities: ["curate"],
    uses: ["Bookmarking", "Collating", "Researching"],
    submitter: {
        name: "Dr J Herbert",
        title: "Senior Lecturer in Politics"
    },
    videoURL: "https://biteable.com/watch/embed/video-placeholder-1602227/9a0c58e895f0d2a844c91c1718fb40c2786b47d1?autoplay=1",
    framework: {
        enhance: "Begin building a reading list by installing Pocket on your devices, including the add-on available for most modern web browsers (e.g. Google Chrome).",
        empower: "Start using tags and favourites to organise your list. Tags can be applied to multiple items to build categorised sub-lists.",
        extend: "Set up a module Twitter account or use a hashtag (e.g. #HUM1020) to start sharing articles with students from your Pocket reading list."
    }
}, {
    id: "snagit",
    name: "Snagit",
    url: "http://www.snagit.com",
    tagline: "Capture screenshots or record video to visually explain anything from your screen.",
    description: "Snagit is an all-in-one tool for image and video capture, making it easy to create a variety of learning resources. For example, produce step-by-step tutorials, short introductory videos or annotated images. Snagit's integrated editor simplifies the process by providing a range of professional markup options.",
    colour: "#2C72B7",
    assets: {
        logo: {
            styles: "background-color: #2C72B7; background-size: 32px; background-position: 50% 25%; border: solid 3px #fff;",
            image: require('./img/snagit.png')
        },
        cover: {
            styles: "background-size: cover !important;",
            image: require('./img/snagit_logo.jpg')
        }
    },
    activities: ["create", "capture"],
    uses: ["Screencasting", "Annotating", "Editing"],
    submitter: {
        name: "E Tennant",
        title: "English Language Teaching Fellow"
    },
    videoURL: "https://biteable.com/watch/embed/video-placeholder-1602227/9a0c58e895f0d2a844c91c1718fb40c2786b47d1?autoplay=1",
    framework: {
        enhance: "Record and upload a short video that introduces yourself, the topics you'll be covering and what assessments to expect.",
        empower: "Narrate a recommended text (e.g. journal article), identifying key points to promote skills that students can apply in their wider reading.",
        extend: "Use Snagit to record audiovisual feedback based on anonymised draft submissions to help resolve common assignment issues."
    }
}, {
    id: "socrative",
    name: "Socrative",
    url: "https://www.socrative.com",
    tagline: "An app that encourages student participation via online polls and quizzes for real time feedback.",
    description: "Engage students with Socrative, an app that helps to build activities that provide feedback as learning happens. Launch pre-prepared quizzes or ask ad-hoc questions to quickly assess students and get immediate insights into their understanding at class, individual or question level. Automatically populated results visualise feedback, either to be shared with the class or collected anonymously by the tutor.",
    colour: "#8EB4CF",
    assets: {
        logo: {
            styles: "background-color: #ffffff; background-size: 30px; background-position: 50% 60%; border: 3px solid #ffffff;",
            image: require('./img/socrative.png')
        },
        cover: {
            styles: "",
            image: require('./img/socrative_logo.png')
        }
    },
    activities: ["create", "captivate", "check"],
    uses: ["Assessment", "Polls", "Quizzes", "Feedback"],
    submitter: {
        name: "Dr R Leach",
        title: "Head of Social Science and Public Policy"
    },
    videoURL: "https://biteable.com/watch/embed/video-placeholder-1602227/9a0c58e895f0d2a844c91c1718fb40c2786b47d1?autoplay=1",
    framework: {
        enhance: "Design a short quiz using different question types to informally check students understanding during a lecture or seminar.",
        empower: "Ask students to work in pairs or small groups to discuss their answers before responding to the quiz. Use a 'Space Race' for added competitiveness.",
        extend: "Download the feedback report and identify areas which students had difficulty with. Use it to recap topics or inform future learning design."
    }
}, {
    id: "zeetings",
    name: "Zeetings",
    url: "https://www.zeetings.com",
    tagline: "Seamlessly combine slides, multimedia content, polls and Q&A features into interactive presentations.",
    description: "Zeetings helps to create engaging presentations by combining a range of interactive tools into one, easy to use interface. Add slides from existing decks or use Zeetings to create brand new presentations, quickly embedding videos, polls and surveys. A Zeeting is interactive, so share with students to receive real time feedback and live questions. With in-built analytics, responses are saved automatically to repurpose outside of the classroom.",
    colour: "#2BA0D8",
    assets: {
        logo: {
            styles: "background-color: #343A40; background-size: 20px; background-position: 50% 50%;",
            image: require('./img/zeetings.svg')
        },
        cover: {
            styles: "",
            image: require('./img/zeetings_logo.svg')
        }
    },
    activities: ["create", "captivate", "check"],
    uses: ["Presentations", "Notetaking", "Polls", "Feedback"],
    submitter: {
        name: "J Preston",
        title: "Lecturer in Midwifery"
    },
    videoURL: "https://www.youtube.com/embed/qKsY_083uOk?rel=0&amp;showinfo=0?&cc_load_policy=1",
    framework: {
        enhance: "Import a previous presentation (e.g. PowerPoint) and add some interactive slides that will test student's comprehension during the session.",
        empower: "Introduce students to the Q&A feature. Ask them to pose questions anonymously and vote on which ones they think should be answered first.",
        extend: "Use Zeetings' analytics feature to export all questions and allocate a revision task that requires students to present back an answer at the next class."
    }
}];
},{"./img/google_classroom.png":7,"./img/classroom_screenshot.jpg":6,"./img/docs.png":8,"./img/docs_background.png":9,"./img/medium.png":10,"./img/medium_logo.png":11,"./img/mentimeter.png":13,"./img/mentimeter_logo.jpg":12,"./img/officelens.jpg":14,"./img/officelens_background.jpg":15,"./img/padlet.jpg":16,"./img/padlet_logo.png":17,"./img/pinterest.png":18,"./img/pinterest_logo.jpg":27,"./img/pocket.png":19,"./img/pocket_logo.png":20,"./img/snagit.png":21,"./img/snagit_logo.jpg":22,"./img/socrative.png":23,"./img/socrative_logo.png":24,"./img/zeetings.svg":25,"./img/zeetings_logo.svg":26}],2:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _store = require('svelte/store');

var _App = require('./templates/App.svelte');

var _App2 = _interopRequireDefault(_App);

var _cards = require('./cards.js');

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Base template 


// data for all the cards


// Define store that will comprise the card data and state of the app
var AppStore = function (_Store) {
	_inherits(AppStore, _Store);

	function AppStore() {
		_classCallCheck(this, AppStore);

		return _possibleConstructorReturn(this, (AppStore.__proto__ || Object.getPrototypeOf(AppStore)).apply(this, arguments));
	}

	_createClass(AppStore, [{
		key: 'loadRandomCard',


		// Method to load a random card (callable from any component)
		value: function loadRandomCard(currentCardId) {
			// Remove current card so we don't randomly select it
			var cards = this.get('cards').filter(function (card) {
				return card.id !== currentCardId;
			});
			var card = cards[Math.floor(Math.random() * cards.length)];
			this.set({
				currentCard: card.id
			});
		}
	}]);

	return AppStore;
}(_store.Store);

// Expand each of the 'activities' for each card to include the full information for that activity


_cards2.default.forEach(function (card) {
	var activities = [{ name: "create", description: "Build learning resources, from scratch or remixing existing materials." }, { name: "captivate", description: "Create interactive learning opportunities that engage." }, { name: "check", description: "Gauge students understanding." }, { name: "connect", description: "Communicate with students in real time or asynchronously." }, { name: "collaborate", description: "A platform for collaboration and co-creation." }, { name: "curate", description: "Collect, organise and share content." }, { name: "capture", description: "Record an event, activity or artefact." }];
	card.activities = card.activities.map(function (name) {
		return activities.find(function (activity) {
			return activity.name === name;
		});
	});
});

// Create the store with initial state
var store = new AppStore({
	cards: _cards2.default,
	currentCard: _cards2.default[Math.floor(Math.random() * _cards2.default.length)].id,
	currentPage: 'card'
});

// Create the app using App as the default template and pass it the store
var app = new _App2.default({
	target: document.body,
	store: store
});

exports.default = app;
},{"svelte/store":5,"./templates/App.svelte":4,"./cards.js":3}],41:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55513' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[41,2], null)
//# sourceMappingURL=/main.ed3139d8.map