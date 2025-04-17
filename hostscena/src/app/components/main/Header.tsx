'use client'
import Image from "next/image";

export default function Header(){

    const imageURL = "/logo/Høstscena-logo-uten-ramme.svg"
    return(
        <header className="flex gap-[10px] pt-[20px] px-[20px]">
            <article className="border-[1px] border-black flex h-auto w-auto px-[18px] py-[16px] self-start"> 
                <Image src={imageURL} alt="logo som viser Høst Scena" width="165" height="73"/>
            </article>

            {/* The parent section is flex-col */}
            <section className="flex flex-col gap-[10px] w-auto">

                {/* This article might still stretch, add self-start if needed too */}
                <article className="border-[1px] border-black flex h-auto w-auto px-[18px] self-start"> 
                    <h3 className="text-h3 font-title">24.9 - 28.9 2025</h3>
                </article>

                {/* Add self-start here to prevent stretching */}
                <article className="border-[1px] border-black inline-block px-[18px] pt-[3px] pb-[4px] self-start"> 
                    <h3 className="text-h3 font-title">Ålesund</h3>
                </article>

            </section>
        </header>
    )
}