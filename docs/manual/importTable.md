# 表格导入

除了可以导入影像以外，TIMESlice还支持表格数据的导入，其操作步骤与[影像导入](./importScan)类似。

![](/images/importTable/importTable.png)

* 选择Table列表
* 点击+
* 选择Excel文件
* 选择本次导入数据存入的位置
* 选择Label
* 导入

为了TIMESlice能正确识别表格内容，请在导入之前确定如下几件事：

![](/images/importTable/tableFormat.png)

* 表格必须是简单表格，即有清晰的行、列，没有合并单元格等复杂格式
* 表格至少要包含patientId和patientName两列
* 任意非空行的patientId和patientName信息不能为空
* 任意非空列的表头不能为空
* 任意两列表头不能重复
* 表头只允许包含英文字母和数字

::: info 注意
TIMESlice只会导入Excel文件中的第一个Sheet.
:::

::: tip 提示
TIMESlice会根据patientId与数据库内容比较，如果已经存在该patientId，则对把对应数据放入该Patient名下，否则会新建一个Patient.
:::