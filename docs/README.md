# Project history

## chat_client
### 1 Day
1. PowerShell에서 npx 명령어로 프로젝트 구성  
  ![chat client initialize](./img/img_initialize.png)
2. install socket.io-client
    ```
    npm install socket.io-client 
    ```
3. Add single chat page 
4. Change server host/port
    ```
    server: {
        port: 8080, // default: 3000
        host: '0.0.0.0' // default: localhost
    }
    ```