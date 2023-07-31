import { ConfigProvider } from 'antd';

const ThemeProvider = ({children}) => {
    return (
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#002c8c',
            colorInfo: '#0958d9',
          },
        }}
      >
        {children}
      </ConfigProvider>
    )
}

export default ThemeProvider;