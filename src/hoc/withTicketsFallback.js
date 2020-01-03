import React from 'react'
import {connect} from "react-redux";
import errorFace from "../img/error_face.svg"

let mapStateToPropsForFilter = (state)=> ({
    ticketsErrorResponse: state.ticketsPage.ticketsErrorResponse,
})

export const withTicketsFallback = (Component)=> {
    class FallbackComponent extends React.Component {
        render() {
            if (this.props.ticketsErrorResponse == null) {
                return (
                    <div className="fallback vh-100 bg-white">
                        <div className="fallback__message">
                            <img src={errorFace} width="60" alt=""/>
                            <h4>Something went wrong,<br/>
                                Try refresh the page
                            </h4>
                        </div>
                    </div>
                )
            }
            return <Component {...this.props}/>
        }
    }
    return connect(mapStateToPropsForFilter)(FallbackComponent)
}