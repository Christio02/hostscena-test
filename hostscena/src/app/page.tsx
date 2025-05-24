'use client'
import ImageCarousel from "@/app/components/main/ImageCarousel";
import Header from "@/app/components/main/Header";
import ButtonMenu from "@/app/components/menu/ButtonMenu";
import BrakeLine1 from "./components/brakeLines/BrakeLine1";
import H2TitleBar from "./components/titleBars/H2TitleBar";
import BouncingSnake from "@/app/components/extra/BouncingSnake";
import WaveSnake from "@/app/components/extra/WaveSnake";

export default function Home() {

  return (
    <>
       <Header></Header>
       <BrakeLine1></BrakeLine1>
      <BouncingSnake></BouncingSnake>
      <ButtonMenu></ButtonMenu>
      <H2TitleBar title="Festivalpass"></H2TitleBar>
      </>
  );
}
