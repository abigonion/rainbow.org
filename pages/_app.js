import App, { Container } from 'next/app'
import React from 'react'
import intl from 'react-intl-universal';
import axios from 'axios';

export default class MyApp extends App {
    state = { initDone: false }

    componentDidMount() {
        this.loadLocales()
        console.log('我重新加载了')
    }
    loadLocales() {
        let currentLocale = intl.determineLocale({
            urlLocaleKey: 'lang',
            cookieLocaleKey: 'lang'
        });
        // 如果没找到，则默认为汉语
        axios
            .get(`../static/locales/${currentLocale}.json`)
            //.get(`https://raw.githubusercontent.com/abigonion/rainbow.org/master/static/locales/${currentLocale}.json`)
                .then(res => {
                    console.log(`../static/locales/${currentLocale}.json`)
                    return intl.init({
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
}
