import { ReactComponent as LoadingAnimation } from './images/loadingAnimation.svg';

//! 使用svg：先把svg图像导入为react组件，再使用它

const LoadingPage = ()=>{
    return(
        <div className="rounded-full flex justify-center items-center">
            <LoadingAnimation/>
        </div>

    )
}

export default LoadingPage;