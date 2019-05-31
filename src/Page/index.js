import React, { Component } from 'react'
import Layout from '../Layout'

// app locale data

// const locales = {
//     "en-US": require('../../locales/en-US.json'),
//     "zh-CN": require('../../locales/zh-CN.json')
// };

export default class Page extends Component {


  render() {
    const { children, ...rest } = this.props

    return <Layout {...rest}>{children}</Layout>
  }

}
