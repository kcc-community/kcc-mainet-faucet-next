import type { NextComponentType } from 'next'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const PanelWrap = styled.div`
  width: 516px;
  height: 379px;
  background: #ffffff;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-top: 36px;
  padding: 65px 32px 24px 32px;
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

const Button = styled.div`
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
  color: #fff;
  cursor: pointer;
`

const AirdropPanel: NextComponentType = (props) => {
    
  const [captchaId, setCaptchaId] = useState<number>(-1)

  const [loading, setLoading] = useState<boolean>(false)

  const [captchaCode, setcaptchaCode] = useState<string>('')

  const renderGoogleCaptcha = () => {
    const char = window.document.getElementById('captcha')
    if (char && window?.grecaptcha && captchaId === -1) {
      const cid = window.grecaptcha?.render('captcha', {
        sitekey: '6Leeu5IgAAAAAFUkaZfGXfOpiE2n0DEfYWFotVcG',
      })
      setCaptchaId(() => cid)
    }
  }

  const resetCaptcha = () => {
    const char = window.document.getElementById('captcha')
    char && window?.grecaptcha.reset('captcha')
  }

  useEffect(() => {
    renderGoogleCaptcha()
  }, [])

  return (
    <PanelWrap>
      <InputWrap>
        <Input placeholder="Enther your address here to receive KCS" />
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

      <CaptchaWrap>
        <div id="captcha" />
      </CaptchaWrap>
      <Button>REQUEST 0.0005 KCS</Button>
    </PanelWrap>
  )
}

export default AirdropPanel
