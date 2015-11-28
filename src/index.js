import React from 'react';
import ReactDOM from 'react-dom';
import c3 from 'c3';
import merge from 'deepmerge';
import loadHistoryData from './loadHistoryData';

const isDate = (key) => key === "date";
const isList = (data) => data && data.length;
const emptyList = (list) => isList(data) && list.length > 1;
const hasDataProperty = (data) => data.hasOwnProperty('date');
const notEmptyList = (initialData) => {
  return initialData != null && initialData.length != null && initialData.length > 0;
};

var RTChart = React.createClass({

  componentDidMount: function() {
    this.limit = (this.props.maxValues || 30);
    this.count = this.props.initialData || 0;
    this.ids = this.props.fields;

    this.initChart();
  },

  getInitialState: function() {
    return {
      chart: null
    };
  },

  unload() {
    this.state.chart.unload({
      ids: this.props.fields
    });
  },

  resetChart: function() {
    this.unload();
    this.initChart();
  },

  componentWillReceiveProps: function(nextProps) {
    if (!this.state.chart) return;
    if (!nextProps.data) return;

    if (Object.keys(nextProps.data).length < this.props.fields.length) {
      console.warn(`Values has a length of ${nextProps.values.length} but must be the same as fields: ${this.props.fields.length}`);
    }

    if (nextProps.reset) {
      this.resetChart();
    }

    var columns = loadHistoryData([nextProps.data], nextProps.fields, this.limit);

    var args = merge({
                columns: columns,
                duration: 400
              }, (this.props.flow || {}));

    if (this.count <= this.limit) this.count++;

    if (this.count < this.limit) args['length'] = 0;

    this.state.chart.flow(args);
  },

  render: function() {
    return <div style = { this.props.style } ref='chart'/>
  },

  initChart: function() {
    if (!this.props.fields) {
      throw new Error("prop type fields are missing. fields={['field',..]}");
    }

    var { initialData, chart, fields } = this.props;

    var defaultColumns = [['x']];

    this.props.fields.forEach((f) => defaultColumns.push([f]));

    var chart_temp = merge({
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M:%S',
          }
        }
      }
    }, (chart || {}));

    chart_temp.bindto = ReactDOM.findDOMNode(this);
    var columns = notEmptyList(initialData) ? loadHistoryData(initialData, fields, this.limit) : defaultColumns;
    chart_temp.data = {
      x: 'x',
      columns: columns
    };
    // Make sure we use timeseries in case of override
    chart_temp.axis.x.type = 'timeseries';

    var chart = c3.generate(chart_temp);

    this.setState({
      chart: chart,
      initialData: initialData
    });
  },

  propTypes: {
    dateFormat: React.PropTypes.string,
    chart: React.PropTypes.object,
    fields: React.PropTypes.array.isRequired,
    maxValues: React.PropTypes.number
  }
});

module.exports = RTChart;
