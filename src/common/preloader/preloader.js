import preloader from '../../img/loading.svg';
import React from 'react'


let Preloader = (props)=> {
    return (
        <div className="mt-4 mb-4 bg-white">
            <img src={preloader} width="70" alt=""/>
        </div>
    )
}
export default Preloader