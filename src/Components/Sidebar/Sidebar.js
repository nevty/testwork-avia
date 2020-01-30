import React from "react";
import {connect} from "react-redux";
import {
    setFilterTicketsByStopsActionCreator,
} from "../../redux/tickets-reducer";
import {Form} from "react-bootstrap";


class Sidebar extends React.Component {

    handleChange = ({target}) => {
        this.props.setFilterTicketsByStops(target.value);
    }

    render() {
        return (
            <aside className="Tickets__filter text-left p-4 mt-2 shadow-sm bg-white rounded">
                <h5>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
                {[
                    {value:"",label:"Все"},
                    {value:0,label:"Без персадок"},
                    {value:1,label:"1 пересадка"},
                    {value:2,label:"2 пересадки"},
                    {value:3,label:"3 пересадки"},].map(elem => (
                    <div key={elem.value}>
                        <Form.Check
                            custom
                            type="radio"
                            name="stops"
                            id={`custom-radio-${elem.value}`}
                            value={elem.value}
                            label={elem.label}
                            onChange={this.handleChange}
                        />
                    </div>
                ))
                }
            </aside>
        )
    }
}

let mapStateToProps = (state) => ({
    filteredByStops: state.ticketsPage.filteredByStops,
})

let mapDispatchToProps = (dispatch)=>({
    setFilterTicketsByStops: (number)=> {dispatch(setFilterTicketsByStopsActionCreator(number))}
})


export default connect(mapStateToProps,mapDispatchToProps)(Sidebar);