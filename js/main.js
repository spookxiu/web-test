document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const homeVideoContainer = document.getElementById("home-content");
    const contentSections = document.querySelectorAll(".content-section");
    const separatorLine = document.querySelector(".separator-line");
    let currentTab = null;
    let currentLang = "en"; // 默认语言改为英文

    // 语言切换元素
    const langSwitchers = document.querySelectorAll(".lang");
    
    // 切换语言样式和内容
    function switchLang(langElement) {
        // 移除所有语言选项的active类
        langSwitchers.forEach(lang => lang.classList.remove("active"));
        
        // 设置当前选中的语言
        currentLang = langElement.getAttribute("data-lang");
        
        // 添加active类到当前选中的语言
        langElement.classList.add("active");
        
        // 更新所有内容区域的语言显示
        updateLanguageContent(currentLang);
    }

    // 更新所有内容区域的语言显示
    function updateLanguageContent(lang) {
        // 获取所有内容部分
        const sections = document.querySelectorAll(".content-section");
        
        sections.forEach(section => {
            // 获取所有语言版本的内容
            const languageContents = section.querySelectorAll(".language-content");
            
            // 显示对应语言的内容，隐藏其他语言的内容
            languageContents.forEach(content => {
                if (content.classList.contains(lang)) {
                    content.style.display = "block";
                } else {
                    content.style.display = "none";
                }
            });
        });
    }

    // 切换tab样式和内容
    function switchTab(tab) {
        tabs.forEach(t => t.classList.remove("active"));
        contentSections.forEach(section => section.classList.remove("active"));
        
        if (separatorLine) {
            separatorLine.classList.remove("active");
        }

        if (tab) {
            tab.classList.add("active");
            const tabId = tab.getAttribute("data-tab");
            const contentSection = document.getElementById(tabId + "-content");
            
            if (contentSection) {
                contentSection.classList.add("active");
                currentTab = tabId;
            }
            
            // 隐藏主页视频区域
            const homeContent = document.getElementById("home-content");
            if (homeContent) {
                homeContent.style.display = "none";
            }
 
            // 显示分隔线
            if (separatorLine) {
                separatorLine.classList.add("active");
            }
        } else {
            currentTab = null;
            // 显示主页视频区域
            const homeContent = document.getElementById("home-content");
            if (homeContent) {
                homeContent.style.display = "block";
            }
            
            // 隐藏分隔线
            if (separatorLine) {
                separatorLine.classList.remove("active");
            }
        }
    }

    // 点击tab手动切换
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            switchTab(tab);
        });
    });

    // 添加点击视频区域切换到Work标签的功能
    homeVideoContainer.addEventListener("click", () => {
        const workTab = document.querySelector(".tab[data-tab='work']");
        if (workTab) {
            switchTab(workTab);
        }
    });

    // 添加点击logo返回主页并清除tab选中状态的功能
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("click", () => {
            switchTab(null);
        });
    }

    // 添加语言切换事件监听器
    langSwitchers.forEach(lang => {
        lang.addEventListener("click", () => {
            switchLang(lang);
        });
    });

    // 初始化语言状态（默认选中英文）
    const initialLang = document.querySelector(".lang[data-lang='en']");
    if (initialLang) {
        initialLang.classList.add("active");
    }
    
    // 初始化显示默认语言内容
    updateLanguageContent(currentLang);
    
    // 如果有激活的tab，显示对应内容
    const activeTab = document.querySelector(".tab.active");
    if (activeTab) {
        const tabId = activeTab.getAttribute("data-tab");
        const contentSection = document.getElementById(tabId + "-content");
        if (contentSection) {
            contentSection.classList.add("active");
            
            // 如果当前不是主页，隐藏主页视频区域
            const homeContent = document.getElementById("home-content");
            if (homeContent) {
                homeContent.style.display = "none";
            }
            
            // 如果分隔线存在，显示它
            const separatorLine = document.querySelector(".separator-line");
            if (separatorLine) {
                separatorLine.classList.add("active");
            }
        }
    } else {
        // 如果没有激活的tab，显示主页内容
        const homeContent = document.getElementById("home-content");
        if (homeContent) {
            homeContent.style.display = "block";
        }
    }
});