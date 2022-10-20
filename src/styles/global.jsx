import React from 'react'
import { Global, css } from '@emotion/react'

import { mq } from './media'

const style = (theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  *,
  a:visited,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  *,
  *:focus {
    outline: none;
  }

  html {
    box-sizing: border-box;
    background-color: ${theme.colors.primary.white};
  }

  ul,
  li,
  html,
  body {
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-family: sans-serif;
    font-weight: normal;
    font-size: 10px;
    color: ${theme.colors.primary.black};
    background-color: ${theme.colors.primary.background};

    padding: 0;
    margin: 0;
  }

  button {
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    /* background: transparent; */
    padding: 0.5rem 0.8rem;
    cursor: pointer;

    /* inherit font & color from ancestor */
    text-align: inherit;
    color: inherit;
    font: inherit;

    /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable 'input' types in iOS */
    -webkit-appearance: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul {
    list-style-type: none;
  }

  input {
    margin: 0;
    padding: 0;
    border-radius: 0;
    border-width: 0.1rem;
  }

  section {
    margin-top: ${theme.heights.navbarSm}rem;

    ${mq('md')`
      margin-top: ${theme.heights.navbar}rem;
    `}
  }

  .box-shadow {
    -webkit-box-shadow: 0 0.2rem 1.5rem 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 0.2rem 1.5rem 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.2rem 1.5rem 0 rgba(0, 0, 0, 0.1);
  }

  .loader,
  .loader:before,
  .loader:after {
    background: $cerulean;
    -webkit-animation: load1 1s infinite ease-in-out;
    animation: load1 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  .loader {
    color: $cerulean;
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loader:after {
    left: 1.5em;
  }
  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }

  svg {
    &.opened {
      transform: rotate(180deg);
      transition-duration: 300ms;
    }

    &.closed {
      transform: rotate(0deg);
      transition-duration: 300ms;
    }
  }

  /* 3rd parties */

  /* collapse */
  .collapse-css-transition {
    transition: height 400ms cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  /* collapse */

  /* react-calendar */
  .react-calendar {
    width: 35rem;
    max-width: 100%;
    background: white;
    line-height: 1.125em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: 15px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: ${theme.colors.primary.white};
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  .react-date-picker__calendar.react-date-picker__calendar--open {
    right: -60px !important;
  }
  .react-calendar {
    width: 340px !important;
    box-shadow: 0 2px 23px 0 rgba(0,0,0,0.3);
  }

  /*  */
  @media only screen and (max-width: 767px) {
    .react-date-picker__calendar.react-date-picker__calendar--open {
      right: -2rem !important;
    }
    .react-calendar {
      width: 34.5rem !important;
    }
  }
  .react-calendar {
    font-family: 'Roboto', sans-serif !important;
    border: 0.1rem solid white !important;
    color: ${theme.colors.primary.black} !important;
    border-radius: 1.5rem;
  }

  .react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    font-size: 1.6rem;
  }
  
  .react-calendar__navigation__arrow {
    font-size: 2.5rem;
  }

  .react-calendar__navigation__label {
    color: ${theme.colors.primary.black};
    font-weight: 700;
    text-transform: capitalize;
    text-align: center;
  }

  abbr, abbr[title] {
    font-weight: 400;
    cursor: pointer;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${theme.colors.primary.black} !important;
  }

  .react-calendar__month-view__weekdays__weekday {
    abbr, abbr[title] {
      font-weight: 700;
      font-size: 1rem;
    }
  }

  .react-calendar__tile--active,
  .react-calendar__tile--hasActive {
    color: ${theme.colors.primary.white} !important;
    font-weight: 700;
    border-radius: 3rem;
    background-color: ${theme.colors.primary.endeavour} !important;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--now {
    abbr {
      color: ${theme.colors.primary.white} !important;
    }
  }

  .react-calendar__tile--now {
    background-color: ${theme.colors.primary.black} !important;
    color: ${theme.colors.primary.white} !important;
    border-radius: 3rem;
  }

  .disable-today .react-calendar__tile--now {
    background-color: #f0f0f0 !important;
    color: rgba(0, 0, 0, 0.247) !important;
    border-radius: unset;
  }

  .react-calendar__tile:disabled {
    background-color: ${theme.colors.primary.white} !important;
    cursor: not-allowed;

    abbr {
      color: ${theme.colors.primary.silver} !important;
      cursor: not-allowed;
    }
  }

  .react-calendar__tile abbr {
    font-size: 1.6rem;
  }

  .react-calendar__tile:enabled:hover {
    color: ${theme.colors.primary.white} !important;
    border-radius: 3rem;
    font-weight: 700;
  }

  .react-calendar__tile:enabled:focus { 
    color: ${theme.colors.primary.white} !important;
    border-radius: 3rem;
    background-color: $cerulean !important;
  }

  .react-calendar__navigation button[disabled] {
    background-color: ${theme.colors.primary.white} !important;
    cursor: not-allowed;
  }
  /* react-calendar */

  /* Toast */
  .Toastify__toast{
    background-color: ${theme.colors.primary.success} !important;
  }
  .Toastify__toast-body {
    font-size: 2rem;
    font-weight: 700;
  }
  /* Toast */
  
  /* data-table */
  .rdt_TableHeadRow {
    background-color: ${theme.colors.primary.white};

    .rdt_TableCol {
      padding: 0;
      padding-left: 0.3rem;
    }

    .rdt_TableCol .rdt_TableCol_Sortable {
      color: ${theme.colors.primary.black} !important;
      font-weight: 700;
      font-size: 1.2rem;
      text-transform: capitalize;
    }
  }

  .rdt_TableCell {
    font-size: 1.2rem;
    padding: 0 0.3rem !important;

    svg {
      height: 2rem;

      path {
        fill: ${theme.colors.primary.endeavour};
      }
    }
  }

  @media only screen and (min-width: 768px) {
    .rdt_TableHeadRow {
      .rdt_TableCol {
        padding: 0 1.6rem;
      }

      .rdt_TableCol .rdt_TableCol_Sortable {
        font-size: 1.6rem;
      }
    }

    .rdt_TableCell {
      font-size: 1.4rem;
      padding: 0 1.6rem !important;
    }
  }

  /* data-table */

/* react-color */
  .twitter-picker div span div {
    border: 0.1rem solid ${theme.colors.primary.silver};
  }
/* react-color */

  /* 3rd parties */
`

const GlobalStyles = (props) => <Global styles={style} {...props} />

export { GlobalStyles, style }
