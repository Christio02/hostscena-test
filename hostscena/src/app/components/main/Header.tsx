'use client'
import Image from "next/image";

export default function Header(){

    const imageURL = "/logo/Høstscena-logo-uten-ramme.svg"
    return(
        <header className="flex gap-3 p-6">
            <article className="border-[1.5px] border-black flex items-center px-4 justify-start text-start h-40 w-75">
                <Image src={imageURL} alt="logo som viser Høst Scena" width="300" height="40"/>
            </article>

            <section className="flex flex-col gap-4 w-full">

                <article className="border-[1.5px] border-black flex-grow px-2 w-2/7 flex items-center text-center ">
                    <h3 className="text-4xl font-title">24.9 - 28.9 2025</h3>
                </article>

                <article className="border-[1.5px] border-black flex-grow px-2 w-1/7 flex items-center text-center">
                    <h3 className="text-4xl font-title">Ålesund</h3>
                </article>

            </section>
        </header>

    )
}