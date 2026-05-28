import { test, expect } from '@playwright/test';

const backendBaseAPI = 'http://localhost:3003/api'

const firstUser = {
    name: 'Testing User',
    username: 'Tester',
    password: 'testPassword'
}

const secondUser = {
    name: 'Second',
    username: 'Second',
    password: 'secondPassword'
}


const loginHelper = async ({ username, password, page }) => {
    await page.getByRole('link', { name: /login/i }).click();
    await page.getByLabel('username').fill(username);
    await page.getByLabel('password').fill(password);

    await page.getByRole('button', {name: 'login'}).click();
}

const createBlogHelper = async ({ title, author, url, page }) => {
    await page.getByRole('link', { name: /new blog/i }).click();
    await page.getByLabel('Title:').fill(title);
    await page.getByLabel('Author:').fill(author);
    await page.getByLabel('Url:').fill(url);

    await page.getByRole('button', { name: /Create/i }).click();
};

test.describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post(backendBaseAPI+'/testing/reset')
        await request.post(backendBaseAPI+'/user', {
            data: {
                name: firstUser.name,
                username: firstUser.username,
                password: firstUser.password
            }
        })

        await request.post(backendBaseAPI+'/user', {
            data: {
                name: secondUser.name,
                username: secondUser.username,
                password: secondUser.password
            }
        })


        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        await page.getByRole('link', { name: /login/i }).click();
        await expect(page.getByLabel('username')).toBeVisible();
        await expect(page.getByLabel('password')).toBeVisible();

        await expect(page.getByRole('button', {name: 'login'})).toBeVisible();
    })
    test.describe('Login', () => {
        test('Login succeeds', async ({ page }) => {
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })

            await expect(page.getByText(/logged in as: Testing User/i)).toBeVisible();
            await expect(page.getByRole('button', { name: 'new blog' }));
        })

        test('Login fails with wrong credentials', async ({ page }) => {
            await loginHelper({ username: 'wrong', password: 'wrong', page: page })

            await expect(page.getByText(/Wrong username or password/i)).toBeVisible();
        })

        test('User can logout', async ({ page }) => {
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })

            await page.getByRole('button', { name: 'Log out' }).click();

            await expect(page.getByRole('link', { name: /login/i })).toBeVisible();
        })
    })

    test.describe('When logged in', () => {
        test('Can create a blog', async ({ page }) => {
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })
            await createBlogHelper({ title: "test blog", author: "test author", url: "wasd", page: page })

            await expect(page.getByText('Saved blog: test blog. Author: test author')).toBeVisible();
            await expect(page.getByRole('link', { name: /test blog/i })).toBeVisible();
        })

        test('Show button works', async ({ page }) => {
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })
            await createBlogHelper({ title: "test blog", author: "test author", url: "wasd", page: page })

            await page.getByRole('button', { name: 'show' }).click();

            await expect(page.getByText(/Likes: 0/i)).toBeVisible();
            await expect(page.getByText(/URL: wasd/i)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Like' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'hide' })).toBeVisible();
        })

        test('Blog can be liked', async ({ page }) => {
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })
            await createBlogHelper({ title: "test blog", author: "test author", url: "wasd", page: page })

            await page.getByRole('button', { name: 'show' }).click();
            await page.getByRole('button', { name: 'Like' }).click();
            await expect(page.getByText(/Likes: 1/i)).toBeVisible();
        })

        test('Blog can be deleted', async ({ page }) => {

            page.on('dialog', async dialog => {
                await dialog.accept(); 
            });
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })
            await createBlogHelper({ title: "test blog", author: "test author", url: "wasd", page: page })

            await page.getByRole('button', { name: 'show' }).click();
            await page.getByRole('button', { name: 'Delete' }).click();

            await expect(page.getByText('Deleted Blog')).toBeVisible();
            await expect(page.getByText(/test blog/i)).not.toBeVisible();
        })

        test('Only creator can delete', async ({ page }) => {
            page.on('dialog', async dialog => {
                await dialog.accept(); 
            });
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })
            await createBlogHelper({ title: "test blog", author: "test author", url: "wasd", page: page })
            await page.getByRole('button', { name: 'Log out' }).click();
            await loginHelper({ username: secondUser.username, password: secondUser.password, page: page })

            await page.getByRole('button', { name: 'show' }).click();
            await expect(page.getByText(/Likes: 0/i)).toBeVisible();
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible();
        })

        test('Blogs are ordered by likes', async ({ page }) => {
            await loginHelper({ username: firstUser.username, password: firstUser.password, page: page })
            await createBlogHelper({ title: "AlphaBlog", author: "blog", url: "wasd", page });
            await createBlogHelper({ title: "OmegaBlog", author: "blog", url: "wasd", page });
            const alphaBlog = page.locator('.blog-card', { hasText: 'AlphaBlog' });
            const omegaBlog = page.locator('.blog-card', { hasText: 'OmegaBlog' });
            await page.locator('.blog-card').first().waitFor();

            let titles = await page.locator('.blog-card').allTextContents();
            expect(titles[0]).toContain('AlphaBlog');
            expect(titles[1]).toContain('OmegaBlog');

            await omegaBlog.getByRole('button', { name: 'show' }).click();
            await omegaBlog.getByRole('button', { name: 'like' }).click();
            await expect(omegaBlog.getByText(/Likes: 1/i)).toBeVisible();
            await omegaBlog.getByRole('button', { name: 'hide' }).click();

            titles = await page.locator('.blog-card').allTextContents();
            expect(titles[0]).toContain('OmegaBlog');
            expect(titles[1]).toContain('AlphaBlog');
        })
    })
})