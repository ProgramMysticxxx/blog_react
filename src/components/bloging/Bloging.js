import JoditEditor from 'jodit-react';
import './bloging.scss';


function Bloging() {
    return(
        <section className="bloging">
            <div className="container">
                <h1 className="title title_blocks title_mb-30">Creating your own article is easy</h1>
                <p className="bloging__descr">Here, you can create your own articles, share your thoughts and ideas, and inform and educate other users. Give free rein to your creativity and experience to make this space vibrant and engaging!</p>
                <h2 className="title title_mb-30">Create article</h2>
                <div className="form__editor">
                    <input type="text" name="title" placeholder="Title your article" className="editor__title"/>
                    <JoditEditor />
                    <div className="add-tag__wrapper">
                        <div className="add-teg_input">
                            <input type="text" name="tag" placeholder="Tag your article" className="editor__tag"/>
                            <button className="button button__add-tag">+</button>
                        </div>
                        <p className="tags__info">You added the following tags:</p>
                        <button className="button button__remove-tag">solid</button>
                    </div>
                    <button className="button button__publish">publish</button>
                </div>
            </div>
        </section>
    )
}

export default Bloging;