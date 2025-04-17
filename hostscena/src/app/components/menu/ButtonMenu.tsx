import CustomButton from "./CustomButton";
export default function ButtonMenu(){
    const buttonLables: string[] =["Billetter", "Program", "Nyheter","Om oss", "Kontakt"];
    return (

        <section className="{align-items-center w-auto flex gap-[10px] p-[20px]
        ">
            {buttonLables.map((lable: string, index: number) => (
                <CustomButton key={index} name={lable}/>
            ))}
            </section>
    )
}