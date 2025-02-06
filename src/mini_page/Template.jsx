import React from 'react'
import Template_img from '../Components/CarouselComponent'

export default function Template() {
    return (
        <div>
            <div className="container-fulid mt-5">
                <h5 style={{ textAlign: "center" ,fontSize:"50px",padding:"20px", margin:"20px 0 0px 0"}}>Web Templates</h5>
                <h6 style={{ textAlign: "center",padding:"10px" }}>Browse our selection of free responsive HTML Templates</h6>
                <Template_img />
            </div>
        </div>
    )
}
