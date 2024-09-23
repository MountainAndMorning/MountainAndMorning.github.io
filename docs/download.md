# 下载

如果这个软件对你的论文有帮助请引用如下文献:

Li, Xiaogang, et al. "Automatic quantification of epicardial adipose tissue volume." Medical Physics 48.8 (2021): 4279-4290.

Li X, Ji L, Zhang R, et al. COACT: Coronary artery centerline tracker. Med. Phys.. 2023;e16873. https://doi.org/10.1002/mp.16873.

并将软件下载地址 (https://slice-doc.netlify.app/) 插入到文献合适位置.

微信扫描如下二维码或用邮件（18207481578@163.com）开发者获得pro许可.

![](/images/QR.png)

## 下载 MacOS Apple Silicon 版本 v4.18.0

<a href='https://www.jianguoyun.com/p/DegYyxUQ-MmzBhihteMFIAA'>地址：坚果云</a>

## 下载 Windows version v4.18.0

<a href='https://www.jianguoyun.com/p/DVBPMAoQ-MmzBhjY0uMFIAA'>地址：坚果云</a>


## 下载人工智能模型

[模型动物园](./manual/model)

## 视频教程

<a href='https://b23.tv/9gyl6Q6'>bilibili</a>

对苹果用户，如果提示软件已损坏...请参看这个<a href='https://zhuanlan.zhihu.com/p/617123498?utm_id=0&utm_source=wechat_session&utm_medium=social&s_r=0'>教程</a>解决。

对Windows用户，如果你遇到下述问题说明你需要安装Windows<a href='https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170'>系统补丁</a>，本站也拷贝了一份该<a href='/VC_redist.x64.exe'>补丁</a>，供用户直接下载使用。

![](/images/error.png)


# Update log

## V4.17.0
- Add zoom menu for adjusting window content.
- Add move database function.
- Add section export function.
- Fix the Chinese characters related problem.

## V4.16.0
- Show pixel value at cursor on each view.
- Support capturing overlay content on each view.
- Add PAT and Plaque content in Tube module.

## V4.15.0
- Improve the seg model manager.
- Add more settings for radiomics.

## V4.14.0
- Add volume rendering module.

## V4.13.0
- Add color manager for patient.
- Adjust the view layout of the centerline module. 
- Support multi rows for each patient in project module.
- Fix some bugs.

## V4.12.0
- Add support for png and jpg image.
- Add plug-in AI model management.
- Separate the annotation function to a dependent module.
- Add support for annotating the png and jpg image.

## V4.11.0
- Add image information for the Loop tool.
- Add Lasso tool in the MPR mode.
- Add Draw tool in the Tube module.
- Optimize the snap function in the Seg module.

## V4.10.0
- Add more tools to quantify image.

## V4.9.0
- Add support for saving serial meta information to study.
- Add MPR related function in seg module.
- Add plaque length information in the section inspector.
- Add centerline length information in the centerline inspector.
- Add progress bar for the currently processing case.

## V4.8.0
- Make the auto seg tool working on the background.
- Improve the speed of the auto seg tool on macOS by utilizing the GPU.
- Add support for save some basic seg information.
- Add support for computing the area of each seg slice.

## V4.7.0
- Add opacity selector for segmentation.
- Add cross marker for each seg view.
- Add screenshot function for the seg module.
- Add switch background function for the seg module.
- Add a new epicardium seg model for pulmonary plain CT.
- Improve the lasso tool.

## V4.6.0
- Add the export log menu.
- Add the project analyzing module.

## V4.5.0
- Improve the Island seg tool.
- Improve the Lasso seg tool.
- Add the snap function for saving the state of the seg.
- Add a new epicardium seg model for non contrast CT.
- Improve the stability of the activation module. If your activation code becomes invalid, connect the developer to get a new one.
- Fix the importing problem for some Dicoms.

## V4.4.0
- Add the Island seg tool.
- Add the Lasso seg tool.
- Fix the launch problem in some Windows computer.

## V4.3.0
- Add the new Tube module to replace the Contour module for coronary artery plaque analysing.
- Add the FAI function in the plaque related information list.
- Add support for exporting the study.
- Improve the performance of the Centerline module especially for the very long vessel.

## V4.2.0

- Add more settings for the radiomics panel.
- Add suppert for running radiomics in the background for parallel computation.
- Add support for editing the Circle object in the contour module.
- Add support for measuring the angle between the branches in the centerline module.
- Add support for importing nii and nrrd format series image.
- Fix the node idx bug in the centerline module.
- Fix the inserting node bug in the centerline module.
- Fix the wrong unit bug of the plaque length.
- Improve the stability of the software.

## V4.1.0

- Add support for switching database.
- Add support for importing segmentation.
- Add support for editing the content of the study
- Add support for adding new content for the study
- Add support for manually creating study
- Fix the bug about deleting label
- Fix the bug about reloading patient list
- Improve the stability of importing table by only allowed the letter or number composed column title
- Remove the deleting all centerlines function



