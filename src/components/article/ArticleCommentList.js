import { useEffect, useId, useMemo, useRef, useState } from "react";
import blogClient from "../../utils/blog_client";
import { formatDate } from "../../utils/date";
import { getAuthHeaders, isAuthorized } from "../../utils/auth_utils";
import iconIncognito from "../../resources/img/icons/icon-incognito.svg";
import { getProfileUrl } from "../../utils/urls";
import { takeFirstNChars } from "../../utils/string_utils";
import iconLike from '../../resources/img/icons/like-dislike/icon-illuminate-like.png';
import iconLikeActive from '../../resources/img/icons/like-dislike/icon-illuminate-like-active.png';
import iconDisLike from '../../resources/img/icons/like-dislike/icon-illuminate-dislike.png';
import iconDisLikeActive from '../../resources/img/icons/like-dislike/icon-illuminate-dislike-active.png';
import cancel from '../../resources/img/icons/icon-cancel.svg';

function ArticleCommentItem({ comment, onDelete, onReply, onRate }) {
    function onLike(e) {
        e.preventDefault();
        if (comment.your_rate === true) {
            onRate(comment, null);
        } else {
            onRate(comment, true);
        }
    }

    function onDislike(e) {
        e.preventDefault();
        if (comment.your_rate === false) {
            onRate(comment, null);
        } else {
            onRate(comment, false);
        }
    }

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
                    <div className="rate">
                        <img className="rate__like" alt="like" src={comment.your_rate === true ? iconLikeActive : iconLike} onClick={onLike} />
                        <img className="rate__dislike" alt="dislike" src={comment.your_rate === false ? iconDisLikeActive : iconDisLike} onClick={onDislike} />
                        <div className="rate__rating small">{comment.rating}</div>
                    </div>
                </div>
                <div className="comments__message">
                    <p>{comment.content}</p>
                </div>
            </div>
        </div>
    );
}

function NestedComment({ groupedComments, comment, onDelete, onReply, onRate, depth = 0 }) {
    return (
        <div style={{ paddingLeft: `${depth * 50}px` }}>
            <ArticleCommentItem
                comment={comment}
                onDelete={onDelete}
                onRate={onRate}
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
                        onRate={onRate}
                        onReply={onReply} />
                )
            }

        </div>
    );
}

function NestedComments({ comments, onDelete, onReply, onRate }) {
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
                        onRate={onRate}
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

    async function onRateComment(comment, rate) {
        if (!isAuthorized()) {
            alert("You have to login into your account to proceed this action");
            return;
        }
        const client = await blogClient.init();
        try {
            if (rate === null || rate === undefined) {
                await client.unrateComment({ id: comment.id }, {}, getAuthHeaders());
            } else {
                await client.rateComment({ id: comment.id }, {
                    is_positive: rate,
                }, getAuthHeaders());
            }

            const response = await client.getComment({ id: comment.id }, {}, getAuthHeaders());
            setComments(comments.map(e => e.id === comment.id ? response.data : e));
        } catch (error) {
            alert("Could not rate comment: " + error);
        }
    }

    return (
        <div className="container">
            <h3 className="title title_mb-50">Comments</h3>
            <div className="comments article__comments">
                {
                    comments &&
                    <NestedComments
                        comments={comments}
                        onDelete={deleteComment}
                        onReply={onReplyComment}
                        onRate={onRateComment} />
                }
            </div>
            <div className="form_comments" ref={commentFormRef}>
                {replyTo &&
                    <div className="reply_to">
                        <p className="reply_to_title">Reply to:</p>
                        <p className="reply_to_text">{replyTo.author_details?.username}: {takeFirstNChars(replyTo.content, 40)}</p>
                        <button className="button button_cancel" onClick={() => setReplyTo(null)}>
                            <img src={cancel} alt="cancel" />
                        </button>
                    </div>
                }
                <textarea id={messageId} value={message} onChange={e => setMessage(e.target.value)} type="text" name="Message" placeholder="Your Message"></textarea>
                <button onClick={submitComment} type="submit" className="button button_contact">submit</button>
            </div>
        </div>
    );
}
