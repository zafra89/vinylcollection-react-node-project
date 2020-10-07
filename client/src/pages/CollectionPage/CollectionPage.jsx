import React, {useEffect, useState} from 'react';
import { API } from "../../shared/services/api";
import './CollectionPage.scss';

export default function CollectionPage() {

    const [myCollection, setMyCollection] = useState([])

    useEffect(() => {
        API.get("/vinyls/mycollection")
            .then((res) => {
                console.log(res);
                setMyCollection(res.data);
                /*window.location.href = "/register-confirmation";*/
            });
    }, []);

    return(
        <div className="c-mycollection">
            {myCollection.map((item, i) => <div className="c-mycollection__vinyl" key={i}>
                <img src={item.cover} className="c-mycollection__vinyl__img" alt=""/>
                <p className="c-mycollection__vinyl__info">{item.album} - {item.artist} ({item.year})</p>
                {/*<p>{item.genre}</p>*/}
            </div>)}
        </div>
    )
}
