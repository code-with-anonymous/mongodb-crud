import React from "react";
import "./App.css";
import Index from "./components/pages/User/Index";

function App() {

  return (
    <>
    <Index/>
    </>
  );
}

export default App;




// import React from 'react';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import { message } from 'antd';

// const App = () => {
//   const handleEditClick = () => {
//     message.info('Edit icon clicked!');
//     // Add your edit logic here
//   };

//   const handleDeleteClick = () => {
//     message.info('Delete icon clicked!');
//     // Add your delete logic here
//   };

//   return (
//     <div>
//       <EditOutlined
//         style={{ fontSize: '24px', color: '#08c', marginRight: '10px' }}
//         onClick={handleEditClick}
//       />
//       <DeleteOutlined
//         style={{ fontSize: '24px', color: 'red' }}
//         onClick={handleDeleteClick}
//       />
//     </div>
//   );
// };
// export default App;



// import React, { useState } from 'react';
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];

// export default function App() {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//         <div className="demo-logo-vertical" />
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }} />
//         <Content style={{ margin: '0 16px' }}>
//           <Breadcrumb style={{ margin: '16px 0' }}>
//             <Breadcrumb.Item>User</Breadcrumb.Item>
//             <Breadcrumb.Item>Bill</Breadcrumb.Item>
//           </Breadcrumb>
//           <div
//             style={{
//               padding: 24,
//               minHeight: 360,
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//           >
//             Bill is a cat.
//           </div>
//         </Content>
//         <Footer style={{ textAlign: 'center' }}>
//           Ant Design ©{new Date().getFullYear()} Created by Ant UED
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// }


