/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("substance/dist/substance");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _substance = __webpack_require__(0);

var _ArticlePackage = __webpack_require__(8);

var _ArticlePackage2 = _interopRequireDefault(_ArticlePackage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultHTML = '<html><body><h1>Untitled</h1></body></html>';

var ArticleEditor = function (_React$Component) {
  _inherits(ArticleEditor, _React$Component);

  function ArticleEditor() {
    _classCallCheck(this, ArticleEditor);

    return _possibleConstructorReturn(this, (ArticleEditor.__proto__ || Object.getPrototypeOf(ArticleEditor)).apply(this, arguments));
  }

  _createClass(ArticleEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          html = _props.html,
          save = _props.save;


      var configurator = new _substance.Configurator();
      configurator.import(_ArticlePackage2.default);

      var importer = configurator.createImporter('html');
      var exporter = configurator.createExporter('html');

      var doc = importer.importDocument(html || defaultHTML);

      var editorSession = new _substance.EditorSession(doc, { configurator: configurator });

      editorSession.setSaveHandler({
        saveDocument: function saveDocument(_ref) {
          var editorSession = _ref.editorSession;

          var html = exporter.exportDocument(editorSession.getDocument());

          return save({ html: html });
        }
      });

      // save after 1 sec of inactivity
      editorSession.getDocument().on('document:changed', function () {
        if (_this2.saveTimer) {
          window.clearTimeout(_this2.saveTimer);
        }

        _this2.saveTimer = window.setTimeout(function () {
          editorSession.save();
        }, 1000);
      });

      // ask before leaving if unsaved
      window.addEventListener('beforeunload', function (event) {
        if (editorSession.hasUnsavedChanges()) {
          var text = 'There are unsaved changes: are you sure you want to leave the editor?';

          event.returnValue = text;

          return text;
        }
      });

      _substance.ProseEditor.mount({ editorSession: editorSession }, this.editor);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', { ref: function ref(node) {
          return _this3.editor = node;
        } });
    }
  }]);

  return ArticleEditor;
}(_react2.default.Component);

exports.default = ArticleEditor;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("font-awesome/css/font-awesome.css");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("substance/substance-pagestyle.css");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("substance/substance-reset.css");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("substance/substance.css");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _substance = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleExporter = function (_HTMLExporter) {
  _inherits(ArticleExporter, _HTMLExporter);

  function ArticleExporter() {
    _classCallCheck(this, ArticleExporter);

    return _possibleConstructorReturn(this, (ArticleExporter.__proto__ || Object.getPrototypeOf(ArticleExporter)).apply(this, arguments));
  }

  _createClass(ArticleExporter, [{
    key: 'convertDocument',
    value: function convertDocument(doc) {
      var elements = this.convertContainer(doc.get('body'));

      return elements.map(function (el) {
        return el.outerHTML;
      }).join('');
    }
  }]);

  return ArticleExporter;
}(_substance.HTMLExporter);

exports.default = ArticleExporter;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _substance = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArticleImporter = function (_HTMLImporter) {
  _inherits(ArticleImporter, _HTMLImporter);

  function ArticleImporter(config) {
    _classCallCheck(this, ArticleImporter);

    return _possibleConstructorReturn(this, (ArticleImporter.__proto__ || Object.getPrototypeOf(ArticleImporter)).call(this, {
      schema: config.schema,
      converters: config.converters,
      DocumentClass: _substance.ProseArticle
    }));
  }

  _createClass(ArticleImporter, [{
    key: 'convertDocument',
    value: function convertDocument(input) {
      this.convertContainer(Array.isArray(input) ? input : [input], 'body');
    }
  }]);

  return ArticleImporter;
}(_substance.HTMLImporter);

exports.default = ArticleImporter;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _substance = __webpack_require__(0);

var _ArticleImporter = __webpack_require__(7);

var _ArticleImporter2 = _interopRequireDefault(_ArticleImporter);

var _ArticleExporter = __webpack_require__(6);

var _ArticleExporter2 = _interopRequireDefault(_ArticleExporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'article',
  configure: function configure(config) {
    // config.defineSchema({
    //   name: 'prose-article',
    //   ArticleClass: ProseArticle,
    //   defaultTextType: 'paragraph'
    // })
    config.import(_substance.ProseEditorPackage);
    config.import(_substance.PersistencePackage);

    config.addImporter('html', _ArticleImporter2.default);
    config.addExporter('html', _ArticleExporter2.default);
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(5);

__webpack_require__(4);

__webpack_require__(3);

__webpack_require__(2);

var _ArticleEditor = __webpack_require__(1);

var _ArticleEditor2 = _interopRequireDefault(_ArticleEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _ArticleEditor2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map