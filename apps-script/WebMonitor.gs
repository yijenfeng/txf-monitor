// 新增此檔案，不取代既有 V7.5 程式。Monitor.html 必須同在專案。
// 第一次在試算表綁定的 Apps Script 編輯器手動執行 setupWebMonitor。
function setupWebMonitor() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('請從目標 Sheet 的擴充功能開啟此專案');
  PropertiesService.getScriptProperties().setProperty('TXF_WEB_SHEET_ID', ss.getId());
}
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Monitor')
    .setTitle('台指期｜風控監控台')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
function getMonitorSnapshot() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) throw new Error('正在讀取，請稍後重試');
  // 綁定專案的 document lock 與 V7.5 更新使用同一把鎖；web app 下可能為 null。
  const documentLock = LockService.getDocumentLock();
  let hasDocumentLock = false;
  try {
    if (documentLock) {
      hasDocumentLock = documentLock.tryLock(1000);
      if (!hasDocumentLock) throw new Error('Sheet 正在更新，請稍後重試');
    }
    const id = PropertiesService.getScriptProperties().getProperty('TXF_WEB_SHEET_ID');
    if (!id) throw new Error('請先在 Apps Script 執行 setupWebMonitor');
    const ss = SpreadsheetApp.openById(id), sh = ss.getSheetByName('Overview');
    if (!sh || sh.getRange('A1').getValue() !== '期貨帳戶監控') throw new Error('請先用 V7.5 成功更新監控');
    const v = sh.getRange('A1:H23').getValues();
    function num(row,col) {
      const x=v[row-1][col-1];
      if(typeof x !== 'number' || !Number.isFinite(x)) throw new Error('監控數值缺漏：'+row+','+col);
      return x;
    }
    const roll = ss.getSheetByName('台指換倉');
    if (!roll) throw new Error('缺少台指換倉頁');
    const q=roll.getRange('A7:B7').getValues()[0];
    if(q.some(x=>typeof x!=='number'||!Number.isFinite(x))) throw new Error('缺少近遠月報價');
    const risk=ss.getSheetByName('風控設定');
    if(!risk) throw new Error('缺少風控設定');
    const reserve=risk.getRange('B3').getValue();
    if(typeof reserve!=='number'||!Number.isFinite(reserve)) throw new Error('備用金設定無效');
    const ps=v.slice(9,12), totals=v[12];
    const months=ss.getSheetByName('月份庫存損益');
    const initial=num(18,2), equity=num(17,2), maintenance=num(19,2);
    const signedPoint=ps.reduce((sum,r)=>sum+(Number(r[1])-Number(r[2]))*({TX:200,MTX:50,TMF:10}[r[0]]||0),0);
    const result={demo:false,updated:String(v[1][0]),equity:equity,initial:initial,maintenance:maintenance,
      liquidation:initial>0?num(21,2):0,reserve:reserve,pointRisk:signedPoint,
      exposure:Number(totals[4]),pnl:Number(totals[5]),realized:Number(totals[6]),
      near:q[0],far:q[1],positions:ps,
      months:months?months.getDataRange().getDisplayValues().filter(r=>r.some(x=>x!=='')):[]};
    return JSON.parse(JSON.stringify(result));
  } finally {
    if(hasDocumentLock) documentLock.releaseLock();
    lock.releaseLock();
  }
}
function exportMonitorJson() {
  const file=DriveApp.createFile('台指監控快照.json',JSON.stringify(getMonitorSnapshot()),MimeType.PLAIN_TEXT);
  console.log(file.getUrl());
}
