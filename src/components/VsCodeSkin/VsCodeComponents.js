import React from "react";
import { Link } from "react-router-dom";

export const RenderHtml = (val) => {
  return (
    <p
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: val,
      }}
    />
  );
};

export const MainLayout = ({ children }) => {
  return <div className="vscodemain">{children}</div>;
};

export const HomeBlockLayout = ({ title, children }) => {
  return (
    <>
      <h1 className="f5 f4-ns fw6 tc vs-text-c">{title}</h1>
      <div className="mw9 center ph3-ns">
        <div className="cf ph2-ns">{children}</div>
      </div>
    </>
  );
};

export const HomeBlock = ({ title, content }) => {
  return (
    <div className="fl w-100 w-50-ns pa2">
      <h2 className="f5 f4-ns fw6 tc vs-text-c">{title}</h2>
      <div className="pv4">{content}</div>
    </div>
  );
};

export const PostCardLayout = ({ title, children }) => {
  return (
    <>
      <h1 className="f5 f4-ns fw6 tc white">{title}</h1>
      <div className="flex flex-wrap justify-center">
        {children.map((child, index) => (
          <div key={index} className="pa3 mr2">
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export const PostCard = ({ title, titleLink, description, imgSrc, imgAlt }) => {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m mw5 center">
      <img src={imgSrc} className="db w-100 br2 br--top" alt={imgAlt} />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">
              <Link to={titleLink}>{title}</Link>
            </h1>
          </div>
        </div>
        <div className="f6 lh-copy measure mt2 white">{description}</div>
      </div>
    </article>
  );
};

/*
 *  TODO set main featured image and/or map other images
 */

export const PostLayout = ({
  title,
  subtitle,
  author,
  content,
  featuredImage,
}) => {
  return (
    <article className="vs-content-bg">
      <div className="ph4 ph5-m ph6-l">
        <div className="pv5 f4 f2-ns measure center">
          <h1 className="f5 f4-ns fw6 tc vs-text-c">{title}</h1>
          <p className="tc f6 vs-text-2-c">{author}</p>
          <p className="tc f6 vs-text-2-c">{subtitle}</p>
        </div>
        <div className="cf mw8 center">
          <div className="fl w-33 w-50-m w-33-l pr2 pr2-l">
            <div
              className="pv6 cover bg-center"
              style={{
                backgroundImage: `url(${featuredImage})`,
              }}
            ></div>
          </div>
          <div className="fl w-33 w-50-m w-33-l ph3 pr0-m ph3-l">
            <div
              className="pv6 cover bg-center"
              style={{
                backgroundImage: `url(${featuredImage})`,
              }}
            ></div>
          </div>
          <div className="fl w-33 w-100-m w-33-l pl2 pl0-m pl2-l mt4-m">
            <div
              className="pv6 cover bg-center"
              style={{
                backgroundImage: `url(${featuredImage})`,
              }}
            ></div>
          </div>
        </div>
        <div className="measure f3 center mv5 black-70">
          <p className="lh-copy measure f4 f3-ns vs-text-c baskerville">
            {content}
          </p>
        </div>
      </div>
    </article>
  );
};

export const BottomBar = () => {
  return (
    <footer className="mw-100 h1">
      <div className="fl w-10 vs-secondary-bg">
        <p className="f6 db tc">VsCodeSkin</p>
      </div>
      <div className="fl w-90 vs-primary-bg">WIP</div>
    </footer>
  );
};
