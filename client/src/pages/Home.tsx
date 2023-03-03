import React, { FC } from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import Login from "../components/Login";

const Home: FC = () => {
  return (
    <div>
      <Header />
      <Carousel />
    </div>
  );
};

export default Home;
