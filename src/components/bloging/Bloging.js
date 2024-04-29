import JoditEditor from 'jodit-react';
import './bloging.scss';
// import RichTextEditor from '../editor/RichTextEditor';


function Bloging() {
    return(
        <section className="bloging">
            <div className="container">
                <h1 className="title title_blocks title_mb-30">Creating your own article is easy</h1>
                <p className="bloging__descr">Here, you can create your own articles, share your thoughts and ideas, and inform and educate other users. Give free rein to your creativity and experience to make this space vibrant and engaging!</p>
                <h2 className="title title_mb-30">Create article</h2>
                <div className="form editor__form" style={{flexDirection: 'column', width: '100%', height: '500px'}}>
                    <input type="text" name="title" placeholder="Title your article" className="editor__title"/>
                    {/* <RichTextEditor/> */}
                    <JoditEditor />
                </div>
            </div>
        </section>
    )
}

export default Bloging;