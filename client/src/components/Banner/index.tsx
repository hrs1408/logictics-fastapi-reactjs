import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className="container mx-auto">
            <Link className='' to={'/'}>
                <img src="https://ntlogistics.vn/images/img/banner.png" alt="" />
            </Link>
        </div>
    )
}

export default Banner