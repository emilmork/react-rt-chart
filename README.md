react-rt-chart
===
A React component wrapping [c3.js flow API](http://c3js.org/samples/api_flow.html) that makes it easy to create real-time charts.

### Install
```bash
npm install react-rt-chart
```

### Example Usage

```bash
import RTChart from 'react-rt-chart';
```

```javascript
componentDidMount() {
    setInterval(() => this.forceUpdate(), 1000);
},

render() {
    var data = {
      date: new Date(),
      Car: getRandomValue(),
      Bus: getRandomValue()
    };

    return <RTChart
            fields={['Car','Bus']}
            data={data} />
}
```
![Awesome cat gif](http://imgur.com/BgABXwt.gif)

### Styling

To use the default styling include c3.css from [github](https://github.com/masayuki0812/c3/blob/master/c3.css) or from node_modules/c3 within react-rt-chart.

### Properties

#### `fields` (required)

The names of the provided values

```javascript
fields={['name_1', 'name_2']}
```

#### `data`
New value to append to graph

```javascript
{
  date: new Date(),
  name_1: 100,
  name_2: 200
}
```
#### `maxValues` (default - 30)
The number of values visible on the graph.
```javascript
maxValues={60}
```
#### `initialData`
An list of values that will be loaded into the graph immediately.

```javascript
var initialdata = [
{ date: .., name_1: .., name_2: ..},
{ date: .., name_1: .., name_2: ..},
..
];
initialData={initialData}
```
#### `chart`
Chart options. See [c3js - references](http://c3js.org/reference.html) for all options.
Example
```javascript
        var chart = {
                axis: {
                    y: { min: 50, max: 100 }
                },
                point: {
                    show: false
                }
        };
        return <RtChart
                chart={chart}
                fields={['data1','data2']}
                data={this.state.data} />
    }
```
#### `flow`
Animation options. See [c3.js flow API](http://c3js.org/reference.html#api-flow) for all options.

```javascript
    render() {
        var flow = {
                duration: 200
            };
        return <RtChart
                flow={flow}
                fields={['data1','data2']}
                data={this.state.data} />
    }
```

#### `reset`

Reset and unload the chart if true.

```javascript
reset={true}
```
---

### Changelog

#### `v1.3.0`

- Accept any valid react props [#8](https://github.com/emilmork/react-rt-chart/pull/8)

#### `v1.2.0`

- Make it possible to use different chart types, not just timeseries

#### `v1.1.4`

- Move react* to devDeps (#3) [#3](https://github.com/emilmork/react-rt-chart/pull/3)
- Use component refs instead of getDOMNode [#4](https://github.com/emilmork/react-rt-chart/pull/4)

#### `v1.1.3`

Make it possible to change chart types

#### `v1.0.0`

**Changed:**

Data format have changed from using an id field to just use the object properties
New format:
```javascript
data={{date: [Date], val1: [Number], val2: [Number], ...}}
```
**Added**
- Added ```initialData={[]}```
- Added ```reset={Boolean}
- Some bug fixes

#### `0.0.1`

Inital version.
