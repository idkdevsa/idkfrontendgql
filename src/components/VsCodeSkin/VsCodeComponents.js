import React from "react";
import { Link } from "react-router-dom";
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
  GrLinkedin,
} from "react-icons/gr";
import SyntaxHighlighter from "react-syntax-highlighter";
import ReactHtmlParser, { processNodes } from "react-html-parser";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

// TODO split components to files

/*

Create a custom block in wordpress, from scratch or with a plugin. 

 Takes raw html input.
 The transform func checks tag node by name, 
 and transforms the one that matches into the specified component, which will be returned by react-html-parser.

 // <tagName></tagName> becomes <ComponentName></ComponentName> 

 The component specified wraps a processNodes func that gets passed the matching nodes children, and transform func.
 react-syntax-highlighter then highlights according to what language you specify.
 Create custom blocks in wordpress that wrap the block content in the tag name you check with the transform func,
 or use a custom html block in wordpress like this:

// <tagName>content here<tagName>

 */

export const RenderHtml = (val) => {
  function transform(node, index) {
    if (node.type === "tag" && node.name === "js") {
      return (
        <SyntaxHighlighter
          key={index}
          className="f6"
          language="javascript"
          style={anOldHope}
          showLineNumbers
        >
          {processNodes(node.children, transform)}
        </SyntaxHighlighter>
      );
    } else if (node.type === "tag" && node.name === "bash") {
      return (
        <SyntaxHighlighter
          key={index}
          className="f6"
          language="bash"
          style={anOldHope}
        >
          {processNodes(node.children, transform)}
        </SyntaxHighlighter>
      );
    } else if (node.type === "tag" && node.name === "apache") {
      return (
        <SyntaxHighlighter
          key={index}
          className="f6"
          language="apache"
          style={anOldHope}
        >
          {processNodes(node.children, transform)}
        </SyntaxHighlighter>
      );
    }
  }

  const options = {
    decodeEntities: true,
    transform,
  };

  const newHtml = `${val}`;
  return <div>{ReactHtmlParser(newHtml, options)}</div>;
};

/* 
  Takes an array of string values which are tag names, filters the tags array with them,
  and returns linked tag icons
*/

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
      // link: "/tag/javascript",
    },
    {
      tagName: "reactjs",
      icon: (
        <GrReactjs key="GrReactjs" className="dib w2 pl1 ml3 h2 br-100 white" />
      ),
      // link: "/tag/reactjs",
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
    {
      tagName: "linkedin",
      icon: (
        <GrLinkedin
          key="GrLinkedin"
          className="dib w2 pl1 ml3 h2 br-100 white"
        />
      ),
      link: "https://www.linkedin.com/in/jason-bolton-idkdev/",
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

export const RenderLoader = () => {
  return (
    <div className="loader triangle">
      <svg viewBox="0 0 86 80">
        <polygon points="43 8 79 72 7 72"></polygon>
      </svg>
    </div>
  );
};

// Layout components

export const MainLayout = ({ children }) => {
  return <div className="vscodemain">{children}</div>;
};

export const ContentLayout = ({ children }) => {
  return (
    <>
      <div className="vscodecontent overflow-y-scroll w-100">{children}</div>
    </>
  );
};

export const HomeBlockLayout = ({ title, children }) => {
  return (
    <>
      <h1 className="f5 f4-ns fw6 tc vs-text-c">{title}</h1>
      <div className="mw9 center ph3">
        <div className="cf ph2-ns mt6">{children}</div>
      </div>
    </>
  );
};

export const HomeBlock = ({ title, content }) => {
  return (
    <div className="fl w-100 w-50-ns pa2">
      <span className="f5 f4-ns vs-text-2-c">{title}</span>
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
        <div className="mw8 center">
          <div
            className="pv6 contain bg-center"
            style={{
              backgroundImage: `url(${featuredImage})`,
            }}
          ></div>
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
    <nav className="mw-100 vs-topbar-bg overflow-hidden vscodetopbar">
      <div className="fl w3">
        <Link to="/" title="Home">
          <AiOutlineHome className="icon-height ml3 br-100" alt="idkdev" />
        </Link>
      </div>
      <div className="fl mt1">
        <span className="vs-text-c">Jason Bolton - Web Developer - </span>
        <span className="vs-text-c">
          <a href="mailto:jason@idkdev.co.za">Contact</a>
        </span>
      </div>
    </nav>
  );
};

export const BottomBar = () => {
  return (
    <footer className="mw-100 vscodebottombar">
      <div className="fl pl1 pr1 vs-secondary-bg">
        <p className="tc white">VsCodeSkin</p>
      </div>
      <div className="flex vs-primary-bg">
        <p className="tc white">"// Always under construction"</p>
      </div>
    </footer>
  );
};
