import {html} from '../../node_modules/lit-html/lit-html.js';
import {getMemes} from "../service/data.js"


const catalogTemplate = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            <!-- Display : All memes in database ( If any ) -->
            ${memes.length === 0 ? html` <p class="no-memes">No memes in database.</p>` :
                    memes.map(memeTemplateSolo)
            }
            <!-- Display : If there are no memes in database -->

        </div>
    </section>
`;

const memeTemplateSolo = (meme) => html`
    <div id="memes">
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${meme.title}</p>
                    <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${meme._id}">Details</a>
                </div>
            </div>
        </div>
`;

export async function catalogPage(ctx) {
    const memes = await getMemes();
    ctx.render(catalogTemplate(memes));
}