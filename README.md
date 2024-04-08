# Dcard 2024 Frontend Intern Homework
**不要用上面的vercel部署，要啟動需用下面的網址(因為更新好 readme 後又要修改 Vercel 和 Github Token 的環境變數，好麻煩)**

本次實作以我自己的github帳號作為editor，並以這個repo的issue作為部落格的demo。

所以除非在本地端更改環境內容，不然就只能在部署的網址當visitor了QQ。
後面會附上editor模式的錄影或截圖。
# 如何啟動本專案
## 本地端
從本地端執行檔案要自行設定環境:
將整份檔案 clone 下來後，
1. 新增 `.env.local`:
```
GITHUB_ID=
GITHUB_SECRET=
GITHUB_TOKEN=
NEXT_PUBLIC_GITHUB_REPO_OWNER=
NEXT_PUBLIC_GITHUB_REPO_NAME=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```
2. 在 `src/app/lib/env.tsx` 更改欲使用的owner跟repo名稱，如此才能完整操作部落格文章的新增/刪除/編輯。
3. 在 `src/app/api/auth/[...nextauth]/route.tsx` 把這行後面的帳號名稱改掉:
```
const isWriter = (profile as any).login ===
```
P.S. 歹勢上述那塊後來才發現要改。

設定完就能當Daniel了!(editor的名字)
在終端機輸入 `npm run dev` 便可啟動本專案，網址是`http://localhost:3000`。

## Vercel 已部署的網址
單純想看visitor的功能(這是更改 readme 之前的部署):
https://blog-try-first-lc1yktj8f-masonys-projects.vercel.app/

# 架構設計
## 基本要求
- 本專案是用 Next.js v14 實作 (這是本人第一個 React 專案，故沒有想太多就用最新版本。)
- 用 Git 版本控制，放在 Gutihub Repo 並用 Vercel 部署
- 大部分都是 app router，除了處理 REST api for Github Issue (新增/刪除/編輯文章)
- 程式皆用 typescript 撰寫

## 功能
### GitHub Login:
利用 NextAuth.js 實作
點擊主頁右上角的icon便可登入Github帳號，相關程式如下:
1. `src/app/layout.tsx` 的 `<NavBar />` 為導覽列。
2. `src/app/components/NavBar.tsx` 的 `<UserSignIn />` 為登入功能。
3. `src/app/components/UserSignIn.tsx` 呼叫 `signIn('github')`
4. `src/app/api/auth/[...nextauth]/route.tsx` 處理 Github 登入。
5. 改好後回到 `src/app/components/UserSignIn.tsx` 會將 icon 改成 Github 的大頭貼。

**再次點擊沒有其他效果喔(沒有做登出的選項)**

(`scope`的部分我沒有看得很明白，但我有紀錄信箱)

### User Interface (不包含作者的功能)
#### 列表頁
我用了 Infinite Scroll 的方式，相關程式:
1. `src/app/page.tsx` 的 `<Posts />` 為文章列表。
2. `src/app/components/Posts.tsx` 的 `<InfiniteScroll />` 提供作業要求的功能。
3. `src/app/components/InfiniteScroll.tsx` 呼叫 `src/app/components/getPosts.tsx` 的`getSortedPostsData()`以取得排序好的文章標題。起初會呈現10筆，並在列表滾到底部時取額外 10 筆，直到沒有更多資料。
4. `src/app/components/getPosts.tsx` 利用 fetch 的方式從 Github Repo 的 Issue 取得文章。
5. `src/app/components/InfiniteScroll.tsx` 利用 `src/app/components/ListPosts.tsx`的功能 render 出文章列表。
6. 同時 `src/app/components/ListPosts.tsx` 呼叫 `src/app/components/getFormattedDate.tsx` 以增添每篇文章的編輯時間。

#### 文章頁
這部分從 `ListPosts.tsx` 開始並用 html markdown 實作，這邊的東西有點雜亂: 
1. `src/app/components/ListPosts.tsx` 的 ``<Link href={`/posts/${id}`}>{title}</Link>`` 進入文章內容。
2. `src/app/posts/[postId]/page.tsx` 為文章頁面，以及相關程式一併介紹:
    - `src/app/lib/getPosts.tsx` 的 `getSortedPostsData()` 驗證文章在不在此，`getPostData()` 取出文章內容。
    - `src/app/posts/[postId]/not-found.tsx` 功能如其名。
    - `src/app/lib/getFormattedDate.tsx` 的功能同 列表頁 的敘述。
    - `src/app/lib/getComments.tsx` 利用 fetch 的方式從 Github Repo 的 Issue 取得留言。
    - `src/app/components/ListComments.tsx` render 出留言列表。
    - `src/app/components/MarkdownRenderer.tsx` 將文章和留言的 html markdown render 出來。

### User Interface (作者的特別功能)
#### 新增文章
以作者的身分登入後便可以在home page新增文章，點擊新增文章的按鈕:
1. `src/app/components/Button_Create.tsx` 提供觸發新增文章的按鈕，並呼叫 `src/app/components/Modal_Create.tsx`
2. `src/app/components/Modal_Create.tsx` 提供新增文章用的彈出視窗，可在上面新增標題與內容，送出之前會進行驗證(作業要求)。
3. `pages/api/creatIssue.tsx` 向 github 呼叫 `POST` 的 request。
4. 使用 github markdown 格式輸入，不過若要呈現換行需要再多按一次Enter，目前不支援 code 的格式。

#### 編輯文章
以作者的身分登入後便可以在文章頁面編輯文章，點擊編輯的按鈕:
1. `src/app/components/Button_Edit.tsx` 提供觸發編輯的按鈕，並呼叫 `src/app/components/Modal_Edit.tsx`
2. `src/app/components/Modal_Edit.tsx` 提供編輯用的彈出視窗，可在上面更改標題與內容，送出之前會進行驗證(作業要求)。
3. `pages/api/editIssue.tsx` 向 github 呼叫 `PATCH` 的 request。
4. 使用 github markdown 格式輸入，不過若要呈現換行需要再多按一次Enter，目前不支援 code 的格式。

#### 刪除文章
以作者的身分登入後便可以在文章頁面刪除文章，點擊刪除的按鈕:
1. `src/app/components/Button_Delete.tsx` 提供觸發刪除的按鈕，並呼叫 `src/app/components/Modal_Delete.tsx`
2. `src/app/components/Modal_delete.tsx` 會詢問作者是否要刪除文章。
3. `pages/api/closeIssue.tsx` 向 github 呼叫 `PATCH` 的 request。
4. 返回主頁面(列表頁)。

## 目前的缺點
- 跟 Github 的各種 Request 會 delay。
- 在新增/刪除文章後需要刷新主頁面(列表頁)才會更新。
- 沒有調整 Web Vitals 評分。
- 在 Vercel 用 作者的功能會有個怪怪的問題(刪除文章的部分很玄)，但在 localhost 就可以。


## Demo 影片
拍得有點陽春: https://drive.google.com/file/d/1zPlg8NB_rxf4PPTu7lvigBtcsZRnjwOS/view?usp=sharing
