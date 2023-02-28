import React, { FC } from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import ListDelivery from "../components/ListDelivery";
import Login from "../components/Login";

const Home: FC = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <ListDelivery />
      <Banner />
    </div>
  );
};

export default Home;
