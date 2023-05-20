import { useState } from 'react';
import './css/Post.css';
import axios from 'axios';

const Post = ({ post }) => {
    const [comments, setComments] = useState([]);

    const report = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/reports/post/'+post.id,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Post failed:', error);
            throw error;
        }
    };
    const react = async (react) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/posts/'+post.id+'/react', {
                reactionType: react
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Post failed:', error);
            throw error;
        }
    };
    const comment = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/posts/'+post.id+'/comment', {
                content: content
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Post failed:', error);
            throw error;
        }
    }

    const showComments = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/posts/'+post.id+'/comments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setComments(response.data.content)
            console.log(response.data.content)
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    const [reactions, setReactions] = useState([]);
    const [likes, setLikes] = useState();
    const [loves, setLoves] = useState([]);
    const [angrys, setAngrys] = useState([]);
    const [sads, setSads] = useState([]);
    const showReactions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/posts/'+post.id+'/reactions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setReactions(response.data.content)
            setLikes(reactions.filter((reaction) => reaction.reactionType==='LIKE'));
            setLoves(reactions.filter((reaction) => reaction.reactionType==='LOVE'));
            setAngrys(reactions.filter((reaction) => reaction.reactionType==='ANGRY'));
            setSads(reactions.filter((reaction) => reaction.reactionType==='SAD'));
            console.log(reactions)
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    const [content, setContent] = useState('');
    return (
        <div className="post">
            <div className="post-header">
                <h3 className="post-author">{post?.creator.firstname} {post?.creator.lastname}</h3>
                <h5>{post?.timePosted}</h5>
            </div>
            <div className="post-content">{post?.content}</div>
            <div className="post-actions">
                <>
                    <button className="post-action-button-emoji" onClick={() => react('LIKE')}>👍</button>
                    {likes?.length==0 ? <></>:<>{likes?.length}</>}
                </>
                <>
                    <button className="post-action-button-emoji" onClick={() => react('LOVE')}>💖</button>
                    {loves?.length==0 ? <></>:<>{loves?.length}</>}
                </>
                <>
                    <button className="post-action-button-emoji" onClick={() => react('ANGRY')}>😠</button>
                    {angrys?.length==0 ? <></>:<>{angrys?.length}</>}
                </>
                <>
                    <button className="post-action-button-emoji" onClick={() => react('SAD')}>😥</button>
                    {sads?.length==0 ? <></>:<>{sads?.length}</>}
                </>
                <>
                    <button className="post-action-button-report" onClick={() => report()}>Report</button>
                </>
            </div>
            <div className="comment">
                <input type="text" id='content' onChange={(e) => setContent(e.target.value)}/>
                <button className="btn" onClick={() => comment()}>Comment</button>
                <button className='btn' onClick={() => showComments()}>Show comments</button>
                <button className='btn' onClick={() => showReactions()}>Show reactions</button>
            </div>
            <div className="comments">
                {comments && comments.map((one) => (
                    <div key={one.id}>{one.creator.firstname} {one.creator.lastname}: {one.content}</div>
                ))}
            </div>
        </div>
    );
}

export default Post;