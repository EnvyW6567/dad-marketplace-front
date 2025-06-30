import '@testing-library/jest-dom'
import {configDotenv} from "dotenv";

configDotenv()

global.fetch = vi.fn()

process.env.VITE_API_BASE_URL = process.env.API_BASE_URL
process.env.VITE_API_DARKER_DB_URL = process.env.API_DARKER_DB_URL

// Mock window.matchMedia for CSS media queries
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

beforeEach(() => {
    vi.clearAllMocks()
})