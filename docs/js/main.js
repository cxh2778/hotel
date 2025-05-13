// 等待 DOM 加载
document.addEventListener('DOMContentLoaded', function() {

    // 日期选择
    const dateInput = document.querySelector('.dates input');
    if (dateInput) {
        // 获取今天和明天的日期
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // 格式化日期
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        // 获取月份名称
        const getMonthName = (month) => {
            const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                               '七月', '八月', '九月', '十月', '十一月', '十二月'];
            return monthNames[month];
        };
        
        // 设置默认日期显示
        const todayFormatted = formatDate(today);
        const tomorrowFormatted = formatDate(tomorrow);
        dateInput.placeholder = `${todayFormatted} — ${tomorrowFormatted}`;
        
        // 设置日期选择状态
        let startDate = today;
        let endDate = tomorrow;
        let isSelectingEndDate = false;
        
        // 创建日历容器 - 放在body中而不是表单内，以避免被其他元素遮挡
        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'calendar-container';
        calendarContainer.style.position = 'fixed'; // 改为fixed定位
        calendarContainer.style.backgroundColor = 'white';
        calendarContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        calendarContainer.style.borderRadius = '4px';
        calendarContainer.style.zIndex = '99999'; // 超高z-index确保在最上层
        calendarContainer.style.padding = '20px';
        calendarContainer.style.display = 'none'; // 初始隐藏
        calendarContainer.style.flexDirection = 'column';
        calendarContainer.style.width = '600px';
        
        // 将日历容器添加到body
        document.body.appendChild(calendarContainer);
        
        // 将整个搜索框设置为相对定位，防止被遮挡
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.style.position = 'relative';
            searchBox.style.zIndex = '1001'; // 确保搜索框在页面上层
        }
        
        // 更新日期输入框显示
        const updateDateInput = () => {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            dateInput.value = `${formattedStartDate} — ${formattedEndDate}`;
        };
        
        // 生成日历标题
        const createCalendarHeader = (date) => {
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.marginBottom = '10px';
            
            const monthTitle = document.createElement('h3');
            monthTitle.textContent = `${getMonthName(date.getMonth())} ${date.getFullYear()}`;
            monthTitle.style.margin = '0';
            monthTitle.style.color = '#333'; // 确保标题颜色可见
            
            const navButtons = document.createElement('div');
            
            const prevButton = document.createElement('button');
            prevButton.textContent = '←';
            prevButton.style.background = 'none';
            prevButton.style.border = 'none';
            prevButton.style.cursor = 'pointer';
            prevButton.style.fontSize = '16px';
            prevButton.style.marginRight = '10px';
            prevButton.style.color = '#333'; // 确保按钮颜色可见
            
            const nextButton = document.createElement('button');
            nextButton.textContent = '→';
            nextButton.style.background = 'none';
            nextButton.style.border = 'none';
            nextButton.style.cursor = 'pointer';
            nextButton.style.fontSize = '16px';
            nextButton.style.color = '#333'; // 确保按钮颜色可见
            
            navButtons.appendChild(prevButton);
            navButtons.appendChild(nextButton);
            
            header.appendChild(monthTitle);
            header.appendChild(navButtons);
            
            return { header, prevButton, nextButton };
        };
        
        // 生成日历
        const generateCalendar = (targetDate = new Date()) => {
            calendarContainer.innerHTML = '';
            
            // 创建标题区域
            const calendarTitle = document.createElement('div');
            calendarTitle.textContent = '选择日期范围';
            calendarTitle.style.fontWeight = 'bold';
            calendarTitle.style.fontSize = '18px';
            calendarTitle.style.marginBottom = '20px';
            calendarTitle.style.color = '#333'; // 确保标题颜色可见
            calendarContainer.appendChild(calendarTitle);
            
            // 创建日历网格容器
            const calendarGrid = document.createElement('div');
            calendarGrid.style.display = 'flex';
            calendarGrid.style.gap = '20px';
            calendarGrid.style.marginBottom = '15px';
            
            // 生成两个月的日历（当前月和下个月）
            for (let i = 0; i < 2; i++) {
                const monthDate = new Date(targetDate);
                monthDate.setMonth(monthDate.getMonth() + i);
                
                const monthContainer = document.createElement('div');
                monthContainer.style.flex = '1';
                monthContainer.style.border = '1px solid #e6e6e6';
                monthContainer.style.borderRadius = '6px';
                monthContainer.style.padding = '15px';
                
                // 创建月份标题
                const { header, prevButton, nextButton } = createCalendarHeader(monthDate);
                header.style.marginBottom = '15px';
                monthContainer.appendChild(header);
                
                // 添加导航按钮功能
                if (i === 0) {
                    prevButton.addEventListener('click', () => {
                        const newDate = new Date(targetDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        generateCalendar(newDate);
                    });
                }
                
                if (i === 1) {
                    nextButton.addEventListener('click', () => {
                        const newDate = new Date(targetDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        generateCalendar(newDate);
                    });
                }
                
                // 创建星期标题
                const weekDaysContainer = document.createElement('div');
                weekDaysContainer.style.display = 'grid';
                weekDaysContainer.style.gridTemplateColumns = 'repeat(7, 1fr)';
                weekDaysContainer.style.textAlign = 'center';
                weekDaysContainer.style.fontWeight = 'bold';
                weekDaysContainer.style.color = '#666';
                weekDaysContainer.style.fontSize = '14px';
                weekDaysContainer.style.marginBottom = '10px';
                
                const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
                weekDays.forEach(day => {
                    const dayElem = document.createElement('div');
                    dayElem.textContent = day;
                    dayElem.style.padding = '5px 0';
                    weekDaysContainer.appendChild(dayElem);
                });
                
                monthContainer.appendChild(weekDaysContainer);
                
                // 创建日期网格
                const daysContainer = document.createElement('div');
                daysContainer.style.display = 'grid';
                daysContainer.style.gridTemplateColumns = 'repeat(7, 1fr)';
                daysContainer.style.gap = '2px';
                
                // 获取月份的第一天和最后一天
                const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
                const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
                
                // 填充月初的空白
                for (let j = 0; j < firstDay.getDay(); j++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.style.padding = '10px 0';
                    emptyDay.style.textAlign = 'center';
                    daysContainer.appendChild(emptyDay);
                }
                
                // 填充日期
                for (let day = 1; day <= lastDay.getDate(); day++) {
                    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
                    const dayElem = document.createElement('div');
                    dayElem.textContent = day;
                    dayElem.style.padding = '10px 0';
                    dayElem.style.textAlign = 'center';
                    dayElem.style.cursor = 'pointer';
                    dayElem.style.borderRadius = '50%';
                    dayElem.style.margin = '2px';
                    dayElem.style.transition = 'all 0.2s ease';
                    dayElem.style.color = '#333'; // 默认颜色为深色，确保在白色背景上可见
                    
                    // 检查是否是今天
                    const isToday = date.toDateString() === today.toDateString();
                    if (isToday) {
                        dayElem.style.fontWeight = 'bold';
                        dayElem.style.border = '1px solid #0071c2';
                    }
                    
                    // 检查是否是过去的日期
                    const isPast = date < today && date.toDateString() !== today.toDateString();
                    if (isPast) {
                        dayElem.style.color = '#ccc';
                        dayElem.style.cursor = 'not-allowed';
                    } else {
                        // 检查是否是开始日期或结束日期
                        const isStartDate = date.toDateString() === startDate.toDateString();
                        const isEndDate = date.toDateString() === endDate.toDateString();
                        const isBetweenDates = date > startDate && date < endDate;
                        
                        if (isStartDate) {
                            dayElem.style.backgroundColor = '#0071c2';
                            dayElem.style.color = 'white'; // 确保选中日期的文字是白色（在蓝色背景上）
                        } else if (isEndDate) {
                            dayElem.style.backgroundColor = '#0071c2';
                            dayElem.style.color = 'white'; // 确保选中日期的文字是白色（在蓝色背景上）
                        } else if (isBetweenDates) {
                            dayElem.style.backgroundColor = '#e6f2fa';
                            dayElem.style.color = '#333'; // 中间日期范围使用深色文字
                        }
                        
                        // 鼠标悬停效果
                        dayElem.addEventListener('mouseenter', function() {
                            if (!isStartDate && !isEndDate && !isBetweenDates) {
                                this.style.backgroundColor = '#f0f0f0';
                                this.style.transform = 'scale(1.1)';
                            }
                        });
                        
                        dayElem.addEventListener('mouseleave', function() {
                            if (!isStartDate && !isEndDate && !isBetweenDates) {
                                this.style.backgroundColor = '';
                                this.style.transform = 'scale(1)';
                            }
                        });
                        
                        // 添加日期点击事件
                        dayElem.addEventListener('click', () => {
                            if (isPast) return;
                            
                            if (!isSelectingEndDate) {
                                // 选择开始日期
                                startDate = new Date(date);
                                endDate = new Date(date);
                                endDate.setDate(endDate.getDate() + 1);
                                isSelectingEndDate = true;
                            } else {
                                // 选择结束日期
                                if (date < startDate) {
                                    // 如果点击的日期早于开始日期，则交换它们
                                    endDate = new Date(startDate);
                                    startDate = new Date(date);
                                } else {
                                    endDate = new Date(date);
                                }
                                isSelectingEndDate = false;
                            }
                            
                            // 重新生成日历以更新显示
                            generateCalendar(targetDate);
                        });
                    }
                    
                    daysContainer.appendChild(dayElem);
                }
                
                monthContainer.appendChild(daysContainer);
                calendarGrid.appendChild(monthContainer);
            }
            
            calendarContainer.appendChild(calendarGrid);
            
            // 创建按钮区域
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.marginTop = '15px';
            
            const applyButton = document.createElement('button');
            applyButton.textContent = '确认';
            applyButton.style.backgroundColor = '#0071c2';
            applyButton.style.color = 'white';
            applyButton.style.border = 'none';
            applyButton.style.borderRadius = '4px';
            applyButton.style.padding = '10px 20px';
            applyButton.style.cursor = 'pointer';
            applyButton.style.marginLeft = '10px';
            applyButton.style.transition = 'background-color 0.3s';
            applyButton.style.fontWeight = 'bold'; // 改进字体排版
            
            applyButton.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#005999';
            });
            
            applyButton.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#0071c2';
            });
            
            const cancelButton = document.createElement('button');
            cancelButton.textContent = '取消';
            cancelButton.style.backgroundColor = '#f2f2f2';
            cancelButton.style.color = '#333';
            cancelButton.style.border = 'none';
            cancelButton.style.borderRadius = '4px';
            cancelButton.style.padding = '10px 20px';
            cancelButton.style.cursor = 'pointer';
            cancelButton.style.transition = 'background-color 0.3s';
            cancelButton.style.fontWeight = 'bold'; // 改进字体排版
            
            cancelButton.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e6e6e6';
            });
            
            cancelButton.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#f2f2f2';
            });
            
            buttonContainer.appendChild(cancelButton);
            buttonContainer.appendChild(applyButton);
            
            calendarContainer.appendChild(buttonContainer);
            
            // 确认按钮点击事件
            applyButton.addEventListener('click', () => {
                updateDateInput();
                calendarContainer.style.display = 'none';
            });
            
            // 取消按钮点击事件
            cancelButton.addEventListener('click', () => {
                calendarContainer.style.display = 'none';
            });
        };
        
        // 创建一个遮罩层，用于点击弹出面板时防止点击穿透
        const createOverlay = (visible = false) => {
            let overlay = document.getElementById('popup-overlay');
            
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'popup-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // 半透明背景以更好地显示遮罩效果
                overlay.style.zIndex = '99990'; // 确保在页面最上层但低于弹出面板
                overlay.style.display = 'none';
                document.body.appendChild(overlay);
            }
            
            overlay.style.display = visible ? 'block' : 'none';
            return overlay;
        };
        
        // 定位日历面板 - 相对于输入框
        const positionCalendar = () => {
            const inputRect = dateInput.getBoundingClientRect();
            calendarContainer.style.top = `${inputRect.bottom + window.scrollY}px`;
            calendarContainer.style.left = `${inputRect.left + window.scrollX}px`;
            
            // 检查是否会超出视窗右侧，如果是则向左调整
            const calendarWidth = 600; // 日历宽度
            if (inputRect.left + calendarWidth > window.innerWidth) {
                calendarContainer.style.left = `${window.innerWidth - calendarWidth - 20 + window.scrollX}px`;
            }
        };
        
        // 日期输入框点击处理
        dateInput.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 隐藏其他弹出面板
            const guestsSelector = document.querySelector('.guests-selector');
            const suggestionsDiv = document.querySelector('.destination-suggestions');
            
            if (guestsSelector) guestsSelector.style.display = 'none';
            if (suggestionsDiv) suggestionsDiv.style.display = 'none';
            
            // 显示遮罩层
            const overlay = createOverlay(true);
            
            // 定位并显示日历
            positionCalendar();
            calendarContainer.style.display = 'flex';
            generateCalendar();
            
            // 添加遮罩层点击事件
            overlay.onclick = function() {
                calendarContainer.style.display = 'none';
                this.style.display = 'none';
            };
        });
    }

    // 目的地输入框交互
    const destinationInput = document.querySelector('.destination input');
    if (destinationInput) {
        const destinations = [
            '北京', '上海', '广州', '深圳', '成都', '杭州', '南京', '西安',
            '三亚', '厦门', '重庆', '青岛', '大连', '苏州', '丽江', '香港'
        ];
        
        // 创建一个简单的下拉菜单 - 放在body中而不是表单内
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'destination-suggestions';
        suggestionsDiv.style.display = 'none';
        suggestionsDiv.style.position = 'fixed'; // 改为fixed定位
        suggestionsDiv.style.backgroundColor = 'white';
        suggestionsDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        suggestionsDiv.style.borderRadius = '4px';
        suggestionsDiv.style.zIndex = '99999'; // 超高z-index确保在最上层
        suggestionsDiv.style.maxHeight = '200px';
        suggestionsDiv.style.overflowY = 'auto';
        
        // 将建议列表添加到body
        document.body.appendChild(suggestionsDiv);
        
        // 定位建议列表
        const positionSuggestions = () => {
            const inputRect = destinationInput.getBoundingClientRect();
            suggestionsDiv.style.top = `${inputRect.bottom + window.scrollY}px`;
            suggestionsDiv.style.left = `${inputRect.left + window.scrollX}px`;
            suggestionsDiv.style.width = `${inputRect.width}px`;
        };
        
        // 输入框事件
        destinationInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            
            // 过滤匹配的目的地
            const filtered = destinations.filter(dest => 
                dest.toLowerCase().includes(value)
            );
            
            // 更新建议列表
            suggestionsDiv.innerHTML = '';
            
            if (value && filtered.length > 0) {
                filtered.forEach(dest => {
                    const item = document.createElement('div');
                    item.className = 'suggestion-item';
                    item.textContent = dest;
                    item.style.padding = '10px 15px';
                    item.style.cursor = 'pointer';
                    item.style.color = '#333'; // 确保文字颜色可见
                    
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = '#f0f0f0';
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = 'transparent';
                    });
                    
                    item.addEventListener('click', function() {
                        destinationInput.value = dest;
                        suggestionsDiv.style.display = 'none';
                        const overlay = document.getElementById('popup-overlay');
                        if (overlay) overlay.style.display = 'none';
                    });
                    
                    suggestionsDiv.appendChild(item);
                });
                
                // 定位并显示建议列表
                positionSuggestions();
                suggestionsDiv.style.display = 'block';
                
                // 显示遮罩层
                createOverlay(true);
            } else {
                suggestionsDiv.style.display = 'none';
                const overlay = document.getElementById('popup-overlay');
                if (overlay) overlay.style.display = 'none';
            }
        });
        
        // 目的地输入框点击处理
        destinationInput.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 隐藏其他弹出面板
            const calendarContainer = document.querySelector('.calendar-container');
            const guestsSelector = document.querySelector('.guests-selector');
            
            if (calendarContainer) calendarContainer.style.display = 'none';
            if (guestsSelector) guestsSelector.style.display = 'none';
            
            // 如果已经有内容，则显示建议
            if (this.value.trim().length > 0) {
                // 触发input事件来显示建议
                const inputEvent = new Event('input');
                this.dispatchEvent(inputEvent);
            }
        });
    }

    // 处理客房和旅客选择
    const guestsInput = document.querySelector('.guests input');
    if (guestsInput) {
        // 创建一个客房和旅客选择器 - 放在body中而不是表单内
        const guestsSelector = document.createElement('div');
        guestsSelector.className = 'guests-selector';
        guestsSelector.style.display = 'none';
        guestsSelector.style.position = 'fixed'; // 改为fixed定位
        guestsSelector.style.backgroundColor = 'white';
        guestsSelector.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        guestsSelector.style.borderRadius = '4px';
        guestsSelector.style.zIndex = '99999'; // 超高z-index确保在最上层
        guestsSelector.style.padding = '20px';
        guestsSelector.style.width = '300px';
        
        // 将选择器添加到body
        document.body.appendChild(guestsSelector);
        
        // 定位选择器
        const positionGuestsSelector = () => {
            const inputRect = guestsInput.getBoundingClientRect();
            guestsSelector.style.top = `${inputRect.bottom + window.scrollY}px`;
            guestsSelector.style.left = `${inputRect.left + window.scrollX}px`;
            
            // 检查是否会超出视窗右侧，如果是则向左调整
            const selectorWidth = 300; // 选择器宽度
            if (inputRect.left + selectorWidth > window.innerWidth) {
                guestsSelector.style.left = `${inputRect.right - selectorWidth + window.scrollX}px`;
            }
        };
        
        // 客房和旅客数量
        let adults = 2;
        let children = 0;
        let rooms = 1;
        
        // 更新输入框显示
        const updateGuestsInput = () => {
            guestsInput.value = `${adults}位成人 · ${children}位儿童 · ${rooms}间客房`;
        };
        
        // 创建选择器内容
        const createSelector = () => {
            guestsSelector.innerHTML = '';
            
            // 标题
            const title = document.createElement('div');
            title.textContent = '客房与旅客';
            title.style.fontWeight = 'bold';
            title.style.fontSize = '18px';
            title.style.marginBottom = '20px';
            title.style.color = '#333'; // 确保标题颜色可见
            guestsSelector.appendChild(title);
            
            // 成人选择器
            const adultsContainer = createCounterItem('成人', adults, (value) => {
                adults = value;
                updateGuestsInput();
            }, 1, 30);
            guestsSelector.appendChild(adultsContainer);
            
            // 儿童选择器
            const childrenContainer = createCounterItem('儿童', children, (value) => {
                children = value;
                updateGuestsInput();
            }, 0, 10);
            guestsSelector.appendChild(childrenContainer);
            
            // 客房选择器
            const roomsContainer = createCounterItem('客房', rooms, (value) => {
                rooms = value;
                updateGuestsInput();
            }, 1, 30);
            guestsSelector.appendChild(roomsContainer);
            
            // 按钮区域
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.marginTop = '20px';
            
            const doneButton = document.createElement('button');
            doneButton.textContent = '完成';
            doneButton.style.backgroundColor = '#0071c2';
            doneButton.style.color = 'white';
            doneButton.style.border = 'none';
            doneButton.style.borderRadius = '4px';
            doneButton.style.padding = '8px 16px';
            doneButton.style.cursor = 'pointer';
            doneButton.style.fontWeight = 'bold'; // 改进字体排版
            
            doneButton.addEventListener('click', () => {
                guestsSelector.style.display = 'none';
            });
            
            buttonContainer.appendChild(doneButton);
            guestsSelector.appendChild(buttonContainer);
        };
        
        // 创建计数器项
        const createCounterItem = (label, initialValue, onChange, min, max) => {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'space-between';
            container.style.alignItems = 'center';
            container.style.marginBottom = '15px';
            
            const labelElem = document.createElement('div');
            labelElem.textContent = label;
            labelElem.style.color = '#333'; // 确保标签文字颜色可见
            
            const counterContainer = document.createElement('div');
            counterContainer.style.display = 'flex';
            counterContainer.style.alignItems = 'center';
            
            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.style.width = '30px';
            decreaseBtn.style.height = '30px';
            decreaseBtn.style.border = '1px solid #ccc';
            decreaseBtn.style.borderRadius = '50%';
            decreaseBtn.style.backgroundColor = initialValue <= min ? '#f2f2f2' : 'white';
            decreaseBtn.style.cursor = initialValue <= min ? 'not-allowed' : 'pointer';
            decreaseBtn.style.fontSize = '16px';
            decreaseBtn.style.color = '#333'; // 确保按钮文字颜色可见
            
            const valueElem = document.createElement('span');
            valueElem.textContent = initialValue;
            valueElem.style.margin = '0 10px';
            valueElem.style.minWidth = '20px';
            valueElem.style.textAlign = 'center';
            valueElem.style.color = '#333'; // 确保数值文字颜色可见
            
            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.style.width = '30px';
            increaseBtn.style.height = '30px';
            increaseBtn.style.border = '1px solid #ccc';
            increaseBtn.style.borderRadius = '50%';
            increaseBtn.style.backgroundColor = initialValue >= max ? '#f2f2f2' : 'white';
            increaseBtn.style.cursor = initialValue >= max ? 'not-allowed' : 'pointer';
            increaseBtn.style.fontSize = '16px';
            increaseBtn.style.color = '#333'; // 确保按钮文字颜色可见
            
            // 减少按钮点击事件
            decreaseBtn.addEventListener('click', () => {
                let value = parseInt(valueElem.textContent);
                if (value > min) {
                    value--;
                    valueElem.textContent = value;
                    onChange(value);
                    
                    // 更新按钮状态
                    decreaseBtn.style.backgroundColor = value <= min ? '#f2f2f2' : 'white';
                    decreaseBtn.style.cursor = value <= min ? 'not-allowed' : 'pointer';
                    increaseBtn.style.backgroundColor = 'white';
                    increaseBtn.style.cursor = 'pointer';
                }
            });
            
            // 增加按钮点击事件
            increaseBtn.addEventListener('click', () => {
                let value = parseInt(valueElem.textContent);
                if (value < max) {
                    value++;
                    valueElem.textContent = value;
                    onChange(value);
                    
                    // 更新按钮状态
                    increaseBtn.style.backgroundColor = value >= max ? '#f2f2f2' : 'white';
                    increaseBtn.style.cursor = value >= max ? 'not-allowed' : 'pointer';
                    decreaseBtn.style.backgroundColor = 'white';
                    decreaseBtn.style.cursor = 'pointer';
                }
            });
            
            counterContainer.appendChild(decreaseBtn);
            counterContainer.appendChild(valueElem);
            counterContainer.appendChild(increaseBtn);
            
            container.appendChild(labelElem);
            container.appendChild(counterContainer);
            
            return container;
        };
        
        // 初始化显示
        updateGuestsInput();
        
        // 客房和旅客选择器点击事件
        guestsInput.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 隐藏其他弹出面板
            const calendarContainer = document.querySelector('.calendar-container');
            const suggestionsDiv = document.querySelector('.destination-suggestions');
            
            if (calendarContainer) calendarContainer.style.display = 'none';
            if (suggestionsDiv) suggestionsDiv.style.display = 'none';
            
            // 显示遮罩层
            const overlay = createOverlay(true);
            
            // 定位并显示选择器
            positionGuestsSelector();
            createSelector();
            guestsSelector.style.display = 'block';
            
            // 添加遮罩层点击事件
            overlay.onclick = function() {
                guestsSelector.style.display = 'none';
                this.style.display = 'none';
            };
        });
    }

    // 窗口大小改变时重新定位弹出面板
    window.addEventListener('resize', function() {
        const calendarContainer = document.querySelector('.calendar-container');
        const guestsSelector = document.querySelector('.guests-selector');
        const suggestionsDiv = document.querySelector('.destination-suggestions');
        
        if (calendarContainer && calendarContainer.style.display !== 'none') {
            positionCalendar();
        }
        
        if (guestsSelector && guestsSelector.style.display !== 'none') {
            positionGuestsSelector();
        }
        
        if (suggestionsDiv && suggestionsDiv.style.display !== 'none') {
            positionSuggestions();
        }
    });

    // 点击其他地方时关闭所有弹出面板
    document.addEventListener('click', function(e) {
        const calendarContainer = document.querySelector('.calendar-container');
        const guestsSelector = document.querySelector('.guests-selector');
        const suggestionsDiv = document.querySelector('.destination-suggestions');
        const overlay = document.getElementById('popup-overlay');
        
        const dateInput = document.querySelector('.dates input');
        const guestsInput = document.querySelector('.guests input');
        const destinationInput = document.querySelector('.destination input');
        
        // 检查点击的目标是否是弹出面板或其输入框
        const isCalendarClick = calendarContainer && (calendarContainer.contains(e.target) || e.target === dateInput);
        const isGuestsClick = guestsSelector && (guestsSelector.contains(e.target) || e.target === guestsInput);
        const isSuggestionsClick = suggestionsDiv && (suggestionsDiv.contains(e.target) || e.target === destinationInput);
        
        // 如果点击的不是任何弹出面板或相关输入框，则关闭所有弹出面板和遮罩层
        if (!isCalendarClick && !isGuestsClick && !isSuggestionsClick) {
            if (calendarContainer) calendarContainer.style.display = 'none';
            if (guestsSelector) guestsSelector.style.display = 'none';
            if (suggestionsDiv) suggestionsDiv.style.display = 'none';
            if (overlay) overlay.style.display = 'none';
        }
    });

    // 搜索表单提交
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = document.querySelector('.destination input').value;
            alert(`您正在搜索 ${destination} 的住宿。在实际应用中，这将跳转到搜索结果页面。`);
        });
    }

    // 处理特别优惠卡片点击
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.offer-title').textContent;
            alert(`您点击了"${title}"优惠。在实际应用中，这将跳转到相应的优惠详情页面。`);
        });
    });

    // 处理目的地卡片点击
    const destinationCards = document.querySelectorAll('.destination-card');
    destinationCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.destination-title').textContent;
            
            // 对成都进行特殊处理，跳转到成都页面
            if (title === '成都') {
                window.location.href = 'chengdu.html';
            } else {
                alert(`您点击了"${title}"目的地。在实际应用中，这将跳转到相应的目的地页面。`);
            }
        });
    });

    // 住宿类型卡片点击
    const propertyTypeCards = document.querySelectorAll('.property-type-card');
    propertyTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.property-type-title').textContent;
            alert(`您点击了"${title}"住宿类型。在实际应用中，这将显示相应类型的住宿列表。`);
        });
    });

    // 处理语言选择器点击
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function() {
            alert('语言和货币选择功能将在实际应用中启用');
        });
    }

    // 处理注册和登录按钮
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    

    // 处理通讯订阅
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`感谢您的订阅！我们会向 ${email} 发送最新优惠和资讯。`);
            this.reset();
        });
    }

    // 滚动动画效果
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.offers-grid, .destinations-grid, .property-types-grid');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 初始样式设置
    const elementsToAnimate = document.querySelectorAll('.offers-grid, .destinations-grid, .property-types-grid');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // 页面加载和滚动时检查
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}); 