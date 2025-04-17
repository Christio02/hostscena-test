'use client'
import ImageCarousel from "@/app/components/main/ImageCarousel";
import Header from "@/app/components/main/Header";
import CustomButton from "@/app/components/menu/CustomButton";
import ButtonMenu from "@/app/components/menu/ButtonMenu";
import BrakeLine1 from "./components/brakeLines/BrakeLine1";
import H2TitleBar from "./components/titleBars/H2TitleBar";

export default function Home() {

  return (
    <>
       <Header></Header>
       <BrakeLine1></BrakeLine1>
      <ImageCarousel></ImageCarousel>
      <ButtonMenu></ButtonMenu>
      <H2TitleBar title="Festivalpass"></H2TitleBar>
      </>
  );
}
