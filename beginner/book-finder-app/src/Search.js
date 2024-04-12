//用useState来存储要用的变量（input文本，search的类型），
//! 因为usestate异步，所以不能通过console.log看到即时的效果，要监测的话就用useEffect
// 数据获取操作一般要放在层级高的组件里，app负责获取数据，resultlist只负责展示搜索结果
//input：怎么回车也能触发sumbit的效果？

const Search = (props) => {
    const {setContent,setType,setLanguage,handleSearch}=props;
    function handleSearchContent(e){
        const content = e.target.value;
        setContent(content);
    }

    function handleType(e){
        const type = e.target.value;
        setType(type);
    }

    function handleLanguage(e){
      const lan = e.target.value;
      setLanguage(lan);
    }

    function handleKeyDown(e){
      if(e.keyCode===13){
        handleSearch();
      }
    }

    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="container flex justify-center items-center w-1/2">
          <input 
              type="text" placeholder="input bookname/author/ISBN here" 
              onChange={handleSearchContent}
              onKeyDown={handleKeyDown}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-400 focus:shadow-lg"
            />
          <select 
            id="select-type" onChange={handleType} 
            className="mx-2  bg-green-100 rounded 
                       hover:bg-green-400 
                       focus:outline-none focus:border-green-400 py-2">
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="isbn">ISBN</option>
          </select>
          <select 
            id="select-language" onChange={handleLanguage}
            className="bg-green-100 hover:bg-green-400 rounded py-2">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ch">中文</option>
              <option value="all">unlimited</option>
          </select>
        </div>
          
        
        <button 
            onClick={handleSearch}
            className=" bg-green-500 hover:bg-green-700 text-white font-bold my-12 py-2 px-4 rounded">
            Search it!
          </button>
        
       
      </div>
    );
  }
  
  export default Search;