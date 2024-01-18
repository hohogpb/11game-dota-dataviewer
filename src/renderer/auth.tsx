import React, { createContext, useState } from 'react';

// 创建一个新的 Context
const MyContext = createContext(undefined);

// 创建一个 Context Provider 组件
const MyContextProvider = ({ children }) => {
  // 在这里定义你想要共享的状态
  const [myData, setMyData] = useState('Hello from Context!');

  // 提供状态和相关方法给子组件
  const contextValue = {
    data: myData,
    updateData: newData => setMyData(newData),
  };

  // 返回 Context Provider 组件
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
