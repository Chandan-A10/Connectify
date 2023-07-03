import { EditOutlined, LogoutOutlined, HomeOutlined, WechatOutlined, CopyOutlined, BellOutlined } from '@ant-design/icons'

export const sidenavItems = [
    {
        key: 1,
        icon: <HomeOutlined />,
        label: 'Home'
    },
    {
        key: 2,
        icon: <WechatOutlined />,
        label: 'Community'
    },
    {
        key: 3,
        icon: <CopyOutlined />,
        label: 'My Posts'
    },
    {
        key: 4,
        icon: <BellOutlined />,
        label: 'Notifications'
    }
]

export const topnavItems = [
    {
        key: 7,
        icons: <EditOutlined />,
        label: 'Edit Profile'
    },
    {
        key: 5,
        icons: <CopyOutlined />,
        label: 'My Posts'
    },
    {
        key: 6,
        icons: <LogoutOutlined />,
        label: 'Logout'
    },
]