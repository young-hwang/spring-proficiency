# stomp 메시지 양식

구독 메세지

```text
SUBSCRIBE
id:sub-0
destination:/topic/greetings

 
```

전송 메시지

```text
SEND
destination:/app/log
content-length:16

{"name":"young"} 
```
