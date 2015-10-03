# react-rt-chart

Real time chart component for React using c3.js. A wrapper for c3-flow api making it easier to create real-time graphs.

TODO

### Usage example

Pass new props to the chart to append values

```javascript
var data = {
            date: new Date().getTime(), 
            values: [{id: 'data1', value: 100}, {id: 'data2', value: 150}]
           };

render() {
  return <RealTimeChart maxValues={30} data={data}/>
}

```
