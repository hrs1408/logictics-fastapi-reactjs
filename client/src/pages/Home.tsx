import React, { FC } from "react";
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
    </div>
  );
};

export default Home;
