import './bloging.scss';
import { getAuthHeaders, isAuthorized } from '../../utils/auth_utils';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { getArticleUrl } from '../../utils/urls';
import blogClient from '../../utils/blog_client';
import { getTokenCookie } from '../../utils/cookie_manager';
import JoditEditor from 'jodit-react';

const PublishStatus = {
    NONE: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
};

function Bloging() {
    const coverId = useId();
    const [cover, setCover] = useState();
    const [coverUrl, setCoverUrl] = useState();

    const titleId = useId();
    const [title, setTitle] = useState('');

    const contentId = useId();
    const contentEditorRef = useRef();
    const [content, setContent] = useState('');

    const newTagId = useId();
    const [newTagName, setNewTagName] = useState('');

    const [tags, setTags] = useState([]);

    const categoryId = useId();
    const [category, setCategory] = useState('development');

    const [publishStatus, setPublishStatus] = useState(PublishStatus.NONE);

    async function createArticle() {
        setPublishStatus(PublishStatus.LOADING);

        if (title === '' || content === '') {
            alert("Title or content can not be empty");
            setPublishStatus(PublishStatus.NONE);
            return;
        }

        const client = await blogClient.init();
        try {
            let imageId = undefined;
            if (cover) {
                const imageResponse = await client.uploadImage(
                    {},
                    { image: cover },
                    {
                        headers: {
                            'Authorization': `Token ${getTokenCookie()}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                const image = imageResponse.data;
                imageId = image.id;
            }
            const response = await client.createArticle(
                {},
                {
                    title: title,
                    content: content,
                    tags: tags,
                    category: category,
                    cover: imageId ? imageId : undefined,
                },
                getAuthHeaders(),
            );
            setTitle('');
            setContent('');
            setTags([]);
            setPublishStatus(PublishStatus.SUCCESS);
            window.location = getArticleUrl(response.data.id);
        } catch (error) {
            console.log(error);
            alert("Could not create article: " + error);
            setPublishStatus(PublishStatus.ERROR);
        }
    }

    function addTag() {
        if (newTagName === '') {
            return;
        }
        setTags([...tags, newTagName]);
        setNewTagName('');
    }

    function onFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setCover(file);
            setCoverUrl(URL.createObjectURL(file));
        }
    }

    function onClearClick() {
        setCover(null);
        if (coverUrl) {
            URL.revokeObjectURL(coverUrl);
            setCoverUrl(null);
        }
        document.getElementById(coverId).value = null;
    }

    const config = {
        readonly: false,
        placeholder: 'Write your article...',
    };

    return (
        <section className="bloging">
            <div className="container">
                <h1 className="title title_blocks title_mb-30">Creating your own article is easy</h1>
                <p className="bloging__descr">Here, you can create your own articles, share your thoughts and ideas, and inform and educate other users. Give free rein to your creativity and experience to make this space vibrant and engaging!</p>
                <h2 className="title title_mb-30">Create article</h2>
                {isAuthorized() &&
                    <div className="form__editor">
                        <h2>Cover:</h2>
                        {cover && coverUrl &&
                            <img src={coverUrl} className="article__cover" alt='cover' />
                        }
                        <input id={coverId} onChange={onFileChange} type='file' accept='image/*' />
                        <button onClick={onClearClick}>Clear</button>
                        <input id={titleId} value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Title your article" className="editor__title" />
                        <JoditEditor
                            ref={contentEditorRef}
                            // onChange={value => setContent(value)}
                            onBlur={value => setContent(value)}
                            config={config}
                            tabIndex={1}
                            value={content}
                        />
                        {/* <textarea style={{ minHeight: '300px' }} id={contentId} value={content} onChange={e => setContent(e.target.value)} type="textarea" name="title" placeholder="Content" className="editor__title" /> */}
                        <div className="select_category">
                            <label for="categories">Select category:</label>
                            <select id={categoryId} name="categories" value={category} onChange={e => setCategory(e.target.value)} >
                                <option value="development">Development</option>
                                <option value="administration">Administration</option>
                                <option value="design">Design</option>
                                <option value="management">Management</option>
                                <option value="marketing">Marketing</option>
                                <option value="popular_science">Popular Science</option>
                            </select>
                        </div>
                        <div className="add-tag__wrapper">
                            <div className="add-teg_input">
                                <input id={newTagId} value={newTagName} onChange={e => setNewTagName(e.target.value)} type="text" name="tag" placeholder="Tag your article" className="editor__tag" />
                                <button onClick={addTag} className="button button__add-tag">+</button>
                            </div>
                            <p className="tags__info">You added the following tags:</p>
                            <div className='tags__container'>
                                {tags.map((tag, index) => <button onClick={() => setTags(tags.filter((_, i) => i !== index))} key={index} className="button button__remove-tag">#{tag}</button>)}
                            </div>
                        </div>
                        <button onClick={createArticle} className="button button__publish" {...publishStatus === PublishStatus.LOADING && 'disabled'}>publish</button>
                        {publishStatus === PublishStatus.LOADING && <p>Publishing...</p>}
                        {publishStatus === PublishStatus.SUCCESS && <p>Article published</p>}
                        {publishStatus === PublishStatus.ERROR && <p>ERROR</p>}
                    </div>
                }
                {!isAuthorized() && <p className="bloging__descr">You must be logged in to create an article</p>}
            </div>
        </section>
    )
}

export default Bloging;
