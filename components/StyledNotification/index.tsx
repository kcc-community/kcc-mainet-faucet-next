import { notification } from 'antd'
import { ArgsProps } from 'antd/lib/notification/index'
import Image from 'next/image'


class StyledNotification {
  static success(p: ArgsProps) {
    notification.success({
      ...p,
      icon: <Image width={24} height={24} priority={true} src={'/images/icons/success.png'} alt="notification-icon" />,
      style: { border: '1px solid #0DC898' },
    })
  }
  static error(p: ArgsProps) {
    notification.error({
      ...p,
      icon: <Image width={24} height={24} priority={true} src={'/images/icons/error.png'} alt="notification-icon" />,
      style: { border: '1px solid #F84752' },
    })
  }
}

export default StyledNotification
