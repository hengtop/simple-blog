import styled from "@emotion/styled";

export const ArticleWrapper = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding-bottom: 10rem;
  .articleHtml h1 {
    font-size: 2em;
    line-height: 1.5em;
    margin: 0.67em 0;
  }

  .articleHtml h2 {
    font-size: 1.5em;
    margin: 0.75em 0;
  }

  .articleHtml h3 {
    font-size: 1.17em;
    margin: 0.83em 0;
  }

  .articleHtml h4 {
    margin: 1.12em 0;
  }

  .articleHtml p {
    margin: 1.12em 0;
    font-size: 15px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  .articleHtml h5 {
    font-size: 0.83em;
    margin: 1.5em 0;
  }
  .articleHtml h6 {
    font-size: 0.75em;
    margin: 1.67em 0;
  }

  .articleHtml h1,
  .articleHtml h2,
  .articleHtml h3,
  .articleHtml h4,
  .articleHtml h5,
  .articleHtml h6,
  .articleHtml b,
  .articleHtml strong {
    font-weight: bolder;
  }
  .articleHtml ol {
    margin: 1.5rem 0;
    box-sizing: border-box;
    padding: 0 0 0 40px;
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  .articleHtml ul {
    margin: 1.5rem 0;
    box-sizing: border-box;
    padding: 0 0 0 40px;
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  .articleHtml ol li,
  .articleHtml ul li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  .articleHtml a:hover {
    border-bottom: 1px solid #58666e;
  }
  .articleHtml a {
    color: #58666e;
    text-decoration: unset;
  }

  /* 表格的样式 */
  .articleHtml table {
    display: block;
    width: 100%;
    overflow: auto;
    margin-top: 0;
    margin-bottom: 16px;
    border-spacing: 0;
    border-collapse: collapse;
    text-align: left;
  }
  .articleHtml table th {
    font-weight: 600;
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
    text-align: center;
  }

  .articleHtml table tr {
    background-color: #fff;
    border-top: 1px solid #c6cbd1;
  }

  .articleHtml table tr:nth-of-type(2n) {
    background-color: #f6f8fa;
  }

  .articleHtml table td {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
  }

  .dark-active {
    pre code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
    }
    code.hljs {
      padding: 3px 5px;
    }
    .hljs {
      color: #c9d1d9;
    }
    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      color: #ff7b72;
    }
    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      color: #d2a8ff;
    }
    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-variable {
      color: #79c0ff;
    }
    .hljs-meta .hljs-string,
    .hljs-regexp,
    .hljs-string {
      color: #a5d6ff;
    }
    .hljs-built_in,
    .hljs-symbol {
      color: #ffa657;
    }
    .hljs-code,
    .hljs-comment,
    .hljs-formula {
      color: #8b949e;
    }
    .hljs-name,
    .hljs-quote,
    .hljs-selector-pseudo,
    .hljs-selector-tag {
      color: #7ee787;
    }
    .hljs-subst {
      color: #c9d1d9;
    }
    .hljs-section {
      color: #1f6feb;
      font-weight: 700;
    }
    .hljs-bullet {
      color: #f2cc60;
    }
    .hljs-emphasis {
      color: #c9d1d9;
      font-style: italic;
    }
    .hljs-strong {
      color: #c9d1d9;
      font-weight: 700;
    }
    .hljs-addition {
      color: #aff5b4;
      background-color: #033a16;
    }
    .hljs-deletion {
      color: #ffdcd7;
      background-color: #67060c;
    }
    code {
      background-color: #282a36;
    }
  }
  .light-active {
    pre code.hljs {
      display: block;
      overflow-x: auto;
      padding: 1em;
    }
    code.hljs {
      padding: 3px 5px;
    }
    .hljs {
      color: #24292e;
    }
    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      color: #d73a49;
    }
    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      color: #6f42c1;
    }
    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-variable {
      color: #005cc5;
    }
    .hljs-meta .hljs-string,
    .hljs-regexp,
    .hljs-string {
      color: #032f62;
    }
    .hljs-built_in,
    .hljs-symbol {
      color: #e36209;
    }
    .hljs-code,
    .hljs-comment,
    .hljs-formula {
      color: #6a737d;
    }
    .hljs-name,
    .hljs-quote,
    .hljs-selector-pseudo,
    .hljs-selector-tag {
      color: #22863a;
    }
    .hljs-subst {
      color: #24292e;
    }
    .hljs-section {
      color: #005cc5;
      font-weight: 700;
    }
    .hljs-bullet {
      color: #735c0f;
    }
    .hljs-emphasis {
      color: #24292e;
      font-style: italic;
    }
    .hljs-strong {
      color: #24292e;
      font-weight: 700;
    }
    .hljs-addition {
      color: #22863a;
      background-color: #f0fff4;
    }
    .hljs-deletion {
      color: #b31d28;
      background-color: #ffeef0;
    }
    code {
      background-color: #f4f4f4;
    }
  }
`;

export const ArticleTitle = styled.h1`
  margin: 1rem 0;
  font-size: 2.5rem;
`;

export const NavWrapper = styled.nav`
  position: fixed;
  right: 1rem;
  top: 5rem;
  right: 3rem;
  border-radius: 0.3rem;
  padding-top: 0.5rem;
  overflow: hidden;
  @media (max-width: 1520px) {
    right: 2rem;
  }

  @media (max-width: 1480px) {
    right: 1rem;
  }
  @media (max-width: 1340px) {
    right: 0rem;
  }
  @media (max-width: 1300px) {
    display: none;
  }
`;

export const ArticlContext = styled.div`
  img {
    width: 100%;
  }
  code {
    border-radius: 0.3rem;
  }
`;
