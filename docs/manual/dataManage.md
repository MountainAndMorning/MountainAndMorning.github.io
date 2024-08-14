# 数据结构

TIMESlice采用了以患者为核心的策略来管理数据，patientId是所有患者的唯一标识。患者中包含了该患者的所有数据，当导入数据时，TIMESlice会自动根据patientId将对应数据放到对应患者名下。

![](/images/dataManage/dataStructure.png)

患者的数据是以study为单位进行管理的,study按照不同设定分为4种类别,分别是用于存储医学图像的Scan<v-icon size='small' icon="mdi-image-multiple" color='yellow'/>,存放导入的表格条目的Report<v-icon size='small' icon="mdi-file-chart" color='yellow'/>,提取影像参数所得的Feature<v-icon size='small' icon="mdi-blur" color='yellow'/>及用户手动创建的Note<v-icon size='small' icon="mdi-text-box" color='yellow'/>.

患者本身则由类似'文件夹'的系统管理。为何说类似呢，因为这里同一个患者可以同时存在于多个中，这样说来，'文件夹'更多的是类似于患者至上的一个标签，患者有对应标签我们就可以在对应的'文件夹'中找到该患者。这么设计可以让你随意的组织患者，而没有复制患者数据的负担，你看到的患者数据永远是你最新修改过的。

'文件夹'统称为Folder，按照其不同设计目的由可以分为用来导入影像的Store<v-icon size='small' icon="mdi-layers" color='yellow'/>,用来导入表格数据的Table<v-icon size='small' icon="mdi-table-large" color='yellow'/>, 用来整理数据的Group<v-icon size='small' icon="mdi-select-group" color='yellow'/>以及用来具体入组项目的Project<v-icon size='small' icon="mdi-ballot" color='yellow'/>.

![](/images/dataManage/homeView.png)

主界面左侧的Manager列表控制着Folder列表的显示内容，如果没有选择，则显示所有Folder，否则显示对应类型的Folder.类似的，Folder列表控制着Patient列表的显示内容，如果没有选择则显示所有Patient，否则只显示该Folder内的Patient.Study列表则显示当前所选Patient的所有Study，若当前无选中Patient则不显示。Inspector则显示当前所选对像的详细信息，包括Folder、Patient、Study、Seriel都由对应的Inspector，可在其中管理这些对象的信息。同时为了便于检索，我们还在工具栏中提供了一个简易的搜索框，当其中有内容时，Patient列表会显示符合要求的Patient，而Folder列表则会显示包含这些Patient的Folder.

<Steps
:images="[
'/images/dataManage/manager.png',
'/images/dataManage/folder.png',
'/images/dataManage/patient.png',
'/images/dataManage/search.png'
]"
:titles="[
'选择Manager筛选对应的Folder',
'选择Folder筛选其中的Patient',
'选择Patient显示其所属的Study',
'检索patientId或patientName'
]"
/>
