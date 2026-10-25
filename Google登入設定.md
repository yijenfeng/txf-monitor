# 在 GitHub 網頁直接讀取私人 Google Sheet

網站使用 Google Identity Services 登入，再由瀏覽器以 Sheets API 讀取 V7.5 輸出。

## 一次性設定

1. 選擇自己管理的 Google Cloud 專案，啟用 Google Sheets API。
2. 設定 Google Auth Platform 應用程式名稱、支援信箱與開發者聯絡信箱。
3. 使用個人 Gmail 時，Audience 選 External，保留 Testing，將自己加入測試使用者。
4. 建立 OAuth 用戶端，類型選 Web application。
5. Authorized JavaScript origins 填 `https://yijenfeng.github.io`，不包含 `/txf-monitor/` 路徑。
6. 取得 client ID（結尾為 `.apps.googleusercontent.com`）。網頁不需要 client secret。
7. 回到網站，按「連接 Google Sheet」，輸入 client ID 與 Sheet 網址，登入有該檔案讀取權限的 Google 帳號。

## 資料與權限

- 使用 `spreadsheets.readonly`；Google 的此授權範圍可讀帳號有權限的試算表，程式只讀你填寫的 Sheet。
- 存取權杖、Sheet 網址與讀取結果僅留在本頁記憶體。重新整理後需重新連接。
- 網頁不把帳戶資料上傳至 GitHub，也不需要公開 Sheet。
- Google OAuth 視窗須由使用者同意授權。
- 權杖到期時需重新登入；按重新讀取不會改動 Sheet 或重新抓行情。
- 試算表格式必須與 V7.5 的 Overview、台指換倉、風控設定及月份庫存損益相符。
- 目前月份庫存讀取範圍為 A1:H1000。
