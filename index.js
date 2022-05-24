import puppeteer from 'puppeteer'
import fetch from 'node-fetch';
import  HttpsProxyAgent from 'https-proxy-agent';
import { Client, Intents } from 'discord.js';
import got from 'got'
import HttpAgent from 'agentkeepalive';
import express from 'express';
const {HttpsAgent} = HttpAgent;
import axios from 'axios';
import { chat } from './chat.js';

//获取币安上币信息
(async () => {
    try {
        // const app = express()
        // const port = 3000

        // app.get('/', (req, res) => {
        //     res.send('Hello World!')
        // })

        // var server =await app.listen(port, (e) => {
        //     var host = server.address().address
        //     console.log(host)
        //     console.log(`服务已启动:${port}`)
        // })




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
        // console.log('创建机器人...')
        // const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
        // const token = 'OTc3MTQyMDYxNzE3NDA5ODAz.GFh7Xx.6KxsBk5M0fJkeuINWq73wPM_7S633bsjhJavWw';
        // console.log('机器人登录...')
        
        // await bot.once('ready',(message)=>{
        //     console.log('机器人准备好了!')
        //     if(message.content === '!test'){
        //         const channel01 = bot.channels.cache.find(channel => channel.id === "976778033002328074" );
        //         channel01.send('你好')
        //     }
        // })
        // await bot.login(token);
        chat('ODgyMjMzMTI5Mjc0ODU5NTcw.GypP6l.9orKojHCPvOFI0F9-QxGelFJZP94HvREWbbGs8','976778033002328074',newList.toString())
    } catch (error) {
        console.log('error',error)
    }
    
})();