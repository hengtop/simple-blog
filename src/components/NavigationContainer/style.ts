import styled from "@emotion/styled";

export const NavContainer = styled.div`
  .light {
    background-color: #f4f4f4;
    a {
    }
    .navigate-dom .navigate-a-active {
      background-color: #fff;
    }
    .navigate-dom a:hover {
      background-color: #fff;
    }
  }
  .dark {
    background-color: #37383e;
    color: #dadadb;
    a {
      color: #dadadb;
    }
    .navigate-dom .navigate-a-active {
      background-color: #282a36;
    }
    .navigate-dom a:hover {
      background-color: #282a36;
    }
  }
  .navigate-wrapper {
    border-radius: 5px;
    padding: 5px;
    transition: right 0.4s;
    color: inherit;
  }
  .navigate-dom {
    box-sizing: border-box;
    max-height: 450px;
    overflow-y: auto;
  }
  .navigate-dom a {
    box-sizing: border-box;
    display: block;
    margin: 5px 0;
    padding: 5px;
    padding-left: 25px;
    border-radius: 0.25rem;
    position: relative;
    color: inherit;
    text-decoration: inherit;
  }

  .navigate-a-active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    border-radius: 0 4px 4px 0;
  }

  .navigate-dom .a-h2 {
    padding-left: 40px;
    font-size: 14px;
  }
  .navigate-dom .a-h3 {
    padding-left: 55px;
    font-size: 14px;
  }

  .navigate-dom .a-h4 {
    padding-left: 60px;
    font-size: 14px;
  }

  .navigate-dom .a-h5 {
    padding-left: 75px;
    font-size: 14px;
  }

  .navigate-dom .a-h6 {
    padding-left: 90px;
    font-size: 14px;
  }

  .navigate-wrapper-active {
    right: 0;
  }
`;
