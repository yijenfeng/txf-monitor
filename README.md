# 台指期風控監控台

配合 Google Sheets 台指期交易監控 V7.5 使用的深色網頁儀表板。

## 在 GitHub 網頁讀取 Sheet

開啟 https://yijenfeng.github.io/txf-monitor/ ，按「連接 Google Sheet」。輸入 Google OAuth 用戶端 ID 與 Sheet 網址，以有檔案權限的 Google 帳號登入，即可直接讀取私人試算表。

第一次使用需要完成 [Google 登入設定](Google登入設定.md)。存取權限為唯讀；登入權杖與帳戶資料僅保留在本頁記憶體，不會寫入 GitHub。登入到期或重新整理後需重新連接。

尚未連接時顯示明確標記的示範資料，也支援匯入離線 JSON 快照。

## Apps Script 版本

`apps-script/` 保留適用於試算表綁定專案的獨立網頁版本，詳見「安裝說明.txt」。GitHub 版改用 Google Sheets API，無須把 Sheet 設成公開。

## 更新與功能

先在 Sheet 執行「更新監控」，待完成後於網頁按「重新讀取」。網頁不重算 FIFO、不修改交易、不抓取新行情。

- 權益、損益、保證金與總名目曝險
- 槓桿儀表、月份庫存
- 雙向同步平移壓力試算
- 保留現有 V7.5 合約月份與交易流程

讀取 Overview、台指換倉、風控設定與月份庫存損益的固定範圍，變更 Sheet 版面時需同步調整程式。
多範圍讀取不保證與正在執行的 Apps Script 更新同步，請待 Sheet 更新完成後再讀取。
帳戶權益為手動快照、Yahoo 行情非即時保證，請核對資料時間。

本專案不包含實際帳戶快照、Google Sheet ID 或私人登入憑證。
