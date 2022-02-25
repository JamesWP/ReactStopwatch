import * as React from 'react'
import * as ReactDOM from 'react-dom'

let Greet = () => <h1>Just Hello, world!</h1>;

let App = () => <Greet/>;

ReactDOM.render(<App/>, document.getElementById("root"));