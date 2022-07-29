import { isAddress } from '@ethersproject/address'
import { Button } from 'antd'
import type { NextComponentType } from 'next'
import Image from 'next/image'
import { useRouter, withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch } from '~/state'
import { useUser } from '~/state/hooks'
import API from '~/utils'
import { updateUserAction } from '../state/user/index'
import StyledNotification from './StyledNotification'

const PanelWrap = styled.div<{ hasToken: boolean }>`
  box-sizing: border-box;
  width: 516px;
  height: ${({ hasToken }) => {
    if (hasToken) {
      return '425px'
    }
    return '280px'
  }};
  background: #ffffff;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-top: 36px;
  padding: ${({ hasToken }) => {
    if (hasToken) {
      return '26px 32px 24px 32px'
    }
    return '66px 32px 24px 32px;'
  }};
  @media (max-width: 768px) {
    width: 96%;
    max-width: 516px;
    margin: 0 auto;
    margin-top:36px;
  }
`

const InputWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Input = styled.input`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  width: 326px;
  height: 38px;
  background: rgba(1, 8, 30, 0.04);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  outline: none;

  &::placeholder {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #b4b7c1;
  }

  &:focus {
    border: 1px solid #00d092 !important;
  }
`

const KCSWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  width: 122px;
  height: 38px;
  background: rgba(1, 8, 30, 0.04);
  border-radius: 4px;
  margin-left: 4px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`

const Text = styled.div`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #494e67;
  margin: 0 auto;
  max-width: 394px;
  margin-top: 32px;
  line-height: 20px;
`

const Link = styled.a`
  color: #00d092;
  text-decoration: underline;

  &:hover {
    color: #00d092;
  }
`

const CaptchaWrap = styled.div`
  margin: 34px auto;
  width: 305px;
  margin-bottom: 24px;
`

const StyledButton = styled(Button)`
  outline: none;
  background: ${({ loading }) => {
    if (loading) {
      return '#00d092!important'
    }
    return '#00d092'
  }};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  width: 452px;
  height: 48px;
  background: #00d092;
  border-radius: 4px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${({ loading }) => {
    if (loading) {
      return '#fff !important'
    }
    return '#fff'
  }};
  cursor: pointer;
  @media (max-width:768px){
    width:100%;
  }
`

const UserNameText = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  /* identical to box height, or 125% */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #040a2d;
  text-align: center;
  margin-bottom: 20px;
`

const RowCenterBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`

const LogoutText = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #494e67;
  margin-right: 10px;
`

let rendered = false

// @ts-ignore
const AirdropPanel: NextComponentType<any> = ({ query }) => {
  console.log('query____', query)

  const router = useRouter()

  const [input, setInput] = React.useState<string>('')

  const dispatch = useDispatch<AppDispatch>()

  const [captchaId, setCaptchaId] = useState<number>(-1)

  const [loading, setLoading] = useState<boolean>(false)

  const [isHover, setIsHover] = useState<boolean>(false)

  const [captchaCode, setcaptchaCode] = useState<string>('')

  const user = useUser()

  const hasToken = React.useMemo(() => {
    return Boolean(user.token && user.userId)
  }, [user])

  const hasQuery = React.useMemo(() => {
    return Boolean(query.oauth_token && query.oauth_verifier)
  }, [query])

  const renderGoogleCaptcha = React.useCallback(() => {
    const char = window.document.getElementById('captcha')
    console.log('captchaId', captchaId)
    if (hasToken && char && window?.grecaptcha && !rendered) {
      const cid = window.grecaptcha.render('captcha', {
        sitekey: '6Leeu5IgAAAAAFUkaZfGXfOpiE2n0DEfYWFotVcG',
      })
      rendered = true
      setCaptchaId(() => cid)
    }
  }, [hasToken, captchaId])

  const resetCaptcha = () => {
    const char = window.document.getElementById('captcha')
    char && window?.grecaptcha.reset(captchaId)
  }

  useEffect(() => {
    renderGoogleCaptcha()
  }, [hasToken, captchaId])

  // autoGetToken when hasQeury and not has Token

  React.useEffect(() => {
    async function autoGetToken() {
      if (hasToken) return
      if (hasQuery) {
        const response = await API.loginCallback(query.oauth_token, query.oauth_verifier)
        console.log(response)

        if (response.code !== 0) {
          // StyledNotification.error({ message: response.msg })
          // redirect to login
          router.push('/')
          return
        }

        // handle token
        dispatch(updateUserAction({ user: response.data }))
        // presist
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    }

    autoGetToken()
  }, [hasToken, hasQuery])

  //
  const login = React.useCallback(async () => {
    setLoading(() => true)

    try {
      const response = await API.login()
      console.log('response', response)

      if (response.code !== 0) {
        StyledNotification.error({ message: response.msg })
        router.push('/')
        return
      }

      // with url
      if (response.data?.url) {
        window.open(response.data?.url, '_self')
      }
    } finally {
      setLoading(() => false)
    }
  }, [user, hasToken])

  const getAirdrop = React.useCallback(async () => {
    if (!isAddress(input.trim())) {
      StyledNotification.error({ message: 'Invalid address' })
      return
    }

    const code = window.grecaptcha.getResponse(captchaId)
    if (!code) {
      StyledNotification.error({ message: 'Invalid captcha' })
      return
    }

    try {
      setLoading(() => true)

      const response = await API.faucet(user.token, user.userId, code, input)

      if (response.code === 401) {
        StyledNotification.error({
          message: 'Login status has expired',
          description: 'Please login again with twitter',
        })
        dispatch(updateUserAction({ user: { userId: '', token: '', screenName: '' } }))
        // reset data
        router.push('/')
        return
      }

      if (response.code !== 0) {
        StyledNotification.error({ message: response.msg })
        resetCaptcha()
        // reset data
        return
      }

      StyledNotification.success({ message: 'Claim Success' })
      resetCaptcha()
    } finally {
      setLoading(() => false)
    }
  }, [captchaId, input, user])

  return (
    <PanelWrap hasToken={hasToken}>
      {user.screenName && <UserNameText>{`Hi, ${user.screenName}`}</UserNameText>}
      <InputWrap>
        <Input placeholder="Enther your address here to receive KCS" onChange={(e) => setInput(e.target.value)} />
        <KCSWrap>0.0005 KCS</KCSWrap>
      </InputWrap>

      <Text>
        Please use
        <Link href="https://rpc-mainnet.kcc.network" target="_blank">
          {' '}
          https://rpc-mainnet.kcc.network
        </Link>{' '}
        RPC to connect to the KCC mainnet
      </Text>

      {hasToken && (
        <CaptchaWrap>
          <div id="captcha" />
        </CaptchaWrap>
      )}
      <StyledButton
        style={{ marginTop: hasToken ? '0px' : '30px' }}
        loading={loading}
        onClick={hasToken ? getAirdrop : login}
        onMouseEnter={() => {
          setIsHover(() => true)
        }}
        onMouseLeave={() => {
          setIsHover(() => false)
        }}
      >
        {!hasToken && (
          <Image
            priority={true}
            src={isHover ? '/images/green.svg' : '/images/white-twitter.png'}
            width={20}
            height={20}
            alt="twitter"
          />
        )}
        {hasToken ? 'REQUEST 0.0005 KCS' : <span style={{ marginLeft: '10px' }}>Login with Twitter</span>}
      </StyledButton>

      {hasToken && (
        <RowCenterBox
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch(updateUserAction({ user: { userId: '', token: '', screenName: '' } }))
            window.localStorage.clear()
          }}
        >
          <LogoutText>Logout</LogoutText>
          <Image priority={true} src="/images/logout.png" width={16} height={16} alt="logout-icon" />
        </RowCenterBox>
      )}
    </PanelWrap>
  )
}

export default withRouter<any>(AirdropPanel)
