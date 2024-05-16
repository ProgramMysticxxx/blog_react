import { useEffect, useId, useMemo, useRef, useState } from "react";
import blogClient from "../../utils/blog_client";
import { formatDate } from "../../utils/date";
import { getAuthHeaders, isAuthorized } from "../../utils/auth_utils";
import iconIncognito from "../../resources/img/icons/icon-incognito.svg";
import { getProfileUrl } from "../../utils/urls";
import { takeFirstNChars } from "../../utils/string_utils";

function ArticleCommentItem({ comment, onDelete, onReply }) {
    return (
        <div className="comments__comment" style={{ paddingBottom: '20px' }}>
            <div className="comments__imgbox">
                <img src={comment.author_details?.avatar_url ?? iconIncognito} alt="inkognito" className="comments__img" />
            </div>
            <div className="comments__content">
                <a href={getProfileUrl(comment.author_details?.username)} className="comments__username">@{comment.author_details?.username}</a>
                <div className="comments__content__wrapper">
                    <div className="comments__date">{formatDate(comment.created_at)}</div>
                    <div className="comments__reply" onClick={() => onReply(comment)}>Reply</div>
                    {comment.is_your_comment && <div className="comments__delete" onClick={() => onDelete(comment)}>Delete</div>}
                </div>
                <div className="comments__message">{comment.content}</div>
            </div>
        </div>
    );
}

function NestedComment({ groupedComments, comment, onDelete, onReply, depth = 0 }) {
    return (
        <div style={{ paddingLeft: `${depth * 50}px` }}>
            <ArticleCommentItem
                comment={comment}
                onDelete={onDelete}
                onReply={onReply} />
            {/* {
                groupedComments[comment.id] &&
                groupedComments[comment.id].length > 0 &&
                <hr className="divider" />
            } */}
            {
                groupedComments[comment.id] &&
                groupedComments[comment.id].map(comment =>
                    <NestedComment
                        depth={depth + 1}
                        groupedComments={groupedComments}
                        comment={comment}
                        onDelete={onDelete}
                        onReply={onReply} />
                )
            }

        </div>
    );
}

function NestedComments({ comments, onDelete, onReply }) {
    const groupedComments = useMemo(() => {
        const m = {};
        comments.forEach((comment) => {
            if (!m[comment.reply_to]) {
                m[comment.reply_to] = [];
            }
            m[comment.reply_to].push(comment);
        });
        return m;
    }, [comments]);
    return (
        <>
            {
                groupedComments[null] &&
                groupedComments[null].map(comment => {
                    return <NestedComment
                        comment={comment}
                        groupedComments={groupedComments}
                        onDelete={onDelete}
                        onReply={onReply} />;
                }
                )
            }
        </>
    );
}


export default function ArticleCommentList({ article_id }) {
    const commentFormRef = useRef();
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null);

    async function fetchComments() {
        const client = await blogClient.init();
        try {
            const response = await client.getComments({
                article__id: article_id,
                ordering: '-created_at',
            }, {}, getAuthHeaders(),);
            setComments(response.data.results);
        } catch (error) {
            alert("Coult not fetch comments: " + error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    const messageId = useId();
    const [message, setMessage] = useState('');

    async function submitComment() {
        if (!isAuthorized()) {
            alert("You must be logged in to comment");
            return;
        }

        if (message.length <= 0) {
            alert("Message cannot be empty");
            return;
        }

        const client = await blogClient.init();
        try {
            const response = await client.createComment({}, {
                article: article_id,
                reply_to: replyTo?.id ?? undefined,
                content: message,
            }, getAuthHeaders());
            setComments([response.data, ...comments]);
            setMessage('');
            setReplyTo(null);
        } catch (error) {
            alert("Coult not submit comment: " + error);
        }
    }

    async function deleteComment(comment) {
        if (!window.confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        setComments(comments.filter(e => e.id !== comment.id && e.reply_to !== comment.id));
        const client = await blogClient.init();
        try {
            client.deleteComment({ id: comment.id }, {}, getAuthHeaders());
        } catch (error) {
            console.error(error);
            alert("Could not delete comment.");
        }
    }

    function onReplyComment(comment) {
        setReplyTo(comment);
        commentFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="container">
            <div className="comments article__comments">
                <h3 className="title title_mb-50">Comments</h3>
                {
                    comments &&
                    <NestedComments
                        comments={comments}
                        onDelete={deleteComment}
                        onReply={onReplyComment} />
                }
            </div>
            <div className="form_comments" ref={commentFormRef}>
                {replyTo &&
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}>
                        <b>Reply to:</b>
                        <p>{replyTo.author_details?.username}: {takeFirstNChars(replyTo.content, 40)}</p>
                        <button onClick={() => setReplyTo(null)}>X</button>
                    </div>
                }
                <textarea id={messageId} value={message} onChange={e => setMessage(e.target.value)} type="text" name="Message" placeholder="Your Message"></textarea>
                <button onClick={submitComment} type="submit" className="button button_contact">submit</button>
            </div>
        </div>
    );
}
