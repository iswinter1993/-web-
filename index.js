import puppeteer from 'puppeteer'
import fetch from 'node-fetch';
import  HttpsProxyAgent from 'https-proxy-agent';
import discord from 'discord.js';

//获取币安上币信息
(async () => {
    try {
        console.log('打开浏览器...')
        const browser = await puppeteer.launch();
        console.log('打开新页面...')
        const page = await browser.newPage();
        console.log('加载页面地址...')
        await page.goto('https://www.binance.com/en/support/announcement/c-48?navId=48');
        console.log('打印币安列表信息...')
        const data = await page.$$eval('a > div',el=>el.map(e => e.textContent))
        const newList = data.filter(e=>e.includes('Binance Will List'))
        console.log(newList)
        await browser.close();
        console.log('创建机器人...')
        const bot = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"], restRequestTimeout: 60000 });
        const token = 'OTc2NzI4NDA3Nzk2NzY0Njky.GgitIu.oVAGc9FipJCYd_gWyaRCROkeuWNdsksLiUIaNY';
        console.log('机器人登录...')
        await bot.login(token);
        await bot.on('ready',(message)=>{
            console.log('机器人准备好了!')
            if(message.content === '!test'){
                const channel01 = bot.channels.cache.find(channel => channel.id === "976778033002328074" );
                channel01.send(newList.toString())
            }
        })
    } catch (error) {
        console.log('error',error)
    }
    
})();