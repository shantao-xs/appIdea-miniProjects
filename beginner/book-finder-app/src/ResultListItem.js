//模板字符串`${}`还是{}？如果只要插入js表达式，在jsx中（类html语言中），只需要{}；如果要综合插入变量/表达式/字符串等，则需要用模板字符串`${}`

//针对有多个作者（一个数组）的情况，用.join('xx')来连接他们。但同时要注意排查数据类型——是否是数组？
//对fetch data的处理有两处：App这里处理了是否na，然后再这里处理具体表现。最好是放在一个地方统一修改
//todo 让点击图片也能进入book details

import React, { useState } from 'react';
//relative和absolute的用法，如何让窗口浮动：谁relative，就基于谁进行浮动，而不是基于父元素
//悬浮鼠标变小手：增加cursor
//怎么做hashtag效果
//用gird和弹性布局的grid来分配每个格子的大小
//! 回调函数和直接调用：在监测到事件后，传递一个函数，而不是直接调用这个函数，直接调用这个函数会导致组件不断rerender
const ResultListItem = ({book})=>{
    const [showDescription, setShowDescription] = useState(false);

    return(
        <div className="flex flex-row justify-center items-center my-10 h-80">
            <div className="w-2/3  flex flex-row justify-center">  
                <a href={book.link} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={()=>setShowDescription(true)}
                    onMouseLeave={()=>setShowDescription(false)}>
                    <img src={book.image} className="h-72 w-48 cursor-pointer shadow-2xl shadow-gray-500"/>
                </a>         
                <div className="flex-1 ml-10 flex flex-col">
                    <h2 className="text-3xl font-medium mb-4">{book.title}</h2>
                    <div className="flex-1 text-lg my-2 justify-between relative">
                        {/**书籍信息栏*/}
                        <div className='grid grid-cols-6 gap-y-2 h-40 '>
                            <span className='col-span-1 '>author: </span>
                            <span className='col-span-2 text-gray-500'>{Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}</span>
                            <span className='col-span-1 '>published:</span>
                            <span className='col-span-2 text-gray-500'>{book.publishedDate}</span>
                            <span className='col-span-1'>language:</span>
                            <span className='col-span-2 text-gray-500'>{book.language}</span>
                            <span className='col-span-1'>ISBN:</span>
                            <span className='col-span-2 text-gray-500'>{book.ISBN}</span>
                            <div className="col-span-3">
                                <p>rating: {book.rating}{book.ratingsCount?
                                    <span className="text-gray-500 italic">
                                        /5 (rating by {book.ratingsCount} {book.ratingsCount>1?'readers':'reader'})
                                    </span>
                                    : null}</p>
                            </div>
                            <div className="col-span-3">
                                <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-500 mr-2">categories: {Array.isArray(book.categories)? book.categories.join(',') : book.categories}</p>
                            </div>
                        </div>
                        <div 
                            className="absolute top-0 left-0 pr-6 h-40 bg-white text-gray-600 rounded "
                            style={{ display: showDescription ? 'block' : 'none' }}
                            onMouseEnter={() => setShowDescription(true)}
                            onMouseLeave={() => setShowDescription(false)}
                        >
                            <p style={{ 
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 6}}
                            className="italic text-base"
                            >
                            description: {book.description? book.description : 'no description yet'}
                            </p>
                        </div>
                    </div>
                    <a href={book.link} target="_blank" rel="noopener noreferrer"
                            className="text-base  bg-green-500 hover:bg-green-700 text-white font-bold
                                       py-2 w-32 text-center rounded">
                        book details
                    </a>
                    
                </div> 
            </div>

        </div>
    )
}
export default ResultListItem;