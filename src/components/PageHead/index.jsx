import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import { PAGE_TYPE } from '~app/utils/constants'

const PageHead = ({
  title = 'Bike Rentals.co',
  description = 'Bike Rentals.co',
  keywords,
  pageType = PAGE_TYPE.WEBSITE,
}) => (
  <Head>
    <meta charSet="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <meta property="og:type" content={pageType} />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary" />
    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="twitter:title" content={title} />
      </>
    )}
    {description && (
      <>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="twitter:description" content={description} />
      </>
    )}
    {keywords && keywords.length && (
      <meta name="keywords" content={keywords.join(', ')} />
    )}
  </Head>
)

PageHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  pageType: PropTypes.string,
}

PageHead.defaultProps = {
  title: '',
  description: '',
  keywords: [],
  pageType: '',
}

export default PageHead
