# 编辑seg

## 基本属性

![](/images/segmentation/editSegBase.png)

## 自动分割工具

![](/images/segmentation/autoSeg.png)

1. 选中待处理seg
2. 选择auto工具
3. 点击打开模型管理对话框
4. 导入在模型[动物园](../manual/model)中下载的模型
5. 点击选中模型
6. 点击选择
7. 运行模型

::: info 注意
模型会在后台运行，如果当前已有其它模型在后台运行，则会在该模型运行完成后才开始本次运行。在模型未运行完成期间，再次点击运行按钮<v-icon size='small' icon="mdi-play-circle-outline" color='yellow'/>则会停止此次运行任务。seg在运行或者等待运行模型时是不允许进行其它更改其内容的操作的。
:::

## 手动标注

![](/images/segmentation/paintSeg.png)

1. 选中待处理seg
2. 选择paint工具
3. 在各视图勾画（除3D视图外）
4. 可切换为橡皮擦工具
5. 更改笔刷半径
6. 更改笔刷厚度（一般默认为0即可）
7. 是否实时刷新3D视图

::: warning 警告
开启实时刷新3D视图会使得勾画过程卡顿。
:::

## 套索

![](/images/segmentation/lasso.png)

1. 选中待处理seg
2. 选择lasso工具
3. 在各视图筐选
4. 可在套索模式
5. 可在清除和填充间切换
6. 是否以3D模型在Z、Y、X视图中进行勾画

::: info 注意
目前这个工具计算量很大，请耐心等待。
:::


## 阈值

![](/images/segmentation/thresholdSeg.png)

1. 选中待处理seg
2. 选择threshold工具
3. 选择是否在当前分割内提取还是在全图提取
4. 设定阈值上下界
5. 运行

## 组合

![](/images/segmentation/combineSeg.png)

1. 选中待处理seg
2. 选择combine工具
3. 选择运算
4. 某些运算（Copy, Add, Subtract, Interact）需要其它seg参与
5. 运行

::: info 注意
Invert：反转seg。Clear：清除seg。Fill：填充seg。Copy：复制其它seg内容到当前seg。Add：将当前seg内容与其它seg内容相加。Subtract：将当前seg内容减去其它seg内容。Interact：取当前seg和其它seg交集。
:::

## 平滑

![](/images/segmentation/smoothSeg.png)

1. 选中待处理seg
2. 选择smooth工具
3. 选择运算
4. 选择邻域范围
5. 运行

::: info 注意
Median：取中值。Erosion：收缩。Dilation：扩张。Opening：开发。Closing：关闭。
:::

## 过滤

![](/images/segmentation/island.png)

1. 选中待处理seg
2. 选择island工具
3. 选择模式
4. 如果选择REMOVE SMALL模式则需要选择小碎片的阈值，即像素数小于这个数的小碎片都会被移除
5. 运行


## 历史记录

![](/images/segmentation/island.png)

1. 选中待处理seg
2. 在检查器中打开历史记录列表
3. 点击目标步骤进行状态回退

::: info 注意
历史记录在编辑seg时会自动记录每个步骤，但当seg模块关闭后这个列表会自动清理。如果需要保存某些重要步骤可以在检查器中复制当前seg：
![](/images/segmentation/duplicate.png)
:::