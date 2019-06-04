import React, { Component } from 'react'
import styled from 'styled-components'
import Head from 'next/head'

import LearnMore from '../src/LearnMore'

import Page from '../src/Page'
import Hero from '../src/Hero'
import LandingHero from '../src/LandingHero'
import Diagram from '../src/Diagram'
import PromoSection from '../src/PromoSection'
import UseCases from '../src/UseCases'
import Subscribe from '../src/Subscribe'

import intl from 'react-intl-universal';
import axios from 'axios';

const HeadInjector = () => (
    <Head>
        <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <title>{intl.get("Title")}</title>
    </Head>
)
export class App extends Component {
    state = {initDone: false}

    componentDidMount(){
            this.loadLocales()
    }
    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
          });

          // 如果没找到，则默认为汉语

        axios
            .get(`../static/locales/${currentLocale}.json`)
            .then(res =>{
                return  intl.init({
                    currentLocale, // TODO: determine locale here
                    locales: {
                      [currentLocale]: res.data
                    }
                  })
            }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: true });
          });
      }
    render() {
        return (
            this.state.initDone && (
            <Page stickHeader={true}>
                <HeadInjector />
                <Hero>
                    <LandingHero />
                    <a name="nextSlide" style={{ marginTop: `-58px` }} />
                    <LearnMoreSection>
                        <LearnMore />
                    </LearnMoreSection>
                </Hero>
                <Diagram />
                <PromoSection />
                <UseCases />
                <Subscribe />
            </Page>
        )
        )
    }
}
export default App;

const LearnMoreSection = styled.div`
  z-index: 2;
  position: absolute;
  transform: translate(-50%, 0%);
  left: 50%;
  bottom: 16px;
`
