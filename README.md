# stable-diffusion-webui-forge-lite

[FLUX部署新手教程](HowToPlayFlux.md)

- 适配https://github.com/lllyasviel/stable-diffusion-webui-forge
- 只保留核心功能，简化UI，适配移动端设备
- 使用next.js实现
- 本地调用sdAPI
- 提供前端界面给多用户使用

## 功能
1. 支持文生图，prompt输入栏，分辨率选择（比例预设），迭代步数选择（预设20、25、30）
2. 支持Lora选择，点击Lora卡片自动在prompt输入栏填入Lora tag和Lora权重
3. 图片自动保存本地浏览器数据，通过图库展示，支持点击图片放大预览
4. 图片生成进度显示
5. 支持任务队列显示，判断当前是否存在正在生成中的生图任务
6. 适配移动端、桌面端web界面

## 界面布局
- 文生图配置相关：prompt输入框，分辨率选择，迭代步数选择，Lora模型选择器，进度条，跳过当前任务按钮
- 图片展示相关：图片图库（点击图片可以放大预览）
- 任务队列相关：任务队列展示，可判断是否存在其他用户正在生成中的任务
- 
