import Image from "next/image";
const logo = '/assets/images/logo/logo_no_border.svg'

export default function HomeHeader() {
    return (
        <header className="flex items-center px-[20px] pb-[20px]">
            <div className="flex py-[20px] border-b border-secondary w-full gap-[10px]">
            <Image
                src={logo}
                alt="Logo"
                width={255}
                height={0}
                className="h-full border-secondary border-[1px] phone:px-[18px] phone:py-[17px] phone:w-[255px] px-[12.2px] py-[11.6px] mobile:w-[175px] w-[165px]"
            />
                <div className="font-wittgenstein phone:text-[40px] text-[30px] phone:gap-[10px] flex flex-col justify-between w-full mobile:w-auto">
                    <p className="text-nowrap phone:text-[40px] mobile:text-[25px] text-[23px] phone:px-[15px] px-[13px] phone:py-[3px] border border-secondary">  24.9 - 28.9
                        <span className="hidden mobile:inline"> 2025</span></p>
                    <p className="phone:text-[40px] mobile:text-[29px] text-[27px] phone:px-[15px] px-[12px] pt-[5px] phone:py-[3px] border border-secondary mobile:w-fit">
                        Ålesund
                    </p>
                </div>
            </div>
        </header>
    );
}