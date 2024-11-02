function displayLunar() {
    // 文檔：https://6tail.cn/calendar/api.html
    var today = new Date();
    // 從Date物件中獲取年、月和日
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // 月份從0開始，所以要加1
    var day = today.getDate();

    // 將日期顯示在網頁上或控制台上
    // console.log("國曆：" + year + "年" + month + "月" + day +"日");

    // 输入日期轉農曆
    var lunar = Solar.fromYmd(year, month, day).getLunar();    
    // console.log(lunar.toFullString());  // 輸出全部農曆資訊

    // 輸出結果前整理字串
    // var lunarYear = lunar.getYear();   // 获取农历年份
    let monthInChinese = lunar.getMonthInChinese();  // 获取农历國字月份
    let dayInChinese = lunar.getDayInChinese();  // 获取农历國字日份

    // lunarYear = lunarYear.replace(/\s/g, "");
    monthInChinese = monthInChinese.replace(/正/g, "元");
    monthInChinese = monthInChinese.replace(/冬/g, "十一");
    monthInChinese = monthInChinese.replace(/腊/g, "十二");
    monthInChinese = monthInChinese.replace(/闰/g, "閏");
    dayInChinese = dayInChinese.replace(/廿/g, "二十");
    dayInChinese = dayInChinese.replace(/初/g, "");

    const lunarResult = `${lunar.getYearInGanZhi()}年${monthInChinese}月${dayInChinese}日`;

    // console.log(lunarResult);  // 整理後的農曆日期


    // 取得農曆數字年、月、日
    const numYear = lunar.getYear();
    const numMonth = lunar.getMonth();
    const numDay = lunar.getDay();
    // console.log(`${ numYear}.${numMonth}.${numDay}`);

    const calcFifteenResult = calculateFifteen(numDay);  // 計算是否初一或十五，或還差幾天？

    // 測試函數
    // console.log(calculateFifteen(1)); // true
    // console.log(calculateFifteen(15)); // true
    // console.log(calculateFifteen(20)); // 10
    // console.log(calculateFifteen(10)); // 5
    // console.log(calcFifteenResult);  // 計算今天(農曆)離初一十五差幾天？

    // // 顯示轉換農曆後的結果
    const originToday = document.getElementById('originToday');
    const lunarToday = document.getElementById('lunarToday');
    const distDay = document.getElementById('distDay');
    const lunarDetail = document.getElementById('lunarDetail');

    originToday.textContent = `國曆：${year}年${month}月${day}日`;
    lunarToday.textContent = `農曆：${lunarResult}`;
    distDay.textContent = calcFifteenOutput(numDay); 
    
    lunarToday.title = lunar.toFullString();
    // lunarDetail.textContent = lunar.toFullString();

    // console.log(calcFifteenOutput(numDay));
}
displayLunar();

function calcFifteenOutput(numDay) {
    const distDay = calculateFifteen(numDay);
    if (typeof distDay === 'number') {
        return  `離下次初一十五還剩 ${distDay} 天`
    } else if (distDay == 'first') {
        return "今天是初一！";
    } else if (distDay == 'fifteen') {
        return "今天是十五！";
    } else {
        // return "例外";
        console.error('error');
    }
}

// 計算初一與十五
function calculateFifteen(day) {
    if (day === 1) {
        return "first";   //初一
    } else if (day === 15) {
        return "fifteen"  // 十五
    } else if (day >= 15) {
        return 30 - day;
    } else {
        return 15 - day;
    }
}
