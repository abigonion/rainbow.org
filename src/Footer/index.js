import React from 'react'
import styled from 'styled-components'
import { columns, container, media } from '../styles'
import intl from 'react-intl-universal'
const SocialLink = ({ src, href, children }) => (
  <Link src={src} href={href}>
    {children}
  </Link>
)
const changeLang = () => {
  window.location =intl.get("lang")
}
export default props => (
  <Footer>
    <Container wide={props.isDocPage}>
      <Top>
        <Logo href="/">
          <img
            src="/static/img/logo_white.png"
            alt="site logo"
            width={36}
            height={23}
          />
        </Logo>
      </Top>
      <Columns>
        <Column>
          <Heading>Product</Heading>
          <Links>
            <Link href={"/" + intl.get("lang-url")}>{intl.get("Overview")}</Link>
            <Link href={"/features"+intl.get("lang-url")}>{intl.get("Features")}</Link>
          </Links>
        </Column>
        <Column>
          <Heading>Help</Heading>
          <Links>
            <Link href={"/support" + intl.get("lang-url")}>{intl.get("Support")}</Link>
            <Link href={"/doc/get-started" + intl.get("lang-url")}>{intl.get("Get Started")}</Link>

            <Link onClick={changeLang}>{intl.get("Change Lang")}</Link>
          </Links>
        </Column>
        {/* <Column>
          <Heading>Company</Heading>
          <Links>
            <Link href="https://blog.dataversioncontrol.com/">Blog</Link>
            <SocialLink
              src="/static/img/iterative.png"
              href="https://iterative.ai/"
            >
              Iterative.ai
            </SocialLink>
          </Links>
        </Column> */}
        <Column>
          <Heading>Social</Heading>
          <Links>
            {/* <SocialLink
              src="/static/img/twitter.png"
              href="https://twitter.com/DVCorg"
            >
              Twitter
            </SocialLink> */}
            <SocialLink
              src="/static/img/github.png"
              href="https://github.com/iterative/dvc"
            >
              Github
            </SocialLink>
            {/* <SocialLink src="/static/img/discord.png" href="/chat">
              Discord
            </SocialLink> */}
          </Links>
        </Column>
      </Columns>
      <Copyright />
    </Container>
  </Footer>
)

const Footer = styled.section`
  min-height: 300px;
  background-color: #40364d;
  color: #fff;

  ${media.phablet`
    min-height: auto;
  `};
`

const Container = styled.div`
  ${container};
  ${props => props.wide && `max-width: 1200px;`};
  padding-top: 64px !important;
  padding-bottom: 44px;

  ${media.tablet`
    padding: 64px 61px 44px 67px;
    max-width: auto;
  `} ${media.phablet`
    padding: 30px 25px;
    max-width: auto;
  `};
`

const Top = styled.div`
  height: 40px;
  margin-bottom: 40.7px;
`

const Logo = styled.a``

const Columns = styled.div`
  ${columns};

  ${media.phablet`
    justify-content: space-between;
  `};
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 150px;
  margin-right: 66px;

  ${media.phablet`
    margin-right: 0px;
  `};
`

const Heading = styled.h2`
  font-family: BrandonGrotesqueLight;
  opacity: 0.61;
  color: #ffffff;
  font-size: 20px;
  font-weight: 100;
`

const Links = styled.div`
  margin-top: 29px;
  display: flex;
  flex-direction: column;
`

const Link = styled.a`
  line-height: 23px;
  font-size: 20px;
  margin-bottom: 17px;
  display: flex;
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #ccc;
  }

  ${props =>
    props.src &&
    `
    &::before {
      margin-right: 14px;
      width: 26px;
      height: 26px;
      content: ' ';
      display: block;
      background-image: url(${props.src});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  `};
`

const Copyright = styled.div`
  padding-bottom: 18px;
  padding-top: 18px;
  font-size: 14px;
`
