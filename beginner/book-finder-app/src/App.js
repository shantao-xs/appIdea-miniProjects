import React, { useState, useEffect } from 'react';
import Search from "./Search";
import ResultList from "./ResultList";
import defaultPage from './images/default.jpg';
import LoadingPage from './LoadingPage';
import Header from './Header';
import Footer from './Footer';
import GoogleBooksApiKey from './keys/keySetting';

const App = () => {
  const [searchContent,setContent] = useState('');
  const [searchType,setType] = useState('title');
  const [searchLanguage,setLanguage] = useState('en');
  const [searchResults, setSearchResults] = useState([]);
  const [startIndex,setStartIndex] = useState(0);
  const [isLoad,setLoad] = useState(false);
  const [didSearch,setDid] = useState(false);
  const [isSearching,setIsSearching]= useState(false);
  const maxResultsPerPage = 15;
  
  const API_KEY=GoogleBooksApiKey;
    

  function handleSearchTerms(){
      if(searchType==='title'){
          return searchContent;
      }else if(searchType==='author'){
          return `inauthor:${searchContent}`;
      }else if(searchType==='isbn'){
          return `isbn:${searchContent}`;
      }
  }

  //! 注意对模板字符串的使用，以及如果''的话怎么连接url左右部分
  function handleSearchLanguage(){
    if(searchLanguage!=='all'){
      return `&langRestrict=${searchLanguage}`;
    }else{
      return '';
    }
  }

  //每次点击search button就fetch一次，fetch完所有数据后再传入resultlist组件开始render
  async function fetchData() {
      try {
          //! 使用 encodeURIComponent 对搜索条件进行编码.注意这些应该在异步fetch的内部，因为url实时在变
          //* 只能根据用户每次操作“next page”来执行fetchData，而不是一次性获取全部。每次的maxResults自己设置，最多是40
          const encodedSearchTerms = handleSearchTerms();
          const ifSelectLanguage = handleSearchLanguage()
          const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${encodedSearchTerms}&startIndex=${startIndex}&maxResults=${maxResultsPerPage}&key=${API_KEY}${ifSelectLanguage}`;
          
          setTimeout(async()=>{
            const response = await fetch(searchURL);
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            const data = await response.json();
  
            //异步函数会在调用setSearchResults(data.items)不会立即更新searchResults的值，从而导致在<ResultList searchResults={searchResults}/>传入参数时传入的时空值。
            if (!data.items) {
              return;
            }

            const booksInfos = data.items.map((book,index) =>{
              
              //注意如果没有ISBN的话，在用.find前就需要排除掉
              let ISBN = 'not found'
              const ISBN_13 = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13') : null;
              const ISBN_10 = book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers.find(identifier => identifier.type === 'ISBN_10') : null;
              if(ISBN_13){
                ISBN=ISBN_13.identifier;
              }else if(ISBN_10){
                ISBN = ISBN_10.identifier;
              }
  
              //如果没有图的话，用一张404的图代替
              //在一个jsx表达式内部，已经用{}括起来了，就不需要再用{defaultPage}，这样只会传递一个object而不是正确的路径
              return({
                index: startIndex + index,
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors ? book.volumeInfo.authors : 'N/A',
                publishedDate: book.volumeInfo.publishedDate,
                ISBN: ISBN, 
                categories: book.volumeInfo.categories ? book.volumeInfo.categories : 'N/A',
                language: book.volumeInfo.language,
                rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 'no rating yet',
                ratingsCount: book.volumeInfo.ratingsCount,
                description:book.volumeInfo.description,
                image:book.volumeInfo.imageLinks?.thumbnail || defaultPage,
                link:book.volumeInfo.infoLink,
              })
              }
            )
            setSearchResults(booksInfos);
            setLoad(false);
          },500);
          
      } catch (error) {
          console.error('There was a problem with your fetch operation:', error);
      }
  }



  // 搜索时重置起始索引为 0，并执行一次fetchdata
  function handleSearch() {
    if(!searchContent.trim()){
      alert('please enter search content!');
      return;
    }
    setStartIndex(0); 
    fetchData();
    setLoad(true);
    setDid(true);
    setIsSearching(true);
  }

  //每次startIndex变化（即使用了go to next/previous时，执行一次fetchdata）
  useEffect(() => {
    fetchData(); 
  }, [startIndex]); 

  //控制前进后退
  function goToNextPage() {
    setStartIndex(startIndex + maxResultsPerPage); 
    window.scrollTo({top:0,behavior:'smooth'});
  }
  //第一页or不是第一页？
  function goToPreviousPage() {
    setStartIndex(Math.max(startIndex - maxResultsPerPage, 0)); 
    window.scrollTo({top:0,behavior:'smooth'});
  }

  //注意这里需要执行一次{handleSearch()}操作，来渲染结果
  //返回的是一个jsx元素<ResultList/>，而不是执行search的功能。每次render都会新建一个googlebooksclient对象，而不是返回search的list。
  return (
    <div>
      
      <Header />
      <div className={isSearching?'mt-2':'mt-60'}>
        <Search setContent={setContent} setType={setType} setLanguage={setLanguage} handleSearch={handleSearch} />
      </div>
      
      {!isLoad && didSearch && <ResultList searchResults={searchResults} startIndex={startIndex} goToPreviousPage={goToPreviousPage} goToNextPage={goToNextPage}/>}
      {isLoad &&  <LoadingPage />}
      <Footer/>
    </div>
  );
}

export default App;
