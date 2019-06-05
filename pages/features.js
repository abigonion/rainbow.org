import React, { Component } from 'react'
import styled from 'styled-components'
// nextjs
import Head from 'next/head'

import { container } from '../src/styles'
import { media } from '../src/styles'

import Page from '../src/Page'
import Hero from '../src/Hero'
import FeaturesHero from '../src/FeaturesHero'
import TrySection from '../src/TrySection'

import FreaturesFont from '../src/FreaturesFont';
import intl from 'react-intl-universal'

const HeadInjector = () => (
  <Head>
    <title>Features</title>
  </Head>
)

export class MyFeafures extends Component {

  
  render() {
    return (
      <Page stickHeader={true}>
        <HeadInjector />
        <Hero>
          <FeaturesHero />
        </Hero>
            <FreaturesFont />
        <TrySection title={intl.get('try')} />
      </Page>
    )
  }
}
export default MyFeafures;

const Container = styled.div`
  ${container};
`

const Features = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  padding-top: 110px;
  padding-bottom: 90px;

  ${media.phablet`
    padding-top: 70px;
    padding-bottom: 50px;
	`};
`

const Feature = styled.div`
  flex: 33.3%;
  flex-basis: 311px;
  margin-bottom: 63px;
`

const Icon = styled.div`
  height: 48px;

  img {
    width: 48px;
    height: 48px;
  }
`

const Name = styled.h3`
  font-family: BrandonGrotesqueMed;
  margin-top: 10px;
  margin-bottom: 10px;

  font-size: 20px;
  font-weight: 500;
  color: #40364d;

  min-height: 28px;
`

const Description = styled.div`
  max-width: 311px;

  font-size: 16px;
  color: #5f6c72;
`
