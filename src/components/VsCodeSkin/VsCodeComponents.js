import React from "react";

export const PostCardLayout = (props) => {
  return (
    <div class="flex flex-wrap">
      {props.children.map((child, index) => (
        <div key={index} class="outline w-25 pa3 mr2">
          {child}
        </div>
      ))}
    </div>
  );
};

export const PostCard = ({ title, description, imgSrc, imgAlt }) => {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
      <img src={imgSrc} className="db w-100 br2 br--top" alt={imgAlt} />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{title}</h1>
          </div>
        </div>
        <div className="f6 lh-copy measure mt2 white">{description}</div>
      </div>
    </article>
  );
};

{
  /* <>
<PostCardLayout>
  {category.posts.map((post, index) => (
    <PostCard
      key={index}
      title={post.node.title}
      description={renderCardDesc(post.node.excerpt)}
      imgSrc={post.node.featuredImage.sourceUrl}
      alt={post.node.title}
    />
  ))}
</PostCardLayout>
</> */
}

// const renderCardDesc = (excerpt) => {
//     return (
//       <p
//         // eslint-disable-next-line react/no-danger
//         dangerouslySetInnerHTML={{
//           __html: excerpt,
//         }}
//       />
//     );
//   };
