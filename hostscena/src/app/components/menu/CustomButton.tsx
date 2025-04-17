import { buttonInterface } from "@/app/interface/buttoninterface";

export default function CustomButton({name}: buttonInterface){

    return(
        <>
            <button className="flex font-title text-h3 border w-auto h-auto px-[10px] hover:bg-black hover:text-white">{name}</button>
        </>
    )
}