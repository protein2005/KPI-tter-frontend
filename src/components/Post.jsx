import React from 'react';

function Post({ post }) {
  return (
    <div key={post.id} className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{post.author.full_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            @{post.author.username} • {new Date(post.created_at).toLocaleString('uk-UA')}
          </h6>
          <p className="card-text mt-3">{post.content}</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <span>Лайків: {post.likes}</span>
          <button className={`btn btn-sm ${post.is_liked ? 'btn-danger' : 'btn-outline-danger'}`}>
            {post.is_liked ? 'Забрати лайк' : 'Лайк'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
