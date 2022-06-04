import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Requests'

const Home = () => {
  return (
    <>
        <Main />
        <Row rowID='1' title='Tus Deportes' fetchURL={requests.requestEventMySports} />
        <Row rowID='2' title='Popular' fetchURL={requests.requestEventPopular} />
        <Row rowID='3' title='Guías y Técnicos Deportivos' fetchURL={requests.requestEventGTD} />
        <Row rowID='4' title='Tus Amigos' fetchURL={requests.requestFriendsEvent} />
        <Row rowID='5' title='Eventos Hoy' fetchURL={requests.requestTodayEvent} />
    </>
  )
}

export default Home