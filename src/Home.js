import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render(){
        return(
            <div className ='home_main'>
               <div className='home_highway'></div>
                <div className='home_mount'></div>
                <div className='home_board'>
                    <p>
                        State Level Quiz Competition<br/>
                        2022<br/>
                    Dehradun - Uttarakhand<br/>
                    </p>
                </div>
                <div className='home_arrow'>
                    <img src='arrow.png'/>
                </div>
                <h4 className='home_start'><a className='home_a' href='/quiz'>START</a></h4>
                <h4 className='home_rule'><a className='home_a' href='/rules'>RULES</a></h4>
               <div className='home_car'>
                    <img src="car.png"/>
               </div>
               <div className='home_wheel'>
                        <img src='wheel.png' className='home_back'/>
                        <img src='wheel.png' className='home_front'/>
                    </div>
            </div>
        )
    }
}

export default Home;