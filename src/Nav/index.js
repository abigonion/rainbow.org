import React from 'react'
import styled from 'styled-components'
import { media } from '../styles'
import { logEvent } from '../utils/ga'
import { initialize } from 'react-ga';
import intl from 'react-intl-universal';

const getStarted = () => {
  logEvent('menu', 'get-started')
  window.location = '/doc/get-started'
}

const changeLang = () => {
  window.location =intl.get("lang")
}
export default ({ mobile = false }) => (
  <Nav mobile={mobile}>
    <Links>
      <Link
        href={"/features"+intl.get("lang-url")}
        onClick={() => {
          logEvent('menu', 'features')
        }}
      >
        {intl.get("Features")}
      </Link>
      <Link
        href={"/doc"+intl.get("lang-url")}
        onClick={() => {
          logEvent('menu', 'doc')
        }}
      >
        {intl.get("Doc")}
      </Link>
      <Link
        href= "https://github.com/lhtech-rainbow/Rainbow"
        onClick={() => {
          logEvent('menu', 'github')
        }}
      >
         {intl.get("Github")}
      </Link>
      <Link
        href={"/support"+intl.get("lang-url")}
        onClick={() => {
          logEvent('menu', 'support')
        }}
      >
        {intl.get("Support")}
      </Link>
      <Link
        onClick={changeLang}
      >
       {intl.get("Change Lang")}
      </Link> 

    </Links>    
    <GetStartedButton onClick={getStarted}>{intl.get("Get Started")}</GetStartedButton>
  </Nav>
)

const Links = styled.div`
  display: flex;
  flex-direction: row;
`

const Link = styled.a`
  text-decoration: none;
  text-transform: uppercase;

  font-family: BrandonGrotesqueBold, Tahoma, Arial;
  font-size: 13px;
  color: #838d93;
  padding-top: 10px;
  padding-bottom: 3px;
  border-bottom: 1.5px solid #fff;
  margin-left: 30px;

  &:hover {
    color: #40364d;
    border-bottom: 1.5px solid #40364d;
  }
`

const Nav = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.mobile &&
    `
    display: none;
 `} ${media.phablet` 
     ${props =>
       !props.mobile &&
       `
        display: none;
     `} 
  `};
`

const GetStartedButton = styled.button`
  text-decoration: none;
  margin-left: 40px;
  border-radius: 4px;
  background-color: #13adc7;
  font-family: BrandonGrotesqueMed, Tahoma, Arial;
  color: #fff;
  width: 113px;
  height: 38px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: 0.2s background-color ease-out;

  &:hover {
    background-color: #13a3bd;
  }
`