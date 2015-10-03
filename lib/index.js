'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _c3 = require('c3');

var _c32 = _interopRequireDefault(_c3);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _default = (function (_React$Component) {
  _inherits(_default, _React$Component);

  function _default(props) {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props);
    this.state = { chart: null };
  }

  _createClass(_default, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.state.chart) return;
      if (nextProps.values.length < this.props.fields) {
        throw new Error('Values has a length of ' + nextProps.values.length + ' but must be the same as fields: ' + this.props.fields.length);
      }

      var columns = [['x', nextProps.data.value.date]];
      var vals = nextProps.data.value.values.forEach(function (val) {
        columns.push([val.f, val.value]);
      });
      var args = {
        columns: columns,
        duration: 350
      };

      this.count++;
      if (this.count < this.limit) args['length'] = 0;
      this.state.chart.flow(args);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', { style: this.props.style, ref: 'chart' });
    }
  }, {
    key: 'initChart',
    value: function initChart() {

      var columns = [['x']];
      this.props.fields.forEach(function (f) {
        return columns.push([f]);
      });

      var chart = _c32['default'].generate(Object.assign({
        bindto: _react2['default'].findDOMNode(this.refs.chart),
        data: {
          x: 'x',
          columns: columns
        },
        axis: {
          y: {
            min: 50,
            max: 200
          },
          x: {
            type: 'timeseries',
            tick: {
              format: '%H:%M:%S'
            }
          }
        }
      }, this.props.chart));
    }
  }]);

  return _default;
})(_react2['default'].Component);

// var React = require('react');
// var c3 = require('c3');
// var RF = require('react-miniflow');
// var moment = require('moment');

// var { State, Enhance } = RF;

// State.init({data: {date: new Date(), values: [{f: 'O2 - b1', value: 50},{f: 'O2 - b2',value: 60}]}});

// var count = 0;

// var RealTimeChart = React.createClass({
//     componentDidMount: function() {
//       this.initChart();

//       this.limit = this.props.limit || 10;
//       this.count = 0;
//     },

//     getInitialState: function() {
//       return {
//         chart: null
//       };
//     },
//     componentWillReceiveProps:function(nextProps) {
//         if(!this.state.chart) return;

//         var columns = [['x', nextProps.data.value.date]];
//         var vals = nextProps.data.value.values.forEach(function(val) {
//           columns.push([val.f, val.value]);
//         });
//         var args = {
//           columns: columns,
//           duration: 350
//           };

//         this.count++;
//         if(this.count < this.limit) args['length'] = 0;
//         this.state.chart.flow(args);
//     },
//     render:function() {
//       return <div ref='chart'></div>
//     },
//     initChart:function() {
//       var others = this.props.fields

//       var columns = [['x']];
//       this.props.fields.forEach((f) => columns.push([f]));

//       var chart = c3.generate({
//             bindto: React.findDOMNode(this.refs.chart),
//             data: {
//                 x: 'x',
//                 columns: columns
//             },
//             axis: {
//                 y: {
//                   min: 50,
//                   max: 200
//                 },
//                 x: {
//                     type: 'timeseries',
//                     tick: {
//                         format: '%H:%M:%S',
//                     }
//                 }
//             }
//         });
//       this.setState({chart: chart});
//     }

// });

// var getVal = function() {
//   return 110 +(Math.floor((Math.random() * 10) + 1));
// }

// setInterval(() => {
//   State.set('data', { date: new Date().getTime(), values: [{f: 'O2 - b1', value: getVal()},{f: 'O2 - b2',value: getVal()}]});
// }, 1000);

// var d = {};

// for(let i=0;i<100;i++) {
//   d.push([date: moment().add(1, 'sec').unix(), values: [{f: 'O2 - b1', value: getVal()},{f: 'O2 - b2',value: getVal()}]]);
// }

// State.set('data', d);

// class App extends React.Component {
//   render() {
//     return <RealTimeChart limit={15} fields={['O2 - b1'],['O2 - b2']} data={this.props.data}/>
//   }
// }

// App = Enhance(App, ['data']);

// React.render(
//   React.createElement(App, null),
//   document.getElementById('content')
// );
exports['default'] = _default;
module.exports = exports['default'];