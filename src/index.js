import React from 'react';
import c3 from 'c3';
import merge from 'deepmerge';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {chart: null};

    this.limit = (this.props.maxValues || 10);
    this.count = 0;
  }
  componentDidMount() {
    this.initChart(); 

  }
  componentWillReceiveProps(nextProps) {
    if(!this.state.chart) return;
    if(nextProps.data.values.length < this.props.fields.length) {
      throw new Error(`Values has a length of ${nextProps.values.length} but must be the same as fields: ${this.props.fields.length}`);
    }

    var columns = [['x', nextProps.data.date]];
    var vals = nextProps.data.values.forEach((val) => {
      columns.push([val.id, val.value]);
    });
    var args = merge({
      columns: columns,
      duration: 350
      }, (this.props.flow || {}));

    if(this.count <= this.limit) this.count++;

    if(this.count < this.limit) args['length'] = 0;
    this.state.chart.flow(args);

  }

  render() {
    return <div style={this.props.style} ref='chart'/>
  }

  initChart() {
    if(!this.props.fields) {
      throw new Error("prop type fields are missing. fields={['field',..]}");
      return;
    }
    var columns = [['x']];
    this.props.fields.forEach((f) => columns.push([f]));
    
    var chart_temp = merge({
      axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%H:%M:%S',
                }
            }
        }
    }, (this.props.chart || {}));

    // Override potential errors. Need bindto and axis.x.type to be timeseries
    chart_temp.bindto = React.findDOMNode(this.refs.chart);
    chart_temp.data = {x: 'x', columns: columns };
    chart_temp.axis.x.type = 'timeseries';

    var chart = c3.generate(chart_temp);

    this.setState({chart: chart});
  }

  propTypes: {
    dateFormat: React.PropTypes.string,
    chart: React.PropTypes.object,
    fields: React.PropTypes.object.isRequired,
    maxValues: React.PropTypes.number
  }
}

