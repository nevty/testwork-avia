import React from "react";
import {Card,Image} from "react-bootstrap";
import {convertMinsToHrs, convertToDouble, countArrivalTime} from "../../helpFunctions/convertTime";

const TicketsList = (props) => {

    let ticketsArr = props.tickets;

    if ((props.filteredByStops !== "") && ticketsArr.length) {
        const filteredByStops = +props.filteredByStops;
        ticketsArr = [...props.tickets.filter(ticket => ticket.segments[0].stops.length === filteredByStops && ticket.segments[1].stops.length === filteredByStops)];
        }

        const listItem = ticketsArr.slice(0,props.offset).map((ticket,index)=>{
        const originName = ticket.segments[0].origin;
        const destinationName = ticket.segments[1].destination;

        const originStops = ticket.segments[0].stops;
        const destinationStops = ticket.segments[1].stops;

        const originStopsString = originStops.join(", ");
        const destinationStopsString = destinationStops.join(", ");

        const originFlyDuration = ticket.segments[0].duration;
        const destinationFlyDuration = ticket.segments[1].duration;

        const originLeavingDate = new Date(ticket.segments[0].date);
        const destinationLeavingDate = new Date(ticket.segments[1].date);

        const originLeavingTime = convertToDouble(originLeavingDate.getHours(),destinationLeavingDate.getMinutes());
        const destinationLeavingTime = convertToDouble(destinationLeavingDate.getHours(),destinationLeavingDate.getMinutes());

        const originArrivalDate = countArrivalTime(originLeavingDate,originFlyDuration);
        const destinationArrivalDate = countArrivalTime(destinationLeavingDate,destinationFlyDuration);

        return (
            <Card key={index} className="mt-4 p-4 shadow-sm">
                <div className="ticket__container">
                    <div className="ticket__head row">
                        <h3 className="ticket__price col-6 text-left text-primary">{ticket.price}<span className="price__currency"> Р</span></h3>
                        <div className="ticket__ship-info col-6 text-right"><Image src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} className="" alt={ticket.carrier}/></div>
                    </div>
                    <div className="ticket__table">
                        <div className="ticket__to row">
                            <div className="table__tr col text-left">
                                <div className="ticket__headline text-secondary text-grey">
                                    {originName} - {destinationName}
                                </div>
                                <div className="table__td">
                                    {originLeavingTime} - {originArrivalDate}
                                </div>
                            </div>
                            <div className="table__tr col">
                                <div className="ticket__headline text-secondary text-grey">
                                    В пути
                                </div>
                                <div className="table__td">
                                    {convertMinsToHrs(originFlyDuration,"hm")}
                                </div>
                            </div>
                            <div className="table__tr col text-right">
                                <div className="ticket__headline text-secondary text-grey">
                                    Пересадки: {originStops.length ? originStops.length : ""}
                                </div>
                                <div className="table__td">
                                    {originStops.length ? originStopsString : "Без пересадок"}
                                </div>
                            </div>
                        </div>
                        <div className="ticket__back row">
                            <div className="table__tr col text-left">
                                <div className="ticket__headline text-secondary text-grey">
                                    {destinationName} - {originName}
                                </div>
                                <div className="table__td">
                                    {destinationLeavingTime} - {destinationArrivalDate}
                                </div>
                            </div>
                            <div className="table__tr col">
                                <div className="ticket__headline text-secondary text-grey">
                                    В пути
                                </div>
                                <div className="table__td">
                                    {convertMinsToHrs(destinationFlyDuration,"hm")}
                                </div>
                            </div>
                            <div className="table__tr col text-right">
                                <div className="ticket__headline text-secondary text-grey">
                                    Пересадки: {destinationStops.length ? destinationStops.length : ""}
                                </div>
                                <div className="table__td">
                                    {destinationStops.length ? destinationStopsString : "Без пересадок"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    });
    return (
        <>
            {listItem}
        </>
    )
}

export default TicketsList;