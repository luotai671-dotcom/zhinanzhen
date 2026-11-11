---
title: "Clash Verge Rev 2026 终极保姆级新手配置与规则分流教程"
description: "由于Clash for Windows停更，Clash Verge Rev成为全平台最强接任者。本文从安装、订阅导入、TUN虚拟网卡模式、规则集智能分流全流程详解。"
pubDate: 2026-11-03
updatedDate: 2026-11-09
author: "网络协议实验室"
category: "客户端教程"
tags: ["Clash Verge Rev", "TUN模式", "分流规则", "新手教程", "订阅导入"]
readingTime: "6分钟"
featured: true
---

# Clash Verge Rev 2026 终极保姆级新手配置与规则分流教程

随着旧版 Clash for Windows 的停止维护，开源界基于 Tauri 框架打造的 **Clash Verge Rev** 凭借更轻的内存占用、现代化的界面与强大的 Mihomo (Clash Meta) 内核支持，已经成为当前 Windows / macOS / Linux 平台公认的王牌客户端。

本篇教程将手把手指导你在 3 分钟内完成从下载安装到订阅运行的全部步骤。

---

## 步骤一：软件下载与安装

1. 前往 GitHub 官方 Releases 页面下载最新稳定版本（例如 `Clash.Verge_x64-setup.exe` 或 macOS `.dmg`）。
2. 双击安装并启动程序。
3. 进入软件主界面，点击左侧菜单的 **“Settings (设置)”**，将语言切换为 **“中文 (简体)”**。

---

## 步骤二：获取并导入机场订阅链接

1. 登录你所购买的机场后台（如 [闪电鼠 (主推)](/airports/shandianshu) 或 [大佬云](/airports/dalaoyun)）。
2. 找到“便捷导入”或“复制订阅链接”，选择 **Clash 订阅** 或 **通用订阅**。
3. 返回 Clash Verge Rev，点击左侧导航的 **“订阅 (Profiles)”**。
4. 在顶部输入框粘贴刚才复制的订阅 URL，点击右侧的 **“导入”** 按钮。
5. 导入成功后，右键点击该订阅卡片，选择 **“使用 (Select)”**。

---

## 步骤三：模式选择与出海测试

1. 点击左侧 **“代理 (Proxies)”** 页面，顶部有三种模式：
   - **规则模式 (Rule)**【强烈推荐】：国内网站（百度、淘宝、微信）直连，外网（YouTube、Google、ChatGPT）走代理节点，省流量且不影响网速。
   - **全局模式 (Global)**：所有网络请求全部走代理，适合测试特定单节点连通性。
   - **直连模式 (Direct)**：完全不通过代理。
2. 展开节点列表，点击右上角的 **“测速 (WiFi图标)”**，选取一个延迟较低的绿色节点（例如香港或新加坡）。
3. 打开系统托盘，右键 Clash Verge 图标，勾选 **“系统代理 (System Proxy)”**。
4. 打开浏览器访问 `youtube.com` 或 `google.com`，即可享受极速跨境网络！

---

## 进阶技巧：开启 TUN 模式实现游戏与全系统免配置加速

如果你需要玩外服游戏、使用终端命令行（git clone / curl）或者使用未遵守系统代理设置的专业客户端，请在设置中开启 **TUN 模式**。它会创建一个虚拟网卡，接管整台电脑的全部网络底层流量。

