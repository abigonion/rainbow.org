import App, { Container } from 'next/app'
import React from 'react'
import intl from 'react-intl-universal';
const locales = {
    "en-US": require('../static/locales/en-US.json'),
    "zh-CN": require('../static/locales/zh-CN.json')
};

export default class MyApp extends App {
    state = {initDone: false}

    componentDidMount(){
        this.loadLocales()
    }
    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
          });
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        intl.init({
            currentLocale, // TODO: determine locale here
            locales: {
              [currentLocale]: locales[currentLocale]
            }
          }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({ initDone: true });
          });
      }
    
    static async getInitialProps({ Component, router, ctx }) {
        
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps}
    }


    render() {

        const { Component, pageProps } = this.props
        return <Container>
            <Component {...pageProps} />
        </Container>
    }
}