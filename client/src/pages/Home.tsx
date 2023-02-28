import React, { FC } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import Coutdown from "../components/Coutdown";
import Header from "../components/Header";
import Hotline from "../components/Hotline";
import Iframe from "../components/Iframe";
import ListDelivery from "../components/ListDelivery";
import Login from "../components/Login";

const Home: FC = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <ListDelivery />
      <Banner />
      <Coutdown />
      <Iframe />
      <Hotline />
    </div>
  );
};

export default Home;
