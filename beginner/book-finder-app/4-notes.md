1. Search组件，主页只有search，enter后挪到最上方仍然可以执行功能
    抓取用户input的文本，根据用户的选项 search by titles/authors/isbn来执行不同范围的搜索
2. GoogleBooksClient组件，与google books api进行交互，根据search组件的搜索条件，fetch .JSON数据（异步获取），把result arrays传给BookItemsList组件
    - bonus：对返回结果根据相关性进行排序
3. BookItemsList组件，用来呈现返回的文本list
4. BookItem每一条书目，都包括：书的照片，标题，作者，发布时间，google链接等

使用tailwindcss
根据说明安装https://tailwindcss.com/docs/installation
创建input.css，安装并获得output.css，在html中可以使用<link href="./output.css" rel="stylesheet">了
在index.js里import './output.css';

用Tailwind CSS IntelliSense辅助自动填充tailwind配置