# 标签管理

Label是Study的必有属性，在任何创建Study的操作中你都必须为其选择一个且仅一个Label. Label可以用于对Study进行标记，通过这种方式我们就可以对Patient进行筛选，例如如果我们数据库中有<v-chip text="心内" size="x-small" color="orange"/>和<v-chip text="CT" size="x-small" color="green"/>两个Label，我们就可以筛选这样的Patient，其Study具有这两个Label.

## 新建Label
如果当前Label列表中没有满足你要求的，也可以新建Label，具体方法如下：

![](/images/labelManage/addLabel.png)

* 点击选择Label颜色
* 输入Label名称
* 点击+新建Label

::: info 注意
任意两个Label不能同名.
:::

## 更改Label

对已有的Label也可以进行更改：

![](/images/labelManage/deleteLabel.png)

* 点击主页面工具栏中的<v-icon size='small' icon="mdi-label" color='yellow'/>
* 选择需要更改的Label
* 更改Label颜色
* 更改Label名字
* 保存<v-icon size='small' icon="mdi-content-save-outline" color='green'/>
* 如果想删除已有Label可点击其右侧的<v-icon size='small' icon="mdi-close-circle" color='yellow'/>

::: info 注意
更改Label名字时注意不能与已有Label重名。Label右侧的数字表示其标记的Study数量，只有数量为0的Label才可以被删除，这样可以避免某些Study没有Label.
:::