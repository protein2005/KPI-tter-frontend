import React from 'react';
import Post from './Post';

function PopularPosts({ posts }) {
  return (
    <section className="mb-5">
      <h3 className="mb-4">Останні пости</h3>
      <div className="row g-3">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4">
            <Post post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularPosts;
