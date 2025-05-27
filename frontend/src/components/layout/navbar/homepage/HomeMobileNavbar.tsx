import {navLinks} from "@/constants/navigation";
import Link from "next/link";

export default function HomeMobileNavbar() {
    return (
        <div className="tablet:hidden block px-[20px] py-[20px]">
    <div className="flex flex-col items-center gap-[10px] border-y border-secondary py-[20px] px-[20px]">
        {navLinks
            .filter((link) => link.label.toLowerCase() !== 'hjem')
            .map(({ label, href }) => (
                <Link
                    key={href}
                    href={href}
                    className="w-full text-center border-[1px] border-secondary text-button hover:bg-secondary hover:text-primary"
                >
                    {label}
                </Link>
            ))}
    </div>
        </div>
    );
}