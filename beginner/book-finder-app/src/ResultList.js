import ResultListItem from "./ResultListItem";
//注意用箭头函数时的传参方式：要用{variable}来传递
//! 确保异步fetch的重点在这里！Array.isArray(searchResults) && searchResults.length > 0，确保非空之后，再进行map
//*如果跨组件出现数据错误比如不是数组，两边都要console.log检查
//* 怎么让justify between只有一个元素的时候靠右显示：设置ml-auto（marign left auto放在父元素的最右）
//前进后退时怎么让网页从头开始？window.scrollTo
const ResultList = ({searchResults,startIndex,goToPreviousPage,goToNextPage}) => {
    return(
        <div className="w-screen flex flex-col  justify-center items-center ">
            {Array.isArray(searchResults) && searchResults.length > 0 ? (
                <ul>
                {searchResults.map(book=>{
                    return(
                        <li key={book.index}>
                            <ResultListItem book={book}/>
                        </li>
                    )
                })}
            </ul>
            ):(
                <p>not found</p>
            )}
            
            <div className="w-1/2 mt-10 mb-16 flex justify-between ">
                {startIndex!==0 && 
                    <button onClick={goToPreviousPage}
                        className="text-base  bg-green-500 hover:bg-green-700 text-white font-bold
                        py-2 w-32 flex text-center rounded"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <span className="mx-2">Last Page</span>
                    </button>
                }
                <button onClick={goToNextPage}
                        className="text-base  bg-green-500 hover:bg-green-700 text-white font-bold
                        py-2 w-32 flex text-center rounded ml-auto"
                >
                    <span className="mx-2">Next Page</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
  
  export default ResultList;