# 数据库管理

软件激活后还需要选择数据库用于存储软件运行过程中的相关数据。

![](/images/database/addDatabase.png)

1. 点击左上角<v-icon size='small' icon="mdi-timelapse" color='yellow'/>按钮打开数据库管理窗口 
2. 点击<v-icon size='small' icon="mdi-plus" color='yellow'/>在弹出的对话框中选择一个文件夹用于存放数据库文件，数据库文件是一个名为TIMESlice.db的文件夹，请将其视为一个整体，勿手动更改其中内容，否则会使数据库崩溃 
3. 选择一个数据库条目 
4. 点按<span style="color:red">SELECT</span>按钮加载当前数据库，当前加载的数据库其左侧的图标<v-icon size='small' icon="mdi-database" color='green'/>为绿色 
5. 对于当前未加载的数据库，可以点按工具栏中的<v-icon size='small' icon="mdi-arrow-up-circle-outline" color='yellow'/>按钮选择文件夹，将该数据库导入此位置，请目标位置有足够空间存放数据库 
6. 也可以点按工具栏中的<v-icon size='small' icon="mdi-arrow-down-circle-outline" color='yellow'/>按钮选择TIMESlice.db文件导入该数据库

![](/images/database/disconnect.png)

1. 选择当前加载的数据库条目
2. 点按<span style="color:red">DISCONNECT</span>按钮断开数据库连接，未连接的数据库可以倍导出