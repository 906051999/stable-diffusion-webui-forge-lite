适用于从未接触过FLUX模型，且从未接触过sd-webUI的用户，请确保电脑具备科学上网能力，并且只以Windows系统为例

## 部署教程
### 下载forge(sd-webui 专用于FLUX模型的版本)
1. 访问https://github.com/lllyasviel/stable-diffusion-webui-forge
2. 下载一键部署安装包：https://github.com/lllyasviel/stable-diffusion-webui-forge?tab=readme-ov-file#installing-forge
    > Just use this one-click installation package (with git and python included).
    > 
    > 下载地址：https://github.com/lllyasviel/stable-diffusion-webui-forge/releases/download/latest/webui_forge_cu121_torch231.7z
3. 解压后，进入文件夹，运行`update.bat`
4. 运行`run.bat`，成功后会自动打开浏览器，访问`http://127.0.0.1:7860/`
5. 如果运行`run.bat`后出现报错，按照以下步骤操作：
    - 进入`webui`文件夹，运行`webui-use.bat`
    - 成功后会自动打开浏览器，访问`http://127.0.0.1:7860/`

### 下载FLUX模型
对于大多数设备，只推荐使用nf4量化版本的FLUX模型，
- 国内下载地址：https://www.liblib.art/modelinfo/2b4820cec2e34dba8e9214715d29dd3b?from=personal_page
- 在便签栏中找到`Flux-NF4-v2`，点击下载
- 下载完成后，将压缩包内的`flux1-dev-bnb-nf4-v2.safetensors`文件解压到forge文件夹中的`webui\models\Stable-diffusion\`路径下
- 一般来说解压后的相对文件路径是这样：`webui_forge_cu121_torch231\webui\models\Stable-diffusion\flux1-dev-bnb-nf4-v2.safetensors`

### 下载Lora模型
下载Lora模型时需要确定该Lora模型是FLUX模型，
筛选Lora模型时，标签里带有`F.1`即为FLUX模型，或者`Flux .1 S` \ `Flux .1 D`这样的标签
> 注意：这里的`S`和`D`指的是FLUX的版本，`S`为schnell(简化版)，`D`为dev(普通版)，还有个`pro`版本，只能调用API使用
> 
> 一般都是用dev版本，schnell质量很差
- 国内下载地址：https://www.liblib.art/
- 国外下载地址：https://civitai.com/models

下载的Lora模型文件一般为`*.safetensors`格式，下载完成后，将模型文件放置在到forge文件夹中的`webui\models\Lora\`路径下

一般来说相对文件路径是这样：`webui_forge_cu121_torch231\webui\models\Lora\*.safetensors`

### 尝试生图
一切准备就绪后，就可以尝试生图了
运行bat文件，等待浏览器自动打开`http://127.0.0.1:7860/`

1. 左上角UI选择`Flux`，模型选择`flux1-dev-bnb-nf4-v2.safetensors`（没找到的点击旁边按钮刷新一下）
2. 大部分地方都不需要改动，标签选择`Text2Img`(文生图)，Sampler（采样方法）保持`Euler`，Schedule type（调度类型）保持`simple`
3. steps（采样迭代步数）一般在`14-40`之间，并不是越大越好。步骤数越大，生成时间越长，与模型拟合度越高，太小的步数会导致生成图片效果不佳，太大可能会有模型过拟合的风险。
4. 分辨率根据需要调整，数值越大生成越慢，尽量保证宽高比例是常见类型，如1:1，4:3，3:4，2:3，3:2，5:3，3:5，6:4，4:6，8:5，5:8，16:9，9:16
5. Distilled CFG Scale(似乎也被称为Guidance)，默认是3.5，除非特殊说明，不然不会改动，最多一般就5.5。这个值越大越与prompt相关，越小就越和prompt无关。
6. seed（种子随机数），默认是-1，表示随机生成，一般不改动，如果想要生成特定图片，可以尝试设置seed值
7. 在`Lora`栏选择你下载的Lora模型，它会自动在`Prompt`栏自动引用Lora，默认权重为1，如：`<lora:Hand v2:1>`。一般来说Lora模型需要一个Trigger Words（触发词），在下载模型时需要注意作者的说明。如：`<lora:Hand v2:1>,Perfect hand,`
8. 在`Prompt`栏输入你的prompt，FLUX支持自然语言描述，不过只能用英文，善用翻译软件，或者参考别人的prompt
9.  点击`Generate`按钮，等待生成

### 必备sd-webUI插件
为了方便使用，推荐安装以下插件：

0. 中文汉化语言包：https://github.com/hanamizuki-ai/stable-diffusion-webui-localization-zh_Hans
1. prompt翻译，输入中文自动填入英文：https://github.com/Physton/sd-webui-prompt-all-in-one
2. tag逆推，将图片逆推为tag：https://github.com/toriato/stable-diffusion-webui-wd14-tagger
3. 模型数据自动下载对齐：https://github.com/butaixianran/Stable-Diffusion-Webui-Civitai-Helper

在标签栏中找到extensions（扩展），通过从网址安装的方式，安装以上插件，就是直接复制插件的github地址，然后粘贴到输入框中，点击安装即可

安装好了后会提示重启，这里最好是重启整个forge，如果只重启webui可能会导致插件无法正常加载

就是关掉命令行窗口，重新运行bat

语言包安装后，在标签栏中找到设置，搜索`Localization`，选择`zh-hans`，点击保存设置，然后重载UI

### 推荐Lora模型
1. 电影海报：https://civitai.com/models/721852/movie-poster-ce-sdxl-and-flux
2. 油画风格：https://civitai.com/models/723141/flux-oil-painting
3. 旧报纸：https://civitai.com/models/683184/old-paper-ce-sdxl-and-flux
4. 光影人像：https://civitai.com/models/391036/cucoloris-casting-shadow-lighting-modifiers-style-xl-sd15-f1d
5. 服装线条化艺术效果：https://civitai.com/models/160511/lines-clothes
6. 修复手部：https://civitai.com/models/200255/hands-xl-sd-15-flux1-dev

### 为前端提供API
API需要自行启用

其实很简单，右键点击`webui-user.bat`，选择`编辑`，在`set COMMANDLINE_ARGS=`后面添加`--api`

然后就可以在浏览器中访问`http://127.0.0.1:7860/docs`查看API文档

- 官方教程：
-  https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API
> - First, of course, is to run webui with --api commandline argument
> - example in your "webui-user.bat": set COMMANDLINE_ARGS=--api
> - This enables the API which can be reviewed at http://127.0.0.1:7860/docs (or whever the URL is + /docs) 

