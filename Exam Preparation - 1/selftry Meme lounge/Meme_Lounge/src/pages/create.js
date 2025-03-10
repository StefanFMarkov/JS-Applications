import {html} from '../../node_modules/lit-html/lit-html.js';
import {createMeme} from "../service/data.js";
import {notify} from "../notification.js";

const createTemplate = (onSubmit) => html`
    <section @submit="${onSubmit}" id="create-meme">
        <form id="create-form">
            <div class="container">
                <h1>Create Meme</h1>
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                <label for="imageUrl">Meme Image</label>
                <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                <input type="submit" class="registerbtn button" value="Create Meme">
            </div>
        </form>
    </section>`;

export async function createPage(ctx) {

    ctx.render(createTemplate(onSubmit))

    async function onSubmit(e) {

        e.preventDefault();
        const formData = new FormData(e.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');

        try {
            if (!title || !description || !imageUrl) {
                // return alert('All fields are required');
                throw new Error('All fields are required');

            }
            await createMeme({title, description, imageUrl});

            ctx.page.redirect('/catalog');
        } catch (error) {
            notify(error.message)
        }
    }
}

