import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

class App extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={Component}>
					<IndexRoute component={Dashboard}/>
					<Route path='/usermanagement' component ={UserManagement} />
					<Route path='/projectmanagement' component={ProjectManagement} />
					<Route path='*' component={NotFound}/>
				</Route>
			</Router>
		)
	}
}

const Dashboard = () =>
	<div>
		<h1>Dashboard</h1>
	</div>


const UserManagement = () =>
	<div>
		<h1>User Management</h1>
	</div>


const ProjectManagement = () =>
	<div>
		<h1>Project Management</h1>
	</div>

const NotFound = () =>
	<div>
		<h1>404 Not Found</h1>
	</div>


const Container = (props) => (
	<div>
	{props.children}
	<div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
            mdl-layout--fixed-header">
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <div className="mdl-layout-spacer"></div>
      <div className="material-icons mdl-badge mdl-badge--overlap" data-badge="1">account_box</div>
    </div>
  </header>
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Logo</span>
    <nav className="mdl-navigation">

    <div className="container">
    <div className="row">
            
            <a href="#" className="list-group-item">Dashboard</a>
            <div id="main-menu" className="list-group">
                <a href="#sub-menu" className="list-group-item active" data-toggle="collapse" data-parent="#main-menu">Administrator<span className="caret"></span></a>
                <div className="collapse list-group-level1" id="sub-menu">
                    <a href="#" className="list-group-item" data-parent="#sub-menu">User Management</a>
                    <a href="./projectmanagement.html" className="list-group-item" data-parent="#sub-menu">Project Management</a>
                    <a href="/calendarmanagement" className="list-group-item" data-parent="#sub-menu">Calendar Management</a>
                    <a href="/test" className="list-group-item" data-parent="#sub-menu">Company Setting</a>
                    <a href="#" className="list-group-item" data-parent="#sub-menu">History</a>
                    </div>
                </div>
        </div>
    </div>

    </nav>
  </div>
  <main className="mdl-layout__content">
    <div className="page-content">
        <div id="App"></div>
    </div>
  </main>
</div>
        <div id="calman">

        </div>
        <script type="text/javascript" src="calendarmanagement.bundle.js"></script>
</div>
)

export default App