import React from 'react';
import './UserMenuPage.scss';
import {Link} from "react-router-dom";
import './UserMenuPage.scss';

export default function UserMenuPage() {

    const logOut = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    return(
        <div className="c-usermenu">
            <div className="c-usermenu__mycollection__div usermenu-btndiv">
                <Link to="/collection"><button className="usermenu-btn c-usermenu-mycollection__div__btn">My Collection</button></Link>
            </div>
            <div className="c-usermenu__wishlist__div usermenu-btndiv">
                <Link to="/wishlist"><button className="usermenu-btn c-usermenu__wishlist__div__btn">My Wishlist</button></Link>
            </div>
            <div className="c-usermenu__addvinyl__div usermenu-btndiv">
                <Link to="/add-vinyl"><button className="usermenu-btn c-usermenu__addvinyl__div__btn">Add Vinyl to Collection</button></Link>
            </div>
            <div className="c-usermenu__addtowishlist__div usermenu-btndiv">
                <Link to="/wishlist-form"><button className="usermenu-btn c-usermenu__addtowishlist__div">Add vinyl to Wishlist</button></Link>
            </div>
            <div className="c-usermenu__myprofile__div usermenu-btndiv">
                <Link to="/profile"><button className="usermenu-btn c-usermenu__myprofile__div_btn">My Profile</button></Link>
            </div>
            <div className="c-usermenu__logout__div usermenu-btndiv">
                <button onClick={logOut} className="usermenu-btn c-usermenu__logout__div_btn">LogOut</button>
            </div>
        </div>
    )
}
