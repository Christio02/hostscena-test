import {name, email, phone, jobTitle} from '@/mockdata/text';
import {FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";

export default function ContactBox() {

    return (
        <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col py-[20px] px-[40px] border border-secondary items-center min-w-[300px] text-h5">
    <p className="font-bold">{name}</p>
            <p>{jobTitle}</p>
            <p>{email}</p>
            <p>{phone}</p>
        </div>
    <div className="flex gap-[20px] justify-center items-center ">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={48} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={48} />
        </a>
    </div>
    </div>
    );
}