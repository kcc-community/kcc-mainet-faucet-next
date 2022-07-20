import type { NextComponentType } from 'next'
import Image from 'next/image'
import styled from 'styled-components'

const MediaListWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 516px;
  height: 48px;
  background: #ffffff;
  border-radius: 4px;
  margin-top: 60px;
`

const Text = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #040a2d;
`

const ListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  margin: 0 16px;
`

const ImageWrap = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
`

export const KCC = {
  EXPLORER: 'https://explorer.kcc.io',
  EXPLORER2: 'https://scan.kcc.io',
  TEST_EXPLORER: 'https://scan-testnet.kcc.network',
  MAINNET_FAUCET: 'https://faucet.kcc.io',
  FAUCET: 'https://faucet-testnet.kcc.network/',
  DOCS_URL: 'https://docs.kcc.io/#/',
  GITHUB_URL: 'https://github.com/kcc-community',
  DAPP_URL: 'https://github.com/kcc-community/awesome-dApps',
  DISCORD_URL: 'https://discord.com/invite/H5ucJydSyd',
  MEDIA_URL: 'https://kccofficial.medium.com',
  MEDIA_API: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@kccofficial',
  MAIL_SUBSCRIBE_PROXY: 'https://mailsubscribe.kcc.io/mailchimp-subscribe',
  TWITTER: 'https://twitter.com/KCCOfficialTW',
  TELEGRAM: 'https://t.me/KCCOfficialEnglishCommunity',
  GRANTS: 'https://github.com/kcc-community/kcc-grants',
  DISCOVER: 'https://discover.kcc.io',
  DAO: 'https://godao.community',
  SAFE_GNOSIS: 'https://safe.kcc.io',
  STAKING: 'https://staking.kcc.io',
  CONTACT_LIST: [
    {
      app: 'Twitter',
      icon: '/images/icons/Twitter.png',
      route: 'https://twitter.com/KCCOfficialTW',
    },
    {
      app: 'Telegram',
      icon: '/images/icons/Telegram.png',
      route: 'https://t.me/KCCOfficialEnglishCommunity',
    },
    {
      app: 'Medium',
      icon: '/images/icons/Medium.png',
      route: 'https://kccofficial.medium.com',
    },
    {
      app: 'Discord',
      icon: '/images/icons/Discord.png',
      route: 'https://discord.com/invite/H5ucJydSyd',
    },
  ],
}

const MediaList: NextComponentType = ({}) => {
  return (
    <MediaListWrap>
      <Text>For more information,you can visit our:</Text>
      <ListWrap>
        {KCC.CONTACT_LIST.map((media, index) => {
          return (
            <ImageWrap
              key={index}
              onClick={() => {
                window.open(media.route, '_blank')
              }}
            >
              <Image src={media.icon} width={20} height={20} alt="icon" />
            </ImageWrap>
          )
        })}
      </ListWrap>
    </MediaListWrap>
  )
}

export default MediaList
