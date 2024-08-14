# 影像导入

TIMESlice目前支持三种影像格式的导入，一是Dicom格式，另外两种则是nii和nrrd格式。

## Dicom影像导入

<Steps
:images="[
'/images/importScan/openCreateStore.png',
'/images/importScan/selectFolder.png',
'/images/importScan/selectStore.png',
'/images/importScan/selectLabel.png'
]"
:titles="[
'选择Store列表；点击+按钮；点击选择文件夹',
'选择包含待导入Dicom文件的文件夹；点击打开按钮',
'选择存放本次导入数据的Store，如果不选择则表示新建一个Store并存入本次导入的数据',
'选择Label；如果现有Label中没有符合你需要的则可创建新Label；点击导入按钮'
]"
/>

::: tip 提示
关于Label的更多信息参见[标签管理](./labelManage)
:::

::: warning 警告
对所选文件夹，TIMESlice会扫描其中包含的所有文件，并在其中找寻Dicom，因此建议每次所选的文件夹中包含的Study数量不要超过10个。
:::

::: info 注意
关于Study需要解释一下。当一个Patient进行一次影像检查时设备会创建一个Study用来组织本次检查所有图像。通常一个检查进行多次影像扫描，每次则对应一个Series（TIMESlice中称其为Serial），而每次扫描又会产生多个图像，其中每个图像称为Slice。所以通常影像上具有这样的结构 <v-chip text="Patient" size="x-small" color="yellow"/>-<v-chip text="Study" size="x-small" color="yellow"/>-<v-chip text="Serial" size="x-small" color="yellow"/>-<v-chip text="Slice" size="x-small" color="yellow"/>.而这里的Slice一般情况下就对应于一个Dicom文件，其通常以`.dcm`,`.dicom`作为文件后缀，有时也有没有后缀名的情况出现。
:::

::: tip 提示
与一般的诸如`.png`等的文件不同，Dicom文件除了包含图像像素外,还包含了关于本次检查的许多其它信息,在TIMESlice中你可以在选中某个Seriel后在Inspector中查看,如下图:
![](/images/importScan/serielMeta.png)
:::

## Nii或Nrrd影像导入

在用一些医学图像软件做后处理时，我们往往会用到`.nii`或`.nrrd`格式的文件。相比Dicom，这类文件可以包含整个Serial中的图像，便于整理和拷贝。但其一个缺点是这些图像格式往往没有保存Dicom中的患者信息，因此TIMESlice不知道该将这些图像放在什么位置，所以在导入这类图像时的步骤与导入Dicom不同。

<Steps
:images="[
'/images/importScan/openSelectNrrd.png',
'/images/importScan/selectNrrd.png'
]"
:titles="[
'点击某个已存在的Study中的+按钮',
'选择nii或nrrd格式的文件；点击打开'
]"
/>

::: info 注意
如[数据管理](./dataManage)中所说，Study有四种类型，只有Scan<v-icon size='small' icon="mdi-image-multiple" color='yellow'/>类型的Study才允许导入图像。
:::

如果患者的Study列表中没有Scan类型的Study时我们可以手动创建一个空Study。
![](/images/importScan/createStudy.png)
* 点击Study列表中的+按钮
* 选择标签
* 选择Study类型，注意只有Scan<v-icon size='small' icon="mdi-image-multiple" color='yellow'/>类型的Study才允许导入图像
* 点击创建<v-icon size='small' icon="mdi-play-circle-outline" color='green'/>按钮

如果对应患者还不在数据库中，则可以手动创建一个Patient.
![](/images/importScan/createPatient.png)
* 点击Patient列表中的+按钮
* 输入patientName
* 输入patientId,也可以点击<v-icon size='small' icon="mdi-account-reactivate" color='green'/>按钮随机生成
* 选择标签
* 选择Study类型
* 点击创建<v-icon size='small' icon="mdi-play-circle-outline" color='green'/>按钮

::: info 注意
TIMESlice中不允许空的Patient，因此我们在创建Patient是必须同时创建一个Study。同时，当一个Patient的所有Study都被删除后，TIMESlice会自动将该患者也删除。
:::