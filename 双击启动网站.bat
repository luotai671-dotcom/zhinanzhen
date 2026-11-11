@echo off
chcp 65001 >nul
title 机场指南针 - 极速本地开发预览服务
echo ========================================================
echo   🧭 正在启动「机场指南针」VPN与机场评测博客...
echo   ⚡ 包含：明暗主题切换、跑路预警、选机助手、三网测速模拟
echo ========================================================
echo.
echo [1/2] 正在唤起本地服务...
echo [2/2] 正在自动为您打开浏览器: http://localhost:4321
start "" powershell -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:4321'"
npm run dev
pause
