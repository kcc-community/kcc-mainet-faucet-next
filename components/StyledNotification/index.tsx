import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification/index'
import styled from 'styled-components'

const Img = styled.img`
  width: 24px;
  height: 24px;
`

class StyledNotification {
  static success(p: ArgsProps) {
    notification.success({
      ...p,
      icon: <Img src={'/images/icons/success.png'} alt="notification-icon" />,
      style: { border: '1px solid #0DC898' },
    })
  }
  static error(p: ArgsProps) {
    notification.error({
      ...p,
      icon: <Img src={'/images/icons/error.png'} alt="notification-icon" />,
      style: { border: '1px solid #F84752' },
    })
  }
  static warning(p: ArgsProps) {
    notification.warning({
      ...p,
      icon: <Img src={'/images/icons/warning.png'} alt="notification-icon" />,
      style: { border: '1px solid #FFB547' },
    })
  }
}

export default StyledNotification
