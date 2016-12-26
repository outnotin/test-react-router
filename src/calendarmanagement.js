import ReactDOM from 'react-dom'
import React, { Component } from 'react'

import Router from 'react-router'

import TestComponent from './test.js'

// Material UI Components
import RaisedButton from 'material-ui/RaisedButton'

// Needed for render Material UI
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()



const divStyle = {
	marginTop: '20px'
}

class CalendarManagement extends Component{

	getChildContext(){
		return { muiTHeme: getMuiTheme(baseTheme)}
	}

	render(){
		return(
				<div>
					<div className="row">
        				<div className="col-xs-1"></div>
        				<div className="col-xs-8">
          					<h2>Calendar Management</h2>
        				</div>
        				<div className="col-xs-2">
          					<button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" style={divStyle}>
              				Add Event
          					</button>
        				</div>
        				<div className="col-xs-1"></div>
      				</div>

      				<div className="row">
      					<div className='col-xs-1'></div>
      					<div className='col-xs-10'>
      						<h3>Test</h3>
      					</div>
      					<div className='col-xs-1'></div>
      				</div>
				</div>
			)
	}
}

const CalendarManagementWithMui = () =>{
	return(
		<MuiThemeProvider muiTheme={getMuiTheme()}>
			<CalendarManagement />
			<TestComponent />
		</MuiThemeProvider>
	)
}

ReactDOM.render(
	<CalendarManagementWithMui />,
	document.getElementById("App")
)