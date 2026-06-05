import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'


import Blog from '../components/Blog.jsx'
import BlogForm from '../components/BlogCreateForm.jsx'
const testBlog = {
            title: "Test Blog",
            author: "Test Author",
            url: "test url",
            likes: 2,
            user: {
                id: "test"
            }
        }
describe('Blog rendering', () => {
    
    test('Minimized blog renders only title and author', () => {
        render(
            <BrowserRouter>
                <Blog blog={ testBlog }/>
            </BrowserRouter>
        )

        screen.getByText(/Test Blog/i)
        screen.getByText(/Test Author/i)
        const urlNull = screen.queryByText('URL: test url')
        const likesNull = screen.queryByText('Likes: 2')

        expect(urlNull).toBeNull()
        expect(likesNull).toBeNull()
    })

    test('Verbose blog renders all information', async () => {
        render(
            <BrowserRouter>
                <Blog blog={ testBlog }/>
            </BrowserRouter>
        )
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        screen.getByText(/Test Blog/i)
        screen.getByText(/Test Author/i)
        screen.getByText('URL: test url')
        screen.getByText('Likes: 2')
    })

    test('No buttons when not logged in', async () => {
        render(
            <BrowserRouter>
                <Blog blog={ testBlog } userID={null}/>
            </BrowserRouter>
        )
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        screen.getByText('URL: test url')
        screen.getByText('Likes: 2')

        const likeButton = screen.queryByRole('button', { name: /Like/i })
        const deleteButton = screen.queryByRole('button', { name: /Delete/i })

        expect(likeButton).toBeNull()
        expect(deleteButton).toBeNull()
    })

    test('Only like button if not creator', async () => {
        render(
            <BrowserRouter>
                <Blog blog={ testBlog } userID={"asdwasd"}/>
            </BrowserRouter>
        )
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        expect(screen.queryByRole('button', { name: /Like/i })).toBeVisible();
        const deleteButton = screen.queryByRole('button', { name: /Delete/i })

        expect(deleteButton).toBeNull()
    })

    test('Creator also has delete button', async () => {
        render(
            <BrowserRouter>
                <Blog blog={ testBlog } userID={"test"}/>
            </BrowserRouter>
        )
        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)
        
        expect(screen.queryByRole('button', { name: /Like/i })).toBeVisible();
        expect(screen.queryByRole('button', { name: /Delete/i })).toBeVisible();
    })
})

describe('Like button works', () => {
    test('like button can be pressed', async () => {
        const mockHandler = vi.fn()
        render(
            <BrowserRouter>
                <Blog blog={ testBlog } onLike={ mockHandler } userID = {"AASDASD"}/>
            </BrowserRouter>
        )
        const user = userEvent.setup()
        const showButton = screen.getByText('show')
        await user.click(showButton)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('Blog creation', () => {
    test('form renders properly', () => {
        const mockHandler = vi.fn()
        render(<BlogForm handleSubmit={mockHandler}/>)

        const boxes = screen.getAllByRole('textbox')
        expect(boxes).toHaveLength(3)

        const createButton = screen.getByText('Create')
    })

    test('form sends submissions properly', async () => {
        const mockHandler = vi.fn()
        render(<BlogForm createBlog={mockHandler}/>)
        const user = userEvent.setup()

        const boxes = screen.getAllByRole('textbox')

        await user.type(boxes[0], 'Test title')
        await user.type(boxes[1], 'Test author')
        await user.type(boxes[2], 'Test url')

        const createButton = screen.getByText('Create')
        await user.click(createButton)
        expect(mockHandler).toHaveBeenCalledWith({
            title: 'Test title',
            author: 'Test author',
            url: 'Test url'
        })
    })
})