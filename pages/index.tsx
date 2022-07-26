/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import AirdropPanel from '~/components/AirdropPanel'
import MediaList from '~/components/MediaList'
import KCCLOGO from '../public/images/kcc-logo.png'

const AppContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding-top: 150px;
  background: url('../images/bg.png') top center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding-top: 50px;
  }
`

const Title = styled.h1`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  display: flex;
  align-items: center;
  color: #ffffff;
  text-shadow: 0px 4px 20px rgba(65, 230, 175, 0.6);
  @media (max-width: 768px) {
    font-size: 20px;
    text-align: center;
    margin: 10px 0px;
  }
`

const Description = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }
`

const Link = styled.a`
  color: #00d092;

  &:hover {
    color: #00d092;
  }
`

export async function getServerSideProps(context: any) {
  // here,you can fetch data by context.query
  return {
    props: {
      query: context.query,
    }, // will be passed to the page component as props
  }
}

const Home: NextPage<{ query: { oauth_token: string; oauth_verifier: string } }> = ({ query }) => {
  return (
    <AppContainer>
      <Head>
        <title>KCC mainnet faucet</title>
        <script src="//recaptcha.net/recaptcha/api.js?hl=en"></script>
      </Head>
      <Image priority={true} src={KCCLOGO} width={140} height={50} alt="kcc-logo" />
      <Title>KCC MAINNET FAUCET</Title>
      <Description>
        If you are using KCC-Faucet for the first time, you can &nbsp;
        <Link
          href="https://docs.google.com/document/d/1DC6-AD1R12QcGANENvyCVKbQxt3OrfiJq2VZDGse9Cg/edit"
          target="_blank"
        >
          Check the guide
        </Link>
      </Description>
      <AirdropPanel query={query} />
      <MediaList />
    </AppContainer>
  )
}

export default Home
