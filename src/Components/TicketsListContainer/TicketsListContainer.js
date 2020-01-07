import React from "react";
import {ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {
    getTicketsRequest,
    sortTicketsByPriceActionCreator,
    sortTicketsByDurationActionCreator,
} from "../../redux/tickets-reducer";
import {connect} from "react-redux";
import TicketsList from "../TicketsList/TicketsList";
import {compose} from "redux";
import {withTicketsFallback} from "../../hoc/withTicketsFallback";
import Preloader from "../../common/preloader/preloader";
import {throttle} from "../../helpFunctions/throttle"

class TicketsListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticketsOffest: this.props.maxSize,
        }
        this.main = React.createRef();
    }

    componentDidMount() {
        this.props.getTicketsRequest();
        window.addEventListener('scroll', throttle(this.handleScroll, 40))
    }

    handleScroll = (e) => {
        const main = this.main.current;
        const mainHeight = (main.scrollHeight + main.offsetTop);
        const mainPosition = window.innerHeight + window.pageYOffset;
        if ((mainHeight - mainPosition) === 0) {
            this.setState(prevState=>({ticketsOffest: prevState.ticketsOffest + this.props.maxSize}))
        }
    }

    handleSort = ({target}) => {
        if (this.props.sorted !== target.value) {
            if (target.value === "cheap") {
                this.props.sortTicketsByPrice();
            }

            if (target.value === "fast") {
                this.props.sortTicketsByDuration();
            }
        }
    }

    render() {
        return (
            <div>
                <ToggleButtonGroup type="radio" name="sort" className="shadow-sm w-100">
                    <ToggleButton variant="light" value="cheap" onChange={this.handleSort}>Самый дешёвый</ToggleButton>
                    <ToggleButton variant="light" value="fast" onChange={this.handleSort}>Самый быстрый</ToggleButton>
                </ToggleButtonGroup>
                <div className="Tickets__list" ref={this.main}>
                    <TicketsList tickets={this.props.tickets} offset={this.state.ticketsOffest} filteredByStops={this.props.filteredByStops} maxSize={this.props.maxSize}/>
                    {(this.props.isFetching) ? <Preloader/> : null}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    tickets: state.ticketsPage.tickets,
    filteredByStops: state.ticketsPage.filteredByStops,
    sorted: state.ticketsPage.sorted,
    maxSize: state.ticketsPage.maxSize,
    isFetching: state.ticketsPage.isFetching,
})

let mapDispatchToProps = (dispatch)=>({
    getTicketsRequest: ()=> {dispatch(getTicketsRequest())},
    sortTicketsByPrice: ()=>{dispatch(sortTicketsByPriceActionCreator())},
    sortTicketsByDuration: ()=>{dispatch(sortTicketsByDurationActionCreator())},
})

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withTicketsFallback,
)(TicketsListContainer);