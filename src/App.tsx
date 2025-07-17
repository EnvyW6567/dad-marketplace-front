import {Route, Routes} from 'react-router-dom'

const HomePage = () => {
    return <div data-testid="home-page">메인 페이지</div>
}

const RegisterPage = () => {
    return <div data-testid="register-page">아이템 등록 페이지</div>
}

const MyItemsPage = () => {
    return <div data-testid="my-items-page">마이 페이지</div>
}

const NotFoundPage = () => {
    return <div data-testid="not-found-page">404 - 페이지를 찾을 수 없습니다</div>
}

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/my-items" element={<MyItemsPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}

export default App