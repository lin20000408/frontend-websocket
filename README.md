# React + Vite

yarn       更新模組
yarn dev   執行

# 環境變數
VITE_REACT_APP_GG_APP_ID=602588106939-k8imc000d2om7b93n1co6aahg72bospn.apps.googleusercontent.com;

# 嚴格模式 （開發模式會執行兩次, 但生產模式就正常）這在後台, 連線兩次的疑問
        React StrictMode 生命周期为什么会执行两次？
        什么是 React.StrictMode?#
        React.StrictMode 是在 2018 年的 16.3.0 版本中引入的组件。一开始，它只用在类 
         组件中，而在 16.8.0 中，它对 hook 同样适用。
        就像在版本说明中提及的一样：

        React.StrictMode 是帮助应用适应异步渲染的组件

        所以它应该用来帮助工程师避免常见的错误，并使他们的 React 应用抛弃过时的 API， 
         从而逐步升级。
        这些提示对于更好地调试是有帮助的，因为这个库正在向异步渲染时代迈进，所以大的改 
         动时时发生。
        很有用，对吧？

        为什么会渲染两次呢?#
        我们从使用 React.StrictMode 中获得的好处之一是，它帮助我们检测到渲染期生命周 
         期的预期之外的副作用。
        这些生命周期有：

        constructor
        componentWillMount (或者 UNSAFE_componentWillMount)
        componentWillReceiveProps (或者 UNSAFE_componentWillReceiveProps)
        componentWillUpdate (或者 UNSAFE_componentWillUpdate)
        getDerivedStateFromProps
        shouldComponentUpdate
        render
        setState 更新函数 (第一个参数)

        所有这些方法都被调用不止一次，所以避免副作用是十分重要的。如果我们无视这个原 
         则，就有可能造成状态不一致问题或者内存泄漏。
        React.StrictMode 不能马上检测到副作用，但是它可以通过故意调用一些关键函数两 
         次，来帮助我们发现副作用。
        这些函数有:

        类组件 constructor、render 以及 shouldComponentUpdate 方法
        类组件静态 getDerivedStateFromProps 方法
        方法组件的方法体
        状态更新函数 (setState 的第一个参数)
        传给 useState、useMemo、或 useReducer 的函数

        这个行为肯定对性能有一些影响，但我们不应该担心，因为它只在开发而不是生产环境中 
         发生。
        这就是我们只有在开发环境下使用带 React.useState 的组件函数，才可以成功复现渲 
         染两次的原因。

# vite 部署到 vercel 路由
https://stackoverflow.com/questions/64815012/why-does-react-router-not-works-at-vercel

{
  "rewrites":  [
    {"source": "/(.*)", "destination": "/"}
  ]
}

# 國際語 
https://ant-design.antgroup.com/docs/react/i18n-cn

#   改變port=3000 是為了reactjs-social-login
  server:{
    port:3000,
  }




This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


2024/05/09 加入tailwind 只要是 inline css 就用tailwind 來實現, 其它css 照常使用
