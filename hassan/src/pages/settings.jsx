import { Construction } from "lucide-react";


export default function Settings(){
    return(
        <>
            <h1>Parametre </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            <div className="flex items-center justify-center w-full mt-20">
                <div className=" bg-persimmon/40 flex flex-col gap-2 p-6 px-10 justify-center w-120 items-center !text-3xl rounded-md animate-bounce ">
                    <Construction className="" size={60} /> Encore en construction....
                </div>
            </div>
        </>
    );
}