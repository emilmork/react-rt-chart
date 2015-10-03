react-rt-chart
===
A React component wrapping [c3.js flow API](http://c3js.org/samples/api_flow.html) that makes it easy to create real-time charts.

## Install
```bash
npm install react-rt-chart
```

### Usage

Render a real-time chart with 10 visible values. The graph will update when it receives new data props. The data format consist of a timestimp and one or more values.

This example udpates two graph lines (data1 and data2) at the same time:

```javascript
import RealTimeChart from 'react-rt-chart';

class TimeSeries extends React.Component {
    constructor(){
        this.state = { data: null };
        
        setInterval(() => {
            this.setState({data: { 
                date: new Date().getTime(), 
                values: [{id: 'data1', value: 52},{id: 'data2',value: 76}]
            }});
        }, 1000);
    }
    render() {
        return <RealTimeChart 
                maxValues={10} 
                fields={['data1','data2']} 
                data={this.state.data} />
    }
}
```

### Configuration

You can provide a chart object to customize the graph. See [c3js.org](http://c3js.org) for options.
#### Example - Chart options
```javascript
    render() {
        var chart = {
                axis: {
                    y: { min: 50, max: 100 }
                }
            };
        return <RealTimeChart
                chart={chart}
                fields={['data1','data2']} 
                data={this.state.data} />
    }
```

You can provide a flow object object for customizing the animation. [c3.js flow API](http://c3js.org/reference.html#api-flow) for options.
#### Example - Set animation duration
```javascript
    render() {
        var flow = {
                duration: 200
            };
        return <RealTimeChart
                flow={flow}
                fields={['data1','data2']} 
                data={this.state.data} />
    }
```
#### Props
* **fields** (required) - ['Name1','Name2', ...]
* **data** [ data: Date, values: {[id: 'Name1', value: Number},{id: 'Name2}, ...]}
* **chart** - chart options
* **flow** - flow options
* **maxValues** - set the maximun values visible on the graph.





