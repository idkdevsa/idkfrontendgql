import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {
  GrCss3,
  GrGraphQl,
  GrHtml5,
  GrJs,
  GrCafeteria,
  GrReactjs,
  GrWordpress,
  GrGithub,
  GrHeroku,
  GrAmazon,
  GrNode,
} from "react-icons/gr";
import VsCodeBreadcrumb from "./VsCodeBreadcrumb";
import history from "../../history";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactHtmlParser, { processNodes } from "react-html-parser";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

// TODO split components to files

export const RenderHtml = (val) => {
  function transform(node, index) {
    if (node.type === "tag" && node.name === "js") {
      return (
        <SyntaxHighlighter key={index} language="javascript" style={anOldHope}>
          {processNodes(node.children, transform)}
        </SyntaxHighlighter>
      );
    } else if (node.type === "tag" && node.name === "bash") {
      return (
        <SyntaxHighlighter key={index} language="bash" style={anOldHope}>
          {processNodes(node.children, transform)}
        </SyntaxHighlighter>
      );
    } else if (node.type === "tag" && node.name === "apache") {
      return (
        <SyntaxHighlighter key={index} language="apache" style={anOldHope}>
          {processNodes(node.children, transform)}
        </SyntaxHighlighter>
      );
    }
  }

  const options = {
    decodeEntities: true,
    transform,
  };

  let newHtml = `${val}`;
  return <div>{ReactHtmlParser(newHtml, options)}</div>;
};

// export const RenderBackButton = () => {
//   let location = useLocation();
//   console.log(location);
//   return (
//     <div className="flex items-center justify-center pa4">
//       <a
//         onClick={() => history.goBack()}
//         className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4"
//       >
//         <svg
//           className="w1"
//           data-icon="chevronLeft"
//           viewBox="0 0 32 32"
//           style={{ fill: "white" }}
//         >
//           <title>chevronLeft icon</title>
//           <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
//         </svg>
//         <span className="pl1 white">Back</span>
//       </a>
//     </div>
//   );
// };

export const RenderTags = (tagValues) => {
  const tags = [
    {
      tagName: "css",
      icon: <GrCss3 key="GrCss3" className="dib w2 pl1 ml3 h2 br-100 white" />,
    },
    {
      tagName: "graphql",
      icon: (
        <GrGraphQl key="GrGraphQl" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
    },
    {
      tagName: "html",
      icon: (
        <GrHtml5 key="GrHtml5" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
    },
    {
      tagName: "food",
      icon: (
        <GrCafeteria
          key="GrCafeteria"
          className="dib w2 pl1 ml3 h2 br-100 white"
        />
      ),
    },
    {
      tagName: "javascript",
      icon: <GrJs key="GrJs" className="dib w2 pl1 ml3 h2 br-100 white" />,
    },
    {
      tagName: "reactjs",
      icon: (
        <GrReactjs key="GrReactjs" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
    },
    {
      tagName: "wordpress",
      icon: (
        <GrWordpress
          key="GrWordpress"
          className="dib w2 pl1 ml3 h2 br-100 white"
        />
      ),
    },
    {
      tagName: "heroku",
      icon: (
        <GrHeroku key="GrHeroku" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
    },
    // {
    //   tagName: "pwa",
    //   icon: (
    //     <GrHeroku
    //       key="GrHeroku"
    //       className="dib w2 pl1 ml3 h2 br-100 white"
    //     />
    //   ),
    // },
    // {
    //   tagName: "apache",
    //   icon: (
    //     <GrHeroku
    //       key="GrHeroku"
    //       className="dib w2 pl1 ml3 h2 br-100 white"
    //     />
    //   ),
    // },
    {
      tagName: "aws",
      icon: (
        <GrAmazon key="GrAmazon" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
    },
    {
      tagName: "nodejs",
      icon: <GrNode key="GrNode" className="dib w2 pl1 ml3 h2 br-100 white" />,
    },
    {
      tagName: "github",
      icon: (
        <GrGithub key="GrGithub" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
      link: "https://github.com/idkdevsa",
    },
  ];

  //filter tags array by array of tag names

  const filteredTags = tags.filter((tag) => tagValues.includes(tag.tagName));
  return filteredTags.map((tag) => (
    <a key={tag.tagName} href={tag.link}>
      {tag.icon}
    </a>
  ));
};

export const MainLayout = ({ children }) => {
  return <div className="vscodemain">{children}</div>;
};

export const ContentLayout = ({ children }) => {
  return (
    <>
      <div className="vscodecontent overflow-y-scroll w-100">
        {/* <span>
          <VsCodeBreadcrumb />
        </span> */}
        {children}
      </div>
    </>
  );
};

export const HomeBlockLayout = ({ title, children }) => {
  return (
    <>
      <h1 className="f5 f4-ns fw6 tc vs-text-c">{title}</h1>
      <div className="mw9 center ph3-ns mt5">
        <div className="cf ph2-ns mt6">{children}</div>
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

export const PostCard = ({
  title,
  titleLink,
  description,
  tags,
  imgSrc,
  imgAlt,
}) => {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m mw5 center tc">
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
        <div className="f4 lh-copy measure mt2 white">{tags}</div>
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
  tags,
}) => {
  return (
    <article className="vs-content-bg">
      <div className="ph4 ph5-m ph6-l">
        <div className="pv5 f4 f2-ns measure center tc">
          <h1 className="f5 f4-ns fw6 vs-text-c">{title}</h1>
          <p className="tc f6 vs-text-2-c">{author}</p>
          <p className="tc f6 vs-text-2-c">{subtitle}</p>
          <div className="f4 lh-copy mt2 white ">{tags}</div>
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
          <div className="lh-copy measure f4 f3-ns vs-text-c baskerville">
            {content}
          </div>
        </div>
      </div>
    </article>
  );
};

export const TopBar = () => {
  return (
    <nav className="vscodetopbar db dt-l w-100 border-box v-mid vs-topbar-bg overflow-hidden">
      <div className="fl w-10">
        <Link to="/" title="Home">
          <AiOutlineHome className="dib w2  ml3 h2 br-100" alt="idkdev" />
        </Link>
      </div>
      <div className="fl w-90 db dtc-l tl-l mt2">
        <span className="vs-text-c">Jason Bolton - Web Developer</span>
        <span className="vs-text-c">
          <a href="mailto:jason@idkdev.co.za"> - Contact</a>
        </span>
      </div>
    </nav>
  );
};

export const BottomBar = () => {
  return (
    <footer className="mw-100">
      <div className="fl w-10 vs-secondary-bg">
        <p className="tc">VsCodeSkin</p>
      </div>
      <div className="fl w-90 vs-primary-bg">
        <p className="tc">"// Always under construction"</p>
      </div>
    </footer>
  );
};
