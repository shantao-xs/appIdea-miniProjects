# HZ-HIKING-FINDER-APP

**Tier:** 4-innovate

An application designed to gather the latest hiking activities in Hangzhou.

## Technical Implementation
- frontend: 
    - tech stack: HTML, CSS, TypeScript, React + Vite
    - UI: Tailwind
- backend: 
    - tech stack: Python Scrapy, Node.js
    - database: MongoDB
- API design: 
    - RESTful API(for communication between frontend & backend)

## User Profiling
- Target Audience:
    - Beginner hikers who are interested in short diastance day-hike.
    - Hikers willing to join a hiking-group organized by tour operators.

## User Stories
-   [ ] User can see a dashboard showing hiking activity statistics in 'Homepage'
    - Weekly stastics(data in this week)
    - All statistics (data started from: 2023-01-01)
-   [ ] User can review weekly latest hiking activities in 'Latest Activities' through a message stream
-   [ ] User can check previous activities in 'History Activities'
-   [ ] All information are collected from 3 wechat official accounts('杭州精灵户外','杭州远行户外'，'周末去哪儿玩')

## Bonus features
- User can create an account and add favored activities to 'my favorite'
- User can report errors in activity information using the 'error report' feature

## Triple Bonus features
-   [ ] Users can post and response to each other's hiking invitation and activities

## Useful links and resources

-   [crawl data with scrpy and mongodb](https://realpython.com/web-scraping-with-scrapy-and-mongodb/)
-   [crawl data from wechat official account](https://zhuanlan.zhihu.com/p/379062852)
-   [introduction to web crawling](https://crifan.github.io/crawl_your_data_spider_technology/website/spider_intro/)
