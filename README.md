# 台指期風控監控台

配合 Google Sheets 台指期交易監控 V7.5 使用的深色網頁儀表板。

## 預覽

開啟 `index.html`。預覽使用示範數字，支援匯入 JSON 快照；匯入內容只保留於當頁記憶體。

## 連接 Google Sheet

將 `apps-script/WebMonitor.gs` 與 `apps-script/Monitor.html` 加入現有試算表綁定的 Apps Script 專案。
執行 `setupWebMonitor` 一次，再部署為僅自己可存取的網頁應用程式。詳細步驟請參閱「安裝說明.txt」。

正式網頁讀取 Overview、台指換倉與月份庫存損益。先在 Sheet 執行「更新監控」，再於網頁按「重新讀取」。
GitHub 上傳僅保存程式；GitHub 靜態頁面無法直接執行 `google.script.run`，正式 Sheet 版須透過 Apps Script 部署網址開啟。

## 功能

- 權益、損益、保證金與總名目曝險
- 槓桿儀表、月份庫存
- 雙向同步平移壓力試算
- 保留現有 V7.5 FIFO、合約月份與交易流程

程式目前按 V7.5 固定輸出座標讀取；變更 Sheet 排版時需一併調整。
網頁執行環境可能無法取得 document lock，請待 Sheet 更新結束後讀取。
帳戶權益為手動快照、Yahoo 行情非即時保證，請核對資料時間。

本專案不包含實際帳戶快照、Google Sheet ID 或登入憑證。
