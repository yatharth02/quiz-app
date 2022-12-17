import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    render(){
        return(
            <div className ='main'>
               <div className='highway'></div>
                <div className='mount'></div>
                <div className='board'>
                    <p>
                        State Level Quiz Competition<br/>
                        2022<br/>
                    Dehradun - Uttarakhand<br/>
                    </p>
                </div>
                <div className='arrow'>
                    <img src='arrow.png'></img>
                </div>
                <h4 className='start'><a href='/quiz'>START</a></h4>
                <h4 className='rule'><a href='/rules'>RULES</a></h4>
               <div className='car'>
                    <img src="car.png"></img>
               </div>
               <div className='wheel'>
                        <img src='wheel.png' className='back'></img>
                        <img src='wheel.png' className='front'></img>
                    </div>
            </div>
        )
    }
}

export default Home;