import { useState } from 'react';
import './css/NewPost.css';
import axios from 'axios';

const NewPost = () => {
    const [placeholderText, setPlaceholderText] = useState('Write your post...');
    const getRandomQuote = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response;
            console.log(quote);
            setPlaceholderText('"' + quote.data.content + '"' + '-' + quote.data.author);
        } catch (error) {
            console.error('Failed to fetch quote:', error);
        }
    };
    const post = async () => {
        const text = document.getElementById('text').value;
        try {
          const response = await axios.post('http://localhost:8080/api/v1/posts', {
            content: text,
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

      
      
    return (
        <div className="new-post">
            <div>
                <h2>Create New Post</h2>
                <textarea
                    value={placeholderText}
                    placeholder={placeholderText}
                    onChange={(e) => setPlaceholderText(e.target.value)}
                    rows={4}
                    id='text'
                ></textarea>
                <div className="btn-container">
                    <button className='btn' onClick={() => getRandomQuote()}>Quote generator</button>
                    <button className='btn' onClick={() => post()}>Post</button>
                    
                </div>
            </div>
        </div>
    );
}

export default NewPost;