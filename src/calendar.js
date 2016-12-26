import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import createLogger from 'redux-logger'
import moment from 'moment'

const loggerMiddleware = createLogger()

const now = moment()
const initialState = { month: now.month() + 1, year: now.year() }


// REDUCER
function calendarState (state = initialState, action){
    switch (action.type){
        case 'GO_PREV_MONTH':
            return{
                month: (state.month == 1) ? 12 : state.month - 1,
                year: (state.month == 1) ? state.year - 1 : state.year
            } 
        case 'GO_NEXT_MONTH':
            return{
                month: (state.month == 12) ? 1 : state.month + 1,
                year: (state.month == 12) ? state.year + 1 : state.year
            }
        default:
            return state
    }
}

// REDUCER 2
function langState (state = {lang: 'EN'}, action){
    switch(action.type){
        case 'CHANGE_LANG':
            return { lang: action.new_lang }
        default:
            return state
    }
}

// to 1 and only reducer
const reducers = combineReducers({calendarState, langState})

class Calendar extends Component{
    render(){
        return( 
            <div> 
                <ActiveCalendarHead />
                <ActiveCalendarTable />
                <ActiveLangSwitcher />
            </div>
            )
    }
}

class LangSwitcher extends Component{
    constructor(props){
        super(props)

        this.change2EN = this.change2EN.bind(this)
        this.change2TH = this.change2TH.bind(this)
    }
    change2EN(){
        this.props.changeLang('EN')
    }
    change2TH(){
        this.props.changeLang('TH')
    }
    render(){
        return (
            <div className="pull-right"> 
                { (this.props.lang == 'EN' 
                    && <button className="btn btn-default btn-xs" onClick={this.change2TH}>ไทย</button>)}
                { (this.props.lang == 'TH' 
                    && <button className="btn btn-default btn-xs" onClick={this.change2EN}>EN</button>)}
            </div>
        )
    }
}

const are = {a:1, r:2, e:3} // are - object(a, r, e)
let { a, r } = are // a = are.a, r = are.r

const langFromState = ({langState}) => ({ lang: langState.lang })
const langToDispatch = (dispatch) => {
    return{
        changeLang:(lang) => {
            dispatch({type: 'CHANGE_LANG', new_lang: lang})
        }
    }
}

const ActiveLangSwitcher = connect(langFromState, langToDispatch)(LangSwitcher)

class CalendarHead extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-xs-8">
                    <h2>
                        {moment().locale(this.props.lang).month(this.props.month - 1).format("MMMM")} {(this.props.lang == "TH") ? this.props.year + 543 : this.props.year}
                    </h2>
                </div>
                <div className="col-xs-4">
                    <span className="move">
                    <a href="#" onClick={ this.props.prevMonth } > &lt;&lt; {(this.props.lang == "TH") ? "ย้อนกลับ" : "Prev"}</a> | <a href="#" onClick={ this.props.nextMonth } >{(this.props.lang == "TH") ? "ถัดไป" : "Next"} &gt;&gt;</a>
                    </span>
                </div>
            </div>
        )
    }
}

const calendarHeadPropsFromState = ({calendarState, langState}) => {
    return {
        month: calendarState.month,
        year: calendarState.year,
        lang: langState.lang
    }
}

const calendarHeadPropsDispatch = (dispatch) => {
    return {
        prevMonth: () => { dispatch( { type: 'GO_PREV_MONTH' } ) },
        nextMonth: () => { dispatch( { type: 'GO_NEXT_MONTH' } ) }
    }
}

// Create ActiveCalendarHead
const ActiveCalendarHead = connect(calendarHeadPropsFromState, calendarHeadPropsDispatch) (CalendarHead)


class CalendarTable extends Component{
    render(){
        let firstDay = moment().year(this.props.year).month(this.props.month - 1).local()
        let lastDay = moment().year(this.props.year).month(this.props.month - 1).local()

        firstDay.date(1)
        lastDay = lastDay.endOf('month')

        let skip = firstDay.day()
        let maxDay = lastDay.date()

        let weeks = Math.ceil(( maxDay + skip) / 7)
        
        let rowsData = [
            { start: 1, skip: skip }
        ]

        for (let i = 8 - skip ; i < maxDay ; i = i+7){
            rowsData.push({start: i})
        }

        rowsData[rowsData.length - 1].end = maxDay

        return(
            <div>
                <table className="table">
                
                    <ActiveCalendarTableHead />

                <tbody>
                    { rowsData.map( row =>
                        <CalendarTableRow start={row.start} skip={row.skip} end={row.end} />) }
                </tbody>
                </table>
            </div>
        )
    }
}

const ActiveCalendarTable = connect (calendarHeadPropsFromState) (CalendarTable)

class CalendarTableHead extends Component{
    render(){
        return(
        
                <thead>
                {(this.props.lang == "EN" &&
                    (<tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>)
                )}

                {(this.props.lang == "TH" &&
                    (<tr>
                        <th>จ</th>
                        <th>อ</th>
                        <th>พ</th>
                        <th>พฤ</th>
                        <th>ศ</th>
                        <th>ส</th>
                        <th>อา</th>
                    </tr>)
                )}
                </thead>
        
        )
    }

}

const ActiveCalendarTableHead = connect(calendarHeadPropsFromState)(CalendarTableHead)

class CalendarTableRow extends Component{
    render(){

        let days = []
        let skip = (this.props.skip != null) ? this.props.skip :0;

        for(let i = this.props.start, j = 0; j < 7; i++, j++){
            if(j < skip){
                //days.unshift(0) // put 0 at the begin
                i = 0 // stop counting for i
            }

            if(this.props.end != null && i > this.props.end){
                break
            }

            days[j] = i;
        }

        if(days.length < 7){
            for(let i = days.length ; i < 7 ; i++){
                days.push(0)
            }
        }

        return(
            <tr>
                {days.map ( (value, index) => 
                    <td key={index.toString()} className={(index == 0 || index == 6) ? "weekend" : ""}>
                    {(value == 0) ? "" : value}
                    </td>
                )
            }
            </tr>
        )
    }
}
//<Provider store={store}>
//    </Provider>,

// Create store
const store = createStore(reducers, 
                applyMiddleware(loggerMiddleware)
)

ReactDOM.render(
    <Provider store={store}>
        <Calendar />
    </Provider>,
    document.getElementById("core")
)