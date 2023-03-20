# 習得知識


## 習得知識點
- transitions
    - [JavaScript Hooks 官方文件](https://vuejs.org/guide/built-ins/transition.html#javascript-hooks)
    - [Transition Classes 官方文件](https://vuejs.org/guide/built-ins/transition.html#css-based-transitions)
        1. `v-enter-from`  
            準備進入(掛載此 component)
        2. `v-enter-active`  
            進入過程
        3. `v-enter-to`  
            進入結束
        4. `v-leave-from`  
            準備離開(移掉此 component)
        5. `v-leave-active`  
            離開過程
        6. `v-leave-to`  
            離開結束
        - 用途整理：
            1. 訂製動畫過程：  
                1. `v-enter-active`
                2. `v-leave-active`
            2. 設定動畫起始：
                1. `v-enter-from`
                2. `v-leave-from`
            3. 設定動畫結尾：
                1. `v-enter-to`
                2. `v-leave-to`
    - 雖然目前 Vue 3 可以支援多 root node，但 Transition 好像還是不支援，所以還是得使用單一 root node
        - 錯誤訊息  
            > [Vue warn]: Component inside <Transition> renders non-element root node that cannot be animated.
        - 參考文章
            - [Vue 3 – <Transition> renders non-element root node that cannot be animated](https://stackoverflow.com/questions/65553121/vue-3-transition-renders-non-element-root-node-that-cannot-be-animated)
            - [解决warn:Vue 3 – <Transition> renders non-element root node that cannot be animated](https://www.jianshu.com/p/399667ec9ef8)
-  透過 store 的 $reset() 方法將 state 重置為初始值
   ```javascript
    const store = useStore();
    store.$reset();
   ```


## 參考文章
越上方越晚被加入
- [What is RouterView in Vue.js?](https://stackoverflow.com/questions/71043243/what-is-routerview-in-vue-js)
    > `<RouterView />` is the same as `<router-view />`
- [Decorative Images](https://www.w3.org/WAI/tutorials/images/decorative/)
    > In these cases(decorative images), a null (empty) alt text should be provided (alt="") so that they can be ignored by assistive technologies, such as screen readers.
- 強制覆蓋本地分支
    - [git:pull --force 强制覆盖本地的分支](https://blog.csdn.net/10km/article/details/84669270)
    - [如何使用 Git Pull 覆盖本地文件](https://www.freecodecamp.org/chinese/news/how-to-override-local-files-with-git-pull/)
    - [如何強制“ git pull”覆蓋本地文件?](https://tw.coderbridge.com/discussions/a79578436c8c4f1ab9c4b45bea4f9331)
    - [Git Pull强制覆盖本地文件.md](https://github.com/we11cheng/WCStudy/blob/master/Git%20Pull%E5%BC%BA%E5%88%B6%E8%A6%86%E7%9B%96%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6.md)
        > 在有些場景下為了避免代碼沖突，需要強制使用遠程代碼覆蓋本地代碼，比如自動部署，GitHub的webhook
    - [git pull 强制覆盖本地文件](https://kingzez.com/git-pull-%E5%BC%BA%E5%88%B6%E8%A6%86%E7%9B%96local/)
- [解Bug-defineProps is a compiler macro and no longer needs to be imported.](https://happy9990929.github.io/2022/04/27/bug-defineProps/)
- [eslint 'module' is not defined.(no-undef)](https://juejin.cn/s/eslint%20'module'%20is%20not%20defined.(no-undef))
- [VSCode 噴 Unknown at rule @tailwind 解決方式](https://israynotarray.com/tailwindcss/20220405/1504568293/)
- [Day 3 - 試試 Tailwind CLI](https://ithelp.ithome.com.tw/articles/10259679?sc=iThelpR)