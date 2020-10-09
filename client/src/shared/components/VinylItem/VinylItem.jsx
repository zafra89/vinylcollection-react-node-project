import React from 'react';
import './VinylItem.scss';

export default function VinylItem(props) {

    return(
        <div className="c-vinyl">
            <img src={props.info.cover} className="c-vinyl__img" alt=""/>
            <p className="c-vinyl__info">{props.info.album}</p>
            <button onClick={() => props.fnDeleteVinyl(props.index)}>X</button>
        </div>
    )
}
