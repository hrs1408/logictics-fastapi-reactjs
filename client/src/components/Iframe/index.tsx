import React from 'react'
import './index.scss'

const Iframe = () => {
  return (
    <>
      <div className="w-full flex justify-center mt-20">
        <iframe
          width="1120"
          height="630"
          src="https://www.youtube.com/embed/WEC92P-B-Rs"
        ></iframe>
      </div>
      <div className="container mx-auto ">
        <div className="wp-kh w-full text-center">
          <h2 className="text-kh inline-block pt-5 pb-0 text-[24px]">
            <div className="mt-10">
              <b className="">Khách hàng</b>
              của Nhất Tín Logistics
            </div>
          </h2>
        </div>
      </div>
    </>
  )
}

export default Iframe