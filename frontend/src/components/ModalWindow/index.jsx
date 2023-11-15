function ModalWindow({active, setActive, children}){
    return(
        <div onClick={()=>setActive(false)} className={active ? "bg-black/[.4] opacity-1 fixed top-0 left-0 w-screen h-screen flex items-center justify-center" : "hidden"}>
            <div onClick={e => e.stopPropagation()} className="bg-white py-4 px-4 rounded-xl">
                {children}
            </div>
        </div>
    );
}

export default ModalWindow;