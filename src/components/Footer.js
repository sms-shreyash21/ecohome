import React, {Component} from "react";
import './Footer.css';
class Footer extends Component {
    state = {}
    render() {
        return (
            <div className='row'>
                <p>
                    <hr />
                    &copy;&copy;{new Date().getFullYear()} Eco Home | All rights reserved 
                    {/* |
                    Terms Of Service | Privacy */}
                </p>
            </div>
        );
    }
}

export default Footer;