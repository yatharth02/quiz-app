import React, { Component } from 'react';
import './FlipBook.css'

class FlipBook extends Component {
    render() {
        return (
            <div className='flip_book'>
                <input type="checkbox" id='flip_c1'/>
                <input type="checkbox" id='flip_c2'/>
                <input type="checkbox" id='flip_c3'/>
                <input type="checkbox" id='flip_c4'/>
                <input type="checkbox" id='flip_c5'/>
                <input type="checkbox" id='flip_c6'/>
                <input type="checkbox" id='flip_c7'/>
                <div className='flip_flip-book'>
                    <div className='flip_flip' id='flip_p1'>
                        <div className='flip_back'>
                            <img className='flip_image two'/>
                            <label className='flip_back-btn' for='flip_c1'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <img className='flip_image one'/>
                            <label className='flip_next-btn' for='flip_c1'>Next</label>
                        </div>
                    </div> 
                    <div className='flip_flip' id='flip_p2'>
                        <div className='flip_back'>
                            <img className='flip_image three'/>
                            <label className='flip_back-btn' for='flip_c2'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <h2>1</h2>
                            <p className='flip_p'>awesome </p>
                            <label className='flip_next-btn' for='flip_c2'>Next</label>
                        </div>
                    </div> 
                    <div className='flip_flip' id='flip_p3'>
                        <div className='flip_back'>
                            <img  className='flip_image four'/>
                            <label className='flip_back-btn' for='flip_c3'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <h2>2</h2>
                            <p className='flip_p'>awesome </p>
                            <label className='flip_next-btn' for='flip_c3'>Next</label>
                        </div>
                    </div>
                    <div className='flip_flip' id='flip_p4'>
                        <div className='flip_back'>
                            <img  className='flip_image five'/>
                            <label className='flip_back-btn' for='flip_c4'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <h2>3</h2>
                            <p className='flip_p'>awesome </p>
                            <label className='flip_next-btn' for='flip_c4'>Next</label>
                        </div>
                    </div>
                    <div className='flip_flip' id='flip_p5'>
                        <div className='flip_back'>
                            <img  className='flip_image six'/>
                            <label className='flip_back-btn' for='flip_c5'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <h2>4</h2>
                            <p className='flip_p'>awesome </p>
                            <label className='flip_next-btn' for='flip_c5'>Next</label>
                        </div>
                    </div>
                    <div className='flip_flip' id='flip_p6'>
                        <div className='flip_back'>
                            <img  className='flip_image seven'/>
                            <label className='flip_back-btn' for='flip_c6'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <h2>5</h2>
                            <p className='flip_p'>awesome </p>
                            <label className='flip_next-btn' for='flip_c6'>Next</label>
                        </div>
                    </div>
                    <div className='flip_flip' id='flip_p7'>
                        <div className='flip_back'>
                            <img  className='flip_image eight'/>
                            <label className='flip_back-btn' for='flip_c7'>Back</label>
                        </div>
                        <div className='flip_front'>
                            <h2>6</h2>
                            <p className='flip_p'>awesome </p>
                            <label className='flip_next-btn' for='flip_c7'>Next</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FlipBook;