![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以簡潔的介面協助使用者新增、整理與管理日常待辦事項，並透過瀏覽器儲存資料，讓內容在重新整理後仍能保留。

## 線上展示

[GitHub Pages 線上展示](https://seditor.github.io/copilot-workshop-agent-mode-mcp/)



## 功能

- 新增待辦事項，輸入空白內容時不會新增。
- 勾選待辦事項標記為完成，完成項目會顯示刪除線並淡化。
- 取消完成狀態，讓待辦事項回到未完成狀態。
- 刪除單筆待辦事項。
- 顯示整體清單的「未完成：N 項」計數。
- 顯示全部、未完成、已完成三種篩選結果。
- 篩選結果為空時顯示對應提示，說明項目狀態或目前篩選結果。
- 清除所有已完成項目，執行前會顯示確認對話框。
- 沒有已完成項目時，清除按鈕會停用。
- 深色／淺色模式切換，並顯示對應的圖示與文字。
- 記住使用者的主題偏好；使用者未手動設定時，跟隨作業系統的深淺色設定。
- 使用 `localStorage` 保存待辦事項與主題偏好。
- 支援手機螢幕的響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架或外部套件，沒有 `package.json`，也沒有建置流程。
- 不引用外部 CDN，可直接離線開啟。
- 使用 CSS 變數管理淺色與深色主題。
- 使用瀏覽器 `localStorage` 保存資料。
- 根目錄主要檔案如下：
  - `index.html`：頁面結構與表單、篩選控制項。
  - `styles.css`：版面、響應式樣式與主題配色。
  - `app.js`：待辦資料、篩選、主題與儲存邏輯。

## 開發方式

這個專案是在 GitHub Copilot 實戰工作坊中，逐步使用以下方式完成：

- **GitHub Copilot Agent Mode**：先以完整需求描述建立待辦清單的基礎版本，再依功能需求擴充深色模式、篩選與批次清除功能。
- **MCP**：透過 MCP 設定連接 Microsoft Learn 與 GitHub，查詢官方文件、檢查色彩對比建議，以及讀取與處理 GitHub Issue。
- **`.github/prompts` 的 agentic workflow**：使用 `.github/prompts/fix-issue.prompt.md` 定義從讀取 Issue、提出計畫、建立分支、修改與驗證，到提交、推送及建立 Pull Request 的工作流程。
- **專案規範**：以 `.github/copilot-instructions.md` 記錄技術限制、程式風格與協作方式，讓後續修改維持一致。

## 我學到什麼

- 如何用清楚的需求描述，讓 Agent Mode 從既定規格開始規劃與修改多個檔案。
- 如何使用 `localStorage` 保存前端應用程式的使用者資料與偏好設定。
- 如何用 `prefers-color-scheme` 與 CSS 變數實作可切換、可跟隨系統設定的主題。
- 如何透過 MCP 查詢官方文件與 GitHub Issue，讓實作決策有可靠依據。
- 如何把修復 Issue 的步驟整理成可重複使用的 prompt，並搭配分支、驗證與 Pull Request 完成變更流程。
