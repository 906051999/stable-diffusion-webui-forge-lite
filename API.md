# sdwebUI API说明
默认API路径：http://127.0.0.1:7860/sdapi/v1/

## Post

### 文生图
- /sdapi/v1/txt2img
- Request body:application/json
```
{
  "prompt": "",
  "styles": [
    "string"
  ],
  "seed": -1,
}
```
- Response body:application/json
200:Successful Response

422:Validation Error


### 跳过
/sdapi/v1/skip

## Get

### 获取调度器列表
/sdapi/v1/schedulers

### 获取lora列表
/sdapi/v1/loras
