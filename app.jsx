import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Timer} from './timer'

let Greet = () => <h1>Just Hello, world!</h1>;

let App = () => (<div><Greet/><Timer/></div>);

ReactDOM.render(<App/>, document.getElementById("root"));