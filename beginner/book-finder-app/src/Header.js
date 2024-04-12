//! 对行内元素a，要改成block，才能够施加text-center和margin等的正常效果
const Header = ()=>{
    return(
        <div className="w-full  flex flex-col justify-center items-center">
            <div className="bg-green-600 w-full ">
                <a href='/' className=" block text-white  text-center text-6xl font-extrabold py-6">
                    Book Searcher
                </a>
            </div>
            <p className=" text-green-600 my-4 italic">Search the world's most comprehensive index of full-text books.</p>
        </div>
    )
}

export default Header;