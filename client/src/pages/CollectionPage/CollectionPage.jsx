import React, {useEffect, useState} from 'react';
import { API } from "../../shared/services/api";
import './CollectionPage.scss';
import VinylItem from "../../shared/components/VinylItem/VinylItem";

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

    const deleteVinyl = (index) => {
        const vinyl = [...myCollection];
        vinyl.splice(index, 1);
        setMyCollection(vinyl);

        API.delete("/vinyls")
        .then((res) => {
            console.log(res)
        })
    }

    return(
        <div className="c-mycollection">
            {myCollection.map((vinyl, i) => <VinylItem key={i} index={i} info={vinyl} 
            fnDeleteVinyl={deleteVinyl}/>)}
        </div>
    )
}
