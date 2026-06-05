import { styled, Stack, Box } from '@mui/system'
import { useBlogs } from '../BlogStore'
import Blog from './Blog'
const Item = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    ...theme.applyStyles('dark', {
        backgroundColor: '#262B32',
    }),
}))

const blogList = () => {
    const blogs = useBlogs()

    return (
        <div>
            {blogs.map((blog) => (
                <Box sx={{ width: '30%', border: 1 }} key={blog.id}>
                    <Stack spacing={2}>
                        <Item>
                            <Blog blog={blog} />
                        </Item>
                    </Stack>
                </Box>
            ))}
        </div>
    )
}

export default blogList
