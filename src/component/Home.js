import React, {Component, useState} from 'react';
import axios from 'axios';
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


class Home extends Component {

    render(){

        return (
            <div style={{ backgroundColor: '#242526', height: "95vh"}}>
               <div className="row m-auto g-5" style={{width: "80vw" }}>
                    <div className="col-3 p-4" style={{ backgroundColor: '#3F4041'}}>
                        <h1 className='text-white fw-bold'>Welcome</h1>
                        <p className='fs-4 text-white'>Dimple Lavigne</p>
                    </div>
                    <div className="col-9 text-white">
                        <div className="p-4" style={{ backgroundColor: '#3F4041'}}>
                            <div className='row'>
                                <div className='col-1'>
                                    <div className='border' style={{width: '70px', height: '70px'}}></div>
                                </div>
                                <div className='col-11'>
                                    <h3>Live Chat</h3>
                                    <p>Real-time chatting with anyone</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="p-4 mt-3" style={{ backgroundColor: '#3F4041'}}>
                            <div className='row'>
                                <div className='col-1'>
                                    <div className='border' style={{width: '70px', height: '70px'}}></div>
                                </div>
                                <div className='col-11'>
                                    <h3>Video Call</h3>
                                    <p>Converse like never before</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        );
    }
}

export default Home;