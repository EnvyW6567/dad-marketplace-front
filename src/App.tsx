// src/App.tsx
import {Route, Routes} from 'react-router-dom'
import {Layout} from "./components/Layout"
import SearchPage from './pages/SearchPage'
import RegisterPage from './pages/RegisterPage'

const HomePage = () => {
    return <div data-testid="home-page">메인 페이지</div>
}

const MyItemsPage = () => {
    return <div data-testid="my-items-page">마이 페이지</div>
}

const NotFoundPage = () => {
    return <div data-testid="not-found-page">404 - 페이지를 찾을 수 없습니다</div>
}

const CallbackPage = () => {
    return <div>call-back page</div>
}

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/my-items" element={<MyItemsPage/>}/>
                <Route path="/auth/call-back" element={<CallbackPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Layout>
    )
}

export default App