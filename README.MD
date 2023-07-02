# HQU_UAL_INTERFACE

## 华侨大学统一验证登录逆向接口

## example

POST:

```json
{
    "stunum":"212510XXXX",
    "password":"XXXXX"
}
```

RETURN:

```json
{
    "code": 1,
    "msg": {
        "ual": {
            "cookie": [
                "happyVoyagePersonal=PWlPRD9iw2QMkfCp6adPUAVw8jC74hTvHfGDSbX7CXhcGazYInPN6bvBNfEZLCM5syWCSw6wh36TsYOsH5cUEf79AmmZWj8Oi0zn29BxO46E0N3GxEzt7bdN9JEhtTihUcDwXsWZ3KPvA2gWV6iR019XXXX++B2JmqyGE52p7Lg=; Path=/personalInfo; HttpOnly",
                "CASTGC=TGT-514497-WGwUMeSzPRxOHto8QQ3YCVJmcF6TrX1F7Z04SJxi5VdUM7o4tnA-OcHiOPoTw8P1JrEtpl-Euler; Path=/authserver; HttpOnly",
                "insert_cookie=24614973; path=/; Secure; HttpOnly"
            ],
            "location": "https://jwapp.hqu.edu.cn/jwapp/sys/emaphome/portal/index.do?forceCas=1&ticket=ST-1171465-zp-J2oZmaBHWEB-8XQ-APhm9DJMtpl-Euler"
        },
        "jwapp": {
            "cookie": [
                "GS_SESSIONID=XXXX565348f64d905d6df2fd114cd26c;path=/jwapp/;HTTPOnly;",
                "GS_LTYPE=\"\"; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Path=/jwapp/"
            ],
            "location": "https://jwapp.hqu.edu.cn/jwapp/sys/emaphome/portal/index.do?forceCas=1"
        }
    }
}
```

`有了jwapp的cookie：GS_SESSIONID 即可获取jwapp数据`
